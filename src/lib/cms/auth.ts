import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'govisan-cms-secret-key-change-in-production';
const JWT_EXPIRES = '7d';

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

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: Omit<User, 'passwordHash'>): string => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};

export const verifyToken = (token: string): AuthToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch {
    return null;
  }
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