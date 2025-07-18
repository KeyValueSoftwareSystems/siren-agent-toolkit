import {SirenAPI} from '../lib/api';
import tools from '../lib/tools';
import {isToolAllowed, type Configuration} from '../lib/configuration';
import type {
  CoreTool,
} from 'ai';
import SirenTool from './tool';

class SirenAgentToolkit {
  private _siren: SirenAPI;

  tools: {[key: string]: CoreTool};

  constructor({
    apiKey,
    configuration,
  }: {
    apiKey: string;
    configuration?: Configuration;
  }) {
    this._siren = new SirenAPI(apiKey, configuration?.context);
    this.tools = {};

    const context = configuration?.context || {};
    const filteredTools = tools(context).filter((tool) =>
      isToolAllowed(tool, configuration)
    );

    filteredTools.forEach((tool) => {
      // @ts-ignore
      this.tools[tool.method] = SirenTool(
        this._siren,
        tool.method,
        tool.description,
        tool.parameters
      );
    });
  }

  getTools(): {[key: string]: CoreTool} {
    return this.tools;
  }
}

export default SirenAgentToolkit;