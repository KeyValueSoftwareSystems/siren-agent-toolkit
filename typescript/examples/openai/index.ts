import OpenAI from 'openai';
import { SirenAgentToolkit } from '@trysiren/agent-toolkit/openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
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
      webhooks: {
        create: true,
      },
    },
  },
});

async function main() {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant that can send notifications and manage templates using Siren.',
    },
    {
      role: 'user',
      content: 'Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!" without creating a template',
    },
  ];

  console.log(sirenToolkit.getTools());
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    tools: sirenToolkit.getTools(),
  });

  console.log("responsess", response);
  const message = response.choices[0]?.message;
  console.log("messagess", message);
  if (!message) {
    throw new Error('No message in response');
  }

  console.log("message.tool_calls", message.tool_calls);
  if (message.tool_calls) {
    const toolResults = await Promise.all(
      message.tool_calls.map((toolCall) =>
        sirenToolkit.handleToolCall(toolCall)
      )
    );

    console.log('Tool execution results:', toolResults);
  }

  console.log('Assistant response:', message.content);
}

main().catch(console.error);