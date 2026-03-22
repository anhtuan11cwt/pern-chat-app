import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getServerSession } from "../services/getSession.service";

export const createOrGetConversation = async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);
    if (!session?.user?.id)
      return res.status(401).json({ message: "Chưa xác thực" });

    const currentUserId = session.user.id;
    const otherUserId = req.params.userId as string;

    if (currentUserId === otherUserId)
      return res
        .status(400)
        .json({ message: "Không thể trò chuyện với chính mình" });

    const existing = await prisma.conversation.findFirst({
      include: { participants: true },
      where: {
        AND: [
          { participants: { some: { id: currentUserId } } },
          { participants: { some: { id: otherUserId } } },
          {
            participants: {
              every: { id: { in: [currentUserId, otherUserId] } },
            },
          },
        ],
      },
    });

    if (existing) return res.json(existing);

    const newConversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: [{ id: currentUserId }, { id: otherUserId }],
        },
      },
      include: { participants: true },
    });

    res.json(newConversation);
  } catch (err) {
    console.error("Conversation error:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
