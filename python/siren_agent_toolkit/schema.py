from pydantic import BaseModel, Field
from typing import Any, Dict, List, Literal, Optional


# Messaging schemas
class SendMessage(BaseModel):
    recipient_type: Literal["user_id", "direct"] = Field(description="The type of recipient")
    recipient_value: str = Field(description="The identifier for the recipient (e.g., Slack user ID, email address)")
    channel: str = Field(description="The channel to send the message through (e.g., 'SLACK', 'EMAIL')")
    body: Optional[str] = Field(None, description="Message body text (required if no template)")
    template_name: Optional[str] = Field(None, description="Template name (required if no body)")
    template_variables: Optional[Dict[str, Any]] = Field(None, description="Template variables for template-based messages")


class GetMessageStatus(BaseModel):
    message_id: str = Field(description="The ID of the message for which to retrieve the status")


class GetMessageReplies(BaseModel):
    message_id: str = Field(description="The ID of the message for which to retrieve replies")


# Template schemas
class ListTemplates(BaseModel):
    tag_names: Optional[str] = Field(None, description="Filter by tag names")
    search: Optional[str] = Field(None, description="Search by field")
    sort: Optional[str] = Field(None, description="Sort by field")
    page: Optional[int] = Field(None, description="Page number")
    size: Optional[int] = Field(None, description="Page size")


class CreateTemplate(BaseModel):
    name: str = Field(description="The name of the template")
    description: Optional[str] = Field(None, description="The description of the template")
    tags: Optional[List[str]] = Field(None, description="Tags associated with the template")


class UpdateTemplate(BaseModel):
    template_id: str = Field(description="The ID of the template to update")
    name: Optional[str] = Field(None, description="The name of the template")
    description: Optional[str] = Field(None, description="The description of the template")
    tags: Optional[List[str]] = Field(None, description="Tags associated with the template")


class DeleteTemplate(BaseModel):
    template_id: str = Field(description="The ID of the template to delete")


class PublishTemplate(BaseModel):
    template_id: str = Field(description="The ID of the template to publish")


# User schemas
class AddUser(BaseModel):
    unique_id: str = Field(description="Unique identifier for the user")
    email: Optional[str] = Field(None, description="User email address")
    phone: Optional[str] = Field(None, description="User phone number")
    first_name: Optional[str] = Field(None, description="User first name")
    last_name: Optional[str] = Field(None, description="User last name")
    properties: Optional[Dict[str, Any]] = Field(None, description="Additional user properties")


class UpdateUser(BaseModel):
    unique_id: str = Field(description="Unique identifier for the user")
    email: Optional[str] = Field(None, description="User email address")
    phone: Optional[str] = Field(None, description="User phone number")
    first_name: Optional[str] = Field(None, description="User first name")
    last_name: Optional[str] = Field(None, description="User last name")
    properties: Optional[Dict[str, Any]] = Field(None, description="Additional user properties")


class DeleteUser(BaseModel):
    unique_id: str = Field(description="Unique identifier for the user to delete")


class GetUser(BaseModel):
    unique_id: str = Field(description="Unique identifier for the user to retrieve")


class ListUsers(BaseModel):
    page: Optional[int] = Field(None, description="Page number")
    size: Optional[int] = Field(None, description="Page size")
    search: Optional[str] = Field(None, description="Search term")


# Workflow schemas
class TriggerWorkflow(BaseModel):
    workflow_name: str = Field(description="Name of the workflow to trigger")
    data: Dict[str, Any] = Field(description="Data to pass to the workflow")
    notification_payloads: Optional[List[Dict[str, Any]]] = Field(None, description="Optional notification payloads")


class TriggerWorkflowBulk(BaseModel):
    workflow_name: str = Field(description="Name of the workflow to trigger")
    triggers: List[Dict[str, Any]] = Field(description="Array of trigger data for bulk execution")


class ScheduleWorkflow(BaseModel):
    workflow_name: str = Field(description="Name of the workflow to schedule")
    data: Dict[str, Any] = Field(description="Data to pass to the workflow")
    notification_payloads: Optional[List[Dict[str, Any]]] = Field(None, description="Optional notification payloads")
    schedule_at: str = Field(description="ISO 8601 timestamp when to run the workflow")
    recurring: Optional[bool] = Field(None, description="Whether the workflow should run repeatedly")


# Webhook schemas
class ConfigureNotificationWebhooks(BaseModel):
    url: str = Field(description="Webhook URL for receiving status updates")
    events: Optional[List[str]] = Field(None, description="List of events to subscribe to")


class ConfigureInboundWebhooks(BaseModel):
    url: str = Field(description="Webhook URL for receiving inbound messages")
    events: Optional[List[str]] = Field(None, description="List of events to subscribe to")