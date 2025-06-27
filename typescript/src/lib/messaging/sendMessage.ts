import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const sendMessageSchema = z.object({
  recipient_type: z.enum(['user_id', 'direct']).describe('The type of recipient'),
  recipient_value: z.string().describe('The identifier for the recipient (e.g., Slack user ID, email address)'),
  channel: z.string().describe('The channel to send the message through (e.g., "SLACK", "EMAIL")'),
  body: z.string().optional().describe('Message body text (required if no template)'),
  template_name: z.string().optional().describe('Template name (required if no body)'),
  template_variables: z.record(z.any()).optional().describe('Template variables for template-based messages'),
});

export const sendMessage = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof sendMessageSchema>
) => {
  try {
    const notificationId = await sirenClient.message.send(
      params.recipient_type,
      params.recipient_value,
      params.channel,
      params.body,
      params.template_name,
      params.template_variables
    );
    
    return { notificationId };
  } catch (error) {
    console.error('Failed to send message:', error);
    return {
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : String(error)
    };
  }
};

const tool = (context: Context): Tool => ({
  method: 'send_message',
  name: 'Send Message',
  description: 'Send a message either using a template or directly to a recipient via a chosen channel',
  parameters: sendMessageSchema,
  actions: {
    messaging: {
      create: true,
    },
  },
  execute: sendMessage,
});

export default tool;