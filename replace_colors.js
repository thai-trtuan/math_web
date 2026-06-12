import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/text-\[\#003366\]/g, 'text-sky-600');
content = content.replace(/bg-\[\#003366\]/g, 'bg-sky-600');
content = content.replace(/border-\[\#003366\]/g, 'border-sky-600');
content = content.replace(/from-\[\#003366\]/g, 'from-sky-600');
content = content.replace(/to-\[\#003366\]/g, 'to-sky-600');

content = content.replace(/text-\[\#002244\]/g, 'text-sky-700');
content = content.replace(/bg-\[\#002244\]/g, 'bg-sky-700');
content = content.replace(/border-\[\#002244\]/g, 'border-sky-700');
content = content.replace(/from-\[\#002244\]/g, 'from-sky-700');
content = content.replace(/to-\[\#002244\]/g, 'to-sky-700');

fs.writeFileSync('src/App.tsx', content);

console.log("Replaced colors.");
