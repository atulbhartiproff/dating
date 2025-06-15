// services/api.js
const API_BASE_URL = 'https://your-api-endpoint.com';

class ApiService {
  async fetchProfiles(limit = 10, offset = 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/profiles?limit=${limit}&offset=${offset}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      throw error;
    }
  }

  async sendSwipe(profileId, direction) {
    try {
      const response = await fetch(`${API_BASE_URL}/swipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId,
          direction,
          timestamp: Date.now()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to send swipe:', error);
      throw error;
    }
  }

  async getMatches() {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      throw error;
    }
  }
}

export default new ApiService();
