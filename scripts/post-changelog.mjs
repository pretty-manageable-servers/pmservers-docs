// Posts new changelog entries to Discord.
// Usage: node scripts/post-changelog.mjs <old changelog.md> <new changelog.md>
// Needs DISCORD_WEBHOOK_URL. An entry is a "###" section under a "## YYYY-MM-DD" date.
import { readFileSync, existsSync } from 'node:fs';

const SITE_URL = 'https://docs.pmservers.org';
const CHANGELOG_URL = `${SITE_URL}/changelog/`;

function read_entries(path) {
  if (!path || !existsSync(path)) return [];
  const text = readFileSync(path, 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
  const entries = [];
  let date = null;
  let entry = null;
  for (const line of text.split('\n')) {
    const date_match = line.match(/^## (\d{4}-\d{2}-\d{2})\s*$/);
    if (date_match) {
      date = date_match[1];
      entry = null;
      continue;
    }
    const title_match = line.match(/^### (.+)$/);
    if (title_match && date) {
      entry = { date, title: title_match[1].trim(), body: [] };
      entries.push(entry);
      continue;
    }
    if (entry) entry.body.push(line);
  }
  return entries.map((e) => ({ ...e, body: e.body.join('\n').trim() }));
}

// Discord does not resolve site-relative links.
function make_links_absolute(text) {
  return text.replace(/\]\((\/[^)]*)\)/g, `](${SITE_URL}$1)`);
}

const [old_path, new_path] = process.argv.slice(2);
const webhook_url = process.env.DISCORD_WEBHOOK_URL;
if (!webhook_url) {
  console.error('DISCORD_WEBHOOK_URL is not set.');
  process.exit(1);
}

const old_entries = read_entries(old_path);
if (old_entries.length === 0) {
  // No old file (first push, or a force push). Do not post the full history.
  console.log('No old changelog to compare with. Nothing posted.');
  process.exit(0);
}
const old_keys = new Set(old_entries.map((e) => `${e.date}|${e.title}`));
const new_entries = read_entries(new_path)
  .filter((e) => !old_keys.has(`${e.date}|${e.title}`))
  .reverse(); // oldest first, so Discord shows them in order

if (new_entries.length === 0) {
  console.log('No new changelog entries.');
  process.exit(0);
}

for (const entry of new_entries) {
  let description = make_links_absolute(entry.body);
  if (description.length > 4000) description = `${description.slice(0, 3990)}…`;
  const response = await fetch(webhook_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: entry.title,
          url: CHANGELOG_URL,
          description,
          color: 0x2563eb,
          footer: { text: `PMS Cloud changelog · ${entry.date}` },
        },
      ],
    }),
  });
  if (!response.ok) {
    console.error(`Discord returned ${response.status}: ${await response.text()}`);
    process.exit(1);
  }
  console.log(`Posted: ${entry.date} ${entry.title}`);
}
