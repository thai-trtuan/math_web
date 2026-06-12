const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<span>{lang === "vi" ? "Xem chi tiết" : "Spec sheet"}</span>',
  '<span>{lang === "vi" ? "Tìm hiểu thêm" : "Learn more"}</span>'
);

content = content.replace(
  'onClick={() => setSelectedProgram(prog)}',
  'onClick={() => showToast(lang === "vi" ? `Đang chuyển đến trang chi tiết chương trình ${prog.name}...` : `Redirecting to ${prog.nameEn} details...`)}'
);

// We need to change the grid to max 3 columns instead of 4 since we have 3 programs
content = content.replace(
  'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"',
  'className="grid grid-cols-1 sm:grid-cols-3 gap-6"'
);

fs.writeFileSync('src/App.tsx', content);
