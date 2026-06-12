const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix secProgramsTitle cards
content = content.replace(
  /className="bg-white rounded-2xl border border-white\/10 p-5 flex flex-col justify-between hover:scale-\[1.02\] hover:shadow-xl transition-all duration-300 cursor-pointer group text-left"/g,
  'className="bg-white rounded-2xl border border-white/10 p-6 shadow-3xs flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer group text-left"'
);

// Update all titles that match this specific string:
content = content.replace(
  /className="text-\[13px\] md:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans"/g,
  'className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3"'
);

// Update secPrograms descriptions
content = content.replace(
  /className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed mt-2 line-clamp-4"/g,
  'className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4"'
);

// Update secPrograms "Tìm hiểu thêm" wrapper
content = content.replace(
  /className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-indigo-900 transition-colors mt-4"/g,
  'className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors"'
);

// Update Research Activity icons
content = content.replace(
  /className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold font-mono"/g,
  'className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg font-mono"'
);
content = content.replace(
  /className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold font-mono"/g,
  'className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg font-mono"'
);
content = content.replace(
  /className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold font-mono"/g,
  'className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg font-mono"'
);
content = content.replace(
  /className="w-10 h-10 rounded-xl bg-sky-600\/10 text-sky-600 flex items-center justify-center font-bold font-mono"/g,
  'className="w-12 h-12 rounded-xl bg-sky-600/10 text-sky-600 flex items-center justify-center font-bold text-lg font-mono"'
);

// Update Research descriptions
content = content.replace(
  /className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed mt-2"/g,
  'className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4"'
);

// Update Research "Xem chi tiết" buttons
content = content.replace(
  /className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-\[10px\] text-sky-600 font-bold"/g,
  'className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors"'
);

// Footer text colors
content = content.replace(/text-slate-300 pt-12 pb-8 border-t border-sky-900\/40 mt-10/g, 'text-sky-100 pt-12 pb-8 border-t border-sky-500 mt-10');
content = content.replace(/text-slate-400 font-medium leading-relaxed/g, 'text-sky-100 font-medium leading-relaxed opacity-90');
content = content.replace(/text-slate-400 uppercase tracking-widest/g, 'text-sky-200 uppercase tracking-widest opacity-80');
content = content.replace(/text-slate-400 font-medium/g, 'text-sky-100 font-medium');
content = content.replace(/bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-sky-600/g, 'bg-sky-700 flex items-center justify-center text-white hover:bg-sky-500');
content = content.replace(/bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-red-600/g, 'bg-sky-700 flex items-center justify-center text-white hover:bg-red-600');
content = content.replace(/bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700/g, 'bg-sky-700 flex items-center justify-center text-white hover:bg-slate-800');
content = content.replace(/bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600/g, 'bg-sky-700 flex items-center justify-center text-white hover:bg-blue-600');
content = content.replace(/border-slate-800/g, 'border-sky-500');
content = content.replace(/text-sky-400 font-extrabold/g, 'text-white font-extrabold'); // Changed bullets to white
content = content.replace(/text-slate-500 font-medium gap-3/g, 'text-sky-200 font-medium gap-3 opacity-90'); // Bottom small copyright
content = content.replace(/border-slate-800\/60/g, 'border-sky-500/60');


fs.writeFileSync('src/App.tsx', content);
console.log('Updated styling');
