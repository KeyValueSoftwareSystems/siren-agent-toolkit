# Siren Agent Toolkit (Python)

The **Siren Agent Toolkit** provides a unified Python interface and agent tools for interacting with the Siren MCP (Model Context Protocol) platform. It enables messaging, template management, user management, workflow automation, and webhook configuration, with seamless integration into popular agent frameworks like LangChain, OpenAI, and CrewAI.

---

## Features & Capabilities

- **Messaging**
  - Send messages via various channels (Slack, Email, etc.)
  - Retrieve message status and replies
- **Templates**
  - List, create, update, delete, and publish notification templates
- **Users**
  - Add, update, delete, retrieve, and list users
- **Workflows**
  - Trigger workflows (single or bulk)
  - Schedule workflows for future or recurring execution
- **Webhooks**
  - Configure webhooks for status updates and inbound messages
- **Integrations**
  - Use Siren tools within LangChain, OpenAI, and CrewAI agent environments

---

## Installation

```bash
pip install siren-agent-toolkit
```

Or, for local development:

```bash
pip install -e .
```

---

## Usage

### Basic Example

```python
from siren_agent_toolkit.api import SirenAPI

api = SirenAPI(api_key="YOUR_API_KEY")

# Send a message
data = {
    "recipient_type": "user_id",
    "recipient_value": "user-123",
    "channel": "EMAIL",
    "body": "Hello from Siren!"
}
result = api.run("send_message", data)
print(result)
```

---

## Integrations

- **LangChain**: Use Siren tools as LangChain tools/agents
- **OpenAI**: Integrate Siren actions into OpenAI agent workflows
- **CrewAI**: Use Siren tools in CrewAI agent environments

See the `examples/` directory for integration demos.

---

## Examples

- `examples/langchain/main.py` — Using Siren tools with LangChain
- `examples/openai/main.py` — Using Siren tools with OpenAI
- `examples/crewai/main.py` — Using Siren tools with CrewAI

---

## Development

- All tool schemas are defined with Pydantic for validation.
- See `tests/` for unit tests.

---

## Development Build

To build the package locally during development:

```bash
# From the python/ directory
pip install -e .
# (Optional) Install development dependencies
pip install -r requirements.txt
```

If you make changes to the code, the editable install (`-e .`) ensures your changes are reflected immediately.

To run tests:

```bash
pytest tests/
```

---

## Running Examples

Each integration has an example script in the `examples/` directory. To run them:

```bash
# LangChain example
python examples/langchain/main.py

# OpenAI example
python examples/openai/main.py

# CrewAI example
python examples/crewai/main.py
```

Make sure to set any required environment variables (such as your API key) as needed by the examples. Check the top of each example script for details.

---

## License

MIT 