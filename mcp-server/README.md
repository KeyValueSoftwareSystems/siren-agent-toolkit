# Siren Model Context Protocol Server

The Siren [Model Context Protocol](https://modelcontextprotocol.com/) server allows you to integrate with Siren APIs through function calling. This protocol supports various tools to interact with Siren's messaging, templates, users, workflows, and webhooks.

## Quick Start

To run the Siren MCP server using npx, use the following command:

```bash
# To set up all available tools
npx -y @sirenapp/mcp --tools=all --api-key=YOUR_SIREN_API_KEY

# To set up specific tools
npx -y @sirenapp/mcp --tools=messaging.send,templates.list,workflows.trigger --api-key=YOUR_SIREN_API_KEY
```

Make sure to replace `YOUR_SIREN_API_KEY` with your actual Siren API key. Alternatively, you could set the `SIREN_API_KEY` in your environment variables.

## Client Setup

### Claude Desktop

Add the following to your `claude_desktop_config.json`. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.

```json
{
  "mcpServers": {
    "siren": {
      "command": "npx",
      "args": [
        "-y",
        "@siren/mcp",
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
        "siren/mcp",
        "--tools=all",
        "--api-key=YOUR_SIREN_API_KEY"
      ]
    }
  }
}
```

### VS Code

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
          "@siren/mcp",
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
        "@siren/mcp",
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
        "@siren/mcp",
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
  --args "-y,@siren/mcp,--tools=all,--api-key=YOUR_SIREN_API_KEY"
```

### Other MCP Clients

The Siren MCP server is compatible with any MCP client. Here are some popular ones:

#### 5ire Desktop
Configure in 5ire's MCP settings:
```json
{
  "servers": {
    "siren": {
      "command": "npx",
      "args": ["-y", "@siren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
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
      "command": "npx -y @siren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY"
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
        "args": ["-y", "@siren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
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
      "siren": "npx -y @siren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY"
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
    "args": ["-y", "@siren/mcp", "--tools=all", "--api-key=YOUR_SIREN_API_KEY"]
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `messaging.send` | Send a message to a recipient via a chosen channel |
| `messaging.getStatus` | Get the status of a sent message |
| `messaging.getReplies` | Get replies to a sent message |
| `templates.list` | List available message templates |
| `templates.create` | Create a new message template |
| `templates.update` | Update an existing message template |
| `templates.delete` | Delete a message template |
| `templates.publish` | Publish a template for use |
| `users.add` | Add a new user to the system |
| `users.update` | Update an existing user |
| `users.delete` | Delete a user |
| `workflows.trigger` | Trigger a workflow execution |
| `workflows.triggerBulk` | Trigger multiple workflow executions |
| `workflows.schedule` | Schedule a workflow for future execution |
| `webhooks.configureNotification` | Configure notification webhooks |
| `webhooks.configureInbound` | Configure inbound webhooks |

## Tool Categories

You can use predefined tool categories for easier configuration:

- **Communication**: `messaging.send`, `messaging.getStatus`, `messaging.getReplies`
- **Content**: `templates.list`, `templates.create`, `templates.update`, `templates.delete`, `templates.publish`
- **Identity**: `users.add`, `users.update`, `users.delete`
- **Automation**: `workflows.trigger`, `workflows.triggerBulk`, `workflows.schedule`
- **Integration**: `webhooks.configureNotification`, `webhooks.configureInbound`

## Configuration Options

### API Key Format

Siren supports multiple API key formats:
- `sk_siren_...` - Standard Siren API key
- `sk_test_...` - Test environment key
- `sk_live_...` - Production environment key

### Workspace Configuration

If you're working with multiple Siren workspaces, specify the workspace ID:

```bash
npx @siren/mcp --tools=all --api-key=YOUR_API_KEY --workspace=ws_your_workspace_id
```

### Environment Variables

You can set environment variables instead of passing API keys as arguments:

```bash
export SIREN_API_KEY=sk_siren_your_api_key
npx @siren/mcp --tools=all
```

## Debugging

### Using MCP Inspector

To debug your server, you can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector).

First, build the server:

```bash
npm run build
```

Run the following command in your terminal:

```bash
# Start MCP Inspector and server with all tools
npx @modelcontextprotocol/inspector node dist/index.js --tools=all --api-key=YOUR_SIREN_API_KEY
```

### Docker Debugging

First, build the Docker image:

```bash
docker build -t siren/mcp .
```

Run with MCP Inspector:

```bash
docker run -p 3000:3000 -p 5173:5173 -v /var/run/docker.sock:/var/run/docker.sock \
  mcp/inspector docker run --rm -i siren/mcp --tools=all --api-key=YOUR_SIREN_API_KEY
```

### Health Check

Test your configuration with a simple health check:

```bash
npx @siren/mcp --tools=messaging.send --api-key=YOUR_SIREN_API_KEY
```

If the server starts successfully, you'll see:
```
✅ Siren MCP Server running on stdio
```

## Troubleshooting

### Common Issues

1. **Invalid API Key Format**
   - Ensure your API key starts with `sk_siren_`, `sk_test_`, or `sk_live_`
   - Check that the key is correctly set in your environment or arguments

2. **Tool Not Found**
   - Verify the tool name matches exactly (case-sensitive)
   - Check the available tools list above

3. **Connection Issues**
   - Ensure you have an active internet connection
   - Check if your firewall is blocking the connection
   - Verify the Siren API endpoint is accessible

4. **Permission Denied**
   - Verify your API key has the necessary permissions for the tools you're using
   - Check your workspace access if using workspace-specific tools

### Getting Help

For additional support:
- Visit the [Siren Documentation](https://docs.trysiren.io/)
- Check the [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- Open an issue on the [Siren Agent Toolkit repository](https://github.com/sirenapp/agent-toolkit)

## Examples

### Basic Messaging

```bash
# Configure for basic messaging
npx @siren/mcp --tools=messaging.send,messaging.getStatus --api-key=YOUR_API_KEY
```

### Template Management

```bash
# Configure for template operations
npx @siren/mcp --tools=templates.list,templates.create,templates.update --api-key=YOUR_API_KEY
```

### Workflow Automation

```bash
# Configure for workflow automation
npx @siren/mcp --tools=workflows.trigger,workflows.schedule --api-key=YOUR_API_KEY
```

### Full Access

```bash
# Configure all available tools
npx @siren/mcp --tools=all --api-key=YOUR_API_KEY
```