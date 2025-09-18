import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const startChatSchema = z.object({
  chatNodeId: z.string()
    .describe('The ID of the chat node to start the conversation with'),
  
  workflowExecutionId: z.string()
    .describe('The ID of the workflow execution this chat is associated with'),
  
  templateId: z.string().optional()
    .describe('Optional template ID to use for the chat message'),
  
  templateVariables: z.record(z.unknown()).optional()
    .describe('Optional variables to use with the template'),
  
  body: z.string().optional()
    .describe('The message body content'),
  
  subject: z.string().optional()
    .describe('The subject of the chat message'),
  
  buttons: z.array(z.object({
    text: z.string().describe('The button text'),
    value: z.string().describe('The button value')
  })).optional()
    .describe('Optional interactive buttons for the chat message')
});

export const startChat = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof startChatSchema>
) => {
  try {
    const chatMessageRequest = {
      chatNodeId: params.chatNodeId,
      workflowExecutionId: params.workflowExecutionId,
      ...(params.templateId && { templateId: params.templateId }),
      ...(params.templateVariables && { templateVariables: params.templateVariables }),
      ...(params.body && { body: params.body }),
      ...(params.subject && { subject: params.subject }),
      ...(params.buttons && { buttons: params.buttons })
    };
    
    const response = await sirenClient.chat.message(chatMessageRequest);
    
    return response;
  } catch (error) {
    console.error('Failed to start chat:', error);
    return 'Failed to start chat';
  }
};

const tool = (context: Context): Tool => ({
  method: 'start_chat',
  name: 'Start Chat',
  description: 'Start a chat conversation with a specific chat node',
  parameters: startChatSchema,
  actions: {
    chat: {
      message: true,
    },
  },
  execute: startChat,
});

export default tool;
