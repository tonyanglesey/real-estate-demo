import { query } from '../db/index.js';

const VALID_STATUSES = new Set(['new', 'contacted', 'qualified', 'lost', 'closed']);

function parseLeadId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function getLeads(req, res, next) {
  try {
    const { status, sortBy = 'created_at', sortOrder = 'desc' } = req.query;

    const where = [];
    const params = [];

    if (status) {
      params.push(status);
      where.push(`status = $${params.length}`);
    }

    const sortable = {
      created_at: 'created_at',
      ai_score: 'ai_score',
      budget_min: 'budget_min',
      budget_max: 'budget_max',
    };

    const sortColumn = sortable[sortBy] || 'created_at';
    const direction = sortOrder === 'asc' ? 'ASC' : 'DESC';

    const result = await query(
      `
      SELECT *
      FROM leads
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY ${sortColumn} ${direction}, id DESC
    `,
      params
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

export async function getLeadById(req, res, next) {
  try {
    const id = parseLeadId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid lead id' });
    }

    const result = await query('SELECT * FROM leads WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createLead(req, res, next) {
  try {
    const {
      name,
      email,
      phone = null,
      inquiry_message,
      property_type,
      budget_min = null,
      budget_max = null,
      timeline = null,
      status = 'new',
    } = req.body;

    if (!name || !email || !inquiry_message || !property_type) {
      return res.status(400).json({
        error: 'name, email, inquiry_message, and property_type are required',
      });
    }

    if (!VALID_STATUSES.has(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await query(
      `
      INSERT INTO leads (
        name, email, phone, inquiry_message, property_type,
        budget_min, budget_max, timeline, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
    `,
      [
        name,
        email,
        phone,
        inquiry_message,
        property_type,
        budget_min,
        budget_max,
        timeline,
        status,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateLead(req, res, next) {
  try {
    const id = parseLeadId(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Invalid lead id' });
    }

    const { status } = req.body;

    if (!status || !VALID_STATUSES.has(status)) {
      return res.status(400).json({ error: 'Valid status is required' });
    }

    const result = await query(
      `
      UPDATE leads
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
