const API_URL = 'http://localhost:5000/api';

export const generateAnalytics = async (prompt) => {
  const response = await fetch(`${API_URL}/analytics/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return response.json();
};