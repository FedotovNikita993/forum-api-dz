import { PrismaClient } from '@prisma/client';

export class PostRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: { title: string; content: string; categoryId: number }) {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        category: {
          connect: { id: data.categoryId }
        }
      },
      include: { category: true }
    });
  }

  async findAll(categoryName?: string) {
    return this.prisma.post.findMany({
      where: categoryName ? { category: { name: categoryName } } : {},
      include: { category: true }
    });
  }

  async findById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { category: true }
    });
  }
}