import fs from 'fs';
import path from 'path';

try {
  const distDir = path.resolve('dist');
  const docsDir = path.resolve('docs');

  if (fs.existsSync(distDir)) {
    // 1. Copy index.html to 404.html for SPA fallback
    const indexPath = path.join(distDir, 'index.html');
    const fourOhFourPath = path.join(distDir, '404.html');
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, fourOhFourPath);
      console.log('✓ Created dist/404.html for GitHub Pages routing fallback');
    }

    // 2. Ensure .nojekyll exists in dist
    const nojekyllPath = path.join(distDir, '.nojekyll');
    if (!fs.existsSync(nojekyllPath)) {
      fs.writeFileSync(nojekyllPath, '');
      console.log('✓ Created dist/.nojekyll to disable Jekyll processing');
    }

    // 3. Mirror dist to docs/ for branch-based deployment support
    fs.cpSync(distDir, docsDir, { recursive: true });
    console.log('✓ Mirrored build output to docs/ for "Deploy from a branch (/docs)" support');
  }
} catch (err) {
  console.warn('Postbuild notice:', err.message);
}
