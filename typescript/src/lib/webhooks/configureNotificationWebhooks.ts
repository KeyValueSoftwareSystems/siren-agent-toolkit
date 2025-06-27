import { z } from 'zod';
import { SirenClient, WebhookConfigRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const configureNotificationWebhooksSchema = z.object({
  url: z.string().url().describe('Webhook URL for receiving status updates'),
  secret: z.string().optional().describe('Optional secret for webhook verification'),
});

export const configureNotificationWebhooks = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof configureNotificationWebhooksSchema>
) => {
  try {
    const config: WebhookConfigRequest = {
      url: params.url,
      secret: params.secret
    };
    
    const response = await sirenClient.webhook.configureNotifications(config);
    
    return response;
  } catch (error) {
    return 'Failed to configure notification webhooks';
  }
};

const tool = (context: Context): Tool => ({
  method: 'configure_notification_webhooks',
  name: 'Configure Notification Webhooks',
  description: 'Configure webhook URL for receiving status updates',
  parameters: configureNotificationWebhooksSchema,
  actions: {
    webhooks: {
      create: true,
    },
  },
  execute: configureNotificationWebhooks,
});

export default tool;