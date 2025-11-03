const fs = require('fs-extra');
const path = require('path');

const TARGETS = {
  nsis: {
    pattern: /\.exe$/i,
    dest: path.join('build', 'Brunoman_Windows_x64.exe')
  },
  portable: {
    pattern: /\.exe$/i,
    dest: path.join('build', 'Brunoman_Windows_x64_Portable.exe')
  },
  msi: {
    pattern: /\.msi$/i,
    dest: path.join('build', 'Brunoman_Windows_x64_MSI.msi')
  }
};

async function pickLatest(fileList) {
  let latest = null;
  for (const f of fileList) {
    const stat = await fs.stat(f);
    if (!latest || stat.mtimeMs > latest.mtimeMs) {
      latest = { file: f, mtimeMs: stat.mtimeMs };
    }
  }
  return latest && latest.file;
}

async function main() {
  const kind = (process.argv[2] || '').toLowerCase();
  if (!TARGETS[kind]) {
    console.error('Usage: node scripts/copy-artifacts.js <nsis|msi|portable>');
    process.exit(1);
  }

  const outDir = path.join('packages', 'bruno-electron', 'out');
  if (!(await fs.pathExists(outDir))) {
    throw new Error('Output directory not found: ' + outDir);
  }

  const entries = await fs.readdir(outDir);
  const candidates = entries
    .filter((n) => TARGETS[kind].pattern.test(n))
    .map((n) => path.join(outDir, n));

  if (candidates.length === 0) {
    throw new Error('No artifacts found in ' + outDir + ' for ' + kind);
  }

  const latest = await pickLatest(candidates);
  await fs.ensureDir('build');
  await fs.copy(latest, TARGETS[kind].dest, { overwrite: true });
  console.log(`Copied ${path.basename(latest)} -> ${TARGETS[kind].dest}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

