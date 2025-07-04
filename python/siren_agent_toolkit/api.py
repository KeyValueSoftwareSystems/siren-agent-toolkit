from typing import Any, Dict, Optional
from siren import SirenClient
from .configuration import Context


class SirenAPI:
    """API wrapper that integrates with the Siren Python SDK."""
    
    def __init__(self, api_key: str, context: Optional[Context] = None):
        self.client = SirenClient(
            api_key=api_key,
            env=context.get("env") if context else None,
        )

    def run(self, method: str, params: Dict[str, Any]) -> Any:
        """Execute a method on the Siren client with the given parameters."""
        
        # Messaging methods
        if method == "send_message":
            return self.client.message.send(**params)
        elif method == "get_message_status":
            return self.client.message.get_status(params["message_id"])
        elif method == "get_message_replies":
            return self.client.message.get_replies(params["message_id"])
        
        # Template methods
        elif method == "list_templates":
            return self.client.template.get(**params)
        elif method == "create_template":
            return self.client.template.create(**params)
        elif method == "update_template":
            template_id = params.pop("template_id")
            return self.client.template.update(template_id, **params)
        elif method == "delete_template":
            return self.client.template.delete(params["template_id"])
        elif method == "publish_template":
            return self.client.template.publish(params["template_id"])
        elif method == "create_channel_templates":
            template_id = params.pop("template_id")
            return self.client.template.create_channel_templates(template_id, **params)
        elif method == "get_channel_templates":
            version_id = params.pop("version_id") 
            return self.client.template.get_channel_templates(version_id, **params)
        
        # User methods
        elif method == "add_user":
            return self.client.user.add(**params)
        elif method == "update_user":
            unique_id = params.pop("unique_id")
            return self.client.user.update(unique_id, **params)
        elif method == "delete_user":
            return self.client.user.delete(params["unique_id"])
        elif method == "get_user":
            return self.client.user.get(params["unique_id"])
        elif method == "list_users":
            return self.client.user.list(**params)
        
        # Workflow methods
        elif method == "trigger_workflow":
            return self.client.workflow.trigger(**params)
        elif method == "trigger_workflow_bulk":
            return self.client.workflow.trigger_bulk(**params)
        elif method == "schedule_workflow":
            return self.client.workflow.schedule(**params)
        
        # Webhook methods
        elif method == "configure_notification_webhooks":
            return self.client.webhook.configure_notifications(**params)
        elif method == "configure_inbound_webhooks":
            return self.client.webhook.configure_inbound(**params)
        
        else:
            raise ValueError(f"Unknown method: {method}")