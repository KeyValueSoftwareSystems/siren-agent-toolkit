import { z } from 'zod';
import { SirenClient, ProviderCode } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const sendAwesomeSchema = z.object({
  recipient_value: z.string().describe('Identifier for the recipient (e.g., Slack user ID, email address)'),
  channel: z.string().describe('The channel to send the message through (e.g., "SLACK", "EMAIL")'),
  template_identifier: z.string().describe('Awesome template path/identifier'),
  template_variables: z.record(z.any()).optional().describe('Variables for the template'),
  provider_name: z.string().optional().describe('Provider integration name'),
  provider_code: z.nativeEnum(ProviderCode).optional().describe('Provider integration code'),
});

export const sendAwesomeTemplate = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof sendAwesomeSchema>
) => {
  try {
    const notificationId = await sirenClient.message.sendAwesomeTemplate(
      params.recipient_value,
      params.channel,
      params.template_identifier,
      params.template_variables,
      params.provider_name,
      params.provider_code
    );
    return { notificationId };
  } catch (error) {
    console.error('Failed to send awesome template:', error);
    return {
      error: 'Failed to send awesome template',
      details: error instanceof Error ? error.message : String(error),
    };
  }
};

const tool = (context: Context): Tool => ({
  method: 'send_awesome_template',
  name: 'Send Awesome Template Message',
  description: 'Send a message using an awesome template identifier via a chosen channel',
  parameters: sendAwesomeSchema,
  actions: {
    messaging: {
      create: true,
    },
  },
  execute: sendAwesomeTemplate,
});

export default tool; 