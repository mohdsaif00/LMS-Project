import CourseModel from '../models/course.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
        error: true,
      });
    }

    let thumbnailData = {
      public_id: 'Dummy',
      secure_url: 'Dummy',
    };

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        thumbnailData = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
    }

    const course = await CourseModel.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: thumbnailData,
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      error: false,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
