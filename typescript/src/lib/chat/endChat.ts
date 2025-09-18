import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const endChatSchema = z.object({
  chatNodeId: z.string()
    .describe('The ID of the chat node to end the conversation with'),
  
  workflowExecutionId: z.string()
    .describe('The ID of the workflow execution this chat is associated with')
});

export const endChat = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof endChatSchema>
) => {
  try {
    const chatEndRequest = {
      chatNodeId: params.chatNodeId,
      workflowExecutionId: params.workflowExecutionId
    };
    
    const response = await sirenClient.chat.end(chatEndRequest);
    
    return response;
  } catch (error) {
    console.error('Failed to end chat:', error);
    return 'Failed to end chat';
  }
};

const tool = (context: Context): Tool => ({
  method: 'end_chat',
  name: 'End Chat',
  description: 'End a chat conversation with a specific chat node',
  parameters: endChatSchema,
  actions: {
    chat: {
      end: true,
    },
  },
  execute: endChat,
});

export default tool;
