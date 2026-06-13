const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

content = content.replace(/'4', '17'/g, '"4", "8", "9", "17"');
content = content.replace(/"4", "17"/g, '"4", "8", "9", "17"');

content = content.replace(/"4", "9"/g, '"4"'); // For news 2
content = content.replace(/"9", "17"/g, '"4", "9", "17"'); // For news 4 and 5
content = content.replace(/sdgs: \["4"\]/g, 'sdgs: ["1", "4", "10"]'); // For news 6

fs.writeFileSync('src/data.ts', content);
