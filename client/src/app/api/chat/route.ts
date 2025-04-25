import { mastra } from '@/mastra'

 
export async function POST(req: Request) {
  const { messages } = await req.json()
  const agent = mastra.getAgent('imageAgent')
  
  const result = await agent.stream(messages)
 
  return result.toDataStreamResponse()
}