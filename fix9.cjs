const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const pRegex = /<p className="text-xs text-sky-100 font-medium leading-relaxed opacity-90">[\s\S]*?<\/p>/;
const pNew = `<p className="text-xs text-sky-100 font-medium leading-relaxed opacity-90">
              {lang === "vi" 
                ? "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM" 
                : "© 2026 Faculty of Mathematics & Computer Science, VNUHCM-US"}
            </p>`;

// We will only replace the first occurrence
content = content.replace(pRegex, pNew);

// Remove the old Copyright block which was moved to the very bottom
const copyrightBlock = /<div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-\[100px\] text-\[10px\] md:text-xs text-sky-200\/80 flex flex-col md:flex-row justify-center items-center gap-4 text-center font-medium">[\s\S]*?<\/div>\n      <\/footer>/;

content = content.replace(copyrightBlock, '</footer>');

fs.writeFileSync('src/App.tsx', content);
