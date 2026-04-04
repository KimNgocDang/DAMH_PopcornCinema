import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  userRole?: string;
}

export const generateToken = (
  payload: JwtPayload,
  secret?: string,
  expiresIn: SignOptions["expiresIn"] = "24h"
): string => {
  const tokenSecret = secret || process.env.JWT_SECRET;

  if (!tokenSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, tokenSecret, { expiresIn });
};

export const verifyToken = (
  token: string,
  secret?: string
): JwtPayload => {
  const tokenSecret = secret || process.env.JWT_SECRET;

  if (!tokenSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.verify(token, tokenSecret) as JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch {
    return null;
  }
};