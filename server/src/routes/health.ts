import { Router, Request, Response, NextFunction } from 'express';
import { checkServicesHealth } from '../controllers/health';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await checkServicesHealth(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
