import { Router } from 'express';
import {
  getAllcourse,
  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
} from '../controllers/course.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { authorizedRole, isAuthenticated } from '../middlewares/auth.middleware.js';

const courseRouter = Router();
courseRouter.get('/getAllcourse', isAuthenticated, getAllcourse);
courseRouter.post(
  '/add-course',
  isAuthenticated,
  upload.single('thumbnail'),
  addCourse
);
courseRouter.get('/getCourse/:id', isAuthenticated, getCourseById);
courseRouter.post('/deleteCourse/:id', isAuthenticated, authorizedRole('ADMIN'), deleteCourseById);
courseRouter.post('/updateCourse/:id', isAuthenticated, authorizedRole('ADMIN'), updateCourseById);

export default courseRouter;
