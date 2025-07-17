"""Example of using Siren Agent Toolkit with AutoGen."""

import asyncio
import os
from dotenv import load_dotenv
load_dotenv()
from agenttoolkit.autogen import SirenAgentToolkit
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
async def main():
    

    siren_toolkit = SirenAgentToolkit(
        api_key=os.getenv("SIREN_API_KEY"),
        configuration={
            "actions": {
                "messaging": {
                    "create": True,
                    "read": True,
                },
                "templates": {
                    "read": True,
                    "create": True,
                    "update": True,
                    "delete": True,
                },
                "users": {
                    "create": True,
                    "update": True,
                    "delete": True,
                    "read": True,
                },
                "workflows": {
                    "trigger": True,
                    "schedule": True,
                },
                "webhooks": {
                    "create": True,
                },
            },
        },
    )
    

    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant that can send notifications and manage templates using Siren.",
        },
        {
            "role": "user",
            "content": 'Send a welcome message to U08FK1G6DGE via SLACK saying "Welcome to our platform!"',
        },
    ]
    

    model_client = OpenAIChatCompletionClient(
        model="gpt-4.1-nano",
        api_key=os.getenv("OPENAI_API_KEY"),
    )
    agent = AssistantAgent(
        name="assistant",
        model_client=model_client,
        tools= siren_toolkit.get_tools(),
        system_message="You are a helpful assistant that can send notifications and manage templates using Siren.",
    )

    agent.run(task= "Send a welcome email via EMAIL to kiran.b@keyvalue.systems saying 'Welcome to our platform!'")


if __name__ == "__main__":
    asyncio.run(main())