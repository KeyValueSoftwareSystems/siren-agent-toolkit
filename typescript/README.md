# Siren Agent Toolkit (TypeScript)

The Siren Agent Toolkit enables popular AI agent frameworks including OpenAI's Agent SDK, LangChain, and Vercel's AI SDK to integrate with Siren's notification platform through function calling. This library provides seamless access to Siren's messaging, template management, user management, workflow automation, and webhook configuration capabilities.

## 🚀 Installation

```bash
npm install @sirenapp/agent-toolkit
```

### Framework-Specific Installations

Depending on which AI framework you're using, you'll also need to install the corresponding peer dependencies:

**For OpenAI:**
```bash
npm install @sirenapp/agent-toolkit openai
```

**For LangChain:**
```bash
npm install @sirenapp/agent-toolkit @langchain/core langchain
```

**For AI SDK (Vercel):**
```bash
npm install @sirenapp/agent-toolkit ai
```

## 📋 Requirements

- Node.js 18+
- TypeScript 5.0+ (for TypeScript projects)
- A Siren API key (get one from [Siren Dashboard](https://dashboard.trysiren.io))

## 🎯 Quick Start

### OpenAI Integration

```typescript
import OpenAI from 'openai';
import { SirenAgentToolkit } from '@sirenapp/agent-toolkit/openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const sirenToolkit = new SirenAgentToolkit({
  apiKey: process.env.SIREN_API_KEY!,
  configuration: {
    actions: {
      messaging: { create: true, read: true },
      templates: { create: true, read: true, update: true },
      users: { create: true, update: true },
    },
  },
});

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant that can send notifications using Siren.',
    },
    {
      role: 'user',
      content: 'Send a welcome email to user@example.com',
    },
  ],
  tools: sirenToolkit.getTools(),
});

// Handle tool calls
if (response.choices[0]?.message.tool_calls) {
  for (const toolCall of response.choices[0].message.tool_calls) {
    const result = await sirenToolkit.handleToolCall(toolCall);
    console.log('Tool result:', result);
  }
}
```

### LangChain Integration

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createToolCallingAgent } from 'langchain/agents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { SirenAgentToolkit } from '@sirenapp/agent-toolkit/langchain';

const llm = new ChatOpenAI({ model: 'gpt-4' });

const sirenToolkit = new SirenAgentToolkit({
  apiKey: process.env.SIREN_API_KEY!,
  configuration: {
    actions: {
      messaging: { create: true, read: true },
      workflows: { trigger: true },
    },
  },
});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful assistant with access to Siren notifications.'],
  ['human', '{input}'],
  ['placeholder', '{agent_scratchpad}'],
]);

const agent = await createToolCallingAgent({
  llm,
  tools: sirenToolkit.getTools(),
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools: sirenToolkit.getTools(),
});

const result = await agentExecutor.invoke({
  input: 'Send a notification to all premium users about the new feature',
});
```

### AI SDK (Vercel) Integration

```typescript
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { SirenAgentToolkit } from '@sirenapp/agent-toolkit/ai-sdk';

const sirenToolkit = new SirenAgentToolkit({
  apiKey: process.env.SIREN_API_KEY!,
  configuration: {
    actions: {
      messaging: { create: true },
      templates: { read: true },
    },
  },
});

const result = await generateText({
  model: openai('gpt-4'),
  messages: [
    {
      role: 'user',
      content: 'Create a welcome template and send it to new@user.com',
    },
  ],
  tools: sirenToolkit.getTools(),
  maxToolRoundtrips: 5,
});

