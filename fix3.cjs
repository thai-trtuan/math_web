const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 3. Add Translation Keys
const insertTrans = `
      secNewsTitle: { vi: "Tin Tức - Sự Kiện Nổi Bật", en: "Latest News & Events" },
      secProgramsTitle: { vi: "CHƯƠNG TRÌNH ĐÀO TẠO ĐẠI HỌC", en: "UNDERGRADUATE PROGRAMS" },
`;
content = content.replace(
  /navIntro: \{ vi: "Giới thiệu", en: "About us" \},/,
  'navIntro: { vi: "Giới thiệu", en: "About us" },\n' + insertTrans
);

// 6 & 4. Remove horizontal lines and unify spacing
content = content.replace(/border-b border-white\/25/g, '');
content = content.replace(/border-b border-slate-200\/50 inline-block pb-4/g, '');
content = content.replace(/border-b border-slate-200\/50/g, '');
content = content.replace(/pb-6 mb-10/g, 'mb-8'); // unifying
content = content.replace(/mb-10 pb-6/g, 'mb-8');
content = content.replace(/pb-4 mb-8/g, 'mb-8');

// The Title spacing logic:
// Search for "THÔNG BÁO CHO NGƯỜI HỌC"
content = content.replace(
  /<div className="flex flex-col items-center justify-center pb-4 w-full text-center relative">/g,
  '<div className="flex flex-col items-center justify-center mb-8 w-full text-center relative">'
);

// 10. Update Social Media Icons
// Zalo logo SVG
const ZaloIcon = `(props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.2 5.093c-1.39-1.92-4.14-3.093-7.2-3.093-6.07 0-11 4.477-11 10 0 2.924 1.39 5.568 3.593 7.37L4.7 21.64c-.2.246.06.602.35.485l3.24-1.284a12.016 12.016 12.016 0 0 0 5.71 1.159c6.07 0 11-4.477 11-10 0-2.825-1.12-5.405-3.8-6.907z" fill="currentColor"/>
  </svg>
)`;

const FacebookIcon = `(props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)`;

// Let's insert these before standard icons are imported or used. It's better to inline them or use lucide-react if available, but since standard FB and Zalo are needed, I'll inline them.

fs.writeFileSync('src/App.tsx', content);
