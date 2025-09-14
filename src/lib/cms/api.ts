import { User } from './auth';

const API_BASE = '/api';

class CMSApi {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('cms-token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Auth endpoints - Mock implementation for development
  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
    // Mock authentication for development
    const mockUsers = [
      {
        id: "admin-001",
        email: "admin@govisan.com", 
        passwordHash: "hashed_admin123",
        role: "admin" as const,
        name: "Administrator",
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: null,
        twoFactorEnabled: false
      }
    ];

    const user = mockUsers.find(u => u.email === email);
    if (!user || `hashed_${password}` !== user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    const { passwordHash, ...userWithoutPassword } = user;
    const token = this.generateMockToken(userWithoutPassword);
    
    return { token, user: userWithoutPassword };
  }

  private generateMockToken(user: Omit<User, 'passwordHash'>): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };
    
    // Mock JWT token for development
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadEncoded = btoa(JSON.stringify(payload));
    return `${header}.${payloadEncoded}.mock_signature`;
  }

  async getProfile(): Promise<Omit<User, 'passwordHash'>> {
    return this.request('/auth/me');
  }

  // Content endpoints
  async getContent(type: string, id?: string): Promise<any> {
    const endpoint = id ? `/content/${type}/${id}` : `/content/${type}`;
    return this.request(endpoint);
  }

  async saveContent(type: string, id: string | null, data: any): Promise<any> {
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/content/${type}/${id}` : `/content/${type}`;
    
    return this.request(endpoint, {
      method,
      body: JSON.stringify(data),
    });
  }

  async deleteContent(type: string, id: string): Promise<void> {
    return this.request(`/content/${type}/${id}`, {
      method: 'DELETE',
    });
  }

  // Media endpoints
  async uploadMedia(files: FileList): Promise<{ files: Array<{ url: string; name: string; size: number }> }> {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));

    const token = localStorage.getItem('cms-token');
    const response = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return response.json();
  }

  async getMedia(): Promise<Array<{ url: string; name: string; size: number; createdAt: string }>> {
    return this.request('/media');
  }

  async deleteMedia(filename: string): Promise<void> {
    return this.request(`/media/${filename}`, {
      method: 'DELETE',
    });
  }

  // Preview endpoints
  async enablePreview(): Promise<{ token: string }> {
    return this.request('/preview/enable', {
      method: 'POST',
    });
  }

  async disablePreview(): Promise<void> {
    return this.request('/preview/disable', {
      method: 'POST',
    });
  }

  // Export/Import
  async exportContent(): Promise<Blob> {
    const token = localStorage.getItem('cms-token');
    const response = await fetch(`${API_BASE}/export`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Export failed: ${response.status}`);
    }
    
    return response.blob();
  }

  async importContent(file: File): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('cms-token');
    const response = await fetch(`${API_BASE}/import`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Import failed: ${response.status}`);
    }

    return response.json();
  }

  // Link audit
  async auditLinks(): Promise<{ report: any }> {
    return this.request('/audit/links', {
      method: 'POST',
    });
  }

  async getLinkReport(): Promise<any> {
    return this.request('/audit/links');
  }
}

export const cmsApi = new CMSApi();