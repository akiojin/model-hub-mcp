import axios from 'axios';

export interface OpenAIModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export class OpenAIProvider {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async listModels(): Promise<OpenAIModel[]> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`OpenAI API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async getModel(modelId: string): Promise<OpenAIModel> {
    try {
      const response = await axios.get(`${this.baseURL}/models/${modelId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`OpenAI API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}