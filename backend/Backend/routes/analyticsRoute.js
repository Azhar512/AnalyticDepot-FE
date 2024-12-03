import express from 'express';
const router = express.Router();
import { generateAnalytics } from './Controllers/analyticsController.js'; 
router.post('/generate', generateAnalytics);


export default router;