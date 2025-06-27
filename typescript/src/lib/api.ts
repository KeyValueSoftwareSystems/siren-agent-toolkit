import { SirenClient } from '@trysiren/node';
import { Context } from './configuration';
import tools, { Tool } from './tools';

const TOOLKIT_HEADER = 'siren-agent-toolkit-typescript';

export class SirenAPI {
  sirenClient: SirenClient;
  context: Context;
  tools: Tool[];

  constructor(apiKey: string, context?: Context) {
    this.sirenClient = new SirenClient({
      apiToken: apiKey,
      env: context?.env,
    });
    this.context = context || {};
    this.tools = tools(this.context);
  }

  async run(method: string, arg: any): Promise<string> {
    const tool = this.tools.find((t) => t.method === method);
    if (tool) {
      const output = JSON.stringify(
        await tool.execute(this.sirenClient, this.context, arg)
      );
      return output;
    } else {
      throw new Error('Invalid method ' + method);
    }
  }
}