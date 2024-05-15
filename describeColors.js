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
          content:
            "Given the logo provided by the user: 1. Describe the prominent or unique shape of the logo 2. Describe the colors contained within the logo. Identify the primary, secondary, and any accent colors present. Make an estimate of what percentage composition of each color is relative to the others. Based on that two informations, Create a design for a shirt that: 1) Contains prominent or unique shapes from the logo that can be effectively translated into embroidery or screen printing on the shirt. Prioritize shapes, not letter, that are easily recognizable and carry the essence of the brand’s visual identity. 2)  Incorporates the provided information of colors composition analysis of a logo of the user's company. The colors on the t-shirt should be used in the same proportion as they appear in the logo to maintain brand consistency. Provide a detailed description of the t-shirt design, including the placement and proportion of each color. This design will help in creating merchandise that aligns closely with the brand's visual identity.",
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
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Logo_PLN.svg/800px-Logo_PLN.svg.png";

// Call the function with the image URL
describeImage(imageUrl);
