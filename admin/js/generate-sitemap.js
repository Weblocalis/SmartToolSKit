const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const utilDirectory = path.join(__dirname, '../../utilitaire');  // Répertoire avec vos fichiers HTML

function getHTMLFiles(dir) {
  let files = fs.readdirSync(dir);
  let htmlFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      htmlFiles = htmlFiles.concat(getHTMLFiles(filePath)); // Recherche récursive
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath.replace(__dirname, '').replace(/\\/g, '/'));
    }
  });

  return htmlFiles;
}

function generateSitemap() {
  const htmlFiles = getHTMLFiles(utilDirectory);
  const urlBase = 'https://votresite.github.io';  // Remplacez par l'URL de votre GitHub Pages
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  htmlFiles.forEach(file => {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${urlBase}${file}</loc>\n`;
    sitemapContent += `  </url>\n`;
  });

  sitemapContent += '</urlset>';

  // Sauvegarder le fichier sitemap.xml
  fs.writeFileSync(path.join(__dirname, '../../sitemap.xml'), sitemapContent);
  console.log('Sitemap généré avec succès!');
}

// Générer le sitemap initial
generateSitemap();

// Surveiller les changements dans les fichiers HTML et générer à nouveau le sitemap
chokidar.watch('../../utilitaire/**/*.html').on('change', (path) => {
  console.log(`Fichier modifié: ${path}`);
  generateSitemap();
});
