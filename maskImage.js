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

const fs = require("fs");

async function imageEdit(imagePath, maskPath, promptText) {
  try {
    // Create the payload for the API request
    const payload = {
      model: "dall-e-2",
      image: fs.createReadStream(imagePath),
      mask: fs.createReadStream(maskPath),
      prompt: promptText,
      n: 1,
      size: "1024x1024",
    };

    // Send the request to OpenAI API
    const response = await openai.images.edit(payload);

    // Log the response from the API
    console.log("Edited Image URL:", response.data[0].url);
  } catch (error) {
    console.error("Error editing image:", error);
  }
}

// Path to the image and mask
const imagePath = "./img/contoh-gambar-asli.png";
const maskPath = "./img/contoh-gambar-mask.png";

// Prompt text
const promptText = "A formal uniform with embroidered logo of the head of a golden hawk.";

// Call the function with the image path, mask path, and prompt text
imageEdit(imagePath, maskPath, promptText);