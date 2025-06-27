import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createStructuredChatAgent } from 'langchain/agents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {pull} from 'langchain/hub';
import { SirenAgentToolkit } from '@trysiren/agent-toolkit/langchain';
import 'dotenv/config';

// ChatOpenAI apiKey defaults to process.env['OPENAI_API_KEY']
const llm = new ChatOpenAI({
  modelName: 'gpt-4o',
});

const sirenToolkit = new SirenAgentToolkit({
  apiKey: process.env.SIREN_API_KEY!,
  configuration: {
    actions: {
      messaging: {
        create: true,
        read: true,
      },
      templates: {
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      users: {
        create: true,
        update: true,
        delete: true,
        read: true,
      },
      workflows: {
        trigger: true,
        schedule: true,
      },
    },
  },
});

async function main() {
  const tools = sirenToolkit.getTools();
  
  const prompt = await pull<ChatPromptTemplate>(
    'hwchase17/structured-chat-agent'
  );

  const agent = await createStructuredChatAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  const result = await agentExecutor.invoke({
    input: 'Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!"',
  });

  console.log('Result:', result.output);
}

main().catch(console.error);