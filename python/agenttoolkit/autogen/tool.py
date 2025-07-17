import json
from typing import Any, Dict, Type
from autogen_core.tools import BaseTool
from pydantic import BaseModel
from autogen_core.tools import FunctionTool



from ..api import SirenAPI


class SirenTool(BaseTool):
    """Autogen tool wrapper for Siren functionality."""
    
    def __init__(self, siren_api: SirenAPI, tool_config: Dict[str, Any]):
        
        super().__init__(
            name=tool_config["method"],
            description=tool_config["description"],
            args_type=tool_config["args_schema"],
            return_type=Dict[str, Any]
        )
        
        # Store these as instance variables (not using self.attribute notation to avoid Pydantic validation)
        # Using object.__setattr__ to bypass Pydantic's __setattr__ which causes the validation error
        object.__setattr__(self, "_siren_api", siren_api)
        object.__setattr__(self, "_method", tool_config["method"])
        object.__setattr__(self, "_tool_config", tool_config)
    
    def get_autogen_function_definition(self) -> Dict[str, Any]:
        """Get the Autogen function definition for the tool."""
        return FunctionTool(
            func=self.run,
            description=self.description,
            name=self.name,
        )

    def run(self, **kwargs) -> Any:
        """Execute the tool."""
        # Access the stored attributes using object.__getattribute__
        siren_api = object.__getattribute__(self, "_siren_api")
        method = object.__getattribute__(self, "_method")
        tool_config = object.__getattribute__(self, "_tool_config")
        

        validated_params = tool_config["args_schema"](**kwargs) 
        result = siren_api.run(method, validated_params.model_dump())
        

        if hasattr(result, '__dict__'):
            result = result.__dict__
     

        return json.dumps(result) if not isinstance(result, str) else result