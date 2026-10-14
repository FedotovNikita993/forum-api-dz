import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';

export class CategoryHandler {
  constructor(private service: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.getAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        return res.status(400).json({ error: 'Incorrect id format' });
      }
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id format' });
      }
      const category = await this.service.getById(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  };
}