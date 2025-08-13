# Siren Agent Toolkit (TypeScript)

[![npm version](https://img.shields.io/npm/v/@trysiren/agent-toolkit.svg)](https://www.npmjs.com/package/@trysiren/agent-toolkit)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KeyValueSoftwareSystems/siren-agent-toolkit/blob/main/LICENSE)

The Siren Agent Toolkit enables AI agents to send notifications and manage communications through the Siren platform. It provides seamless integration with popular AI frameworks including:

- **OpenAI's Agent SDK**
- **LangChain**
- **Vercel's AI SDK**
- **Other function-calling compatible frameworks**

## ✨ Features

- **Multi-channel messaging** - Send notifications via email, SMS, WhatsApp, Slack, and more
- **Template management** - Create and manage reusable message templates
- **User management** - Maintain user profiles and contact information
- **Workflow automation** - Trigger and schedule notification workflows
- **Webhook configuration** - Set up bidirectional communication

## 🚀 Installation

```bash
# Using npm
npm install @trysiren/agent-toolkit

# Using yarn
yarn add @trysiren/agent-toolkit

```

## 🧩 Framework Integration

The toolkit is designed to work with any AI framework that supports function calling:

### Framework-Specific Examples

Refer to our [examples directory](./examples) for detailed integration guides:

| Framework | Example | Description |
|----------|---------|-------------|
| **OpenAI** | [View Example](./examples/openai/) | Complete OpenAI Assistant integration |
| **LangChain** | [View Example](./examples/langchain/) | Agent with LangChain tools |
| **Vercel AI SDK** | [View Example](./examples/ai-sdk/) | Next.js and Vercel AI SDK integration |
| **Mastra** | [View Example](./examples/mastra/) | Mastra integration |

## 📋 Requirements

- **Node.js** v16 or higher
- **Siren API key** (get one from [Siren Dashboard](https://app.trysiren.io/configuration))
- Compatible AI framework with function calling support

## ⚙️ Configuration

The toolkit uses a permission-based configuration system to control which Siren tools are available to your AI agents.

### Basic Setup

```typescript
import { SirenToolkit } from '@trysiren/agent-toolkit';

// Initialize with your API key
const toolkit = new SirenToolkit({
  apiKey: 'YOUR_SIREN_API_KEY',
  // Optional configuration
  actions: {
    messaging: { create: true, read: true },
    templates: { read: true }
  }
});

// Get tools for your AI framework
const tools = toolkit.getTools();
```

### Configuration Options

The toolkit uses a TypeScript interface for strongly-typed configuration:

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
    env?: 'dev' | 'prod';  // Siren environment
  };
}
```

## 🛠️ Available Tools

The Siren Agent Toolkit provides the following function-calling tools for AI agents:

### Messaging Tools

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| **`send_message`** | Send messages via email, SMS, Slack, etc. | "Send a welcome email to new users" |
| **`send_awesome_template`** | Send messages using awesome templates | "Send the monthly newsletter template" |
| **`get_message_status`** | Check delivery status of sent messages | "Check if the password reset email was delivered" |
| **`get_message_replies`** | Retrieve replies to sent messages | "Get customer responses to our survey" |

### Template Management

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| **`list_templates`** | Get all notification templates | "Show me all available email templates" |
| **`create_template`** | Create new templates | "Create a new order confirmation template" |
| **`update_template`** | Modify existing templates | "Update the welcome email with our new logo" |
| **`delete_template`** | Remove templates | "Delete the outdated newsletter template" |
| **`publish_template`** | Make template drafts live | "Publish the new promotional template" |

### User Management

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| **`add_user`** | Create or update user profiles | "Add a new customer to our system" |
| **`update_user`** | Modify user information | "Update the user's phone number" |
| **`delete_user`** | Remove users | "Remove the inactive user account" |

### Workflow Automation

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| **`trigger_workflow`** | Execute workflows immediately | "Send the onboarding sequence now" |
| **`trigger_workflow_bulk`** | Execute workflows for multiple recipients | "Send renewal notices to all expiring accounts" |
| **`schedule_workflow`** | Schedule workflows for future execution | "Schedule a follow-up message for next week" |

### Webhook Configuration

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| **`configure_notification_webhooks`** | Set up status update webhooks | "Send delivery receipts to our analytics API" |
| **`configure_inbound_webhooks`** | Configure inbound message webhooks | "Forward incoming SMS replies to our support system" |

## 📖 Documentation

- [Siren Documentation](https://docs.trysiren.io) - Complete Siren platform docs
- [Dashboard](https://app.trysiren.io) - Manage your Siren account

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](../CONTRIBUTING.md) for details on how to submit pull requests, report issues, or suggest improvements.

## 🆘 Support

- [GitHub Issues](https://github.com/KeyValueSoftwareSystems/siren-agent-toolkit/issues) - Report bugs or request features
- [Community Discord](https://discord.gg/vcyjngmE) - Join our community for discussions
- Email Support: support@trysiren.io

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Tip**: Start with the [examples](./examples/) to see the toolkit in action with your preferred AI framework!