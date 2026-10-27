import fs from 'fs';
import path from 'path';

try {
  const distDir = path.resolve('dist');
  const docsDir = path.resolve('docs');
  const rootAssetsDir = path.resolve('assets');

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

    // 3. Mirror dist to docs/ for "Deploy from a branch (/docs)" support
    fs.cpSync(distDir, docsDir, { recursive: true });
    console.log('✓ Mirrored build output to docs/ for "Deploy from a branch (/docs)" support');

    // 4. Mirror dist/assets to root assets/ and create fixed index-main.js entry
    const distAssetsDir = path.join(distDir, 'assets');
    if (fs.existsSync(distAssetsDir)) {
      fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });

      // Find the main index-*.js and index-*.css files
      const files = fs.readdirSync(distAssetsDir);
      const mainJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
      const mainCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'));

      if (mainJs) {
        fs.copyFileSync(path.join(distAssetsDir, mainJs), path.join(rootAssetsDir, 'index-main.js'));
        console.log(`✓ Copied ${mainJs} to assets/index-main.js for direct branch root fallback`);
      }
      if (mainCss) {
        fs.copyFileSync(path.join(distAssetsDir, mainCss), path.join(rootAssetsDir, 'index-main.css'));
        console.log(`✓ Copied ${mainCss} to assets/index-main.css for direct branch root fallback`);
      }
    }
  }
} catch (err) {
  console.warn('Postbuild notice:', err.message);
}
