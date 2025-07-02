from typing import Dict, List, Literal, Optional, TypedDict


Object = Literal[
    "messaging",
    "templates", 
    "users",
    "workflows",
    "webhooks",
]

Permission = Literal["create", "update", "read", "delete", "trigger", "schedule"]


class Actions(TypedDict, total=False):
    messaging: Optional[Dict[Permission, bool]]
    templates: Optional[Dict[Permission, bool]]
    users: Optional[Dict[Permission, bool]]
    workflows: Optional[Dict[Permission, bool]]
    webhooks: Optional[Dict[Permission, bool]]


class Context(TypedDict, total=False):
    env: Optional[Literal["dev", "prod"]]
    api_key: Optional[str]
    base_url: Optional[str]
    timeout: Optional[int]


class Configuration(TypedDict, total=False):
    actions: Optional[Actions]
    context: Optional[Context]


def is_tool_allowed(tool: Dict, configuration: Optional[Configuration] = None) -> bool:
    """Check if a tool is allowed based on configuration permissions."""
    if not configuration or not configuration.get("actions"):
        return True  # Allow all tools if no configuration is provided

    for resource, permissions in tool.get("actions", {}).items():
        if resource not in configuration["actions"]:
            return False
        for permission in permissions:
            if not configuration["actions"].get(resource, {}).get(permission, False):
                return False
    return True