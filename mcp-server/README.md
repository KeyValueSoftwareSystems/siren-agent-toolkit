# Siren Model Context Protocol Server

[![npm version](https://img.shields.io/npm/v/@trysiren/mcp.svg)](https://www.npmjs.com/package/@trysiren/mcp)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sirenapp/agent-toolkit/blob/main/LICENSE)

The Siren [Model Context Protocol](https://modelcontextprotocol.com/) server enables seamless integration with Siren APIs through function calling. This protocol provides a comprehensive suite of tools for interacting with Siren's messaging, templates, users, workflows, and webhooks systems.

## 🚀 Quick Start

## 📋 Requirements

- A Siren API key (get one from [Siren Dashboard](https://app.trysiren.io/configuration))

### Installation

```bash
# Install globally
npm install -g @trysiren/mcp

# Or use with npx without installation
npx -y @trysiren/mcp
```

### Basic Usage

To run the Siren MCP server:

```bash
# To set up all available tools
npx -y @trysiren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY

# To set up specific tools
npx -y @trysiren/mcp --tools=messaging.send,templates.list,workflows.trigger --api-key=YOUR_SIREN_API_KEY
```

> **Important**: Replace `YOUR_SIREN_API_KEY` with your actual Siren API key. You can also set the `SIREN_API_KEY` environment variable instead.

## 🔌 Client Setup

This section covers how to configure various AI assistants and development environments to work with the Siren MCP server.

### Claude Desktop

Add the following to your `claude_desktop_config.json`. See [Claude MCP documentation](https://modelcontextprotocol.io/quickstart/user) for more details.

```json
{
  "mcpServers": {
    "siren": {
      "command": "npx",
      "args": [
        "-y",
        "@trysiren/mcp",
        "--tools=all",
        "--api-key=YOUR_SIREN_API_KEY"
      ]
    }
  }
}
```

Or if you're using Docker:

```json
{
  "mcpServers": {
    "siren": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "trysiren/mcp",
        "--tools=all",
        "--api-key=YOUR_SIREN_API_KEY"
      ]
    }
  }
}
```

### VS Code

VS Code supports both workspace-specific and user-level MCP configurations.

#### Workspace Configuration

Add a `.vscode/mcp.json` file in your workspace:

```json
{
  "mcp": {
    "servers": {
      "siren": {
        "command": "npx",
        "args": [
          "-y",
          "@trysiren/mcp",
          "--tools=messaging.send,templates.list,workflows.trigger",
          "--api-key=YOUR_SIREN_API_KEY"
        ]
      }
    }
  }
}
```

#### User Settings

Add to your VS Code user settings:

```json
{
  "mcp.servers": {
    "siren": {
      "command": "npx",
      "args": [
        "-y",
        "@trysiren/mcp",
        "--tools=all",
        "--api-key=YOUR_SIREN_API_KEY"
      ]
    }
  }
}
```

### Cursor

Cursor uses the same configuration format as VS Code. Add to your settings:

```json
{
  "mcp.servers": {
    "siren": {
      "command": "npx",
      "args": [
        "-y",
        "@trysiren/mcp",
        "--tools=all",
        "--api-key=YOUR_SIREN_API_KEY"
      ]
    }
  }
}
```

### Amazon Q CLI

Configure Amazon Q CLI to use the Siren MCP server:

```bash
q configure mcp add-server siren \
  --command "npx" \
  --args "-y,@trysiren/mcp,--tools=all,--api-key=YOUR_SIREN_API_KEY"
```

### Other MCP Clients

The Siren MCP server is compatible with any client that supports the Model Context Protocol standard. Here are configuration examples for popular MCP-compatible platforms:

#### 5ire Desktop
Configure in 5ire's MCP settings:
```json
{
  "servers": {
    "siren": {
      "command": "npx",
      "args": ["-y", "@trysiren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
    }
  }
}
```

#### FLUJO
Add to FLUJO's workflow configuration:
```json
{
  "mcp_servers": {
    "siren": {
      "command": "npx -y @trysiren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY"
    }
  }
}
```

#### Zed Editor
Configure in Zed's assistant settings:
```json
{
  "assistant": {
    "mcp_servers": {
      "siren": {
        "command": "npx",
        "args": ["-y", "@trysiren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
      }
    }
  }
}
```

#### Replit
Add to your Replit project's MCP configuration:
```json
{
  "mcp": {
    "servers": {
      "siren": "npx -y @trysiren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY"
    }
  }
}
```

#### Codeium
Configure in Codeium's extensions:
```json
{
  "mcp.servers.siren": {
    "command": "npx",
    "args": ["-y", "@trysiren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
  }
}
```

## 🛠️ Available Tools

The Siren MCP server provides the following tools for integration:

### Messaging Tools

| Tool | Description |
|------|-------------|
| `messaging.send` | Send a message to a recipient via a chosen channel |
| `messaging.getStatus` | Get the status of a sent message |
| `messaging.getReplies` | Get replies to a sent message |

### Template Management Tools

| Tool | Description |
|------|-------------|
| `templates.list` | List available message templates |
| `templates.create` | Create a new message template |
| `templates.update` | Update an existing message template |
| `templates.delete` | Delete a message template |
| `templates.publish` | Publish a template for use |

### User Management Tools

| Tool | Description |
|------|-------------|
| `users.add` | Add a new user to the system |
| `users.update` | Update an existing user |
| `users.delete` | Delete a user |

### Workflow Tools

| Tool | Description |
|------|-------------|
| `workflows.trigger` | Trigger a workflow execution |
| `workflows.triggerBulk` | Trigger multiple workflow executions |
| `workflows.schedule` | Schedule a workflow for future execution |

### Webhook Configuration Tools

| Tool | Description |
|------|-------------|
| `webhooks.configureNotification` | Configure notification webhooks |
| `webhooks.configureInbound` | Configure inbound webhooks |

## 📦 Tool Categories

For convenience, you can use predefined tool categories in your configuration:

| Category | Included Tools | Usage Example |
|----------|----------------|---------------|
| **communication** | `messaging.send`, `messaging.getStatus`, `messaging.getReplies` | `--tools=communication` |
| **content** | `templates.list`, `templates.create`, `templates.update`, `templates.delete`, `templates.publish` | `--tools=content` |
| **identity** | `users.add`, `users.update`, `users.delete` | `--tools=identity` |
| **automation** | `workflows.trigger`, `workflows.triggerBulk`, `workflows.schedule` | `--tools=automation` |
| **integration** | `webhooks.configureNotification`, `webhooks.configureInbound` | `--tools=integration` |

You can combine categories with specific tools:
```bash
npx @trysiren/mcp --tools=communication,templates.create,automation --api-key=YOUR_API_KEY
```

## ⚙️ Configuration Options

### Command Line Arguments

| Argument | Description | Default | Example |
|----------|-------------|---------|----------|
| `--tools` | Comma-separated list of tools to enable | none | `--tools=messaging.send,templates.list` |
| `--api-key` | Your Siren API key | none | `--api-key=sk_siren_...` |
| `--workspace` | Siren workspace ID | Default workspace | `--workspace=ws_abc123` |
| `--port` | Port for HTTP server mode | 3000 | `--port=8080` |
| `--debug` | Enable debug logging | false | `--debug` |

### API Key Format

Siren supports multiple API key formats:
| Format | Description | Use Case |
|--------|-------------|----------|
| `sk_siren_...` | Standard Siren API key | General purpose |
| `sk_test_...` | Test environment key | Development and testing |
| `sk_live_...` | Production environment key | Production systems |

### Workspace Configuration

If you're working with multiple Siren workspaces, specify the workspace ID:

```bash
npx @trysiren/mcp --tools=all --api-key=YOUR_API_KEY --workspace=ws_your_workspace_id
```

### Environment Variables

You can set environment variables instead of passing API keys as arguments:

```bash
# API key
export SIREN_API_KEY=sk_siren_your_api_key

# Workspace ID (optional)
export SIREN_WORKSPACE=ws_your_workspace_id

# Run with environment variables
npx @trysiren/mcp --tools=all
```

## 🔍 Debugging

### Debug Mode

Enable verbose logging with the `--debug` flag:

```bash
npx @trysiren/mcp --tools=all --api-key=YOUR_API_KEY --debug
```

### Using MCP Inspector

The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) provides a visual interface for debugging your MCP server.

1. First, build the server:

```bash
npm run build
```

2. Run with the MCP Inspector:

```bash
# Start MCP Inspector and server with all tools
npx @modelcontextprotocol/inspector node dist/index.js --tools=all --api-key=YOUR_SIREN_API_KEY
```

3. Open the inspector in your browser at `http://localhost:6274`

### Docker Debugging

For Docker-based debugging:

1. Build the Docker image:

```bash
docker build -t trysiren/mcp .
```

2. Run with MCP Inspector:

```bash
docker run -p 3000:3000 -p 5173:5173 -v /var/run/docker.sock:/var/run/docker.sock \
  mcp/inspector docker run --rm -i trysiren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY
```

### Health Check

Verify your configuration with a simple health check:

```bash
npx @trysiren/mcp --tools=messaging.send --api-key=YOUR_SIREN_API_KEY
```

If the server starts successfully, you'll see:
```
✅ Siren MCP Server running on stdio
```

You can also check the version:
```bash
npx @trysiren/mcp --version
```

## ❓ Troubleshooting

### Common Issues

| Issue | Possible Causes | Solutions |
|-------|----------------|------------|
| **Invalid API Key** | • Incorrect format<br>• Expired key<br>• Key not set properly | • Ensure key starts with `sk_siren_`, `sk_test_`, or `sk_live_`<br>• Check environment variables<br>• Generate a new key if needed |
| **Tool Not Found** | • Typo in tool name<br>• Tool not enabled<br>• Outdated package | • Verify tool name (case-sensitive)<br>• Add tool to `--tools` list<br>• Update to latest version |
| **Connection Issues** | • Network problems<br>• Firewall blocking<br>• API endpoint down | • Check internet connection<br>• Configure firewall exceptions<br>• Verify API status at [status.trysiren.io](https://status.trysiren.io) |
| **Permission Denied** | • Insufficient permissions<br>• Workspace access issues | • Check API key permissions<br>• Verify workspace access<br>• Contact Siren support |
| **Rate Limiting** | • Too many requests<br>• Quota exceeded | • Implement request throttling<br>• Upgrade your plan if needed |

### Logs and Diagnostics

Enable detailed logs for troubleshooting:

```bash
# Enable debug mode
npx @trysiren/mcp --tools=all --api-key=YOUR_API_KEY --debug > mcp_debug.log
```

### Getting Help

For additional support:

- 📚 [Siren Documentation](https://docs.trysiren.io/)
- 🔄 [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- 🐛 [Open an issue](https://github.com/sirenapp/agent-toolkit/issues/new) on GitHub
- 💬 [Join the Siren Community](https://community.trysiren.io/) for discussions
- 📧 Contact support at support@trysiren.io

## 📋 Examples

### Basic Messaging

```bash
# Configure for basic messaging
npx @trysiren/mcp --tools=messaging.send,messaging.getStatus --api-key=YOUR_API_KEY
```

### Template Management

```bash
# Configure for template operations
npx @trysiren/mcp --tools=templates.list,templates.create,templates.update --api-key=YOUR_API_KEY
```

### Workflow Automation

```bash
# Configure for workflow automation
npx @trysiren/mcp --tools=workflows.trigger,workflows.schedule --api-key=YOUR_API_KEY
```

### Full Access

```bash
# Configure all available tools
npx @trysiren/mcp --tools=all --api-key=YOUR_API_KEY
```