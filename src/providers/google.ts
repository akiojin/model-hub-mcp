import axios from 'axios';

export interface GoogleModel {
  name: string;
  baseModelId: string;
  version: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
  supportedGenerationMethods: string[];
}

export class GoogleProvider {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async listModels(): Promise<GoogleModel[]> {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        params: {
          key: this.apiKey
        }
      });

      return response.data.models || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Google AI API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async getModel(modelId: string): Promise<GoogleModel> {
    try {
      const response = await axios.get(`${this.baseURL}/models/${modelId}`, {
        params: {
          key: this.apiKey
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Google AI API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}