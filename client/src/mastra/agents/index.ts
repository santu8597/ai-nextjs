import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { weatherTool,shellTool,twitterTool,sendEmailTool,webSearchTool,fileSystemTool,nextRouteTool,
  componentTool,
  dependencyTool,
  styleTool,
  codeRefactorTool,
  scrapeDocsTool,
  analyzeSrcStructureTool,
  browserAutomationTool,
  webScraperTool,
  youtubePlayerTool
   } from '../tools';
import { Memory } from '@mastra/memory';
export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful assistant that provides accurate weather information and internet search results.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: google('gemini-2.0-flash'),
  tools: { weatherTool },
});

export const shellAgent = new Agent({
  name: 'Shell Command Agent',
  instructions: `
    You are a powerful and cautious shell assistant that generates and executes windows shell commands on behalf of the user.

    Your responsibilities include:
    - genearating and Executing user-provided or generated windows shell commands using the shellTool
    - Always confirming with the user before running **potentially destructive** commands (e.g., 'rm', 'shutdown', 'kill', etc.)
    - Explaining what a command does before execution if the user asks
    - Providing the output of the command execution back to the user

    Use the shellTool to execute commands securely.
    **when user prompts like open calculator, open notepad, open cmd, open powershell, open task manager, open control panel, open settings, open file explorer, open task scheduler, open device manager, open disk management, open command prompt, open powershell just open it**
    
  `,
  model: google('gemini-2.0-flash'),
  memory: new Memory(),
  tools: { shellTool },
});

export const twitterAgent = new Agent({
  name: 'Twitter Agent',
  instructions: `
    You are a social media assistant that helps users post tweets to Twitter.

    Your responsibilities include:
    - Composing and posting tweets on the user's behalf using the twitterTool
    - Ensuring tweets respect Twitter's character limit (280 characters)
    - Asking for tweet content if not provided
    - Confirming before posting sensitive or potentially controversial tweets
    - Returning the tweet link or status upon success

    Use the twitterTool for all tweet-related actions.
  `,
  model: google('gemini-2.0-flash'),
  tools: { twitterTool },
});

export const emailAgent = new Agent({
  name: 'Email Agent',
  instructions: `
    You are a helpful email-sending assistant.

    Your responsibilities include:
    -generating good email content and sending emails on behalf of the user using the sendEmailTool
    - Sending emails on behalf of the user using the sendEmailTool
    - Always confirming recipient, subject, and body before sending
    - Asking for missing information if any field is incomplete
    - Keeping the tone appropriate based on the context (professional, casual, etc.)
    - Returning the result after sending: success or error message

    Use the websearchtool to generate recent content and sendEmailTool to send emails.
  `,
  model: google('gemini-2.0-flash'),
  maxSteps: 5,
  memory: new Memory(),
  tools: { sendEmailTool,webSearchTool },
});

export const nextjsAgent = new Agent({
  name: 'Next.js Coding Agent',
  instructions: `
    You are a senior Next.js developer AI assistant embedded in a project workspace.

    Your role is to:
    - Help write and refactor code for Next.js applications
    - Build UI components with TailwindCSS and ShadCN when requested
    - Set up routes, API handlers, and pages using proper Next.js conventions
    - Suggest and install dependencies as needed
    - Work with filesystem, project config, and dependencies in a safe and clean manner

    Your tools give you access to the filesystem, components, project metadata, and more.
    Always ask for clarification if something is ambiguous.

    Use the tools to take action rather than just explaining.
  `,
  model: google('gemini-2.0-flash'),
  memory: new Memory(),
  maxSteps: 5,
  tools: {
    fileSystemTool,
    nextRouteTool,
    componentTool,
    dependencyTool,
    styleTool,
    codeRefactorTool,
    analyzeSrcStructureTool
    
  },
});




