import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getServerSession } from "../services/getSession.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);
    if (!session?.user?.id)
      return res.status(401).json({ message: "Không được phép truy cập" });

    const search = (req.query.search as string) || "";

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { avatar: true, bio: true, email: true, id: true, name: true },
      where: {
        id: { not: session.user.id },
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    res.json({ users });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách người dùng:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
