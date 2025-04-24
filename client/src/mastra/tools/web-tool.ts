import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const webSearchTool = createTool({
  id: 'web-search',
  description: 'Perform a web search using Tavily and return summarized results',
  inputSchema: z.object({
    query: z.string().describe('The search query to look up'),
  }),
  outputSchema: z.object({
    summary: z.string(),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    const { query } = context;

    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        max_results: 5,
        include_answer: true,
      }),
    });

    const data = await res.json();

    return {
      summary: data?.answer || 'No summary available.',
      sources: (data?.results || []).map((result: any) => ({
        title: result.title,
        url: result.url,
      })),
    };
  },
});
