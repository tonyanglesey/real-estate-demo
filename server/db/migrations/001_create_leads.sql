CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  inquiry_message TEXT NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  timeline VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  ai_score INTEGER,
  ai_reasoning TEXT,
  ai_draft TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_ai_score ON leads(ai_score);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
