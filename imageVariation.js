// This is working code to describe an image using OpenAI Vision API

// Import necessary modules using CommonJS syntax
const OpenAI = require("openai").default;
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fs = require('fs');

async function imageVariation(imagePath) {
  try {
    // Create the payload for the API request
    const payload = {
      model: "dall-e-2",
      image: fs.createReadStream(imagePath),
      n: 1,
      size: "1024x1024"
    };

    // Send the request to OpenAI API
    const response = await openai.images.createVariation(payload);

    // Log the response from the API
    console.log("Variation URL:", response.data[0].url);
  } catch (error) {
    console.error("Error creating image variation:", error);
  }
}

// Path to the image
const imagePath = "./img/gambar-variasi-2.png";

// Call the function with the image path
imageVariation(imagePath);