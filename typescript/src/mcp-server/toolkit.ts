import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {RequestHandlerExtra} from '@modelcontextprotocol/sdk/shared/protocol.js';
import {Configuration, isToolAllowed} from '../lib/configuration';
import {SirenAPI} from '../lib/api';
import tools from '../lib/tools';

class SirenAgentToolkit extends McpServer {
  private _siren: SirenAPI;

  constructor({
    apiKey,
    configuration,
  }: {
    apiKey: string;
    configuration: Configuration;
  }) {
    super({
      name: 'Siren',
      version: '0.1.0',
      configuration: {
        ...configuration,
        context: {
          ...configuration.context,
          mode: 'modelcontextprotocol',
        },
      },
    });

    this._siren = new SirenAPI(apiKey, configuration.context);

    const context = configuration.context || {};
    const filteredTools = tools(context).filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      this.tool(
        tool.method,
        tool.description,
        tool.parameters.shape,
        async (arg: any, _extra: RequestHandlerExtra<any, any>) => {
          const result = await this._siren.run(tool.method, arg);
          return {
            content: [
              {
                type: 'text' as const,
                text: String(result),
              },
            ],
          };
        }
      );
    });
  }
}

export default SirenAgentToolkit;
