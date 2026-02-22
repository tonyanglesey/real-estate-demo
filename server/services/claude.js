import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest';

const parseJsonResponse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('Claude response did not include valid JSON');
    }
    return JSON.parse(match[0]);
  }
};

export async function scoreLeadWithClaude(lead) {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured in server/.env');
  }

  const prompt = `Given this real estate lead inquiry, score the lead from 1-100 based on:
- Budget clarity and range
- Timeline urgency
- Seriousness of inquiry
- Property type specificity

Return only valid JSON in this exact shape:
{"score": number, "reasoning": string}

Lead data:\n${JSON.stringify(lead, null, 2)}`;

  const response = await anthropic.messages.create({
    model,
    max_tokens: 300,
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  const parsed = parseJsonResponse(text);

  return {
    score: Math.max(1, Math.min(100, Number(parsed.score) || 1)),
    reasoning: String(parsed.reasoning || ''),
  };
}

export async function draftFollowupWithClaude(lead) {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured in server/.env');
  }

  const prompt = `You are a professional property management consultant.
Write a warm, professional follow-up email for this lead.
Be specific to their inquiry. Keep it under 200 words.

Lead data:\n${JSON.stringify(lead, null, 2)}`;

  const response = await anthropic.messages.create({
    model,
    max_tokens: 500,
    temperature: 0.5,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  return text;
}
