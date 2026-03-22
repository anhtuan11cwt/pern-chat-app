import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getServerSession } from "../services/getSession.service";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);
    if (!session?.user?.id)
      return res.status(401).json({ message: "Chưa xác thực" });

    const { content, conversationId } = req.body;

    if (!content || !conversationId) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const conversation = await prisma.conversation.findUnique({
      include: { participants: true },
      where: { id: conversationId },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Cuộc hội thoại không tồn tại" });
    }

    const isParticipant = conversation.participants.some(
      (u) => u.id === session.user.id,
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: { avatar: true, id: true, name: true },
        },
      },
    });

    // TODO: Emit Socket (realtime) — Bước 19

    res.status(201).json(message);
  } catch (err) {
    console.error("Create message error:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const session = await getServerSession(req);
    if (!session?.user?.id)
      return res.status(401).json({ message: "Chưa xác thực" });

    const conversationId = req.params.conversationId as string;

    const conversation = await prisma.conversation.findUnique({
      include: { participants: { select: { id: true } } },
      where: { id: conversationId },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Cuộc hội thoại không tồn tại" });
    }

    const isParticipant = conversation.participants.some(
      (u: { id: string }) => u.id === session.user.id,
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }

    const messages = await prisma.message.findMany({
      include: {
        sender: {
          select: { avatar: true, id: true, name: true },
        },
      },
      orderBy: { createdAt: "asc" },
      where: { conversationId },
    });

    res.json({ messages });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
