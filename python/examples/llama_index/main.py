from agenttoolkit.llama_index.toolkit import SirenAgentToolkit
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.llms.openai import OpenAI
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

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
      },
    },
  )

  agent = FunctionAgent(
      tools=siren_toolkit.get_tools(),
      llm=OpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY")),
      system_prompt="You are a helpful assistant that can send notifications and manage templates using Siren.",
  )

  result = await agent.run('Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!"', max_iterations=1)
  print(f"Result: {result}")

if __name__ == "__main__":
  asyncio.run(main())
  
