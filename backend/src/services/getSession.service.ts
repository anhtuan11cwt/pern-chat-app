import { fromNodeHeaders } from "better-auth/node";
import type { Request } from "express";
import { auth } from "../lib/auth";

// Helper tái sử dụng — kiểm tra authentication ở mọi route
export async function getServerSession(req: Request) {
  return await auth.api.getSession({
    headers: fromNodeHeaders(req.headers as Record<string, string>),
  });
}
