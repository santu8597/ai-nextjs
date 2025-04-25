
# Ai-Next Overview

This Project is about building ai-agents with Mastra and Nextjs framework

## Getting Started

To run this project locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/santu8597/ai-nextjs.git
    ```

2.  Navigate to the client directory:

    ```bash
    cd client
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```

## Agents

Agents are responsible for performing specific tasks or interacting with external services.

### Available Agents:

*   **MusicAgent**: This agent is designed for music-related tasks. Details about its specific functionalities can be found in `src/mastra/agents/MusicAgent.ts`.

## Tools

Tools provide reusable functionalities that agents can utilize.

### Available Tools:

*   **browser-automation**: Tool for automating browser interactions. (`src/mastra/tools/browser-automation.ts`)
*   **file-detail**: Tool for retrieving details about files. (`src/mastra/tools/file-detail.ts`)
*   **mail-tool**: Tool for sending emails. (`src/mastra/tools/mail-tool.ts`)
*   **nextjs-tool**: Tool for interacting with the Next.js application. (`src/mastra/tools/nextjs-tool.ts`)
*   **scrap-tool**: Tool for web scraping. (`src/mastra/tools/scrap-tool.ts`)
*   **shell-tool**: Tool for executing shell commands. (`src/mastra/tools/shell-tool.ts`)
*   **twitter-tool**: Tool for interacting with Twitter. (`src/mastra/tools/twitter-tool.ts`)
*   **weather-tool**: Tool for fetching weather information. (`src/mastra/tools/weather-tool.ts`)
*   **web-scrape**: Tool for scraping data from websites. (`src/mastra/tools/web-scrape.ts`)
*   **web-tool**: General-purpose tool for web interactions. (`src/mastra/tools/web-tool.ts`)
*   **youtube-tool**: Tool for interacting with YouTube. (`src/mastra/tools/youtube-tool.ts`)
*   **image-generation-tool**: Tool for interacting with YouTube. (`src/mastra/tools/imagen-tool.ts`)

## Workflows

Workflows define the sequences of steps or actions that agents and tools can perform to achieve a specific goal. (See `src/mastra/workflows/index.ts`)

 

## Agents

Agents are responsible for performing specific tasks or interacting with external services.

### Available Agents:

*   **MusicAgent**: This agent is designed for music-related tasks. Details about its specific functionalities can be found in `src/mastra/agents/MusicAgent.ts`.
*   **Weather Agent**: A helpful assistant that provides accurate weather information and internet search results. It uses the `weatherTool` to fetch current weather data.
*   **Shell Command Agent**: A powerful and cautious shell assistant that generates and executes windows shell commands on behalf of the user. It uses the `shellTool` to execute commands securely.
*   **Twitter Agent**: A social media assistant that helps users post tweets to Twitter. It uses the `twitterTool` for all tweet-related actions.
*   **Email Agent**: A helpful email-sending assistant. It uses the `sendEmailTool` to send emails and `webSearchTool` to generate recent content.
*   **Next.js Coding Agent**: A senior Next.js developer AI assistant embedded in a project workspace. It uses tools like `fileSystemTool`, `nextRouteTool`, `componentTool`, `dependencyTool`, `styleTool`, and `codeRefactorTool`.
*   **Docs Agent**: A helpful assistant specialized in scraping and understanding developer documentation websites. It uses the `scrapeDocsTool` to retrieve structured content from the site.
*   **Phishing Detector Agent**: An AI agent trained to detect phishing links. It uses `urlAnalysisTool` and `patternDetectionTool` to check for indicators such as HTTPS presence, domain reputation, and suspicious URL patterns.
*   **Browser Automation Agent**: A powerful browser automation agent that can visit URLs, click buttons, scroll pages, and wait for content to load. It uses the `browserAutomationTool`.
*   **Web Scraper Agent**: A professional data extraction agent that can automate web pages, interact with dynamic content, and scrape structured information. It uses the `webScraperTool`.
*   **Image Generation Agent**: An assistant that generates good images with gemini image model. It uses the `ImagenTool`.
*   **YouTube Player Agent**: An assistant that opens and plays YouTube videos using a browser automation server. It uses the `youtubePlayTool`.

