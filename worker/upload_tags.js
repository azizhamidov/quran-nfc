// worker/upload_tags.js
import fs from "fs";
import { execSync } from "child_process";

// Read the tags.json file
const data = fs.readFileSync("../tags.json", "utf8");
let tags;

try {
  tags = JSON.parse(data);
} catch (e) {
  console.error("❌ Error parsing tags.json:", e.message);
  process.exit(1);
}

if (!Array.isArray(tags)) {
  console.error("❌ tags.json must be an array of objects.");
  process.exit(1);
}

// Upload each tag to KV
for (const tagObj of tags) {
  const { tagId } = tagObj;
  if (!tagId) continue;

  const stringValue = JSON.stringify(tagObj);
  console.log(`Uploading tag ${tagId}...`);

  execSync(`wrangler kv key put --binding=TAGS_KV "${tagId}" '${stringValue}'`, {
    stdio: "inherit",
  });
}

console.log("✅ All tags uploaded successfully!");
