from typing import Dict, List

from .schema import (
    SendMessage,
    GetMessageStatus,
    GetMessageReplies,
    ListTemplates,
    CreateTemplate,
    UpdateTemplate,
    DeleteTemplate,
    PublishTemplate,
    AddUser,
    UpdateUser,
    DeleteUser,
    GetUser,
    ListUsers,
    TriggerWorkflow,
    TriggerWorkflowBulk,
    ScheduleWorkflow,
    ConfigureNotificationWebhooks,
    ConfigureInboundWebhooks,
)

tools: List[Dict] = [
    {
        "method": "send_message",
        "name": "Send Message",
        "description": "Send a message either using a template or directly to a recipient via a chosen channel",
        "args_schema": SendMessage,
        "actions": {
            "messaging": {
                "create": True,
            }
        },
    },
    {
        "method": "get_message_status",
        "name": "Get Message Status", 
        "description": "Retrieve the status of a specific message (e.g., 'DELIVERED', 'PENDING', 'FAILED')",
        "args_schema": GetMessageStatus,
        "actions": {
            "messaging": {
                "read": True,
            }
        },
    },
    {
        "method": "get_message_replies",
        "name": "Get Message Replies",
        "description": "Retrieve replies for a specific message",
        "args_schema": GetMessageReplies,
        "actions": {
            "messaging": {
                "read": True,
            }
        },
    },
    
    {
        "method": "list_templates",
        "name": "List Templates",
        "description": "Retrieve a list of notification templates with optional filtering, sorting, and pagination",
        "args_schema": ListTemplates,
        "actions": {
            "templates": {
                "read": True,
            }
        },
    },
    {
        "method": "create_template",
        "name": "Create Template",
        "description": "Create a new notification template",
        "args_schema": CreateTemplate,
        "actions": {
            "templates": {
                "create": True,
            }
        },
    },
    {
        "method": "update_template",
        "name": "Update Template",
        "description": "Update an existing notification template",
        "args_schema": UpdateTemplate,
        "actions": {
            "templates": {
                "update": True,
            }
        },
    },
    {
        "method": "delete_template",
        "name": "Delete Template",
        "description": "Delete an existing notification template",
        "args_schema": DeleteTemplate,
        "actions": {
            "templates": {
                "delete": True,
            }
        },
    },
    {
        "method": "publish_template",
        "name": "Publish Template",
        "description": "Publish a template, making its latest draft version live",
        "args_schema": PublishTemplate,
        "actions": {
            "templates": {
                "update": True,
            }
        },
    },
    
    {
        "method": "add_user",
        "name": "Add User",
        "description": "Create a new user or update existing user with given unique_id",
        "args_schema": AddUser,
        "actions": {
            "users": {
                "create": True,
            }
        },
    },
    {
        "method": "update_user",
        "name": "Update User",
        "description": "Update an existing user's information",
        "args_schema": UpdateUser,
        "actions": {
            "users": {
                "update": True,
            }
        },
    },
    {
        "method": "delete_user",
        "name": "Delete User",
        "description": "Delete an existing user",
        "args_schema": DeleteUser,
        "actions": {
            "users": {
                "delete": True,
            }
        },
    },
    {
        "method": "get_user",
        "name": "Get User",
        "description": "Retrieve a specific user by unique_id",
        "args_schema": GetUser,
        "actions": {
            "users": {
                "read": True,
            }
        },
    },
    {
        "method": "list_users",
        "name": "List Users",
        "description": "Retrieve a list of users with optional pagination and search",
        "args_schema": ListUsers,
        "actions": {
            "users": {
                "read": True,
            }
        },
    },
    
    {
        "method": "trigger_workflow",
        "name": "Trigger Workflow",
        "description": "Trigger a workflow with given data and notification payloads",
        "args_schema": TriggerWorkflow,
        "actions": {
            "workflows": {
                "trigger": True,
            }
        },
    },
    {
        "method": "trigger_workflow_bulk",
        "name": "Trigger Workflow Bulk",
        "description": "Trigger a workflow in bulk for multiple recipients",
        "args_schema": TriggerWorkflowBulk,
        "actions": {
            "workflows": {
                "trigger": True,
            }
        },
    },
    {
        "method": "schedule_workflow",
        "name": "Schedule Workflow",
        "description": "Schedule a workflow to run at a future time (once or recurring)",
        "args_schema": ScheduleWorkflow,
        "actions": {
            "workflows": {
                "schedule": True,
            }
        },
    },
    
    {
        "method": "configure_notification_webhooks",
        "name": "Configure Notification Webhooks",
        "description": "Configure webhook URL for receiving status updates",
        "args_schema": ConfigureNotificationWebhooks,
        "actions": {
            "webhooks": {
                "create": True,
            }
        },
    },
    {
        "method": "configure_inbound_webhooks",
        "name": "Configure Inbound Webhooks",
        "description": "Configure webhook URL for receiving inbound messages",
        "args_schema": ConfigureInboundWebhooks,
        "actions": {
            "webhooks": {
                "create": True,
            }
        },
    },
]