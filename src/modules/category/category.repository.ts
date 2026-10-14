import { PrismaClient } from '@prisma/client';

export class CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.category.findUnique({ where: { name } });
  }

  async create(data: { name: string }) {
    return this.prisma.category.create({ data });
  }
}