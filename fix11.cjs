const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// I will just replace the stats block fully to guarantee correctness.
content = content.replace(
  /<div className="grid grid-cols-3 gap-6 pt-4">[\s\S]*?{lang === "vi" \? "Giảng viên" : "Faculty members"}\s*<\/p>\s*<\/div><\/div>\s*<\/div>\s*\{\/\* Why choose section/m,
  `<div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center sm:text-left">
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
                </div>
              </div>
            </div>

          </div>
        
          {/* Why choose section`
);

fs.writeFileSync('src/App.tsx', content);
