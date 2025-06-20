import {BaseToolkit} from '@langchain/core/tools';
import SirenTool from './tool';
import {SirenAPI} from '../lib/api';
import tools from '../lib/tools';
import {isToolAllowed, type Configuration} from '../lib/configuration';

class SirenAgentToolkit implements BaseToolkit {
  private _siren: SirenAPI;

  tools: SirenTool[];

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

    this.tools = filteredTools.map(
      (tool) =>
        new SirenTool(
          this._siren,
          tool.method,
          tool.description,
          tool.parameters
        )
    );
  }

  getTools(): SirenTool[] {
    return this.tools;
  }
}

export default SirenAgentToolkit;