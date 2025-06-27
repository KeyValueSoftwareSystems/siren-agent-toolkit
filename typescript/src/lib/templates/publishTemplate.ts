import { z } from 'zod';
import { SirenClient } from '@trysiren/node';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const publishTemplateSchema = z.object({
  template_id: z.string().describe('The ID of the template to publish'),
});

export const publishTemplate = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof publishTemplateSchema>
) => {
  try {
    const template = await sirenClient.template.publish(params.template_id);
    
    return { template };
  } catch (error) {
    return 'Failed to publish template';
  }
};

const tool = (context: Context): Tool => ({
  method: 'publish_template',
  name: 'Publish Template',
  description: 'Publish a template, making its latest draft version live',
  parameters: publishTemplateSchema,
  actions: {
    templates: {
      update: true,
    },
  },
  execute: publishTemplate,
});

export default tool;