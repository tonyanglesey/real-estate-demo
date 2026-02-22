import { query } from '../db/index.js';
import { draftFollowupWithClaude, scoreLeadWithClaude } from '../services/claude.js';

function parseLeadId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function fetchLeadOr404(id, res) {
  const result = await query('SELECT * FROM leads WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    res.status(404).json({ error: 'Lead not found' });
    return null;
  }

  return result.rows[0];
}

export async function scoreLead(req, res, next) {
  try {
    const id = parseLeadId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid lead id' });
    }

    const lead = await fetchLeadOr404(id, res);
    if (!lead) return;

    const ai = await scoreLeadWithClaude(lead);

    const updated = await query(
      `
      UPDATE leads
      SET ai_score = $1, ai_reasoning = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `,
      [ai.score, ai.reasoning, id]
    );

    res.json({
      lead: updated.rows[0],
      ai,
    });
  } catch (error) {
    next(error);
  }
}

export async function draftFollowup(req, res, next) {
  try {
    const id = parseLeadId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid lead id' });
    }

    const lead = await fetchLeadOr404(id, res);
    if (!lead) return;

    const draft = await draftFollowupWithClaude(lead);

    const updated = await query(
      `
      UPDATE leads
      SET ai_draft = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `,
      [draft, id]
    );

    res.json({
      lead: updated.rows[0],
      draft,
    });
  } catch (error) {
    next(error);
  }
}
