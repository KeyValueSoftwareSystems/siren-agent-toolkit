"""Tests for tools module."""

import pytest
from siren_agent_toolkit.tools import tools


def test_tools_list_not_empty():
    """Test that tools list is not empty."""
    assert len(tools) > 0


def test_tools_have_required_fields():
    """Test that all tools have required fields."""
    required_fields = ["method", "name", "description", "args_schema", "actions"]
    
    for tool in tools:
        for field in required_fields:
            assert field in tool, f"Tool {tool.get('method', 'unknown')} missing field {field}"


def test_messaging_tools_exist():
    """Test that messaging tools exist."""
    messaging_tools = [tool for tool in tools if "messaging" in tool["actions"]]
    assert len(messaging_tools) > 0
    
    # Check for specific messaging tools
    tool_methods = [tool["method"] for tool in messaging_tools]
    assert "send_message" in tool_methods
    assert "get_message_status" in tool_methods
    assert "get_message_replies" in tool_methods


def test_template_tools_exist():
    """Test that template tools exist."""
    template_tools = [tool for tool in tools if "templates" in tool["actions"]]
    assert len(template_tools) > 0
    
    # Check for specific template tools
    tool_methods = [tool["method"] for tool in template_tools]
    assert "list_templates" in tool_methods
    assert "create_template" in tool_methods
    assert "update_template" in tool_methods
    assert "delete_template" in tool_methods
    assert "publish_template" in tool_methods


def test_user_tools_exist():
    """Test that user tools exist."""
    user_tools = [tool for tool in tools if "users" in tool["actions"]]
    assert len(user_tools) > 0
    
    # Check for specific user tools
    tool_methods = [tool["method"] for tool in user_tools]
    assert "add_user" in tool_methods
    assert "update_user" in tool_methods
    assert "delete_user" in tool_methods


def test_workflow_tools_exist():
    """Test that workflow tools exist."""
    workflow_tools = [tool for tool in tools if "workflows" in tool["actions"]]
    assert len(workflow_tools) > 0
    
    # Check for specific workflow tools
    tool_methods = [tool["method"] for tool in workflow_tools]
    assert "trigger_workflow" in tool_methods
    assert "trigger_workflow_bulk" in tool_methods
    assert "schedule_workflow" in tool_methods


def test_webhook_tools_exist():
    """Test that webhook tools exist."""
    webhook_tools = [tool for tool in tools if "webhooks" in tool["actions"]]
    assert len(webhook_tools) > 0
    
    # Check for specific webhook tools
    tool_methods = [tool["method"] for tool in webhook_tools]
    assert "configure_notification_webhooks" in tool_methods
    assert "configure_inbound_webhooks" in tool_methods