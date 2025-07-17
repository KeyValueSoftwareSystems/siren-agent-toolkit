
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { SirenAPI } from '../lib/api';

export default function SirenTool(
  sirenAPI: SirenAPI,
  method: string,
  description: string,
  schema: z.ZodObject<any, any, any, any, { [x: string]: any }>
) {
  return createTool({
    id: method,
    description: description,
    inputSchema: schema,
    execute: (arg: z.output<typeof schema>) => {
      console.log("arg", arg);
      return sirenAPI.run(method, arg.context);
    },
  });
}