import { SirenAPI } from '../lib/api';
import tools from '../lib/tools';
import { isToolAllowed, type Configuration } from '../lib/configuration';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type {
  ChatCompletionTool,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
} from 'openai/resources';

export class SirenAgentToolkit {
  private _siren: SirenAPI;

  tools: ChatCompletionTool[];

  constructor({
    apiKey,
    configuration,
  }: {
    apiKey: string;
    configuration?: Configuration;
  }) {
    this._siren = new SirenAPI(apiKey, configuration?.context);

    const context = configuration?.context || {};
    const filteredTools = tools(context).filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    this.tools = filteredTools.map((tool) => ({
      type: 'function',
      function: {
        name: tool.method,
        description: tool.description,
        parameters: zodToJsonSchema(tool.parameters),
      },
    }));
  }

  getTools(): ChatCompletionTool[] {
    return this.tools;
  }

  async handleToolCall(toolCall: ChatCompletionMessageToolCall): Promise<ChatCompletionToolMessageParam> {
    const args = JSON.parse(toolCall.function.arguments);
    const response = await this._siren.run(toolCall.function.name, args);
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify(response),
    } as ChatCompletionToolMessageParam;
  }
}