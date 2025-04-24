import { exec } from 'child_process';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { promisify } from 'util';
export const shellTool = createTool({
    id: 'execute-shell',
    description: 'Execute a shell command and return its output',
    inputSchema: z.object({
      command: z.string().describe('Shell command to execute'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      output: z.string(),
    }),
    execute: async ({ context }) => {
      const { command } = context;
      const execAsync = promisify(exec);
      try {
        const { stdout, stderr } = await execAsync(command, { timeout: 10000 });
  
        return {
          success: true,
          output: stdout || stderr || 'Command executed with no output.',
        };
      } catch (error: any) {
        return {
          success: false,
          output: error.message || 'Failed to execute command.',
        };
      }
    },
  });
  