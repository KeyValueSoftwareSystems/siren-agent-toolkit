import { z } from 'zod';
import { SirenClient, WebhookConfigRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const configureInboundWebhooksSchema = z.object({
  url: z.string().url().describe('Webhook URL for receiving inbound messages'),
  secret: z.string().optional().describe('Optional secret for webhook verification'),
});

export const configureInboundWebhooks = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof configureInboundWebhooksSchema>
) => {
  try {
    const config: WebhookConfigRequest = {
      url: params.url,
      secret: params.secret
    };
    
    const response = await sirenClient.webhook.configureInbound(config);
    
    return response;
  } catch (error) {
    return 'Failed to configure inbound webhooks';
  }
};

const tool = (context: Context): Tool => ({
  method: 'configure_inbound_webhooks',
  name: 'Configure Inbound Webhooks',
  description: 'Configure webhook URL for receiving inbound messages',
  parameters: configureInboundWebhooksSchema,
  actions: {
    webhooks: {
      create: true,
    },
  },
  execute: configureInboundWebhooks,
});

export default tool;