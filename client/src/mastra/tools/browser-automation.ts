import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const browserAutomationTool = createTool({
  id: 'browser-automation',
  description: 'Automate browser actions (click, scroll, wait) using a Playwright backend server.',
  inputSchema: z.object({
    url: z.string().describe('The URL to visit'),
    actions: z
      .array(
        z.object({
          type: z.enum(['click', 'scroll', 'wait']),
          selector: z.string().optional().describe('CSS selector (required for click)'),
          value: z.number().optional().describe('Scroll amount or wait time in ms'),
        })
      )
      .describe('List of actions to perform on the page'),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    error: z.string().optional(),
  }),
  execute: async ({ context }) => {
    try {
      const res = await fetch('http://localhost:4000/automate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context),
      });

      const data = await res.json();
      return {
        success: data.success,
        message: data.message || '',
        error: data.error || null,
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'Failed to contact browser automation server.',
        error: err.message,
      };
    }
  },
});
