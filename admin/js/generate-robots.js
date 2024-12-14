const fs = require('fs');
const path = require('path');

// Charger la configuration depuis config.json
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/config.json'), 'utf8'));

// URL de base
const baseURL = config.baseURL;

// Contenu statique du fichier robots.txt
let robotsContent = `
# Fichier robots.txt généré automatiquement
User-agent: *
`;

// Liste des chemins à bloquer
const disallowPaths = [
  '/data/',
  '/utilitaire/',
  '/admin/',
  '/.gitattributes',
  '/node_modules/',
  '/package-lock.json',
  '/package.json',
  '/CNAME',
  '/dashboard.html',
  '/mail.php',
  '/README.md'
];

// Ajouter les chemins à "Disallow"
disallowPaths.forEach(path => {
  robotsContent += `Disallow: ${path}\n`;
});

// Ajouter des règles supplémentaires pour des robots spécifiques
robotsContent += `
User-agent: Googlebot
Disallow:

User-agent: AhrefsBot
Disallow: /

# Lien dynamique vers le sitemap
Sitemap: ${baseURL}/sitemap.xml
`;

// Chemin pour sauvegarder le fichier robots.txt
const robotsPath = path.join(__dirname, '../../robots.txt');

// Écrire le fichier robots.txt
fs.writeFileSync(robotsPath, robotsContent.trim());
console.log(`Fichier robots.txt généré avec succès à : ${robotsPath}`);