console.log(result.text);
console.log('Tool results:', result.toolResults);
```

## ⚙️ Configuration

The toolkit uses a permission-based configuration system to control which Siren tools are available to your AI agents.

### Configuration Options

```typescript
interface Configuration {
  actions?: {
    messaging?: {
      create?: boolean;    // Send messages
      read?: boolean;      // Get message status and replies
    };
    templates?: {
      create?: boolean;    // Create templates
      read?: boolean;      // List templates
      update?: boolean;    // Update templates
      delete?: boolean;    // Delete templates
    };
    users?: {
      create?: boolean;    // Add users
      read?: boolean;      // Get/list users
      update?: boolean;    // Update users
      delete?: boolean;    // Delete users
    };
    workflows?: {
      trigger?: boolean;   // Trigger workflows
      schedule?: boolean;  // Schedule workflows
    };
    webhooks?: {
      create?: boolean;    // Configure webhooks
    };
  };
  context?: {
    env?: 'dev' | 'prod';           // Siren environment
    apiKey?: string;                // Alternative way to provide API key
    baseUrl?: string;               // Custom API base URL
    timeout?: number;               // Request timeout in milliseconds
  };
}
```

### Example: Production Configuration

```typescript
const sirenToolkit = new SirenAgentToolkit({
  apiKey: process.env.SIREN_API_KEY!,
  configuration: {
    actions: {
      messaging: { create: true, read: true },
      templates: { read: true },        // Read-only templates in production
      users: { create: true, update: true },
      workflows: { trigger: true },
      // webhooks: { create: false },   // Disabled in production
    },
    context: {
      env: 'prod',
      timeout: 30000, // 30 second timeout
    },
  },
});
```

## 🛠️ Available Tools

The Siren Agent Toolkit provides the following tools for AI agents:

### Messaging Tools
- **`send_message`** - Send messages via email, SMS, Slack, etc.
- **`get_message_status`** - Check delivery status of sent messages
- **`get_message_replies`** - Retrieve replies to sent messages

### Template Management
- **`list_templates`** - Get all notification templates
- **`create_template`** - Create new templates
- **`update_template`** - Modify existing templates
- **`delete_template`** - Remove templates
- **`publish_template`** - Make template drafts live

### User Management
- **`add_user`** - Create or update user profiles
- **`update_user`** - Modify user information
- **`delete_user`** - Remove users
- **`get_user`** - Retrieve user details
- **`list_users`** - Get all users with pagination

### Workflow Automation
- **`trigger_workflow`** - Execute workflows immediately
- **`trigger_workflow_bulk`** - Execute workflows for multiple recipients
- **`schedule_workflow`** - Schedule workflows for future execution

### Webhook Configuration
- **`configure_notification_webhooks`** - Set up status update webhooks
- **`configure_inbound_webhooks`** - Configure inbound message webhooks

## 📚 Examples

Comprehensive examples for each framework are available in the [examples directory](./examples/):

- [OpenAI Example](./examples/openai/) - Complete OpenAI integration
- [LangChain Example](./examples/langchain/) - Agent with LangChain tools
- [AI SDK Example](./examples/ai-sdk/) - Vercel AI SDK integration

## 🔧 API Reference

### Core Types

```typescript
// Message sending
interface SendMessageParams {
  recipient_type: 'user_id' | 'direct';
  recipient_value: string;
  channel: string;
  body?: string;
  template_name?: string;
  template_variables?: Record<string, any>;
}

// Template creation
interface CreateTemplateParams {
  name: string;
  description?: string;
  tags?: string[];
}

// User management
interface AddUserParams {
  unique_id: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  properties?: Record<string, any>;
}

// Workflow triggering
interface TriggerWorkflowParams {
  workflow_name: string;
  data: Record<string, any>;
  notification_payloads?: Record<string, any>[];
}
```

### Framework-Specific Classes

#### OpenAI
```typescript
class SirenAgentToolkit {
  constructor(config: { apiKey: string; configuration?: Configuration });
  getTools(): ChatCompletionTool[];
  handleToolCall(toolCall: ChatCompletionMessageToolCall): Promise<ChatCompletionToolMessageParam>;
}
```

#### LangChain
```typescript
class SirenAgentToolkit {
  constructor(config: { apiKey: string; configuration?: Configuration });
  getTools(): SirenTool[];
}
```

#### AI SDK
```typescript
class SirenAgentToolkit {
  constructor(config: { apiKey: string; configuration?: Configuration });
  getTools(): Record<string, CoreTool>;
}
```

## 🔐 Environment Variables

Set up the following environment variables:

```bash
# Required
SIREN_API_KEY=your_siren_api_key_here

# Optional
SIREN_ENV=dev  # or 'prod' (default: 'prod')

# Framework-specific (choose one)
OPENAI_API_KEY=your_openai_api_key_here
# or other LLM provider keys for LangChain/AI SDK
```

## 📖 Documentation

- [Siren Documentation](https://docs.trysiren.io) - Complete Siren platform docs
- [API Reference](https://docs.trysiren.io/api) - Siren API documentation
- [Dashboard](https://dashboard.trysiren.io) - Manage your Siren account

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 📄 License

MIT © [Siren](https://trysiren.io)

## 🆘 Support

- [GitHub Issues](https://github.com/sirenapp/agent-toolkit/issues)
- [Siren Support](https://docs.trysiren.io/support)
- [Community Discord](https://discord.gg/siren)

---

**Tip**: Start with the [examples](./examples/) to see the toolkit in action with your preferred AI framework!