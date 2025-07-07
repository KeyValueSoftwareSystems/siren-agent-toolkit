import { z } from 'zod';
import { SirenClient, ProviderCode, RecipientChannel } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const sendMessageSchema = z.object({
  recipient_value: z
    .string()
    .describe(
      'Unique identifier for the recipient, such as a Slack user ID or an email address.'
    ),
  channel: z
    .nativeEnum(RecipientChannel)
    .describe(
      'The communication channel to use for sending the message, e.g., "SLACK" or "EMAIL".'
    ),
  body: z
    .string()
    .optional()
    .describe(
      'The content of the message. Required if no template is specified.'
    ),
  subject: z
    .string()
    .optional()
    .describe(
      'The subject line of the message. Optional, but required for email messages that include a body.'
    ),
  template_name: z
    .string()
    .optional()
    .describe(
      'The name of the template to use for the message. Required if no body is provided.'
    ),
  template_variables: z
    .record(z.any())
    .optional()
    .describe(
      'Template variables for template-based messages.'
    ),
  provider_name: z
    .string()
    .optional()
    .describe(
      'The name of the provider integration to use for sending the message. Optional; defaults to the default provider if not specified.'
    ),
  provider_code: z
    .nativeEnum(ProviderCode)
    .optional()
    .describe(
      'The code of the provider integration to use for sending the message. Optional; defaults to the default provider if not specified.'
    ),
});

export const sendMessage = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof sendMessageSchema>
) => {
  try {
    const messagePayload = {
      recipientValue: params.recipient_value,
      channel: params.channel,
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
