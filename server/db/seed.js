import { query, pool } from './index.js';

const leads = [
  {
    name: 'Mia Johnson',
    email: 'mia.johnson@example.com',
    phone: '404-555-0111',
    inquiry_message:
      'Looking for a 3-bedroom single-family home near good schools. We are pre-approved and ready to move quickly.',
    property_type: 'single-family',
    budget_min: 425000,
    budget_max: 525000,
    timeline: 'immediate',
    status: 'qualified',
  },
  {
    name: 'Noah Patel',
    email: 'noah.patel@example.com',
    phone: '312-555-0142',
    inquiry_message:
      'Interested in a condo downtown. Main priority is walkability and low HOA. Planning to buy in the next 2-3 months.',
    property_type: 'condo',
    budget_min: 300000,
    budget_max: 390000,
    timeline: '1-3 months',
    status: 'contacted',
  },
  {
    name: 'Avery Carter',
    email: 'avery.carter@example.com',
    phone: '720-555-0177',
    inquiry_message:
      'Need a small multi-unit property for house hacking. I am comparing neighborhoods and rental comps right now.',
    property_type: 'multi-unit',
    budget_min: 550000,
    budget_max: 700000,
    timeline: '3-6 months',
    status: 'new',
  },
  {
    name: 'Ethan Brooks',
    email: 'ethan.brooks@example.com',
    phone: '646-555-0198',
    inquiry_message:
      'Our company needs a small office with parking and easy highway access. We can sign quickly if terms fit.',
    property_type: 'commercial',
    budget_min: 900000,
    budget_max: 1300000,
    timeline: 'immediate',
    status: 'qualified',
  },
  {
    name: 'Sophia Ramirez',
    email: 'sophia.ramirez@example.com',
    phone: '786-555-0134',
    inquiry_message:
      'First-time buyer here, still learning. Looking for a condo near public transit and low maintenance.',
    property_type: 'condo',
    budget_min: 240000,
    budget_max: 315000,
    timeline: '6+ months',
    status: 'new',
  },
  {
    name: 'Liam Nguyen',
    email: 'liam.nguyen@example.com',
    phone: '214-555-0120',
    inquiry_message:
      'Need a single-family rental investment in a stable neighborhood with strong school demand.',
    property_type: 'single-family',
    budget_min: 320000,
    budget_max: 410000,
    timeline: '1-3 months',
    status: 'contacted',
  },
  {
    name: 'Olivia Foster',
    email: 'olivia.foster@example.com',
    phone: '503-555-0166',
    inquiry_message:
      'Relocating for work and need something soon. Prefer turnkey condo with dedicated parking.',
    property_type: 'condo',
    budget_min: 360000,
    budget_max: 450000,
    timeline: 'immediate',
    status: 'contacted',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    phone: '206-555-0152',
    inquiry_message:
      'Exploring mixed-use commercial options with long-term value. I can move fast for the right cap rate.',
    property_type: 'commercial',
    budget_min: 1100000,
    budget_max: 1800000,
    timeline: '1-3 months',
    status: 'qualified',
  },
  {
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    phone: '917-555-0128',
    inquiry_message:
      'Trying to find a small duplex with good rental upside. Mostly researching at this point.',
    property_type: 'multi-unit',
    budget_min: 650000,
    budget_max: 820000,
    timeline: '6+ months',
    status: 'new',
  },
  {
    name: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    phone: '602-555-0181',
    inquiry_message:
      'Need a family home with backyard and 4 bedrooms. We sold our current house and have cash ready.',
    property_type: 'single-family',
    budget_min: 500000,
    budget_max: 640000,
    timeline: 'immediate',
    status: 'qualified',
  },
  {
    name: 'Amelia Wilson',
    email: 'amelia.wilson@example.com',
    phone: '305-555-0149',
    inquiry_message:
      'Considering a condo purchase as a second home. Timeline flexible but want a good neighborhood.',
    property_type: 'condo',
    budget_min: 420000,
    budget_max: 560000,
    timeline: '3-6 months',
    status: 'contacted',
  },
  {
    name: 'Mason Hernandez',
    email: 'mason.hernandez@example.com',
    phone: '512-555-0199',
    inquiry_message:
      'Looking for a small retail commercial space for my business expansion this year.',
    property_type: 'commercial',
    budget_min: 750000,
    budget_max: 980000,
    timeline: '3-6 months',
    status: 'new',
  },
  {
    name: 'Isabella Moore',
    email: 'isabella.moore@example.com',
    phone: '818-555-0104',
    inquiry_message:
      'Want to buy a triplex near transit. I am serious and already talking to lenders.',
    property_type: 'multi-unit',
    budget_min: 900000,
    budget_max: 1200000,
    timeline: '1-3 months',
    status: 'qualified',
  },
  {
    name: 'Elijah Adams',
    email: 'elijah.adams@example.com',
    phone: '415-555-0173',
    inquiry_message:
      'Need an entry-level condo with low monthly costs. Starting my search now.',
    property_type: 'condo',
    budget_min: 280000,
    budget_max: 350000,
    timeline: '6+ months',
    status: 'new',
  },
  {
    name: 'Harper Scott',
    email: 'harper.scott@example.com',
    phone: '973-555-0130',
    inquiry_message:
      'Looking for a single-family home close to commuter rail. We are pre-approved and flexible on style.',
    property_type: 'single-family',
    budget_min: 470000,
    budget_max: 610000,
    timeline: '1-3 months',
    status: 'contacted',
  },
  {
    name: 'Benjamin Young',
    email: 'benjamin.young@example.com',
    phone: '702-555-0118',
    inquiry_message:
      'Interested in a fourplex for long-term rental income. Need cash-flowing deals only.',
    property_type: 'multi-unit',
    budget_min: 800000,
    budget_max: 1050000,
    timeline: '3-6 months',
    status: 'contacted',
  },
  {
    name: 'Evelyn King',
    email: 'evelyn.king@example.com',
    phone: '408-555-0160',
    inquiry_message:
      'Searching for a commercial flex property for a design studio and warehouse combo.',
    property_type: 'commercial',
    budget_min: 1200000,
    budget_max: 1600000,
    timeline: '1-3 months',
    status: 'new',
  },
  {
    name: 'James Wright',
    email: 'james.wright@example.com',
    phone: '617-555-0157',
    inquiry_message:
      'Need a townhome-style condo by summer. I can put 20% down and move quickly after inspection.',
    property_type: 'condo',
    budget_min: 390000,
    budget_max: 490000,
    timeline: '3-6 months',
    status: 'qualified',
  },
  {
    name: 'Abigail Green',
    email: 'abigail.green@example.com',
    phone: '412-555-0184',
    inquiry_message:
      'Exploring single-family options now, but not rushing. Want to understand neighborhoods first.',
    property_type: 'single-family',
    budget_min: 340000,
    budget_max: 430000,
    timeline: '6+ months',
    status: 'new',
  },
  {
    name: 'Henry Baker',
    email: 'henry.baker@example.com',
    phone: '925-555-0125',
    inquiry_message:
      'Seeking a warehouse-heavy commercial property with strong logistics access near the freeway.',
    property_type: 'commercial',
    budget_min: 1500000,
    budget_max: 2300000,
    timeline: 'immediate',
    status: 'qualified',
  },
  {
    name: 'Ella Nelson',
    email: 'ella.nelson@example.com',
    phone: '704-555-0191',
    inquiry_message:
      'I want to buy a duplex in a neighborhood with low vacancy and stable rents.',
    property_type: 'multi-unit',
    budget_min: 540000,
    budget_max: 690000,
    timeline: '1-3 months',
    status: 'contacted',
  },
  {
    name: 'Sebastian Hill',
    email: 'sebastian.hill@example.com',
    phone: '281-555-0170',
    inquiry_message:
      'Looking for a detached home with room for a home office and large garage.',
    property_type: 'single-family',
    budget_min: 430000,
    budget_max: 560000,
    timeline: '3-6 months',
    status: 'new',
  },
  {
    name: 'Aria Torres',
    email: 'aria.torres@example.com',
    phone: '510-555-0164',
    inquiry_message:
      'Need a modern condo close to nightlife and transit. I am actively touring this month.',
    property_type: 'condo',
    budget_min: 460000,
    budget_max: 580000,
    timeline: 'immediate',
    status: 'qualified',
  },
  {
    name: 'David Rivera',
    email: 'david.rivera@example.com',
    phone: '407-555-0146',
    inquiry_message:
      'Considering my first small office purchase; still comparing lease vs buy.',
    property_type: 'commercial',
    budget_min: 680000,
    budget_max: 840000,
    timeline: '6+ months',
    status: 'new',
  },
  {
    name: 'Chloe Reed',
    email: 'chloe.reed@example.com',
    phone: '323-555-0159',
    inquiry_message:
      'Looking for a 2-unit property to live in one side and rent the other. Financing in progress.',
    property_type: 'multi-unit',
    budget_min: 720000,
    budget_max: 910000,
    timeline: '1-3 months',
    status: 'contacted',
  },
];

async function seed() {
  await query('BEGIN');
  try {
    await query('TRUNCATE TABLE leads RESTART IDENTITY');

    for (const lead of leads) {
      await query(
        `
        INSERT INTO leads (
          name, email, phone, inquiry_message, property_type,
          budget_min, budget_max, timeline, status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.inquiry_message,
          lead.property_type,
          lead.budget_min,
          lead.budget_max,
          lead.timeline,
          lead.status,
        ]
      );
    }

    await query('COMMIT');
    console.log(`Seeded ${leads.length} leads`);
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
