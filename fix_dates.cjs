const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

content = content.replace(/date: "(\d{1,2})",\s*month: "(Th\d{1,2})"/g, (match, d, m) => {
  const monthNum = m.replace('Th', '').padStart(2, '0');
  const day = d.padStart(2, '0');
  return `date: "${day}/${monthNum}/2026"`;
});

content = content.replace(/month: string;\n/g, '');

fs.writeFileSync('src/data.ts', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

appContent = appContent.replace(
  /\{notif\.date\} \{notif\.month\} 2026/g,
  '{notif.date}'
);

appContent = appContent.replace(
  /<Clock className="w-3\.5 h-3\.5 text-slate-400 shrink-0" \/>/g,
  '<Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />'
);

appContent = appContent.replace(
  /<div className="text-sm text-slate-500 font-sans font-medium mt-1\.5 block">\s*\{filteredNews\[0\]\.date\}\s*<\/div>/g,
  `<div className="flex items-center gap-1.5 text-sm text-slate-500 font-sans font-medium mt-1.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {filteredNews[0].date}
                    </div>`
);

appContent = appContent.replace(
  /<span className="text-xs text-slate-500 font-sans block mt-1\.5">\s*\{item\.date\}\s*<\/span>/g,
  `<span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans mt-1.5">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {item.date}
                          </span>`
);

fs.writeFileSync('src/App.tsx', appContent);
