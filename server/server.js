const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5012;

const corsOptions = {
  origin: "http://localhost:5173",  // No trailing slash
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle OPTIONS requests for preflight

const HUGGING_FACE_API_KEY = "your_huggingface_api_key";
const GEMINI_API_KEY = "your_gemini_api_key";
const MODELS = {
  image: 'stabilityai/stable-diffusion-3.5-large',
};

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Welcome to AI Generator</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            color: #fff;
            margin: 0;
            padding: 0;
            background: url('https://static.vecteezy.com/system/resources/thumbnails/041/885/327/large/ai-generated-blue-background-with-ai-technology-and-lots-of-space-for-magical-celebrations-abstract-blue-background-free-video.jpg') no-repeat center center fixed;
            background-size: cover;
            animation: fadeInBackground 2s ease-in-out;
        }
          @keyframes fadeInBackground {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        h1 {
            font-size: 3em;
            margin-top: 50px;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
        }

        p {
            font-size: 1.2em;
            margin: 20px 0;
            line-height: 1.6;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
        }

        .button {
            display: inline-block;
            margin-top: 30px;
            padding: 15px 30px;
            font-size: 1.2em;
            color: #fff;
            background-color: #FF6F61;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.2s;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
        }

        .button:hover {
            background-color: #ff856d;
            transform: scale(1.05);
            box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.7);
        }
        </style>
      </head>
      <body>
        <h1>Welcome to the AI Generator!</h1>
        <p>Generate text using Gemini AI and images using Hugging Face Stable Diffusion.</p>
        <p>Type your prompt, choose your generation type, and let the magic happen!</p>
        <a href="http://localhost:5173" class="button">Click here to visit your AI-Assistant</a>
      </body>
    </html>
  `);
});
app.post('/generate', async (req, res) => {
  const { prompt, generationType } = req.body;
  console.log(`Received prompt: "${prompt}" for generation type: ${generationType}`);

  if (!prompt || !generationType) {
    return res.status(400).json({ result: 'Prompt and generation type are required.' });
  }

  try {
    let result;

    if (generationType === 'text') {
      try {
        // Corrected payload format for Gemini API text generation
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: prompt,  // Send the prompt as text inside the "parts" array
                  }
                ]
              }
            ]
          }
        );

        // Log the entire response to check its structure
        console.log('Gemini API response:', response.data);

        // Check if the response contains the expected structure
        if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
          const generatedText = response.data.candidates[0].content;
          console.log('Generated text:', generatedText);
          res.json({ result: generatedText });
        } else {
          console.error('Unexpected response structure from Gemini API');
          res.status(400).json({ result: 'Unexpected response structure from Gemini API.' });
        }
      } catch (error) {
        console.error('Error generating content:', error.response?.data || error.message);
        res.status(400).json({ result: 'Error generating text.' });
      }
    }

    if (generationType === 'image') {
      try {
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/${MODELS.image}`,
          { inputs: prompt },
          {
            headers: {
              'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer', // Expect binary data for image
          }
        );
    
        if (!response.data) {
          throw new Error('Failed to generate image.');
        }
    
        // Generate a unique filename for the image
        const imageName = `${Date.now()}_generatedImage.jpg`;
        const imagePath = path.join(__dirname, 'public', 'images', imageName);
    
        // Save the image locally
        fs.writeFileSync(imagePath, response.data);
    
        console.log('Image saved successfully!');
    
        // Return the URL of the generated image so the frontend can access it
        const imageUrl = `http://localhost:5012/images/${imageName}`;
        res.json({ result: imageUrl });
      } catch (error) {
        console.error('Error generating image:', error.response?.data || error.message);
        res.status(400).json({ result: 'Error generating image.' });
      }
    }
    
    
  } catch (error) {
    console.error('Unexpected error:', error.message);
    res.status(500).json({ result: 'Unexpected error occurred.' });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});