CREATE TABLE IF NOT EXISTS nurture_emails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id uuid REFERENCES firms(id),
  day integer NOT NULL,
  sent_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_nurture_firm_day ON nurture_emails(firm_id, day);
