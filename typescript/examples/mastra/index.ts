import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent'
import { SirenAgentToolkit } from '@trysiren/agent-toolkit/mastra';
import 'dotenv/config';

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

  const sirenAgent = new Agent({
    name: 'Siren Agent',
    instructions: 'You are a helpful assistant that can send notifications and manage templates using Siren.',
    model: openai('gpt-4o'),
    tools: {
      ...sirenToolkit.getTools(),
    }
  })

  const result = await sirenAgent.generate([
    {
      role: 'system',
      content: 'You are a helpful assistant that can send notifications and manage templates using Siren',
    },
    {
      role: 'user',
      content: 'Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!". ',
    },
  ], { maxRetries: 0 });

  console.log('Result:', result.text);
  console.log('Tool calls:', result.toolCalls);
  console.log('Tool results:', result.toolResults);
}

main().catch(console.error);