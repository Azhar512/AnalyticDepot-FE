import fetch from 'node-fetch';

const HF_API_URL = "https://api-inference.huggingface.co/models/bigcode/starcoder";

export const generateAnalytics = async (req, res) => {
  try {
    // Log the API key presence (but not the actual key)
    console.log('API Key present:', !!process.env.HUGGINGFACE_API_KEY);
    console.log('Received prompt:', req.body.prompt);
    
    const { prompt } = req.body;
    
    if (!process.env.HUGGINGFACE_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "API key not configured"
      });
    }
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: "Prompt is required" 
      });
    }

    // Log the request being made
    console.log('Making request to:', HF_API_URL);
    console.log('Request body:', {
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.3,
        top_p: 0.95,
        return_full_text: false
      }
    });

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.3,
          top_p: 0.95,
          return_full_text: false
        }
      })
    });

    console.log('HF Response status:', response.status);
    const responseText = await response.text();
    console.log('HF Response text:', responseText);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${responseText}`);
    }

    const result = JSON.parse(responseText);
    
    if (!result[0]?.generated_text) {
      throw new Error('No code generated');
    }

    res.json({ 
      success: true, 
      code: result[0].generated_text
    });

  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.toString() 
    });
  }
};