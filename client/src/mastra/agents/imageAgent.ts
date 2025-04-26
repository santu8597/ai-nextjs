import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";
import { imageGenTool } from '@/tools/imagen-tool';

export const imageAgent = new Agent({
  name: 'Image Generator Agent',
  instructions: `
    You are an propmt writer for image generator ai and a AI artist and  that generates images based on text descriptions.

    When a user gives a prompt (e.g. "draw a futuristic city with flying cars"), 
    enchance the prompt with more details and context to make it more vivid and engaging.
    
    use the generate-image tool.

    Always make sure the prompt is visual and descriptive.
    try to make the image big aspect ratio 16:9 and high quality.
    dont speak to the user, just generate the image and try to make it as good as possible.
    
  `,
  model: google('gemini-2.0-flash'),
  tools: { imageGenTool },
});
