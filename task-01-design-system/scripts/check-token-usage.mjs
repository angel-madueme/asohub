#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const srcRoot = path.resolve('task-01-design-system/src');
const excluded = path.resolve('task-01-design-system/src/styles/asohub-tokens.css');
const searches = [
  /--ref-color-[a-z0-9-]+/gi,
  /#[0-9a-f]{3,8}\b/gi,
  /\b(?:rgba?|hsla?)\s*\(/gi,
];

console.log('Exact searches:');
for (const search of searches) console.log(`  ${search}`);

function filesUnder(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(filePath));
    else files.push(filePath);
  }
  return files;
}

const violations = [];
for (const filePath of filesUnder(srcRoot)) {
  if (path.resolve(filePath) === excluded) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const search of searches) {
    for (const match of content.matchAll(search)) {
      const before = content.slice(0, match.index);
      const line = before.split('\n').length;
      violations.push(`${path.relative(process.cwd(), filePath)}:${line}: ${match[0]}`);
    }
  }
}

if (violations.length > 0) {
  console.error('Forbidden token usage found:');
  for (const violation of violations) console.error(`  ${violation}`);
  process.exitCode = 1;
} else {
  console.log('Token usage check passed: no primitive color references or raw color values found outside asohub-tokens.css.');
}
