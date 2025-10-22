// generate_tags.mjs
import fs from 'fs/promises';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const n = parseInt(process.argv[2] || "10", 10);

function makeRandomToken() {
  return crypto.randomBytes(32).toString('hex'); // 64 hex chars
}

const out = [];
for (let i = 0; i < n; i++) {
  const tagId = uuidv4();
  const token = makeRandomToken();
  out.push({ tagId, token, uses: 1, active: true });
}

await fs.writeFile('tags.json', JSON.stringify(out, null, 2));
console.log('Wrote tags.json with', n, 'entries.');
console.log('Sample URL format to write into NFC tag (replace {TAG} and {TOKEN}):');
console.log('https://verify.quranverse.online/visit?tag={TAG}&token={TOKEN}');
console.log('');
console.log('Examples:');
out.slice(0,5).forEach(t => {
  console.log(`https://verify.quranverse.online/visit?tag=${t.tagId}&token=${t.token}`);
});
