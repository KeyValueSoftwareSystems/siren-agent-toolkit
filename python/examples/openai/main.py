"""Example of using Siren Agent Toolkit with OpenAI."""

import asyncio
import os
from openai import AsyncOpenAI
from siren_agent_toolkit.openai import SirenAgentToolkit


async def main():
    # Initialize OpenAI client
    openai_client = AsyncOpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    )
    
    # Initialize Siren toolkit
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
    
    # Create messages
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant that can send notifications and manage templates using Siren.",
        },
        {
            "role": "user",
            "content": 'Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!"',
        },
    ]
    
    # Get completion with tools
    response = await openai_client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=siren_toolkit.get_tools(),
    )
    
    message = response.choices[0].message
    
    if message.tool_calls:
        # Handle tool calls
        tool_results = []
        for tool_call in message.tool_calls:
            result = await siren_toolkit.handle_tool_call(tool_call)
            tool_results.append(result)
        
        print("Tool execution results:")
        for result in tool_results:
            print(f"- {result}")
    
    print(f"Assistant response: {message.content}")


if __name__ == "__main__":
    asyncio.run(main())