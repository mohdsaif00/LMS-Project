import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      minLength: [8, 'Title must be at least 8 characters'],
      maxLength: [60, 'Title must be less than 60 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [8, 'Description must be at least 8 characters'],
      maxLength: [300, 'Description must be less than 300 characters'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: [true, 'Thumbnail public_id is required'],
      },
      secure_url: {
        type: String,
        required: [true, 'Thumbnail URL is required'],
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model('Course', courseSchema);
export default CourseModel;
