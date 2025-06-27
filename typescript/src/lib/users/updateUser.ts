import { z } from 'zod';
import { SirenClient, UserRequest } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const updateUserSchema = z.object({
  uniqueId: z.string().describe('Unique identifier for the user'),
  email: z.string().email().optional().describe('User email address'),
  phone: z.string().optional().describe('User phone number'),
  firstName: z.string().optional().describe('User first name'),
  lastName: z.string().optional().describe('User last name'),
  attributes: z.record(z.any()).optional().describe('Additional user attributes'),
});

export const updateUser = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof updateUserSchema>
) => {
  try {
    const userRequest: UserRequest = {
      uniqueId: params.uniqueId,
      email: params.email,
      phone: params.phone,
      firstName: params.firstName,
      lastName: params.lastName,
      attributes: params.attributes
    };
    
    const user = await sirenClient.user.update(params.uniqueId, userRequest);
    
    return { user };
  } catch (error) {
    return 'Failed to update user';
  }
};

const tool = (context: Context): Tool => ({
  method: 'update_user',
  name: 'Update User',
  description: 'Update an existing user\'s information',
  parameters: updateUserSchema,
  actions: {
    users: {
      update: true,
    },
  },
  execute: updateUser,
});

export default tool;