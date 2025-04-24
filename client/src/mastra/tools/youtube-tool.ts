import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const youtubePlayTool = createTool({
  id: 'play-youtube-video',
  description: 'Open and play a YouTube video with full-screen, volume control, and play/pause toggle.',
  inputSchema: z.object({
    url: z.string().describe('The YouTube video URL to play'),
    volume: z.number().min(0).max(1).optional().default(0.5).describe('Volume level from 0.0 to 1.0'),
    autoFullscreen: z.boolean().optional().default(true).describe('Whether to enter fullscreen'),
    togglePlay: z.boolean().optional().default(true).describe('Whether to auto toggle play if paused'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      const res = await fetch('http://localhost:4000/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context),
      });

      const data = await res.json();
      return {
        success: data.success,
        message: data.message,
        error: data.error,
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'Failed to launch YouTube video.',
        error: err.message,
      };
    }
  },
});
