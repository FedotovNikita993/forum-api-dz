import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { CategoryRepository } from './modules/category/category.repository';
import { CategoryService } from './modules/category/category.service';
import { CategoryHandler } from './modules/category/category.handler';
import { createCategoryRouter } from './modules/category/category.router';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoryRepo = new CategoryRepository(prisma);
const categoryService = new CategoryService(categoryRepo);
const categoryHandler = new CategoryHandler(categoryService);

app.use('/categories', createCategoryRouter(categoryHandler));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});