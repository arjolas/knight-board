import axios from "axios";

export class ApiService {
  static async fetchBoard(apiUrl: string) {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch board data.");
    }
  }
  
  static async fetchCommands(apiUrl: string) {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch commands data.");
    }
  }
}
