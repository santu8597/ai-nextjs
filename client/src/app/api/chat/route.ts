import { mastra } from '@/mastra'

export async function POST(req: Request) {
  const { messages,ai_agent } = await req.json()
  const agent = mastra.getAgent(ai_agent)
  // const agents = mastra.getAgents()
  // console.log("agents",agents)
 
  const result = await agent.stream(messages)
 
  return result.toDataStreamResponse()
}