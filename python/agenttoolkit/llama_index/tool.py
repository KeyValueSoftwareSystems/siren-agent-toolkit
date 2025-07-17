from llama_index.core.tools import BaseTool, ToolMetadata
from typing import Any, Dict, Type
from pydantic import BaseModel
import json
from ..api import SirenAPI

class Metadata:
  def __init__(self, name: str, description: str, args_schema: Type[BaseModel]) -> None:
    self.name = name
    self.description = description
    self.args_schema = args_schema

class SirenTool(BaseTool):

  siren_api: SirenAPI
  method: str
  args_schema: Type[BaseModel]
  actions: Dict[str, Any]
  name: str
  description: str

  def metadata(self):
    return ToolMetadata(
      description=self.description,
      fn_schema=self.args_schema,
      name=self.name
    )
  
  def __init__(self, siren_api: SirenAPI, tool_config: Dict[str, Any], **kwargs):
    super().__init__()
    self.siren_api = siren_api
    self.method = tool_config["method"]
    self.args_schema = tool_config["args_schema"]
    self.actions = tool_config["actions"]
    self.name = tool_config["method"]
    self.description = tool_config["description"]
    self.metadata = self.metadata()
    
  def __call__(self, **kwargs) -> Any:
    """Execute the tool synchronously."""
    validated_params = self.args_schema(**kwargs)
    result = self.siren_api.run(self.method, validated_params.model_dump())

    result = json.dumps(result) if not isinstance(result, str) else result
    return {
      "final_answer": result
    }
    
