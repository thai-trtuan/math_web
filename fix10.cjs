const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /className="w-8 h-8 rounded-full bg-white text-\[#1877F2\] hover:bg-sky-100 flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"/g,
  'className="w-8 h-8 rounded-full bg-white text-[#1877F2] hover:bg-sky-100 flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"'
);

content = content.replace(
  /className="w-8 h-8 rounded-full bg-white text-\[#0068FF\] hover:bg-sky-100 flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm"/g,
  'className="w-8 h-8 rounded-full bg-white text-[#0068FF] hover:bg-sky-100 flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"'
);

fs.writeFileSync('src/App.tsx', content);
