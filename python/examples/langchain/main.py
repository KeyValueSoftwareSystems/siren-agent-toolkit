"""Example of using Siren Agent Toolkit with LangChain."""

import os
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from siren_agent_toolkit.langchain import SirenAgentToolkit


def main():
    # Initialize LLM
    llm = ChatOpenAI(
        model="gpt-4",
        api_key=os.getenv("OPENAI_API_KEY"),
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
            },
        },
    )
    
    # Create prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that can send notifications and manage templates using Siren."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])
    
    # Get tools
    tools = siren_toolkit.get_tools()
    
    # Create agent
    agent = create_tool_calling_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
    
    # Execute
    result = agent_executor.invoke({
        "input": 'Send a welcome message to user@example.com via EMAIL saying "Welcome to our platform!"'
    })
    
    print(f"Result: {result['output']}")


if __name__ == "__main__":
    main()