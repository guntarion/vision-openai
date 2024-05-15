// not working Invalid value: 'image'. Supported values are: 'text' and 'image_url'."

// Import necessary modules using CommonJS syntax
const OpenAI = require("openai").default;
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to describe an image using OpenAI Vision API
async function describeImage(imagePath) {
  try {
    // Read the image data from the local file system
    const imageData = fs.readFileSync(imagePath);

    // Convert the image data to a base64-encoded string
    const base64Image = imageData.toString("base64");

    // Create the payload for the API request
    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "User will give you a picture of a shirt, or a person using a shirt. Please focus on the shirt, completely ignore the person; describe the shirt and suggest, in what occasion it can be worn.",
        },
        {
          role: "user",
          content: [
            {
              type: "image",
              base64: base64Image,
            },
          ],
        },
      ],
      max_tokens: 1000,
    };

    // Send the request to OpenAI API
    const response = await openai.chat.completions.create(payload);

    // Log the response from the API
    console.log("Description:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error describing the image:", error);
  }
}

// Path to the local image file
const imagePath =
  "/Users/guntar/Documents/SourceCodes/NodeJS/00 Playground/vision-openai/img/bank-papua-batik-2-70.jpg";

// Call the function with the image path
describeImage(imagePath);
