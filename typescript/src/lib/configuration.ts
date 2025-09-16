import type { Tool } from './tools';

export type Object =
  | 'messaging'
  | 'templates'
  | 'users'
  | 'workflows'
  | 'webhooks'
  | 'chat';

export type Permission = 'create' | 'update' | 'read' | 'delete' | 'trigger' | 'schedule' | 'message' | 'end';

export type Actions = {
  [K in Object]?: {
    [K in Permission]?: boolean;
  };
};

export type Context = {
  env?: 'dev' | 'prod';
  //TODO: Configure providers in the context
};

export type Configuration = {
  actions?: Actions;
  context?: Context;
};

export const isToolAllowed = (
  tool: Tool,
  configuration?: Configuration
): boolean => {
  if (!configuration?.actions) {
    return true;
  }

  return Object.keys(tool.actions).every((resource) => {
    const permissions = tool.actions[resource];

    return Object.keys(permissions).every((permission) => {
      // @ts-ignore
      return configuration.actions[resource]?.[permission] === true;
    });
  });
};