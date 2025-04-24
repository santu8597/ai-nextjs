import path from 'path';
import { createTool } from '@mastra/core/tools';
import { exec } from 'child_process';
import { z } from 'zod';
import fs from 'fs/promises';

export const fileSystemTool = createTool({
    id: 'file-system',
    description: 'Read, write, or append content to a file in the Next.js project',
    inputSchema: z.object({
      path: z.string().describe('Relative file path (e.g. src/app/page.tsx)'),
      action: z.enum(['read', 'write', 'append']),
      content: z.string().optional(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      content: z.string().optional(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { path, action, content } = context;
  
      try {
        if (action === 'read') {
          const data = await fs.readFile(path, 'utf-8');
          return { success: true, content: data, message: 'File read successfully.' };
        } else if (action === 'write') {
          await fs.writeFile(path, content || '');
          return { success: true, message: 'File written successfully.' };
        } else {
          await fs.appendFile(path, content || '');
          return { success: true, message: 'Content appended successfully.' };
        }
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    },
  });
  
  
  
  
  export const nextRouteTool = createTool({
    id: 'next-route',
    description: 'Create a new route in the Next.js app directory',
    inputSchema: z.object({
      route: z.string(),
      type: z.enum(['page', 'api']),
      content: z.string(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { route, type, content } = context;
      const filename = type === 'page'
        ? `app${route}/page.tsx`
        : `pages/api${route}.ts`;
  
      try {
        await fs.mkdir(path.dirname(filename), { recursive: true });
        await fs.writeFile(filename, content);
        return { success: true, message: `Route ${filename} created.` };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    },
  });
  
  
  
  export const componentTool = createTool({
    id: 'create-component',
    description: 'Generate a React component file in the specified directory',
    inputSchema: z.object({
      name: z.string(),
      directory: z.string(),
      content: z.string(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { name, directory, content } = context;
      const filepath = path.join(directory, `${name}.tsx`);
  
      try {
        await fs.mkdir(directory, { recursive: true });
        await fs.writeFile(filepath, content);
        return { success: true, message: `${name}.tsx created in ${directory}` };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    },
  });
  
  
  
  export const dependencyTool = createTool({
    id: 'manage-dependency',
    description: 'Install or remove a dependency in the Next.js project',
    inputSchema: z.object({
      action: z.enum(['install', 'remove']),
      packages: z.array(z.string()),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const { action, packages } = context;
      const cmd = action === 'install'
        ? `npm install ${packages.join(' ')}`
        : `npm uninstall ${packages.join(' ')}`;
  
      try {
        await new Promise((resolve, reject) => {
          exec(cmd, (err, stdout, stderr) => {
            if (err) reject(stderr);
            else resolve(stdout);
          });
        });
        return { success: true, message: `${action} complete for: ${packages.join(', ')}` };
      } catch (err: any) {
        return { success: false, message: err };
      }
    },
  });
  
  
  
  
  export const styleTool = createTool({
    id: 'style-config',
    description: 'Modify Tailwind or ShadCN UI configuration',
    inputSchema: z.object({
      framework: z.enum(['tailwind', 'shadcn']),
      configChanges: z.string(),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    execute: async ({ context }) => {
      const configPath =
        context.framework === 'tailwind' ? 'tailwind.config.ts' : 'components.json';
  
      try {
        const existing = await fs.readFile(configPath, 'utf-8');
        const updated = `${existing}\n${context.configChanges}`;
        await fs.writeFile(configPath, updated);
        return { success: true, message: `${context.framework} config updated.` };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    },
  });
  
  
  
  export const codeRefactorTool = createTool({
    id: 'refactor-code',
    description: 'Refactor or clean up a code snippet based on intent',
    inputSchema: z.object({
      code: z.string(),
      goal: z.string(),
    }),
    outputSchema: z.object({
      refactored: z.string(),
    }),
    execute: async ({ context }) => {
      return {
        refactored: `// Refactored for goal: ${context.goal}\n${context.code}`,
      };
    },
  });
  