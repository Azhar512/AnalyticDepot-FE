import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dataCollector from './Services/dataCollector.js';
import initializeSocket from './Services/socketService.js';
import dashboardRoute from './routes/dashboardRoute.js';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
 cors: {
   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
   credentials: true
 }
});

app.use(cors({
 origin: process.env.FRONTEND_URL || 'http://localhost:3000',
 credentials: true
}));
app.use(express.json());

// Update storage metrics collection for Windows
dataCollector.collectStorageMetrics = async () => {
 try {
   const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');
   // Process the storage data here
   return stdout;
 } catch (error) {
   console.error('Error collecting storage metrics:', error);
   throw error;
 }
};

// Update system metrics collection for Windows
dataCollector.collectSystemMetrics = async () => {
 try {
   const { stdout } = await execAsync('ping google.com -n 1');
   // Process the system metrics here
   return stdout;
 } catch (error) {
   console.error('Error collecting system metrics:', error);
   throw error;
 }
};

app.use('/api/dashboard', dashboardRoute);

initializeSocket(io);
dataCollector.startCollecting();

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));