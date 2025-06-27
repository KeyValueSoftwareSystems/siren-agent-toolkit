import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const deleteUserSchema = z.object({
  uniqueId: z.string().describe('Unique identifier for the user to delete'),
});

export const deleteUser = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof deleteUserSchema>
) => {
  try {
    const result = await sirenClient.user.delete(params.uniqueId);
    
    return { success: result };
  } catch (error) {
    return 'Failed to delete user';
  }
};

const tool = (context: Context): Tool => ({
  method: 'delete_user',
  name: 'Delete User',
  description: 'Delete an existing user',
  parameters: deleteUserSchema,
  actions: {
    users: {
      delete: true,
    },
  },
  execute: deleteUser,
});

export default tool;