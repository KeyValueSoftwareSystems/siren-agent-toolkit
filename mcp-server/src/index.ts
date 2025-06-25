#!/usr/bin/env node

import {SirenAgentToolkit} from '@sirenapp/agent-toolkit/mcp-server';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

type ToolkitConfig = {
  actions: {
    [resource: string]: {[action: string]: boolean};
  };
  context?: {
    workspace?: string;
    env?: 'dev' | 'prod';
  };
};

type Options = {
  tools?: string[];
  apiKey?: string;
  workspace?: string;
  endpoint?: string;
};

const ACCEPTED_ARGS = ['api-key', 'tools', 'workspace', 'endpoint'];
const ACCEPTED_TOOLS = [
  'messaging.send',
  'messaging.getStatus',
  'messaging.getReplies',
  'templates.list',
  'templates.create',
  'templates.update',
  'templates.delete',
  'templates.publish',
  'users.add',
  'users.update',
  'users.delete',
  'workflows.trigger',
  'workflows.triggerBulk',
  'workflows.schedule',
  'webhooks.configureNotification',
  'webhooks.configureInbound',
];

export function parseArgs(args: string[]): Options {
  const options: Options = {};

  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');

      if (key == 'tools') {
        options.tools = value.split(',');
      } else if (key == 'api-key') {
        options.apiKey = value;
        //TODO set context for siren via cli
      } else {
        throw new Error(
          `Invalid argument: ${key}. Accepted arguments are: ${ACCEPTED_ARGS.join(
            ', '
          )}`
        );
      }
    }
  });

  // Check if required tools argument is present
  if (!options.tools) {
    throw new Error('The --tools argument must be provided.');
  }

  // Validate tools against accepted enum values
  options.tools.forEach((tool: string) => {
    if (tool == 'all') {
      return;
    }
    if (!ACCEPTED_TOOLS.includes(tool.trim())) {
      throw new Error(
        `Invalid tool: ${tool}. Accepted tools are: ${ACCEPTED_TOOLS.join(
          ', '
        )}`
      );
    }
  });

  // Check if API key is either provided in args or set in environment variables
  const apiKey = options.apiKey || process.env.SIREN_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Siren API key not provided. Please either pass it as an argument --api-key=$KEY or set the SIREN_API_KEY environment variable.'
    );
  }
  options.apiKey = apiKey;

  return options;
}

function logError(error: any) {
  console.error(`\n Error initializing Siren MCP server: ${error.message}`);
}

export async function main() {
  const options = parseArgs(process.argv.slice(2));

  // Create the SirenAgentToolkit instance
  const selectedTools = options.tools!;
  const configuration: ToolkitConfig = {actions: {}};

  if (selectedTools.includes('all')) {
    ACCEPTED_TOOLS.forEach((tool) => {
      const [resource, action] = tool.split('.');
      configuration.actions[resource] = {
        ...configuration.actions[resource],
        [action]: true,
      };
    });
  } else {
    selectedTools.forEach((tool: any) => {
      const [resource, action] = tool.split('.');
      configuration.actions[resource] = {
        ...configuration.actions[resource],
        [action]: true,
      };
    });
  }

  configuration.context = {};

  // Set environment if endpoint is custom
  if (options.endpoint) {
    configuration.context.env = 'dev';
  }

  // Append workspace to configuration if provided
  if (options.workspace) {
    configuration.context.workspace = options.workspace;
  }

  const server = new SirenAgentToolkit({
    apiKey: options.apiKey!,
    configuration: configuration,
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // We use console.error instead of console.log since console.log will output to stdio, which will confuse the MCP server
  console.error('Siren MCP Server running on stdio');
}

if (require.main === module) {
  main().catch((error) => {
    logError(error);
  });
}