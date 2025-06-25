import { z } from 'zod';
import { SirenClient, CreateTemplateRequest } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const createTemplateSchema = z.object({
  name: z.string().describe('The name of the template'),
  description: z.string().describe('The description of the template'),
  tagNames: z.array(z.string()).describe('Tags associated with the template'),
  variables: z.array(z.object({
    name: z.string(),
    defaultValue: z.string().optional()
  })).describe('Template variables with optional default values'),
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
  }).describe('Channel-specific template configurations')
});

export const createTemplate = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof createTemplateSchema>
) => {
  try {
    console.log("createTemplatess", params);
    const request: CreateTemplateRequest = {
      name: params.name,
      description: params.description,
      tagNames: params.tagNames,
      variables: params.variables,
      configurations: params.configurations
    };
    
    console.log("request incoming", request);
    const template = await sirenClient.template.create(request);
    
    return { template };
  } catch (error) {
    return { error: `Failed to create template: ${error}` };
  }
};

const tool = (context: Context): Tool => ({
  method: 'create_template',
  name: 'Create Template',
  description: 'Create a new notification template',
  parameters: createTemplateSchema,
  actions: {
    templates: {
      create: true,
    },
  },
  execute: createTemplate,
});

export default tool;