import fs from "fs";
import { execSync } from "child_process";

// Load tags.json
const tags = JSON.parse(fs.readFileSync("tags.json", "utf-8"));

for (const tag of tags) {
  const cmd = `wrangler kv key put --binding TAGS_KV ${tag.tagId} '${JSON.stringify(tag)}'`;
  console.log(`Uploading tag ${tag.tagId}...`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to upload tag ${tag.tagId}:`, err.message);
  }
}

console.log("All tags uploaded!");
