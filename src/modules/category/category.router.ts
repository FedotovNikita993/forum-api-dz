import { Router } from 'express';
import { CategoryHandler } from './category.handler';

export function createCategoryRouter(handler: CategoryHandler): Router {
  const router = Router();
  router.get('/', handler.getAll);
  router.get('/:id', handler.getById);
  router.post('/', handler.create);
  return router;
}