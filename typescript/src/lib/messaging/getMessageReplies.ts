import { z } from 'zod';
import { SirenClient } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const getMessageRepliesSchema = z.object({
  message_id: z.string().describe('The ID of the message for which to retrieve replies'),
});

export const getMessageReplies = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof getMessageRepliesSchema>
) => {
  try {
    const replies = await sirenClient.message.getReplies(params.message_id);
    
    return { replies };
  } catch (error) {
    return 'Failed to get message replies';
  }
};

const tool = (context: Context): Tool => ({
  method: 'get_message_replies',
  name: 'Get Message Replies',
  description: 'Retrieve replies for a specific message',
  parameters: getMessageRepliesSchema,
  actions: {
    messaging: {
      read: true,
    },
  },
  execute: getMessageReplies,
});

export default tool;