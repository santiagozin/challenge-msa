import { Router, Request, Response, NextFunction } from 'express';
import { 
  getElections,
  getLists,
  createElection,   
} from "../controllers/election";

const router = Router();

router.post('/results', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createElection(req, res);
  } catch (error) {
    next(error);
  }
});
router.get('/history', (req, res, next) => getElections(req, res).catch(next));
router.get('/lists', (req, res, next) => getLists(req, res).catch(next));

export default router;