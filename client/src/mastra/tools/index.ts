import { shellTool } from './shell-tool';
import { sendEmailTool } from './mail-tool';
import { weatherTool } from './weather-tool';
import { webSearchTool } from './web-tool';
import { twitterTool } from './twitter-tool';
import {fileSystemTool,nextRouteTool,componentTool,dependencyTool,styleTool,codeRefactorTool} from './nextjs-tool';
import {analyzeSrcStructureTool} from './file-detail';
import {scrapeDocsTool} from './scrap-tool';
import {browserAutomationTool} from './browser-automation';
import {webScraperTool} from './web-scrape';
import {youtubePlayTool} from './youtube-tool';
export {
  shellTool,
  sendEmailTool,
  weatherTool,
  webSearchTool,
  twitterTool,
  fileSystemTool,
  nextRouteTool,
  componentTool,
  dependencyTool,
  styleTool,
  codeRefactorTool,
  scrapeDocsTool,
  analyzeSrcStructureTool,
  browserAutomationTool,
  webScraperTool,youtubePlayTool
}


import { z } from 'zod';

import { createTool } from '@mastra/core/tools';
export const urlAnalysisTool = createTool({
  id: 'url-analysis',
  description: 'Analyze a URL to check for potential phishing indicators.',
  inputSchema: z.object({
    url: z.string().describe('URL to analyze'),
  }),
  outputSchema: z.object({
    isHttps: z.boolean(),
    domainReputation: z.string(), // good, suspicious, or malicious
    potentialPhishing: z.boolean(),
  }),
  execute: async ({ context }) => {
    const { url } = context;
    
    // Basic checks
    const isHttps = url.startsWith('https://');
    
    // Dummy domain reputation check (replace with actual external service or database)
    const domain = new URL(url).hostname;
    const domainReputation = domain.includes('phishing') ? 'malicious' : 'good';
    
    // Placeholder logic to identify phishing patterns (e.g., suspicious domain)
    const potentialPhishing = domain.includes('phishing') || domain.includes('secure-login');
    
    return {
      isHttps,
      domainReputation,
      potentialPhishing,
    };
  },
});



export const patternDetectionTool = createTool({
  id: 'pattern-detection',
  description: 'Detect suspicious patterns in the URL that may indicate phishing.',
  inputSchema: z.object({
    url: z.string().describe('URL to detect patterns in'),
  }),
  outputSchema: z.object({
    containsSuspiciousChars: z.boolean(),
    domainSimilarity: z.boolean(),
    phishingDetected: z.boolean(),
  }),
  execute: async ({ context }) => {
    const { url } = context;
    
    // Check for suspicious characters in the URL
    const suspiciousChars = ['@', '%20', '?', '#'];
    const containsSuspiciousChars = suspiciousChars.some((char) => url.includes(char));
    
    // Check for domain similarity (simple example with common phishing tricks)
    const suspiciousDomains = ['paypa1.com', 'g00gle.com', 'facebo0k.com']; // Replace with a larger list or API
    const domainSimilarity = suspiciousDomains.some((domain) => url.includes(domain));
    
    // If suspicious characters or domain similarities found, flag it
    const phishingDetected = containsSuspiciousChars || domainSimilarity;
    
    return {
      containsSuspiciousChars,
      domainSimilarity,
      phishingDetected,
    };
  },
});


