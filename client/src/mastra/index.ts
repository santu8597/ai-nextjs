
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,normalAgent,browserAgent,webScraperAgent,youtubeAgent } from './agents';
import {MusicMoodAgent} from "@/agent/MusicAgent"
// import {recommendationWorkflow} from './workflows/app';
export const mastra = new Mastra({
  workflows: { weatherWorkflow},
  agents: { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,normalAgent,browserAgent,webScraperAgent,youtubeAgent,MusicMoodAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
