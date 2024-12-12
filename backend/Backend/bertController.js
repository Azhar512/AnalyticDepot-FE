const modelLoader = require('../bertModels/modelLoader');
const BertTokenizer = require('../utils/tokenizer');
const tf = require('@tensorflow/tfjs-node');
const BertService = require('./services/bertService');

exports.generateResponse = async (req, res) => {
  try {
    const { prompt, modelId } = req.body;
    
    // Load appropriate BERT model
    const model = await modelLoader.loadModel(modelId);
    const tokenizer = new BertTokenizer(
      `${bertConfig.modelPaths[modelId]}/vocab.txt`
    );
    
    // Tokenize input
    const { inputIds, attentionMask } = tokenizer.tokenize(prompt);
    
    // Convert to tensors
    const inputTensor = tf.tensor2d([inputIds], [1, bertConfig.maxSequenceLength]);
    const maskTensor = tf.tensor2d([attentionMask], [1, bertConfig.maxSequenceLength]);
    
    // Get model prediction
    const prediction = await model.predict([inputTensor, maskTensor]);
    
    // Process prediction based on model type
    const response = await processModelOutput(prediction, modelId);
    
    res.json({ 
      code: response,
      model: modelId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};