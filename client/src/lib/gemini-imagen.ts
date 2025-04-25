import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import path from "path";

export const generateImageWithGemini=async (prompt:string)=> {
    const genAI = new GoogleGenAI({ apiKey: "AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0" });
 
  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash-exp-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  
  const response =  result;
  if (!response?.candidates?.length) throw new Error('No response from model');
  const imagePart = response.candidates[0].content.parts.find(p => p.inlineData?.mimeType.startsWith('image/'));
  if (!imagePart?.inlineData?.data) throw new Error('No image returned by model');

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const fileName = `generated-${Date.now()}.png`;
  const publicDir = path.join(process.cwd(),"public"); 
  console.log("CWD:", process.cwd());
  console.log("Saving to:", publicDir);// go up from /client
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log("Created public dir");
  }

  const imagePath = path.join(publicDir, fileName);
   fs.writeFileSync(imagePath, buffer);
   console.log("Image written to:", imagePath);
  return `/${fileName}`;
}
