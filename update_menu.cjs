const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacements = [
  { from: '<a href="#intro" className="px-4.5', to: '<a href="#" onClick={(e) => e.preventDefault()} className="px-4.5' },
  { from: '<a href="#edu-programs" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"', to: '<a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"' },
  { from: '<a href="#research" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"', to: '<a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"' },
  { from: '<a href="#students" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"', to: '<a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1"' }
];

replacements.forEach(r => {
  content = content.replace(r.from, r.to);
});

fs.writeFileSync('src/App.tsx', content);
