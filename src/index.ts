#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { OpenAIProvider } from './providers/openai.js';
import { AnthropicProvider } from './providers/anthropic.js';
import { GoogleProvider } from './providers/google.js';

dotenv.config();

const server = new Server(
  {
    name: 'model-hub-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const openaiProvider = process.env.OPENAI_API_KEY ? new OpenAIProvider(process.env.OPENAI_API_KEY) : null;
const anthropicProvider = process.env.ANTHROPIC_API_KEY ? new AnthropicProvider(process.env.ANTHROPIC_API_KEY) : null;
const googleProvider = process.env.GOOGLE_API_KEY ? new GoogleProvider(process.env.GOOGLE_API_KEY) : null;

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_models',
        description: 'List all available models from a specific provider',
        inputSchema: {
          type: 'object',
          properties: {
            provider: {
              type: 'string',
              enum: ['openai', 'anthropic', 'google'],
              description: 'The AI provider to list models from',
            },
          },
          required: ['provider'],
        },
      },
      {
        name: 'get_model',
        description: 'Get details of a specific model from a provider',
        inputSchema: {
          type: 'object',
          properties: {
            provider: {
              type: 'string',
              enum: ['openai', 'anthropic', 'google'],
              description: 'The AI provider',
            },
            model_id: {
              type: 'string',
              description: 'The model ID to fetch details for',
            },
          },
          required: ['provider', 'model_id'],
        },
      },
      {
        name: 'list_all_models',
        description: 'List all available models from all configured providers',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'list_models': {
        const { provider } = args as { provider: string };
        
        switch (provider) {
          case 'openai':
            if (!openaiProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'OpenAI API key not configured');
            }
            const openaiModels = await openaiProvider.listModels();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(openaiModels, null, 2),
                },
              ],
            };
            
          case 'anthropic':
            if (!anthropicProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'Anthropic API key not configured');
            }
            const anthropicModels = await anthropicProvider.listModels();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(anthropicModels, null, 2),
                },
              ],
            };
            
          case 'google':
            if (!googleProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'Google API key not configured');
            }
            const googleModels = await googleProvider.listModels();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(googleModels, null, 2),
                },
              ],
            };
            
          default:
            throw new McpError(ErrorCode.InvalidRequest, `Unknown provider: ${provider}`);
        }
      }
      
      case 'get_model': {
        const { provider, model_id } = args as { provider: string; model_id: string };
        
        switch (provider) {
          case 'openai':
            if (!openaiProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'OpenAI API key not configured');
            }
            const openaiModel = await openaiProvider.getModel(model_id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(openaiModel, null, 2),
                },
              ],
            };
            
          case 'anthropic':
            if (!anthropicProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'Anthropic API key not configured');
            }
            const anthropicModel = await anthropicProvider.getModel(model_id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(anthropicModel, null, 2),
                },
              ],
            };
            
          case 'google':
            if (!googleProvider) {
              throw new McpError(ErrorCode.InvalidRequest, 'Google API key not configured');
            }
            const googleModel = await googleProvider.getModel(model_id);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(googleModel, null, 2),
                },
              ],
            };
            
          default:
            throw new McpError(ErrorCode.InvalidRequest, `Unknown provider: ${provider}`);
        }
      }
      
      case 'list_all_models': {
        const results: any = {};
        
        if (openaiProvider) {
          try {
            results.openai = await openaiProvider.listModels();
          } catch (error) {
            results.openai = { error: error instanceof Error ? error.message : 'Failed to fetch OpenAI models' };
          }
        }
        
        if (anthropicProvider) {
          try {
            results.anthropic = await anthropicProvider.listModels();
          } catch (error) {
            results.anthropic = { error: error instanceof Error ? error.message : 'Failed to fetch Anthropic models' };
          }
        }
        
        if (googleProvider) {
          try {
            results.google = await googleProvider.listModels();
          } catch (error) {
            results.google = { error: error instanceof Error ? error.message : 'Failed to fetch Google models' };
          }
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }
      
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(ErrorCode.InternalError, error instanceof Error ? error.message : 'Unknown error');
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Model Hub MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});