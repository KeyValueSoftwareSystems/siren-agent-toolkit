"""Tests for tools module."""

import pytest
from agenttoolkit.tools import tools


def test_tools_list_not_empty():
    """Test that tools list is not empty."""
    assert len(tools) > 0


def test_tools_have_required_fields():
    """Test that all tools have required fields."""
    required_fields = ["method", "name", "description", "args_schema", "actions"]
    
    for tool in tools:
        for field in required_fields:
            assert field in tool, f"Tool {tool.get('method', 'unknown')} missing field {field}"
        
        # Check that actions is properly structured
        assert isinstance(tool["actions"], dict), f"Tool {tool['method']} actions must be a dict"
        for resource, permissions in tool["actions"].items():
            assert isinstance(permissions, dict), f"Tool {tool['method']} permissions must be a dict"
            for permission, value in permissions.items():
                assert isinstance(value, bool), f"Tool {tool['method']} permission value must be boolean"


def test_messaging_tools_exist():
    """Test that messaging tools exist."""
    messaging_tools = [tool for tool in tools if "messaging" in tool["actions"]]
    assert len(messaging_tools) > 0
    
    # Check for specific messaging tools
    tool_methods = [tool["method"] for tool in messaging_tools]
    assert "send_message" in tool_methods
    assert "get_message_status" in tool_methods
    assert "get_message_replies" in tool_methods
    
    # Verify permissions
    for tool in messaging_tools:
        if tool["method"] == "send_message":
            assert tool["actions"]["messaging"].get("create") is True
        elif tool["method"] in ["get_message_status", "get_message_replies"]:
            assert tool["actions"]["messaging"].get("read") is True
            
    # Verify schemas
    for tool in messaging_tools:
        assert hasattr(tool["args_schema"], "model_fields"), f"Tool {tool['method']} schema missing model_fields"


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
    
    # Verify permissions
    for tool in template_tools:
        if tool["method"] == "list_templates":
            assert tool["actions"]["templates"].get("read") is True
        elif tool["method"] == "create_template":
            assert tool["actions"]["templates"].get("create") is True
        elif tool["method"] in ["update_template", "publish_template"]:
            assert tool["actions"]["templates"].get("update") is True
        elif tool["method"] == "delete_template":
            assert tool["actions"]["templates"].get("delete") is True
            
    # Verify schemas
    for tool in template_tools:
        assert hasattr(tool["args_schema"], "model_fields"), f"Tool {tool['method']} schema missing model_fields"


def test_user_tools_exist():
    """Test that user tools exist."""
    user_tools = [tool for tool in tools if "users" in tool["actions"]]
    assert len(user_tools) > 0
    
    # Check for specific user tools
    tool_methods = [tool["method"] for tool in user_tools]
    assert "add_user" in tool_methods
    assert "update_user" in tool_methods
    assert "delete_user" in tool_methods
    assert "get_user" in tool_methods
    assert "list_users" in tool_methods
    
    # Verify permissions
    for tool in user_tools:
        if tool["method"] == "add_user":
            assert tool["actions"]["users"].get("create") is True
        elif tool["method"] == "update_user":
            assert tool["actions"]["users"].get("update") is True
        elif tool["method"] == "delete_user":
            assert tool["actions"]["users"].get("delete") is True
        elif tool["method"] in ["get_user", "list_users"]:
            assert tool["actions"]["users"].get("read") is True
            
    # Verify schemas
    for tool in user_tools:
        assert hasattr(tool["args_schema"], "model_fields"), f"Tool {tool['method']} schema missing model_fields"


def test_workflow_tools_exist():
    """Test that workflow tools exist."""
    workflow_tools = [tool for tool in tools if "workflows" in tool["actions"]]
    assert len(workflow_tools) > 0
    
    # Check for specific workflow tools
    tool_methods = [tool["method"] for tool in workflow_tools]
    assert "trigger_workflow" in tool_methods
    assert "trigger_workflow_bulk" in tool_methods
    assert "schedule_workflow" in tool_methods
    
    # Verify permissions
    for tool in workflow_tools:
        if tool["method"] in ["trigger_workflow", "trigger_workflow_bulk"]:
            assert tool["actions"]["workflows"].get("trigger") is True
        elif tool["method"] == "schedule_workflow":
            assert tool["actions"]["workflows"].get("schedule") is True
            
    # Verify schemas
    for tool in workflow_tools:
        assert hasattr(tool["args_schema"], "model_fields"), f"Tool {tool['method']} schema missing model_fields"


def test_webhook_tools_exist():
    """Test that webhook tools exist."""
    webhook_tools = [tool for tool in tools if "webhooks" in tool["actions"]]
    assert len(webhook_tools) > 0
    
    # Check for specific webhook tools
    tool_methods = [tool["method"] for tool in webhook_tools]
    assert "configure_notification_webhooks" in tool_methods
    assert "configure_inbound_webhooks" in tool_methods
    
    # Verify permissions
    for tool in webhook_tools:
        assert tool["actions"]["webhooks"].get("create") is True
            
    # Verify schemas
    for tool in webhook_tools:
        assert hasattr(tool["args_schema"], "model_fields"), f"Tool {tool['method']} schema missing model_fields"