const fs = require('fs-extra');
const path = require('path');

async function deleteIfExists(p) {
  if (await fs.pathExists(p)) await fs.remove(p);
}

async function copyIfExists(src, dest) {
  if (await fs.pathExists(src)) await fs.copy(src, dest);
}

async function removeSourceMaps(dir) {
  if (!(await fs.pathExists(dir))) return;
  const entries = await fs.readdir(dir);
  await Promise.all(
    entries.map(async (name) => {
      const full = path.join(dir, name);
      const stat = await fs.stat(full);
      if (stat.isDirectory()) return removeSourceMaps(full);
      if (name.endsWith('.map')) await fs.remove(full);
    })
  );
}

async function updateStaticPaths(webDir) {
  if (!(await fs.pathExists(webDir))) return;
  const files = await fs.readdir(webDir);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const filePath = path.join(webDir, file);
      let content = await fs.readFile(filePath, 'utf8');
      content = content.replace(/\\static/g, './static');
      await fs.writeFile(filePath, content);
    }
  }

  const cssDir = path.join(webDir, 'static', 'css');
  if (await fs.pathExists(cssDir)) {
    const cssFiles = await fs.readdir(cssDir);
    for (const f of cssFiles) {
      if (f.endsWith('.css')) {
        const p = path.join(cssDir, f);
        let content = await fs.readFile(p, 'utf8');
        content = content.replace(/\\static\\font/g, '../../static/font');
        await fs.writeFile(p, content);
      }
    }
  }
}

async function main() {
  // Clean and prepare web folder for electron packaging
  const outDir = path.join('packages', 'bruno-electron', 'out');
  const webDir = path.join('packages', 'bruno-electron', 'web');
  const distDir = path.join('packages', 'bruno-app', 'dist');

  await deleteIfExists(outDir);
  await deleteIfExists(webDir);
  await fs.ensureDir(webDir);
  await copyIfExists(distDir, webDir);
  await updateStaticPaths(webDir);
  await removeSourceMaps(webDir);
  console.log('Electron packaging assets prepared.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

