import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import CourseModel from '../models/course.model.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const addCourse = async (req, res) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return res.status(400).json({
        message: 'Provide all the details.',
        success: false,
      });
    }

    // const existingCourse = await CourseModel.findOne({ title });
    // if (existingCourse) {
    //   return res.status(401).json({
    //     message: 'Course already added. Please change title.',
    //     success: false,
    //     error: true,
    //   });
    // }

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
        });
      }
    }

    await course.save();

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};
