import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
export const twitterTool = createTool({
    id: 'post-tweet',
    description: 'Post a tweet to the authenticated Twitter account',
    inputSchema: z.object({
      text: z
        .string()
        .max(280)
        .describe('Text content of the tweet (max 280 characters)'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      tweetUrl: z.string().optional(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { text } = context;
  
      try {
        const res = await fetch('https://api.twitter.com/2/tweets', {
          method: 'POST',
          headers: {
            'Authorization': "Bearer AAAAAAAAAAAAAAAAAAAAACRC0AEAAAAA5V9cE0mx9t0x%2FTZ10buUJA6FGt0%3D1BnN5XMPCEm7kSH5EyylPLo87RWRN6yRijnTwkKdWW4WNr2X8A",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });
  
        const data = await res.json();
        console.log('Twitter API response:', data);
        if (!res.ok) {
          return {
            success: false,
            message: data?.error || 'Failed to post tweet.',
          };
        }
  
        const tweetId = data?.data?.id;
  
        return {
          success: true,
          tweetUrl: `https://twitter.com/user/status/${tweetId}`,
          message: 'Tweet posted successfully.',
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message || 'An unexpected error occurred.',
        };
      }
    },
  });
  