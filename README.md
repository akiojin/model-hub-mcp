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

1. Set API keys for each provider in the `.env` file:

```bash
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

This MCP server is not meant to be run directly. It should be configured in your MCP client configuration.

See the "MCP Client Configuration Examples" section below for setup instructions.

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

### Claude Code

You can easily add this MCP server to Claude Code using the following command:

```bash
claude mcp add model-hub -s user \
  -e GOOGLE_API_KEY=$GEMINI_API_KEY \
  -e OPENAI_API_KEY=$OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  -- npx -y @akiojin/model-hub-mcp
```

This command assumes you have environment variables set in your shell:

- `$GEMINI_API_KEY` - Your Google AI API key
- `$OPENAI_API_KEY` - Your OpenAI API key
- `$ANTHROPIC_API_KEY` - Your Anthropic API key

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

## License

MIT
