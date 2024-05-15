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

// Function to describe an image using OpenAI Vision API
async function describeImage(imageUrl) {
  try {
    // Create the payload for the API request
    const payload = {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "User will give you a picture of a shirt, or a person using a shirt. Please focus on the shirt, completely ignore the person; describe the shirt and suggest, in what occasion it can be worn.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: imageUrl,
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

// Example URL of an image
const imageUrl =
  "https://www.seragamharmas.com/wp-content/uploads/2020/11/KK-012-Kemeja-Abu-01.jpg";

// Call the function with the image URL
describeImage(imageUrl);
