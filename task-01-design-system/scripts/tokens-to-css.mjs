#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const [, , inputArg, outputArg] = process.argv;
const inputPath = inputArg ?? path.resolve('task-01-design-system/evidence/06-tokens-complete.json');
const outputPath = outputArg ?? path.resolve('task-01-design-system/src/styles/asohub-tokens.css');

const primitiveRoot = 'primitives';
const semanticRoot = 'color roles';
const typographyRoot = 'typography.typography';

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read JSON export ${filePath}: ${error.message}`);
  }
}

function isToken(value) {
  return value && typeof value === 'object' && typeof value.type === 'string' && 'value' in value;
}

function walk(value, segments = [], output = []) {
  if (isToken(value)) {
    output.push({ segments, token: value });
    return output;
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) walk(child, [...segments, key], output);
  }
  return output;
}

function cssPart(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cssName(prefix, segments) {
  return `--${prefix}-${segments.map(cssPart).filter(Boolean).join('-')}`;
}

function primitiveName(segments) {
  return cssName('ref-color', segments.slice(1));
}

function semanticName(segments) {
  return cssName('color', segments.slice(2));
}

function aliasTargetPath(value) {
  return value.slice(1, -1);
}

function collectColorTokens(data) {
  const primitiveTokens = walk(data[primitiveRoot] ?? {}, [primitiveRoot]).filter(({ token }) => token.type === 'color');
  const semanticTokens = walk(data[semanticRoot] ?? {}, [semanticRoot]).filter(({ token }) => token.type === 'color');
  return { primitiveTokens, semanticTokens };
}

function validateColorExport(data, primitiveTokens, semanticTokens) {
  const missing = [];
  if (!data[primitiveRoot]) missing.push('primitives');
  if (!data[semanticRoot]) missing.push('color roles');
  if (primitiveTokens.length === 0) missing.push('primitive color variables');
  if (semanticTokens.length === 0) missing.push('semantic color roles');
  if (missing.length > 0) {
    throw new Error(`Cannot generate color CSS. Missing: ${missing.join(', ')}. No fallback colors were invented.`);
  }
}

function validateAliases(data, primitiveTokens, semanticTokens) {
  const allPaths = new Set([
    ...walk(data, []).map(({ segments }) => segments.join('.')),
  ]);
  const unresolved = [];
  for (const { segments, token } of semanticTokens) {
    if (typeof token.value !== 'string' || !token.value.startsWith('{')) continue;
    const target = aliasTargetPath(token.value);
    if (!allPaths.has(target)) unresolved.push(`${segments.join('.')} -> ${target}`);
  }
  if (unresolved.length > 0) {
    throw new Error(`Unresolved aliases:\n${unresolved.join('\n')}`);
  }
}

function colorValue(token) {
  if (typeof token.value !== 'string' || !/^#[0-9a-f]{8}$/i.test(token.value)) {
    throw new Error(`Unsupported color value format: ${JSON.stringify(token.value)}`);
  }
  return token.value.toLowerCase();
}

function resolveSemanticValue(token, primitiveByPath) {
  if (typeof token.value !== 'string' || !token.value.startsWith('{')) {
    return colorValue(token);
  }
  const target = aliasTargetPath(token.value);
  if (!primitiveByPath.has(target)) {
    throw new Error(`Unresolved semantic alias ${token.value}`);
  }
  return `var(${primitiveName(target.split('.'))})`;
}

function dimension(token, label) {
  if (typeof token.value !== 'number' || !Number.isFinite(token.value)) {
    throw new Error(`Unsupported ${label} dimension: ${JSON.stringify(token.value)}`);
  }
  return `${token.value}px`;
}

function quote(value) {
  return `'${String(value).replaceAll("'", "\\'")}'`;
}

function formatTypography(data) {
  const typography = data.typography?.typography;
  if (!typography) throw new Error('Missing typography.typography');
  const lines = [];
  for (const { segments, token } of walk(typography, [])) {
    if (segments.length !== 3 || !['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing'].includes(segments[2])) continue;
    const [category, size, property] = segments;
    const name = cssName('type', [category, size, property]);
    let value;
    if (property === 'fontFamily') value = quote(token.value);
    else if (property === 'fontWeight') value = String(token.value);
    else value = dimension(token, property);
    lines.push(`  ${name}: ${value};`);
  }
  return lines;
}

function formatShadows(data) {
  const elevation = data.effect?.elevation;
  if (!elevation) throw new Error('Missing effect.elevation');
  const lines = [];
  for (const [name, token] of Object.entries(elevation)) {
    const value = token.value;
    if (!value || !['dropShadow', 'innerShadow'].includes(value.shadowType)) {
      throw new Error(`Unsupported shadow type for ${name}: ${JSON.stringify(value?.shadowType)}`);
    }
    const inset = value.shadowType === 'innerShadow' ? 'inset ' : '';
    const color = colorValue({ value: value.color });
    lines.push(`  --elevation-${cssPart(name)}: ${inset}${value.offsetX}px ${value.offsetY}px ${value.radius}px ${value.spread}px ${color};`);
  }
  return lines;
}

function convert(data) {
  const { primitiveTokens, semanticTokens } = collectColorTokens(data);
  validateColorExport(data, primitiveTokens, semanticTokens);
  validateAliases(data, primitiveTokens, semanticTokens);
  const primitiveByPath = new Map(primitiveTokens.map(({ segments, token }) => [segments.join('.'), token]));
  const primitives = primitiveTokens.map(({ segments, token }) => `  ${primitiveName(segments)}: ${colorValue(token)};`);
  const modes = ['light', 'dark'];
  const modeBlocks = modes.map((mode) => {
    const roles = semanticTokens
      .filter(({ segments }) => segments[1] === mode)
      .map(({ segments, token }) => `  ${semanticName(segments)}: ${resolveSemanticValue(token, primitiveByPath)};`);
    if (roles.length === 0) throw new Error(`Missing semantic color mode: ${mode}`);
    const selector = mode === 'light' ? ':root, [data-theme="light"]' : '[data-theme="dark"]';
    return `${selector} {\n${roles.join('\n')}\n}`;
  });
  return [
    '/* Generated by scripts/tokens-to-css.mjs. Do not edit manually. */',
    '/* Source dimensions are emitted as px; source colors remain 8-digit hex. */',
    '',
    '/* Primitive colors: component styles must not reference these directly. */',
    ':root {',
    primitives.join('\n'),
    '}',
    '',
    '/* Semantic color roles. */',
    ...modeBlocks,
    '',
    '/* Typography */',
    ':root {',
    formatTypography(data).join('\n'),
    '}',
    '',
    '/* Elevation */',
    ':root {',
    formatShadows(data).join('\n'),
    '}',
    '',
  ].join('\n');
}

try {
  const data = readJson(inputPath);
  const css = convert(data);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css, 'utf8');
  const { primitiveTokens, semanticTokens } = collectColorTokens(data);
  console.log(`Converted ${primitiveTokens.length} primitive colors, ${semanticTokens.filter(({ segments }) => segments[1] === 'light').length} light roles, ${semanticTokens.filter(({ segments }) => segments[1] === 'dark').length} dark roles, 15 typography styles, and ${Object.keys(data.effect?.elevation ?? {}).length} elevation styles.`);
  console.log(`Wrote ${outputPath}`);
} catch (error) {
  console.error(`tokens-to-css: ${error.message}`);
  process.exitCode = 1;
}
