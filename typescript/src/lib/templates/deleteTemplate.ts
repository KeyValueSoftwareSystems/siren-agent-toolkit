import { z } from 'zod';
import { SirenClient } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const deleteTemplateSchema = z.object({
  template_id: z.string().describe('The ID of the template to delete'),
});

export const deleteTemplate = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof deleteTemplateSchema>
) => {
  try {
    const result = await sirenClient.template.delete(params.template_id);
    
    return { success: result };
  } catch (error) {
    return 'Failed to delete template';
  }
};

const tool = (context: Context): Tool => ({
  method: 'delete_template',
  name: 'Delete Template',
  description: 'Delete an existing notification template',
  parameters: deleteTemplateSchema,
  actions: {
    templates: {
      delete: true,
    },
  },
  execute: deleteTemplate,
});

export default tool;