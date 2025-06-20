import { isToolAllowed } from '../lib/configuration';

describe('Configuration', () => {
  const mockTool = {
    method: 'send_message',
    name: 'Send Message',
    description: 'Send a message',
    parameters: {} as any,
    actions: {
      messaging: {
        create: true,
      },
    },
    execute: jest.fn(),
  };

  it('should allow tool when no configuration provided', () => {
    expect(isToolAllowed(mockTool)).toBe(true);
  });

  it('should allow tool when actions match configuration', () => {
    const configuration = {
      actions: {
        messaging: {
          create: true,
        },
      },
    };
    expect(isToolAllowed(mockTool, configuration)).toBe(true);
  });

  it('should deny tool when actions do not match configuration', () => {
    const configuration = {
      actions: {
        messaging: {
          create: false,
        },
      },
    };
    expect(isToolAllowed(mockTool, configuration)).toBe(false);
  });

  it('should deny tool when resource not in configuration', () => {
    const configuration = {
      actions: {
        templates: {
          create: true,
        },
      },
    };
    expect(isToolAllowed(mockTool, configuration)).toBe(false);
  });
});