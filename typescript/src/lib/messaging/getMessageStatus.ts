import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const getMessageStatusSchema = z.object({
  message_id: z.string().describe('The ID of the message for which to retrieve the status'),
});

export const getMessageStatus = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof getMessageStatusSchema>
) => {
  try {
    const status = await sirenClient.message.getStatus(params.message_id);
    
    return { status };
  } catch (error) {
    return 'Failed to get message status';
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_message_status',
  name: 'Get Message Status',
  description: 'Retrieve the status of a specific message (e.g., "DELIVERED", "PENDING", "FAILED")',
  parameters: getMessageStatusSchema,
  actions: {
    messaging: {
      read: true,
    },
  },
  execute: getMessageStatus,
});

export default tool;