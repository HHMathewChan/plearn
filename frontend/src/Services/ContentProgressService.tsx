const API_BASE_URL = 'http://localhost:3001/api/content-progress-routes';

export class ContentProgressService {
  static async hasContentProgress(studentCode: string, contentId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/content-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'hasContentProgress',
          student_code: studentCode,
          content_id: contentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.hasProgress || false;
    } catch (error) {
      console.error('Error checking content progress:', error);
      throw error;
    }
  }

  static async createContentProgress(studentCode: string, contentId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/content-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          student_code: studentCode,
          content_id: contentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating content progress:', error);
      throw error;
    }
  }

  static async updateContentProgress(
    studentCode: string,
    contentId: string,
    status: 'complete' | 'not_started'
  ): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/content-progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_code: studentCode,
          content_id: contentId,
          status: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating content progress:', error);
      throw error;
    }
  }
}