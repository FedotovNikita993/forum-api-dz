import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './category.dto';

export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async getAll() {
    return this.categoryRepo.findAll();
  }

  async getById(id: number) {
    const category = await this.categoryRepo.findById(id);
    if (!category) {
      const error: any = new Error('Category not found');
      error.status = 404;
      throw error;
    }
    return category;
  }

  async create(dto: CreateCategoryDto) {
    if (!dto || typeof dto.name !== 'string' || dto.name.trim() === '') {
      const error: any = new Error('Invalid fields: name is required');
      error.status = 422;
      throw error;
    }

    const existing = await this.categoryRepo.findByName(dto.name);
    if (existing) {
      const error: any = new Error('Category name already exists');
      error.status = 409;
      throw error;
    }

    return this.categoryRepo.create({ name: dto.name.trim() });
  }
}