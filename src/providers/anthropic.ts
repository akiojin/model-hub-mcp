import axios from 'axios';

export interface AnthropicModel {
  type: string;
  id: string;
  display_name: string;
  created_at: string;
}

export class AnthropicProvider {
  private apiKey: string;
  private baseURL = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async listModels(): Promise<AnthropicModel[]> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      });

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Anthropic API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async getModel(modelId: string): Promise<AnthropicModel> {
    try {
      const response = await axios.get(`${this.baseURL}/models/${modelId}`, {
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Anthropic API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}