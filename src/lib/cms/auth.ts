// Note: bcryptjs and jsonwebtoken will be handled server-side
// For now, we'll implement client-side auth helpers

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  name: string;
  createdAt: string;
  lastLogin: string | null;
  twoFactorEnabled: boolean;
}

export interface AuthToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Browser-compatible JWT decoder (verification happens server-side)
const base64UrlDecode = (str: string): string => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  const padded = padding ? base64 + '='.repeat(4 - padding) : base64;
  return atob(padded);
};

const decodeJWT = (token: string): AuthToken | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp
    };
  } catch {
    return null;
  }
};

// Placeholder functions - actual implementation would be server-side
export const hashPassword = async (password: string): Promise<string> => {
  // In production, this would be handled server-side with bcrypt
  return `hashed_${password}`;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  // In production, this would be handled server-side with bcrypt
  return hash === `hashed_${password}`;
};

export const generateToken = (user: Omit<User, 'passwordHash'>): string => {
  // In production, this would be handled server-side with jsonwebtoken
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
};

export const verifyToken = (token: string): AuthToken | null => {
  return decodeJWT(token);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('cms-token');
  if (!token) return false;
  
  const decoded = verifyToken(token);
  return decoded !== null && decoded.exp > Date.now() / 1000;
};

export const getCurrentUser = (): AuthToken | null => {
  const token = localStorage.getItem('cms-token');
  if (!token) return null;
  
  return verifyToken(token);
};

export const logout = (): void => {
  localStorage.removeItem('cms-token');
  window.location.href = '/admin/login';
};