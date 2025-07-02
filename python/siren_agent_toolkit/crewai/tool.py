import json
from typing import Any, Dict, Type
from crewai_tools import BaseTool
from pydantic import BaseModel

from ..api import SirenAPI


class SirenTool(BaseTool):
    """CrewAI tool wrapper for Siren functionality."""
    
    def __init__(self, siren_api: SirenAPI, tool_config: Dict[str, Any]):
        self.siren_api = siren_api
        self.method = tool_config["method"]
        self.tool_config = tool_config
        
        super().__init__(
            name=tool_config["method"],
            description=tool_config["description"],
            args_schema=tool_config["args_schema"]
        )

    def _run(self, **kwargs) -> Any:
        """Execute the tool."""
        # Validate parameters using Pydantic schema
        validated_params = self.tool_config["args_schema"](**kwargs)
        
        # Execute the tool using the Siren API
        result = self.siren_api.run(self.method, validated_params.dict())
        
        # Return result as JSON string for CrewAI compatibility
        return json.dumps(result) if not isinstance(result, str) else result