import dataCollector from "../Services/dataCollector.js";

export const getDashboardData = async (req, res) => {
  try {
    res.json(dataCollector.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStorage = async (req, res) => {
  try {
    const { fileType, size } = req.body;
    await dataCollector.collectStorageMetrics();
    res.json(dataCollector.data.storage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const trackApiRequest = async (req, res) => {
  try {
    const { success } = req.body;
    dataCollector.trackApiRequest(success);
    res.json(dataCollector.data.performance.apiRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};