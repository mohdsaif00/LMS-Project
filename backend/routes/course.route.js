import { Router } from 'express';
import { addCourse } from '../controllers/course.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const courseRouter = Router();

courseRouter.post('/add-course', upload.single('thumbnail'), addCourse);

export default courseRouter;
