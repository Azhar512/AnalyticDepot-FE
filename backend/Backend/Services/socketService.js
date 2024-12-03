import dataCollector from './dataCollector.js';

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial data
    socket.emit('initial-data', dataCollector.data);

    // Set up real-time updates listener
    const removeListener = dataCollector.addListener((update) => {
      socket.emit(`${update.type}-update`, update.data);
    });

    // Handle client events
    socket.on('track-api-request', ({ success }) => {
      dataCollector.trackApiRequest(success);
    });

    socket.on('track-new-user', () => {
      dataCollector.trackUserEngagement('new');
    });

    socket.on('track-active-user', () => {
      dataCollector.trackUserEngagement('active');
    });

    socket.on('track-token-usage', ({ tokens }) => {
      dataCollector.trackTokenUsage(tokens);
    });

    socket.on('disconnect', () => {
      removeListener();
      console.log('Client disconnected:', socket.id);
    });
  });
};

export default initializeSocket;