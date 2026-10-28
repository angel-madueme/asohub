import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = path.join(root, 'evidence', '06-tokens-complete.json');
const cssPath = path.join(root, 'src', 'styles', 'asohub-tokens.css');
const docsPath = path.join(root, 'docs');
const tokens = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const css = fs.readFileSync(cssPath, 'utf8');

function flattenRoles(value, prefix = '') {
  const output = {};
  for (const [key, token] of Object.entries(value)) {
    const name = prefix ? `${prefix} ${key}` : key;
    if (token?.type === 'color') output[name] = token;
    else Object.assign(output, flattenRoles(token, name));
  }
  return output;
}
const roleSets = Object.fromEntries(Object.entries(tokens['color roles']).map(([theme, value]) => [theme, flattenRoles(value)]));
const themes = ['light', 'dark'];
const roleCount = Object.fromEntries(themes.map(theme => [theme, Object.keys(roleSets[theme]).length]));
if (roleCount.light !== 66 || roleCount.dark !== 66) {
  throw new Error(`Expected 66 leaf colour roles per theme; got ${JSON.stringify(roleCount)}`);
}

const cssPrimitive = new Map();
for (const match of css.matchAll(/--ref-color-([^:]+):\s*(#[0-9a-f]{8});/gi)) cssPrimitive.set(match[1], match[2]);
const cssRoleAliases = new Map();
for (const match of css.matchAll(/--color-([^:]+):\s*var\(--ref-color-([^\)]+)\);/g)) cssRoleAliases.set(match[1], match[2]);

function roleKey(name) { return name.replaceAll(' ', '-'); }
function primitiveHex(value) {
  const match = value.match(/^\{primitives\.([^}]+)\}$/);
  if (!match) throw new Error(`Unsupported token alias: ${value}`);
  const segments = match[1].split('.');
  const namespace = segments.shift();
  let cursor = tokens.primitives[namespace];
  for (const segment of segments) cursor = cursor?.[segment];
  const hex = cursor?.value;
  const cssNamespace = namespace === 'color palettes' ? 'color-palettes' : namespace.replaceAll(' ', '-');
  const primitiveKey = `${cssNamespace}-${segments.join('-').replaceAll(' ', '-')}`;
  if (!/^#[0-9a-f]{8}$/i.test(hex)) throw new Error(`Unexpected primitive value: ${hex}`);
  if (cssPrimitive.get(primitiveKey)?.toLowerCase() !== hex.toLowerCase()) {
    throw new Error(`CSS/JSON primitive mismatch for ${primitiveKey}`);
  }
  return hex.toUpperCase();
}

function luminance(hex) {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const linear = channels.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrast(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const pairs = [
  ['Body text on surface', 'on surface', 'surface'],
  ['Body text on background', 'on background', 'background'],
  ['Secondary text on surface', 'secondary text', 'surface'],
  ['Secondary text on background', 'secondary text', 'background'],
  ['Button: primary', 'on primary', 'primary'],
  ['Button: primary action alias', 'action on primary', 'action primary'],
  ['Button: secondary', 'on secondary', 'secondary'],
  ['Button: tertiary', 'on tertiary', 'tertiary'],
  ['Status badge: error', 'on error', 'error'],
  ['Status badge: success', 'on success', 'success'],
  ['Status badge: warning', 'on warning', 'warning'],
  ['Status badge: info', 'on info', 'info'],
  ['Container: primary', 'on primary container', 'primary container'],
  ['Container: secondary', 'on secondary container', 'secondary container'],
  ['Container: tertiary', 'on tertiary container', 'tertiary container'],
  ['Alert: error', 'on error container', 'error container'],
  ['Alert: success', 'on success container', 'success container'],
  ['Alert: warning', 'on warning container', 'warning container'],
  ['Alert: info', 'on info container', 'info container'],
  ['Form text: surface variant', 'on surface variant', 'surface variant'],
];

const rows = [];
for (const theme of themes) {
  for (const [usage, fgRole, bgRole] of pairs) {
    const fg = roleSets[theme][fgRole];
    const bg = roleSets[theme][bgRole];
    if (!fg || !bg) throw new Error(`Missing ${theme} role in pair: ${fgRole}/${bgRole}`);
    const fgHex = primitiveHex(fg.value);
    const bgHex = primitiveHex(bg.value);
    const ratio = contrast(fgHex, bgHex);
    rows.push({
      usage, theme: theme[0].toUpperCase() + theme.slice(1),
      fgRole, fgHex, bgRole, bgHex, ratio,
      normal: ratio >= 4.5 ? 'Pass' : 'Fail',
      large: ratio >= 3 ? 'Pass' : 'Fail',
      lowMargin: ratio < 4.6,
    });
  }
}

const decorative = [
  ['divider', 'Decorative separator; not tested as text.'],
  ['outline', 'Decorative/form boundary; not tested as text.'],
  ['outline variant', 'Decorative/form boundary; not tested as text.'],
  ['shadow', 'Elevation effect; not tested as text.'],
  ['scrim', 'Overlay effect; not tested as text.'],
  ['surface tint', 'Surface treatment; not tested as text.'],
];

const esc = value => String(value).replaceAll('|', '\\|');
const md = [];
md.push('# AsoHub colour contrast audit', '',
  `Generated from [06-tokens-complete.json](../evidence/06-tokens-complete.json) and [asohub-tokens.css](../src/styles/asohub-tokens.css).`,
  '',
  '## Scope and method', '',
  `- Parsed ${roleCount.light + roleCount.dark} leaf colour roles: ${roleCount.light} Light and ${roleCount.dark} Dark. The JSON has 65 top-level entries per theme because \`action\` contains two nested roles.`,
  '- Every alias was resolved through the JSON primitive path and cross-checked against the generated CSS primitive value.',
  '- Planned pairs only: no UI components exist yet, so none of these pairs are verified in real components.',
  '- Pair selection: body and secondary text are tested on surface and background; buttons use each `on-X`/`X` role pair plus the explicit action-primary alias; status badges use error/success/warning/info; containers use primary/secondary/tertiary container roles; alerts use error/success/warning/info container roles; forms use on-surface-variant/surface-variant.',
  '- Contrast uses WCAG relative luminance: sRGB linearisation, weights 0.2126/0.7152/0.0722, then `(lighter + 0.05) / (darker + 0.05)`.',
  '- “Low margin” means ratio under 4.6:1, as requested. AA thresholds are 4.5:1 normal text and 3:1 large text.',
  '- The original 102-pair list was not found in this task folder; this audit does not invent pairs to reach 102.', '',
  '## Planned pairs (not verified in UI components)', '',
  '| UI usage | Theme | Foreground role and hex | Background role and hex | Ratio | AA normal text (4.5:1) | AA large text (3:1) |',
  '|---|---|---|---|---:|---|---|');
for (const r of rows) md.push(`| ${esc(r.usage)} | ${r.theme} | \`${r.fgRole}\` ${r.fgHex} | \`${r.bgRole}\` ${r.bgHex} | ${r.ratio.toFixed(3)} | ${r.normal} | ${r.large} |`);
md.push('', '## Decorative/non-text roles', '', 'These roles are not tested as text:', '', '| Role | Reason |', '|---|---|');
for (const [role, reason] of decorative) md.push(`| \`${role}\` | ${reason} |`);
md.push('', '## Results', '',
  `- Pairs tested: ${rows.length} planned pairs (${pairs.length} per theme).`,
  `- Failing normal-text pairs: ${rows.filter(r => r.normal === 'Fail').length}.`,
  `- Failing large-text pairs: ${rows.filter(r => r.large === 'Fail').length}.`,
  `- Low-margin pairs (<4.6:1): ${rows.filter(r => r.lowMargin).length}.`,
  '- Assumptions: “body text” is represented by on-surface/on-background; “secondary text” by secondary-text on surface/background; the explicit action-primary alias is included because it is a distinct button role; planned role pairings are not evidence of component usage.', '',
  '## Reproducibility', '',
  'Script: [scripts/audit-contrast.mjs](../scripts/audit-contrast.mjs)', '',
  'Exact command:', '',
  '```powershell',
  'node task-01-design-system/scripts/audit-contrast.mjs',
  '```', '',
  'The script writes this Markdown table and `docs/contrast-table.csv`; its stdout is recorded below.', '',
  '```text',
  `Roles parsed: Light ${roleCount.light}, Dark ${roleCount.dark} (total ${roleCount.light + roleCount.dark} leaf colour roles)`,
  `Pairs tested: ${rows.length}`,
  `Failing normal-text pairs: ${rows.filter(r => r.normal === 'Fail').length}`,
  `Failing large-text pairs: ${rows.filter(r => r.large === 'Fail').length}`,
  `Low-margin pairs (<4.6:1): ${rows.filter(r => r.lowMargin).length}`,
  'Original 102-pair list: not found',
  'UI component verification: none; no UI exists yet',
  '```');

const csv = [
  'UI usage,Theme,Foreground role,Foreground hex,Background role,Background hex,Ratio,AA normal text (4.5:1),AA large text (3:1),Low margin (<4.6:1)',
  ...rows.map(r => [r.usage, r.theme, r.fgRole, r.fgHex, r.bgRole, r.bgHex, r.ratio.toFixed(3), r.normal, r.large, r.lowMargin ? 'Yes' : 'No'].map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')),
].join('\n') + '\n';

fs.writeFileSync(path.join(docsPath, 'contrast-table.md'), md.join('\n') + '\n');
fs.writeFileSync(path.join(docsPath, 'contrast-table.csv'), csv);
console.log(`Roles parsed: Light ${roleCount.light}, Dark ${roleCount.dark} (total ${roleCount.light + roleCount.dark} leaf colour roles)`);
console.log(`Pairs tested: ${rows.length}`);
console.log(`Failing normal-text pairs: ${rows.filter(r => r.normal === 'Fail').length}`);
console.log(`Failing large-text pairs: ${rows.filter(r => r.large === 'Fail').length}`);
console.log(`Low-margin pairs (<4.6:1): ${rows.filter(r => r.lowMargin).length}`);
console.log('Original 102-pair list: not found');
console.log('UI component verification: none; no UI exists yet');
