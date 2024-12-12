const fs = require('fs');
const path = require('path');

// Charger la configuration depuis config.json
const configPath = path.resolve(__dirname, '../../data/config.json');
let config;

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('Erreur : Impossible de charger le fichier config.json', error);
  process.exit(1); // Quitter le script si config.json ne peut pas être chargé
}

const baseURL = config.baseURL;

// Définir le répertoire racine du projet (ajuster selon vos besoins)
const projectRoot = path.resolve(__dirname, '../../');

function getHTMLFiles(dir) {
  let htmlFiles = [];

  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        htmlFiles = htmlFiles.concat(getHTMLFiles(filePath));
      } else if (file.endsWith('.html')) {
        // Transformer le chemin relatif
        htmlFiles.push(filePath.replace(projectRoot, '').replace(/\\/g, '/'));
      }
    });
  } catch (error) {
    console.error(`Erreur lors de la lecture du répertoire : ${dir}`, error);
  }

  return htmlFiles;
}

function generateSitemap() {
  const htmlFiles = getHTMLFiles(projectRoot);
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    let lastModified = 'N/A';

    try {
      const stats = fs.statSync(filePath);
      lastModified = stats.mtime.toISOString();
    } catch (error) {
      console.error(`Erreur lors de la lecture des métadonnées du fichier : ${file}`, error);
    }

    let changefreq = 'weekly';
    let priority = 0.8;

    if (file.includes('index.html')) {
      changefreq = 'daily';
      priority = 1.0;
    }

    console.log(`URL: ${baseURL}${file}`);
    console.log(`LastMod: ${lastModified}, ChangeFreq: ${changefreq}, Priority: ${priority}`);

    sitemapContent += '  <url>\n';
    sitemapContent += `    <loc>${baseURL}${file}</loc>\n`;
    sitemapContent += `    <lastmod>${lastModified}</lastmod>\n`;
    sitemapContent += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemapContent += `    <priority>${priority}</priority>\n`;
    sitemapContent += '  </url>\n';
  });

  sitemapContent += '</urlset>';

  // Sauvegarder le sitemap.xml
  const sitemapPath = path.resolve(projectRoot, 'sitemap.xml');
  try {
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap généré avec succès à : ${sitemapPath}`);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du sitemap.xml', error);
  }
}

try {
  generateSitemap();
} catch (error) {
  console.error('Erreur lors de la génération du sitemap :', error);
}
