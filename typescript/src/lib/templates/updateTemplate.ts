import { z } from 'zod';
import { SirenClient, UpdateTemplateRequest } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const updateTemplateSchema = z.object({
  templateId: z.string().describe('The ID of the template to update'),
  name: z.string().describe('The name of the template'),
  description: z.string().optional().describe('The description of the template'),
  tagNames: z.array(z.string()).optional().describe('Tags associated with the template'),
  variables: z.array(z.object({
    name: z.string(),
    defaultValue: z.string().optional()
  })).optional().describe('Template variables with optional default values'),
  configurations: z.object({
    SMS: z.object({
      body: z.string(),
      channel: z.literal('SMS'),
      isFlash: z.boolean().optional(),
      isUnicode: z.boolean().optional()
    }).optional(),
    EMAIL: z.object({
      subject: z.string(),
      channel: z.literal('EMAIL'),
      body: z.string(),
      attachments: z.array(z.record(z.unknown())).optional(),
      isRawHTML: z.boolean().optional(),
      isPlainText: z.boolean().optional()
    }).optional()
  }).optional().describe('Channel-specific template configurations')
});

export const updateTemplate = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof updateTemplateSchema>
) => {
  try {
    const request: UpdateTemplateRequest = {
      name: params.name,
      description: params.description,
      tagNames: params.tagNames,
      variables: params.variables,
      configurations: params.configurations
    };
    
    const template = await sirenClient.template.update(params.templateId, request);
    
    return { template };
  } catch (error) {
    return 'Failed to update template';
  }
};

const tool = (context: Context): Tool => ({
  method: 'update_template',
  name: 'Update Template',
  description: 'Update an existing notification template',
  parameters: updateTemplateSchema,
  actions: {
    templates: {
      update: true,
    },
  },
  execute: updateTemplate,
});

export default tool;