import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { weatherTool,shellTool } from '@/mastra/tools';
import {imageGenTool} from '@/mastra/tools/imagen-tool';
import {fileSystemTool,componentTool} from '@/mastra/tools/nextjs-tool';
import {analyzeSrcStructureTool} from '@/mastra/tools/file-detail';
import {sendEmailTool} from '@/mastra/tools/mail-tool';
import {webSearchTool} from '@/mastra/tools/web-tool';
import {musicMoodTool} from '@/mastra/tools/MusicAgent/MusicAgent';
interface Tool {
    name: keyof typeof toolRegistry;
    tool: string;
  }
 
const toolRegistry = {
    weatherTool,
    shellTool,
    imageGenTool,
    fileSystemTool,
    analyzeSrcStructureTool,
    sendEmailTool,
    webSearchTool,
    musicMoodTool
  };
  
  export async function POST(req: Request) {
    const { messages, array_tools, prompt } = await req.json();
  
    const tools = Object.fromEntries(
      array_tools.map(({ name }: Tool) => [name, toolRegistry[name]])
    );
  
    const agent = new Agent({
      name: "WeatherAgent",
      instructions: prompt,
      model: google("gemini-2.0-flash"),
      tools: tools,
     
    });
  
    const result = await agent.stream(messages);
    return result.toDataStreamResponse();
  }
