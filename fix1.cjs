const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. "CHÀO MỪNG ĐẾN VỚI.." color
content = content.replace(
  /className="text-sm md:text-base font-bold text-sky-200 uppercase/g,
  'className="text-sm md:text-base font-bold text-sky-600 uppercase'
);

// 2. Introduce section stats (from 2000+ sinh viên... to 400 Chỉ tiêu...)
const oldSetup = `<div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">2000+</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Sinh viên đại học" : "Undergraduates"}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">300+</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Học viên cao học" : "Postgraduates"}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">100+</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Giảng viên" : "Faculty members"}
                  </p>
                </div>`;

const newSetup = `<div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">400</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Chỉ tiêu tuyển sinh 2026" : "Admission Quota 2026"}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">5</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Ngành đào tạo" : "Academic Programs"}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl md:text-5xl font-black text-sky-600 font-display">3+ Tỷ</p>
                  <p className="text-xs md:text-sm text-slate-700 font-medium mt-2">
                    {lang === "vi" ? "Học bổng / Năm" : "Scholarship (VND/year)"}
                  </p>
                </div>`;

content = content.replace(oldSetup, newSetup);

fs.writeFileSync('src/App.tsx', content);
