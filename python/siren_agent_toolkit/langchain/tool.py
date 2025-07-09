import json
from typing import Any, Dict, Optional, Type
from langchain.tools.base import BaseTool
from pydantic import BaseModel

from ..api import SirenAPI


class SirenTool(BaseTool):
    """LangChain tool wrapper for Siren functionality."""
    
    siren_api: SirenAPI
    method: str
    args_schema = None
    actions: Dict[str, Any]
    
    class Config:
        arbitrary_types_allowed = True

    def __init__(self, siren_api: SirenAPI, tool_config: Dict[str, Any], **kwargs):
        super().__init__(
            name=tool_config["method"],
            description=tool_config["description"],
            args_schema=tool_config["args_schema"],
            siren_api=siren_api,
            method=tool_config["method"],
            actions=tool_config["actions"],
            **kwargs
        )

    def _run(self, **kwargs) -> Any:
        """Execute the tool synchronously."""
        # Validate parameters using Pydantic schema
        print("self.args_schema ----->>>", self.args_schema)
        validated_params = self.args_schema(**kwargs)
        print("validated_params", validated_params)
        
        # Execute the tool using the Siren API
        result = self.siren_api.run(self.method, validated_params.dict())
        
        # Return result as JSON string for LangChain compatibility
        return json.dumps(result) if not isinstance(result, str) else result

    async def _arun(self, **kwargs) -> Any:
        """Execute the tool asynchronously."""
        # For now, we'll use the sync version
        # In a real implementation, you might want to make the Siren API async
        return self._run(**kwargs)