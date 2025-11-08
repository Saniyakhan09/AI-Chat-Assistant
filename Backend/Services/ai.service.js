// const { GoogleGenAI } = require ("@google/genai");

// const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// async function generateResponse(content) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//   contents: [
//         {
//           role: "user",
//           parts: [{ text: content }]
//         }
//       ]  });
//     return response.response.text();
    
// }

// module.exports = {generateResponse};

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function generateResponse(content) {
  try {
    if (!content || content.trim() === "") {
      throw new Error("Prompt content is empty");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: content }]
        }
      ]
    });

    return response.response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    throw err;
  }
}

module.exports = { generateResponse };
