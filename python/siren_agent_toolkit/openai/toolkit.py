import json
from typing import Any, Dict, List, Optional

from ..api import SirenAPI
from ..tools import tools
from ..configuration import Configuration, is_tool_allowed
from .tool import SirenTool


class SirenAgentToolkit:
    """Siren Agent Toolkit for OpenAI integration."""
    
    def __init__(self, api_key: str, configuration: Optional[Configuration] = None):
        self.siren_api = SirenAPI(api_key, configuration.get("context") if configuration else None)
        
        # Filter tools based on configuration
        filtered_tools = [
            tool for tool in tools 
            if is_tool_allowed(tool, configuration)
        ]
        
        # Create SirenTool instances
        self._tools = [
            SirenTool(self.siren_api, tool_config)
            for tool_config in filtered_tools
        ]
        
        # Create method lookup for tool execution
        self._tool_methods = {
            tool.method: tool for tool in self._tools
        }

    def get_tools(self) -> List[Dict[str, Any]]:
        """Get the OpenAI function definitions for all tools."""
        return [tool.get_openai_function_definition() for tool in self._tools]

    async def handle_tool_call(self, tool_call) -> Dict[str, Any]:
        """Handle a tool call from OpenAI."""
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        
        if function_name not in self._tool_methods:
            raise ValueError(f"Unknown tool: {function_name}")
        
        tool = self._tool_methods[function_name]
        result = await tool.execute(**function_args)
        
        if not isinstance(result, (str, dict, list)):
            result = result.__dict__  # Convert object to dictionary
        
        return {
            "tool_call_id": tool_call.id,
            "role": "tool",
            "content": json.dumps(result) if not isinstance(result, str) else result,
        }