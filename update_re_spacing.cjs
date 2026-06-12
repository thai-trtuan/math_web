const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-\[10px\] font-bold text-sky-600"/g, 
  'className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-sky-600 font-bold"');

content = content.replace(/<div className="pt-4 text-center">/g, 
  '<div className="pt-2 text-center">');

fs.writeFileSync('src/App.tsx', content);
