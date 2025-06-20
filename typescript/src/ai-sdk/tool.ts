import type {CoreTool} from 'ai';
import {tool} from 'ai';
import {z} from 'zod';
import {SirenAPI} from '../lib/api';

export default function SirenTool(
  sirenAPI: SirenAPI,
  method: string,
  description: string,
  schema: z.ZodObject<any, any, any, any, {[x: string]: any}>
): CoreTool {
  return tool({
    description: description,
    parameters: schema,
    execute: (arg: z.output<typeof schema>) => {
      return sirenAPI.run(method, arg);
    },
  });
}