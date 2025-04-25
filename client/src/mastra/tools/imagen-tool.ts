import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { generateImageWithGemini } from '@/lib/gemini-imagen'; // You’ll write this helper

export const imageGenTool = createTool({
  id: 'generate-image',
  description: 'Generate an image from a prompt using the Gemini model.',
  inputSchema: z.object({
    prompt: z.string().describe('Description of the image to generate'),
  }),
  outputSchema: z.object({
    imageUrl: z.string().describe('URL of the generated image'),
  }),
  execute: async ({ context }) => {
    const url = await generateImageWithGemini(context.prompt);
    return { imageUrl: url };
  },
});
