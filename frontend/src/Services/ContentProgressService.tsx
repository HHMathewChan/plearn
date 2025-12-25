import type { updatedResult } from "../Types/ContentProgressResult";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function hasContentProgress(studentCode: string, contentId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/content-progress-routes/content-progress`, {
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

export async function createContentProgress(studentCode: string, contentId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/content-progress-routes/content-progress`, {
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

export async function updateContentProgress(
  studentCode: string,
  contentId: string,
  status: 'completed' | 'not_started'
): Promise<updatedResult> {
  try {
    const response = await fetch(`${API_BASE}/content-progress-routes/content-progress`, {
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
    const data: updatedResult = await response.json();
    console.log("Update content progress response data:", data);
    return data;

  } catch (error) {
    console.error('Error updating content progress:', error);
    throw error;
  }
}

/**
 * get a specific content progress status
 */
export async function getContentProgress(studentCode: string, contentId: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE}/content-progress-routes/content-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getStatus',
        student_code: studentCode,
        content_id: contentId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.status || null;
  } catch (error) {
    console.error('Error getting content progress:', error);
    throw error;
  }
}