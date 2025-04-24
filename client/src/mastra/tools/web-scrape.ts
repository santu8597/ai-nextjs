import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const webScraperTool = createTool({
  id: 'web-scraper',
  description: 'Scrape content from dynamic websites, including pagination and screenshots.',
  inputSchema: z.object({
    url: z.string().describe('The target website URL'),
    actions: z.array(
      z.object({
        type: z.enum(['click', 'scroll', 'wait']),
        selector: z.string().optional(),
        value: z.number().optional(),
      })
    ).optional().describe('Optional browser automation actions'),
    selectors: z.array(z.string()).describe('CSS selectors to extract data from the page'),
    screenshot: z.boolean().optional().default(false).describe('Whether to take a screenshot after scraping'),
    pagination: z.object({
      selector: z.string().optional(),
      nextButtonSelector: z.string().optional(),
    }).optional().describe('Pagination selectors to scrape across multiple pages'),
  }),
  outputSchema: z.object({
    data: z.record(z.string(), z.array(z.string())),
    screenshot: z.string().optional(),
    success: z.boolean(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      const res = await fetch('http://localhost:4000/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context),
      });

      const data = await res.json();
      return {
        data: data.data || {},
        screenshot: data.screenshot || '',
        success: data.success,
        error: data.error,
      };
    } catch (err: any) {
      return {
        data: {},
        success: false,
        screenshot: '',
        error: err.message,
      };
    }
  },
});
