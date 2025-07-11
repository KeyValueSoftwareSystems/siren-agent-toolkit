# Siren Agent Toolkit (Python)

The **Siren Agent Toolkit** provides a unified Python interface and agent tools for interacting with the Siren MCP (Model Context Protocol) platform. It enables messaging, template management, user management, workflow automation, and webhook configuration, with seamless integration into popular agent frameworks like LangChain, OpenAI, and CrewAI.

## Features & Capabilities

### Messaging
- Send messages via various channels (Email, SMS, WhatsApp, Slack, Teams, Discord, Line, etc.)
- Retrieve message status and replies
- Support for template-based and direct messaging

### Templates
- List, create, update, delete, and publish notification templates
- Create and manage channel-specific templates
- Support for template variables and versioning

### Users
- Add, update, and delete users
- Manage user attributes and contact information

### Workflows
- Trigger workflows (single or bulk operations)
- Schedule workflows for future or recurring execution
- Pass custom data to workflow executions

### Webhooks
- Configure webhooks for status updates
- Set up inbound message webhooks
- Optional webhook verification with secrets

## 📋 Requirements

- A Siren API key (get one from [Siren Dashboard](https://app.trysiren.io/configuration))

## Installation

```bash
pip install siren-agent-toolkit
```

For local development:

```bash
# From the python/ directory
pip install -e .
```

## Usage

### Basic Example

```python
from siren_agent_toolkit.api import SirenAPI

# Initialize with your API key
api = SirenAPI(api_key="YOUR_API_KEY")

# Send a simple email message
result = api.run("send_message", {
    "recipient_value": "user@example.com",
    "channel": "EMAIL",
    "subject": "Important Update",
    "body": "Hello from Siren! This is an important notification."
})
print(result)
```

## Examples

Complete working examples are available in the `examples/` directory:

- `examples/langchain/main.py` — Using Siren tools with LangChain
- `examples/openai/main.py` — Using Siren tools with OpenAI
- `examples/crewai/main.py` — Using Siren tools with CrewAI

## Development

### Configuration

The toolkit supports flexible configuration options:

```python
from siren_agent_toolkit.api import SirenAPI

api = SirenAPI(
    api_key="YOUR_API_KEY",
    context={"env": "production"}  # Optional environment configuration
)
```

### Building Locally

```bash
# From the python/ directory
pip install -e .
# Install development dependencies
pip install -r requirements.txt
```

### Running Tests

```bash
pytest tests/
```
## License

MIT