import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "dev-secret";

type JwtPayload = { userId: number; email: string };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }

  const cookieToken = req.cookies.get("token")?.value;
  return cookieToken || null;
}

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
