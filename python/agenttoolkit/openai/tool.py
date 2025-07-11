from typing import Any, Dict

from ..api import SirenAPI


class SirenTool:
    """Individual tool wrapper for OpenAI integration."""
    
    def __init__(self, siren_api: SirenAPI, tool_config: Dict[str, Any]):
        self.siren_api = siren_api
        self.method = tool_config["method"]
        self.name = tool_config["name"]
        self.description = tool_config["description"]
        self.args_schema = tool_config["args_schema"]
        self.actions = tool_config["actions"]

    def get_openai_function_definition(self) -> Dict[str, Any]:
        """Return the OpenAI function definition for this tool."""
        return {
            "type": "function",
            "function": {
                "name": self.method,
                "description": self.description,
                "parameters": self.args_schema.model_json_schema(),
            }
        }

    async def execute(self, **kwargs) -> Any:
        """Execute the tool with the given parameters."""

        validated_params = self.args_schema(**kwargs)
        

        result = self.siren_api.run(self.method, validated_params.model_dump())
        
        return result