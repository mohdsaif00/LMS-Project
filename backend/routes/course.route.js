import { Router } from 'express';
import { getAllcourse, addCourse, getCourseById, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { authorizedRole, isAuthenticated, protect,  } from '../middlewares/auth.middleware.js';

const courseRouter = Router();
courseRouter.get('/getAllcourse', isAuthenticated, getAllcourse);
courseRouter.post(
  '/add-course',
  isAuthenticated,
  authorizedRole('ADMIN'),
  upload.single('thumbnail'),
  addCourse
);
courseRouter.get('/getCourse/:id', isAuthenticated, getCourseById);
courseRouter.put("/update/:id", protect, updateCourse);
courseRouter.delete("/deleteCourse", protect, deleteCourse)

export default courseRouter;