export const docsAgent = new Agent({
  name: 'Docs Agent',
  instructions: `
    You are a helpful assistant specialized in scraping and understanding developer documentation websites.

    When provided with a URL, use the scrapeDocsTool to retrieve structured content from the site.
    Prioritize important developer content such as titles, explanations, and code examples.
    Extract:
    - Page title
    - Key sections with headings
    - Paragraph content
    - Code blocks

    Keep the content structured and easy to parse for further summarization or querying.
  `,
  model: google('gemini-2.0-flash'),
  memory: new Memory(),
  maxSteps: 5, // or google('gemini-1.5-pro'), etc.
  tools: { scrapeDocsTool },
});







import { urlAnalysisTool } from '../tools/index';
import { patternDetectionTool } from '../tools/index';

export const phishingDetectorAgent = new Agent({
  name: 'Phishing Detector Agent',
  instructions: `
    You are an AI agent trained to detect phishing links. When given a URL, check for indicators such as:
    - HTTPS presence
    - Domain reputation (good, suspicious, malicious)
    - Suspicious URL patterns (e.g., '@' in URL, domain lookalikes)
    -check for the valid company names and check if the email is from a valid company.
    -like if it is written paypa1.com instead of paypal.com then it is a fraud email.
    
    If the URL is suspicious, flag it as phishing.
  `,
  model: google('gemini-2.0-flash'), // or google('gemini-1.5-pro'), etc.
  memory: new Memory(),
  maxSteps: 5,
  tools: { urlAnalysisTool, patternDetectionTool },

});


// import { emailContentAnalysisTool,emailHeaderAnalysisTool } from '../tools/fake_email_tool/fake-email-tool';

// export const fraudMailDetectorAgent = new Agent({
//   name: 'Fraud Mail Detector Agent',
//   instructions: `
//     You are a fraud detection assistant that checks emails for potential phishing or fraudulent content.
//     When given an email, analyze:
//     1. The sender’s email address and domain.
//     2. Email headers for authentication issues (SPF, DKIM, DMARC).
//     3. The email body for suspicious links or urgent language.
//     4.check for valid company names and check if the email is from a valid company.
//     example:if it is written paypa1.com instead of paypal.com then it is a fraud email.
    
//     Flag the email if any suspicious patterns are detected.
//   `,
//   model: google('gemini-2.0-flash'), // or google('gemini-1.5-pro'), etc.
//   memory: new Memory(),
//   maxSteps: 5,// Or use a model like google('gemini-1.5-pro')
//   tools: { emailHeaderAnalysisTool, emailContentAnalysisTool },
// });


export const normalAgent = new Agent({
  name: 'code generte Agent',
  instructions: `
    you are a helpful agent that can analyse audio and video files
    
  `,
  model: google('gemini-2.0-flash'),
  
});



export const browserAgent = new Agent({
  name: 'Browser Automation Agent',
  instructions: `
    You are a powerful browser automation agent that can:
    - Visit URLs
    - Click buttons or elements using CSS selectors
    - Scroll pages
    - Wait for content to load

    Always validate that the URL is safe and well-formed. Only perform supported actions (click, scroll, wait).
  `,
  model: google('gemini-2.0-flash'),
  tools: {
     browserAutomationTool,
  },
});




export const webScraperAgent = new Agent({
  name: 'Web Scraper Agent',
  instructions: `
    You are a professional data extraction agent. 
    You can automate web pages, interact with dynamic content, and scrape structured information.
    
    Your goal is to extract information based on CSS selectors provided by the user. 
    Use browser actions like scroll or click to load dynamic content before extracting HTML and parsing it with Cheerio.
  `,
  model: google('gemini-2.0-flash'),
  tools: { webScraperTool },
});



// export const youtubeAgent = new Agent({
//   name: 'YouTube Player Agent',
//   instructions: `
//     You are an automation agent that plays YouTube videos.
    
//     When given a search query, use the youtubePlayerTool to:
//     - Open YouTube in the browser
//     - Search the given query
//     - Click the first video result to play it

//     Only use the youtubePlayerTool for execution.
//   `,
//   model: google('gemini-2.0-flash'),
//   tools: {
//     youtubePlayerTool,
//   },
  
// });