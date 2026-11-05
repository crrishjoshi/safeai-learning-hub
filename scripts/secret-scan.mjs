// Lightweight secret and exposure scan. It never opens .env files and never prints
// matched values: it reports only the file, line number and rule name.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const targets = ['apps', 'packages', 'api', 'scripts', 'supabase', 'docs', 'package.json', '.env.example', 'vercel.child.json', 'vercel.parent.json', 'dist']
const skip = new Set(['node_modules', '.git'])
const rules = [
  ['private-key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['provider-key', /\b(sk-[A-Za-z0-9_-]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{30,}|ghp_[A-Za-z0-9]{30,}|xox[abp]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16})\b/],
  ['bearer-token', /Bearer\s+[A-Za-z0-9._-]{20,}/],
  ['private-client-env', /\bVITE_[A-Z0-9_]*(SERVICE|SECRET|API_KEY)[A-Z0-9_]*/],
  ['assigned-secret', /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"\s]{12,}['"]/i],
]

const files = []
function walk(target) {
  const full = path.join(root, target)
  if (!fs.existsSync(full)) return
  const stat = fs.statSync(full)
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(full)) if (!skip.has(entry) && !entry.startsWith('._')) walk(path.join(target, entry))
  } else if (!/(^|\/)\.env(?!\.example$)/.test(target) && !target.endsWith('secret-scan.mjs')) {
    files.push(target)
  }
}
targets.forEach(walk)

let findings = 0
for (const file of files) {
  const lines = fs.readFileSync(path.join(root, file), 'utf8').split('\n')
  lines.forEach((line, index) => {
    for (const [name, pattern] of rules) {
      if (pattern.test(line)) { findings++; console.log(`${file}:${index + 1} ${name}`) }
    }
  })
}
console.log(`Scanned ${files.length} files; ${findings} finding(s).`)
process.exit(findings ? 1 : 0)
