import { parseArgs } from '../index';

describe('Siren MCP Server', () => {
  describe('parseArgs', () => {
    beforeEach(() => {
      delete process.env.SIREN_API_KEY;
    });

    it('should parse valid arguments', () => {
      const args = ['--tools=messaging.send,templates.list', '--api-key=sk_siren_test123'];
      const result = parseArgs(args);
      
      expect(result.tools).toEqual(['messaging.send', 'templates.list']);
      expect(result.apiKey).toBe('sk_siren_test123');
    });

    it('should parse all tools', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123'];
      const result = parseArgs(args);
      
      expect(result.tools).toEqual(['all']);
      expect(result.apiKey).toBe('sk_siren_test123');
    });

    it('should parse workspace argument', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123', '--workspace=ws_test123'];
      const result = parseArgs(args);
      
      expect(result.workspace).toBe('ws_test123');
    });

    it('should parse endpoint argument', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123', '--endpoint=https://api.custom.com'];
      const result = parseArgs(args);
      
      expect(result.endpoint).toBe('https://api.custom.com');
    });

    it('should use environment variable for API key', () => {
      process.env.SIREN_API_KEY = 'sk_siren_env123';
      const args = ['--tools=all'];
      const result = parseArgs(args);
      
      expect(result.apiKey).toBe('sk_siren_env123');
    });

    it('should throw error for missing tools argument', () => {
      const args = ['--api-key=sk_siren_test123'];
      
      expect(() => parseArgs(args)).toThrow('The --tools argument must be provided.');
    });

    it('should throw error for missing API key', () => {
      const args = ['--tools=all'];
      
      expect(() => parseArgs(args)).toThrow(
        'Siren API key not provided. Please either pass it as an argument --api-key=$KEY or set the SIREN_API_KEY environment variable.'
      );
    });

    it('should throw error for invalid API key format', () => {
      const args = ['--tools=all', '--api-key=invalid_key'];
      
      expect(() => parseArgs(args)).toThrow(
        'Siren API key must start with "sk_siren_", "sk_test_", or "sk_live_".'
      );
    });

    it('should accept sk_test_ API key format', () => {
      const args = ['--tools=all', '--api-key=sk_test_123456'];
      const result = parseArgs(args);
      
      expect(result.apiKey).toBe('sk_test_123456');
    });

    it('should accept sk_live_ API key format', () => {
      const args = ['--tools=all', '--api-key=sk_live_123456'];
      const result = parseArgs(args);
      
      expect(result.apiKey).toBe('sk_live_123456');
    });

    it('should throw error for invalid workspace format', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123', '--workspace=invalid'];
      
      expect(() => parseArgs(args)).toThrow('Siren workspace must start with "ws_".');
    });

    it('should throw error for invalid tool name', () => {
      const args = ['--tools=invalid.tool', '--api-key=sk_siren_test123'];
      
      expect(() => parseArgs(args)).toThrow(
        'Invalid tool: invalid.tool. Accepted tools are:'
      );
    });

    it('should throw error for invalid argument', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123', '--invalid=value'];
      
      expect(() => parseArgs(args)).toThrow(
        'Invalid argument: invalid. Accepted arguments are: api-key, tools, workspace, endpoint'
      );
    });

    it('should handle multiple valid tools', () => {
      const validTools = [
        'messaging.send',
        'templates.list',
        'users.add',
        'workflows.trigger',
        'webhooks.configureNotification'
      ];
      const args = [`--tools=${validTools.join(',')}`, '--api-key=sk_siren_test123'];
      const result = parseArgs(args);
      
      expect(result.tools).toEqual(validTools);
    });

    it('should handle mix of valid and all tools', () => {
      const args = ['--tools=all,messaging.send', '--api-key=sk_siren_test123'];
      const result = parseArgs(args);
      
      expect(result.tools).toEqual(['all', 'messaging.send']);
    });
  });

  describe('Tool validation', () => {
    const validTools = [
      'messaging.send',
      'messaging.getStatus',
      'messaging.getReplies',
      'templates.list',
      'templates.create',
      'templates.update',
      'templates.delete',
      'templates.publish',
      'users.add',
      'users.update',
      'users.delete',
      'workflows.trigger',
      'workflows.triggerBulk',
      'workflows.schedule',
      'webhooks.configureNotification',
      'webhooks.configureInbound',
    ];

    validTools.forEach((tool) => {
      it(`should accept valid tool: ${tool}`, () => {
        const args = [`--tools=${tool}`, '--api-key=sk_siren_test123'];
        expect(() => parseArgs(args)).not.toThrow();
      });
    });

    it('should accept all 16 tools when using "all"', () => {
      const args = ['--tools=all', '--api-key=sk_siren_test123'];
      const result = parseArgs(args);
      
      expect(result.tools).toEqual(['all']);
    });
  });
});