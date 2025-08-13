import { z } from 'zod';
import { SirenClient, WorkflowTriggerRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

// List of valid channel fields that should go to the top level of notify
const CHANNEL_FIELDS = [
  'email', 'sms', 'whatsapp', 'pushToken', 'inApp', 'slack', 'discord', 'teams', 'line', 'userId'
] as const;

type ChannelField = typeof CHANNEL_FIELDS[number];

// Base schema with channel fields and variables
const baseTriggerWorkflowSchema = z.object({
  
  workflowName: z.string()
    .describe('The exact name of the workflow to trigger (e.g., "ses_loadTest")'),
  
  data: z.union([z.record(z.any()), z.string()])
    .default({})
    .describe('Workflow-specific data. Use this for data that should be processed by the workflow, ' +
             'like order details, user data, etc. Example: For prompt "with data field contains age 30 and membership level gold", ' +
             'use: {"data": {"age": 30, "membershipLevel": "gold"}}'),
  
  notify: z.union([z.record(z.any()), z.string()])
    .default({})
    .describe('Notification configuration. ' +
             'IMPORTANT: Use this for notification-specific data like recipient info and message content. ' +
             'Example: For prompt "Send alert to user@example.com with name John", use: ' +
             '{"email": "user@example.com", "notify": {"variables": {"name": "John"}}}'),
  
  email: z.string().email().optional()
    .describe('Email address to send notification to. Example: "user@example.com". ' +
             'This will be moved to the top level of the notify object.'),
  sms: z.string().optional()
    .describe('Phone number for SMS notification (will be moved to notify.sms)'),
  whatsapp: z.string().optional()
    .describe('Phone number for WhatsApp notification (will be moved to notify.whatsapp)'),
  pushToken: z.string().optional()
    .describe('Push token for push notifications (will be moved to notify.pushToken)'),
  inApp: z.string().optional()
    .describe('In-app notification target (will be moved to notify.inApp)'),
  slack: z.string().optional()
    .describe('Slack channel or user ID (will be moved to notify.slack)'),
  discord: z.string().optional()
    .describe('Discord channel or user ID (will be moved to notify.discord)'),
  teams: z.string().optional()
    .describe('Microsoft Teams channel or user ID (will be moved to notify.teams)'),
  line: z.string().optional()
    .describe('LINE user ID (will be moved to notify.line)'),
  userId: z.string().optional()
    .describe('User ID for the notification (will be moved to notify.userId)'),
  
  variables: z.record(z.any()).optional()
    .describe('Variables to include in notify.variables')
});

// Add validation for at least one of data or notify
const triggerWorkflowSchema = baseTriggerWorkflowSchema.refine(data => 
  Object.keys(data.data || {}).length > 0 || Object.keys(data.notify || {}).length > 0, 
  {
    message: 'At least one of data or notify must be provided with non-empty objects',
    path: ['data', 'notify']
  }
);

export const triggerWorkflow = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof triggerWorkflowSchema>
) => {
  try {
    let data = {};
    try {
      data = typeof params.data === 'string' ? JSON.parse(params.data) : (params.data || {});
    } catch (e) {
      console.error("Error parsing data:", e);
      data = {};
    }
    if (typeof data !== 'object' || data === null) data = {};

    let notify: any = { variables: {} };
    
    if (params.notify) {
      try {
        const rawNotify = typeof params.notify === 'string' 
          ? JSON.parse(params.notify) 
          : params.notify;
        
        for (const [key, value] of Object.entries(rawNotify)) {
          if (CHANNEL_FIELDS.includes(key as ChannelField)) {
            notify[key] = value;
          } else if (key === 'variables' && value && typeof value === 'object') {
            notify.variables = { ...notify.variables, ...value };
          } else if (value !== undefined) {
            notify.variables[key] = value;
          }
        }
      } catch (e) {
        console.error("Error parsing notify:", e);
      }
    }
    
    for (const field of CHANNEL_FIELDS) {
      if (params[field] !== undefined) {
        notify[field] = params[field];
      }
    }
    
    if (params.variables && typeof params.variables === 'object') {
      notify.variables = { ...notify.variables, ...params.variables };
    }
    
    const request: WorkflowTriggerRequest = {
      workflowName: params.workflowName,
      data,
      notify
    };
    
    const response = await sirenClient.workflow.trigger(request);
    
    return response;
  } catch (error) {
    return 'Failed to trigger workflow';
  }
};

const tool = (context: Context): Tool => ({
  method: 'trigger_workflow',
  name: 'Trigger Workflow',
  description: 'Trigger a workflow with given data and notification payloads',
  parameters: baseTriggerWorkflowSchema,
  actions: {
    workflows: {
      trigger: true,
    },
  },
  execute: triggerWorkflow,
});

export default tool;