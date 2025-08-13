import { z } from 'zod';
import { SirenClient, UserRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const addUserSchema = z.object({
  uniqueId: z.string().describe('Unique identifier for the user'),
  firstName: z.string().optional().describe('User first name'),
  lastName: z.string().optional().describe('User last name'),
  referenceId: z.string().optional().describe('User reference id'),
  whatsapp: z.string().optional().describe('User whatsapp number'),
  activeChannels: z.array(z.string()).optional().describe('Active channels for the user'),
  active: z.boolean().optional().describe('User active status'),
  email: z.string().email().optional().describe('User email address'),
  phone: z.string().optional().describe('User phone number'),
  attributes: z.record(z.any()).optional().describe('Additional user attributes'),
});

export const addUser = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof addUserSchema>
) => {
  try {
    const userRequest: UserRequest = {
      uniqueId: params.uniqueId,
      firstName: params.firstName,
      lastName: params.lastName,
      referenceId: params.referenceId,
      whatsapp: params.whatsapp,
      activeChannels: params.activeChannels,
      active: params.active,
      email: params.email,
      phone: params.phone,
      attributes: params.attributes,
    };
    
    const user = await sirenClient.user.add(userRequest);
    
    return { user };
  } catch (error) {
    return 'Failed to add user';
  }
};

const tool = (context: Context): Tool => ({
  method: 'add_user',
  name: 'Add User',
  description: 'Create a new user or update existing user with given unique_id',
  parameters: addUserSchema,
  actions: {
    users: {
      create: true,
    },
  },
  execute: addUser,
});

export default tool;