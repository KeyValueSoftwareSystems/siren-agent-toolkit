from typing import List, Optional

from ..api import SirenAPI
from ..tools import tools
from ..configuration import Configuration, is_tool_allowed
from .tool import SirenTool


class SirenAgentToolkit:
    """Siren Agent Toolkit for LangChain integration."""
    
    def __init__(self, api_key: str, configuration: Optional[Configuration] = None):
        self.siren_api = SirenAPI(api_key, configuration.get("context") if configuration else None)
        
        filtered_tools = [
            tool for tool in tools 
            if is_tool_allowed(tool, configuration)
        ]
        
        self._tools = [
            SirenTool(self.siren_api, tool_config)
            for tool_config in filtered_tools
        ]

    def get_tools(self) -> List[SirenTool]:
        """Get the LangChain tools."""
        return self._tools