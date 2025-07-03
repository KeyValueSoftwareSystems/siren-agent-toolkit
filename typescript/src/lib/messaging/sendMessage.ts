import { z } from 'zod';
import { SirenClient, ProviderCode, RecipientChannel } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const sendMessageSchema = z.object({
  recipient_value: z
    .string()
    .describe(
      'Identifier for the recipient (e.g., Slack user ID, email address)'
    ),
  channel: z
    .nativeEnum(RecipientChannel)
    .describe(
      'The channel to send the message through (e.g., "SLACK", "EMAIL")'
    ),
  body: z
    .string()
    .optional()
    .describe('Message body text (required if no template)'),
  subject: z
    .string()
    .optional()
    .describe(
      'Subject line for the message (optional, required for email with body)'
    ),
  template_name: z
    .string()
    .optional()
    .describe('Template name (required if no body)'),
  template_variables: z
    .record(z.any())
    .optional()
    .describe('Template variables for template-based messages'),
  provider_name: z.string().optional().describe('Provider integration name'),
  provider_code: z
    .nativeEnum(ProviderCode)
    .optional()
    .describe('Provider integration code'),
});

export const sendMessage = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof sendMessageSchema>
) => {
  try {
    const messagePayload = {
      recipientValue: params.recipient_value,
      channel: params.channel as RecipientChannel,
      body: params.body,
      subject: params.subject,
      templateName: params.template_name,
      templateVariables: params.template_variables,
      providerName: params.provider_name,
      providerCode: params.provider_code,
    };
    const notificationId = await sirenClient.message.send(messagePayload);

    return { notificationId };
  } catch (error) {
    console.error('Failed to send message:', error);
    return {
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : String(error),
    };
  }
};

const tool = (context: Context): Tool => ({
  method: 'send_message',
  name: 'Send Message',
  description:
    'Send a message either using a template or directly to a recipient via a chosen channel',
  parameters: sendMessageSchema,
  actions: {
    messaging: {
      create: true,
    },
  },
  execute: sendMessage,
});

export default tool;
