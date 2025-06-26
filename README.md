# model-hub-mcp

[日本語版 README](./README.ja.md)

An MCP (Model Context Protocol) server that fetches AI model information from OpenAI, Anthropic, and Google.

## Features

- **Multi-provider Support**: Supports three providers - OpenAI, Anthropic, and Google AI
- **List Models**: Retrieve a list of available models from each provider
- **Get Model Details**: Fetch detailed information about specific models
- **Unified Retrieval**: Batch fetch model information from all configured providers

## Quick Start (npx)

```bash
# Run with environment variables
OPENAI_API_KEY=your_key npx @akiojin/model-hub-mcp
```

Note: The package will be downloaded from npm on first run.

## Installation

### Global Installation

```bash
npm install -g @akiojin/model-hub-mcp
```

### Local Installation

```bash
npm install @akiojin/model-hub-mcp
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Set API keys for each provider in the `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

Note: You can leave API keys empty for providers you don't plan to use.

## Build

Compile TypeScript code:
```bash
npm run build
```

## Usage

Start as MCP server:
```bash
npm start
```

Development mode (run TypeScript directly):
```bash
npm run dev
```

## Available Tools

### list_models
Retrieve a list of available models from a specific provider.

Parameters:
- `provider`: "openai" | "anthropic" | "google"

### get_model
Fetch detailed information about a specific model.

Parameters:
- `provider`: "openai" | "anthropic" | "google"
- `model_id`: Model ID (e.g., "gpt-4", "claude-3-opus", "gemini-pro")

### list_all_models
Batch fetch model information from all configured providers.

## MCP Client Configuration Examples

### Using npx

```json
{
  "mcpServers": {
    "model-hub": {
      "command": "npx",
      "args": ["@akiojin/model-hub-mcp"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key",
        "ANTHROPIC_API_KEY": "your_anthropic_api_key",
        "GOOGLE_API_KEY": "your_google_api_key"
      }
    }
  }
}
```

### After Global Installation

```json
{
  "mcpServers": {
    "model-hub": {
      "command": "model-hub-mcp",
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key",
        "ANTHROPIC_API_KEY": "your_anthropic_api_key",
        "GOOGLE_API_KEY": "your_google_api_key"
      }
    }
  }
}
```

### After Local Installation

```json
{
  "mcpServers": {
    "model-hub": {
      "command": "node",
      "args": ["node_modules/@akiojin/model-hub-mcp/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key",
        "ANTHROPIC_API_KEY": "your_anthropic_api_key",
        "GOOGLE_API_KEY": "your_google_api_key"
      }
    }
  }
}
```

## License

MIT