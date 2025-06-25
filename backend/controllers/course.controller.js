import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import CourseModel from '../models/course.model.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Add Courses
export async function addCourse(req, res) {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return res.status(400).json({
        message: 'Provide all the details.',
        success: false,
        error: true,
      });
    }

    const course = await CourseModel.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: 'Dummy',
        secure_url: 'Dummy',
      },
    });

    if (req.file?.path) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'lms',
        });

        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        await fs.unlink(req.file.path);
      } catch (uploadError) {
        console.error('Cloudinary Upload Error:', uploadError);
        return res.status(500).json({
          message: 'Thumbnail upload failed.',
          success: false,
          error: true,
        });
      }
    }

    await course.save();

    return res.status(201).json({
      message: 'Course added successfully',
      success: true,
      error: false,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      success: error.message,
    });
  }
}

//All Courses
export async function getAllcourse(req, res) {
  try {
    const courses = await CourseModel.find({}).select('-lectures');

    return res.status(200).json({
      message: 'All Coures Details',
      success: true,
      error: false,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
}

//Get Course By Id
export async function getCourseById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Invalid course ID',
        success: false,
        error: true,
      });
    }

    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Course Details',
      success: true,
      error: false,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error.message,
    });
  }
}

// Update course — only by creator OR admin
export async function updateCourse (req, res)  {
  try {
    const { title, description, price } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const isOwner = course.creator.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "You can't update this course" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;

    await course.save();

    res.json({ message: "Course updated", course });
  } catch (err) {
    res.status(500).json({ message: "Error updating course" });
  }
};

// Delete course — only by creator OR admin
export async function deleteCourse (req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const isOwner = course.creator.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "You can't delete this course" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course" });
  }
};