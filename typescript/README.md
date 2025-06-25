# Siren Agent Toolkit (TypeScript)

The Siren Agent Toolkit enables popular AI agent frameworks including OpenAI's Agent SDK, LangChain, and Vercel's AI SDK to integrate with Siren's notification platform through function calling. This library provides seamless access to Siren's messaging, template management, user management, workflow automation, and webhook configuration capabilities.

## 🚀 Installation

```bash
npm install @sirenapp/agent-toolkit
```
### Framework-Specific Examples

Please refer to the [examples](./examples) directory for detailed integration guides with your framework of choice:

- [OpenAI Example](./examples/openai/) - Complete OpenAI integration
- [LangChain Example](./examples/langchain/) - Agent with LangChain tools
- [AI SDK Example](./examples/ai-sdk/) - Vercel AI SDK integration

## 📋 Requirements

- A Siren API key (get one from [Siren Dashboard](https://app.trysiren.io/configuration))

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
  };
}
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

## 📖 Documentation

- [Siren Documentation](https://docs.trysiren.io) - Complete Siren platform docs
- [Dashboard](https://app.trysiren.io) - Manage your Siren account

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 🆘 Support

- [GitHub Issues](https://github.com/KeyValueSoftwareSystems/siren-agent-toolkit/issues)
- [Community Discord](https://discord.gg/vcyjngmE)

---

**Tip**: Start with the [examples](./examples/) to see the toolkit in action with your preferred AI framework!