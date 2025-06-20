import { z } from 'zod';
import { SirenClient, GetTemplatesQuery } from '@sirenapp/ts-sdk';
import { Context } from '../configuration';
import type { Tool } from '../tools';

const listTemplatesSchema = z.object({
  tagNames: z.string().optional().describe('Filter by tag names'),
  search: z.string().optional().describe('Search by field'),
  sort: z.string().optional().describe('Sort by field'),
  page: z.number().optional().describe('Page number'),
  size: z.number().optional().describe('Page size'),
});

export const listTemplates = async (
  sirenClient: SirenClient,
  context: Context,
  params: z.infer<typeof listTemplatesSchema>
) => {
  try {
    const query: GetTemplatesQuery = {
      tagNames: params.tagNames,
      search: params.search,
      sort: params.sort,
      page: params.page,
      size: params.size
    };
    
    const response = await sirenClient.template.get(query);
    
    return response;
  } catch (error) {
    return 'Failed to list templates';
  }
};

const tool = (context: Context): Tool => ({
  method: 'list_templates',
  name: 'List Templates',
  description: 'Retrieve a list of notification templates with optional filtering, sorting, and pagination',
  parameters: listTemplatesSchema,
  actions: {
    templates: {
      read: true,
    },
  },
  execute: listTemplates,
});

export default tool;