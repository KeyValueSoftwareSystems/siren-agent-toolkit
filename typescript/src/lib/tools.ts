import { z } from 'zod';

import sendMessageTool from './messaging/sendMessage';
import getMessageStatusTool from './messaging/getMessageStatus';
import getMessageRepliesTool from './messaging/getMessageReplies';

import listTemplatesTool from './templates/listTemplates';
import createTemplateTool from './templates/createTemplate';
import updateTemplateTool from './templates/updateTemplate';
import deleteTemplateTool from './templates/deleteTemplate';
import publishTemplateTool from './templates/publishTemplate';

import addUserTool from './users/addUser';
import updateUserTool from './users/updateUser';
import deleteUserTool from './users/deleteUser';

import triggerWorkflowTool from './workflows/triggerWorkflow';
import triggerWorkflowBulkTool from './workflows/triggerWorkflowBulk';
import scheduleWorkflowTool from './workflows/scheduleWorkflow';

import configureNotificationWebhooksTool from './webhooks/configureNotificationWebhooks';
import configureInboundWebhooksTool from './webhooks/configureInboundWebhooks';

import { SirenClient } from '@trysiren/node';
import { Context } from './configuration';

export type Tool = {
  method: string;
  name: string;
  description: string;
  parameters: z.ZodObject<any, any, any, any>;
  actions: {
    [key: string]: {
      [action: string]: boolean;
    };
  };
  execute: (sirenClient: SirenClient, context: Context, params: any) => Promise<any>;
};

const tools = (context: Context): Tool[] => [
  sendMessageTool(context),
  getMessageStatusTool(context),
  getMessageRepliesTool(context),
  
  listTemplatesTool(context),
  createTemplateTool(context),
  updateTemplateTool(context),
  deleteTemplateTool(context),
  publishTemplateTool(context),
  
  addUserTool(context),
  updateUserTool(context),
  deleteUserTool(context),
  
  triggerWorkflowTool(context),
  triggerWorkflowBulkTool(context),
  scheduleWorkflowTool(context),
  
  configureNotificationWebhooksTool(context),
  configureInboundWebhooksTool(context),
];

export default tools;