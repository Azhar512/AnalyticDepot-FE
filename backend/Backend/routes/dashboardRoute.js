import express from 'express';
import { 
  getDashboardData,
  updateStorage,
  trackApiRequest
}from '../Controllers/dashboardController.js';
const router = express.Router();

router.get('/overview', getDashboardData);
router.post('/storage/update', updateStorage);
router.post('/track/api', trackApiRequest);

export default router;
