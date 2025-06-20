import {z} from 'zod';
import {StructuredTool} from '@langchain/core/tools';
import {CallbackManagerForToolRun} from '@langchain/core/callbacks/manager';
import {RunnableConfig} from '@langchain/core/runnables';
import {SirenAPI} from '../lib/api';

class SirenTool extends StructuredTool {
  sirenAPI: SirenAPI;

  method: string;

  name: string;

  description: string;

  schema: z.ZodObject<any, any, any, any>;

  constructor(
    sirenAPI: SirenAPI,
    method: string,
    description: string,
    schema: z.ZodObject<any, any, any, any, {[x: string]: any}>
  ) {
    super();

    this.sirenAPI = sirenAPI;
    this.method = method;
    this.name = method;
    this.description = description;
    this.schema = schema;
  }

  _call(
    arg: z.output<typeof this.schema>,
    _runManager?: CallbackManagerForToolRun,
    _parentConfig?: RunnableConfig
  ): Promise<any> {
    return this.sirenAPI.run(this.method, arg);
  }
}

export default SirenTool;