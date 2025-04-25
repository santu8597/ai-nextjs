import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";
import { imageGenTool } from '@/tools/imagen-tool';

export const imageAgent = new Agent({
  name: 'Image Generator Agent',
  instructions: `
    You are an AI artist that generates images based on text descriptions.

    When a user gives a prompt (e.g. "draw a futuristic city with flying cars"), use the generate-image tool.

    Always make sure the prompt is visual and descriptive.
  `,
  model: google('gemini-2.0-flash'),
  tools: { imageGenTool },
});
