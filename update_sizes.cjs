const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Date in News section
content = content.replace(
  'className="text-[10px] text-slate-500 font-mono font-bold block mt-1.5"',
  'className="text-xs text-slate-500 font-sans block mt-1.5"'
);
content = content.replace(
  'className="text-xs text-slate-500 font-mono font-bold mt-1.5 block"',
  'className="text-sm text-slate-500 font-sans font-medium mt-1.5 block"'
);

// Pading for Xem Them
content = content.replace(
  /className="pt-6 text-center"/g,
  'className="pt-4 text-center"'
);

// Announcements date and priority
content = content.replace(
  'className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1"',
  'className="text-xs md:text-sm text-slate-500 font-sans font-medium flex items-center gap-1.5"'
);
content = content.replace(
  'className="inline-flex items-center gap-1 text-[8px] font-black text-red-650 bg-red-50 border border-red-100 py-0.5 px-2 rounded-md shadow-3xs"',
  'className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 py-0.5 px-2 rounded-md shadow-3xs"'
);
content = content.replace(
  'className="inline-flex items-center gap-1 text-[8px] font-black text-amber-755 bg-amber-50 border border-amber-100 py-0.5 px-2 rounded-md shadow-3xs"',
  'className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 py-0.5 px-2 rounded-md shadow-3xs"'
);

// Clock size
content = content.replace(
  '<Clock className="w-3 h-3 text-slate-400 shrink-0" />',
  '<Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />'
);

fs.writeFileSync('src/App.tsx', content);

console.log('Updated font and padding');
