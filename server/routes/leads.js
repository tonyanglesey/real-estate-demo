import express from 'express';
import {
  createLead,
  getLeadById,
  getLeads,
  updateLead,
} from '../controllers/leadsController.js';
import { draftFollowup, scoreLead } from '../controllers/aiController.js';

const router = express.Router();

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.patch('/:id', updateLead);

router.post('/:id/score', scoreLead);
router.post('/:id/draft', draftFollowup);

export default router;
