from pydantic import BaseModel, Field
from typing import Any, Dict, List, Literal, Optional


# Messaging schemas
class SendMessage(BaseModel):
    recipient_value: str = Field(description="The identifier for the recipient (e.g., Slack user ID, email address)")
    channel: str = Field(description="The channel to send the message through (e.g., 'SLACK', 'EMAIL')")
    body: Optional[str] = Field(None, description="Message body text (required if no template)")
    subject: Optional[str] = Field(None, description="Message subject text (required if no template)")
    template_name: Optional[str] = Field(None, description="Template name (required if no body)")
    template_variables: Optional[Dict[str, Any]] = Field(None, description="Template variables for template-based messages")
    provider_name: Optional[str] = Field(None, description="Provider name (must be provided with provider_code)")
    provider_code: Optional[str] = Field(None, description="Provider code (must be provided with provider_name)")


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
    description: List[str] = Field(default_factory=list, description="The description of the template")
    tag_names: Optional[List[str]] = Field(None, description="Tags associated with the template")
    variables: List[Dict[str, Any]] = Field(default_factory=list, description="Variables used in the template")
    configurations: Dict[str, Any] = Field(default_factory=dict, description="Configuration settings for the template")



class UpdateTemplate(BaseModel):
    template_id: str = Field(description="The ID of the template to update")
    name: Optional[str] = Field(None, description="The name of the template")
    description: Optional[str] = Field(None, description="The description of the template")
    tag_names: Optional[List[str]] = Field(None, description="Tags associated with the template")
    variables: Optional[List[Dict[str, Any]]] = Field(None, description="Variables used in the template")
    configurations: Optional[Dict[str, Any]] = Field(None, description="Configuration settings for the template")


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
    id: Optional[str] = Field(description="Unique identifier for the user")
    created_at: Optional[str] = Field(None,alias="createdAt", description="User creation timestamp")
    updated_at: Optional[str] = Field(None, alias="updatedAt", description="User last update timestamp")
    avatar_url: Optional[str] = Field(None, alias="avatarUrl", description="URL of the user's avatar image")

    sms: Optional[str] = Field(None, description="User SMS identifier")
    push_token: Optional[str] = Field(None, alias="pushToken", description="User push notification token")
    in_app: Optional[bool] = Field(None, alias="inApp", description="Whether the user is active in-app")
    slack: Optional[str] = Field(None, description="User Slack identifier")
    discord: Optional[str] = Field(None, description="User Discord identifier")
    teams: Optional[str] = Field(None, description="User Microsoft Teams identifier")
    line: Optional[str] = Field(None, description="User LINE identifier")
    
    custom_data: Optional[Dict[str, Any]] = Field(None, alias="customData", description="Custom data associated with the user")
    segments: Optional[List[str]] = Field(None, description="List of segments the user belongs to")


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
    data: Optional[Dict[str, Any]] = Field(None,description="Data to pass to the workflow")
    notification_payloads: Optional[List[Dict[str, Any]]] = Field(None, description="Optional notification payloads")


class TriggerWorkflowBulk(BaseModel):
    workflow_name: str = Field(description="Name of the workflow to trigger")
    notify: List[Dict[str, Any]] = Field(default_factory=list, description="A list of notification objects, each representing specific data for a workflow execution")
    data: Optional[Dict[str, Any]] = Field(None, description="Common data that will be used across all workflow executions")


class ScheduleWorkflow(BaseModel):
    name: str = Field(description="Name of the workflow to schedule")
    schedule_time: str = Field(description="time to run the workflow in 'HH:MM:SS' format")
    timezone_id: str = Field(description="Timezone ID for the schedule, e.g., 'Asia/Kolkata'")
    start_date: str = Field(description="Start date for the schedule in 'YYYY-MM-DD' format")
    workflow_type: str = Field(description="Type of the workflow schedule , e.g., 'ONCE', 'DAILY'")
    workflow_id: str = Field(description="ID of the workflow to schedule")
    input_data: Dict[str, Any] = Field(description="Input data for the workflow", default_factory=dict)
    end_date: Optional[str] = Field(None, description="End date for the schedule in 'YYYY-MM-DD' format")


# Webhook schemas
class ConfigureNotificationWebhooks(BaseModel):
    url: str = Field(description="Webhook URL for receiving status updates")


class ConfigureInboundWebhooks(BaseModel):
    url: str = Field(description="Webhook URL for receiving inbound messages")