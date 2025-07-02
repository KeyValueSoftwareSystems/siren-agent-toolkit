"""Tests for configuration module."""

import pytest
from siren_agent_toolkit.configuration import is_tool_allowed


def test_is_tool_allowed_no_configuration():
    """Test that tools are allowed when no configuration is provided."""
    tool = {
        "method": "send_message",
        "name": "Send Message",
        "description": "Send a message",
        "actions": {
            "messaging": {
                "create": True,
            }
        },
    }
    
    assert is_tool_allowed(tool) is True


def test_is_tool_allowed_matching_configuration():
    """Test that tools are allowed when actions match configuration."""
    tool = {
        "method": "send_message",
        "name": "Send Message", 
        "description": "Send a message",
        "actions": {
            "messaging": {
                "create": True,
            }
        },
    }
    
    configuration = {
        "actions": {
            "messaging": {
                "create": True,
            }
        }
    }
    
    assert is_tool_allowed(tool, configuration) is True


def test_is_tool_allowed_non_matching_configuration():
    """Test that tools are denied when actions do not match configuration."""
    tool = {
        "method": "send_message",
        "name": "Send Message",
        "description": "Send a message", 
        "actions": {
            "messaging": {
                "create": True,
            }
        },
    }
    
    configuration = {
        "actions": {
            "messaging": {
                "create": False,
            }
        }
    }
    
    assert is_tool_allowed(tool, configuration) is False


def test_is_tool_allowed_missing_resource():
    """Test that tools are denied when resource is not in configuration."""
    tool = {
        "method": "send_message",
        "name": "Send Message",
        "description": "Send a message",
        "actions": {
            "messaging": {
                "create": True,
            }
        },
    }
    
    configuration = {
        "actions": {
            "templates": {
                "create": True,
            }
        }
    }
    
    assert is_tool_allowed(tool, configuration) is False