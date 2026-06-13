const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const welcomeMatch = content.match(/<section id="welcome-section" className="bg-white py-12 md:py-16">[\s\S]*?<\/section>/);

if (welcomeMatch) {
  const whyChooseBlock = `
          {/* Why choose section from Flyer */}
          <div className="mt-16 border-t border-slate-100 pt-10">
            <div className="text-center mb-8">
               <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
                 {lang === "vi" ? "VÌ SAO CHỌN KHOA TOÁN - TIN HỌC?" : "WHY CHOOSE MATH & CS?"}
               </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase">
                    {lang === "vi" ? "TRUYỀN THỐNG & VỊ THẾ" : "TRADITION & BRAND"}
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 font-medium leading-relaxed space-y-1.5 flex-1">
                  <li className="flex gap-2 items-start"><span className="text-orange-500">✔</span> {lang === "vi" ? "Gần 70 năm đào tạo và nghiên cứu Toán học (30 năm định hướng ứng dụng)." : "Nearly 70 years of training (30 years applied orientation)."}</li>
                  <li className="flex gap-2 items-start"><span className="text-orange-500">✔</span> {lang === "vi" ? "Trung tâm đào tạo và nghiên cứu Toán học trọng điểm tại khu vực phía Nam." : "Key center for Mathematics in the Southern region."}</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase">
                    {lang === "vi" ? "ĐỘI NGŨ & ĐÀO TẠO" : "STAFF & TRAINING"}
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 font-medium leading-relaxed space-y-1.5 flex-1">
                  <li className="flex gap-2 items-start"><span className="text-sky-500">✔</span> {lang === "vi" ? "Đội ngũ giảng viên uy tín, tận tâm, có trình độ chuyên môn cao." : "Highly qualified and dedicated teaching staff."}</li>
                  <li className="flex gap-2 items-start"><span className="text-sky-500">✔</span> {lang === "vi" ? "Đơn vị duy nhất trong ĐHQG-HCM đào tạo Toán - Tin học từ cử nhân đến tiến sĩ." : "The only unit in VNU-HCM training from bachelor to doctoral level."}</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase">
                    {lang === "vi" ? "CHẤT LƯỢNG & HỘI NHẬP" : "QUALITY & INTEGRATION"}
                  </h4>
                </div>
                <ul className="text-xs text-slate-600 font-medium leading-relaxed space-y-1.5 flex-1">
                  <li className="flex gap-2 items-start"><span className="text-emerald-500">✔</span> {lang === "vi" ? "Bốn chương trình đào tạo đã được kiểm định chất lượng quốc tế ASIIN." : "Four programs internationally accredited by ASIIN."}</li>
                  <li className="flex gap-2 items-start"><span className="text-emerald-500">✔</span> {lang === "vi" ? "Hợp tác sâu rộng với các trường đại học, viện nghiên cứu, doanh nghiệp." : "Extensive cooperation with global institutes and enterprises."}</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-sky-100 p-6 flex flex-col shadow-xs bg-slate-900 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug font-sans uppercase">
                    {lang === "vi" ? "CỘNG ĐỒNG & CƠ HỘI" : "COMMUNITY & CHANCES"}
                  </h4>
                </div>
                <ul className="text-xs text-slate-300 font-medium leading-relaxed space-y-1.5 flex-1">
                  <li className="flex gap-2 items-start"><span className="text-sky-400">✔</span> {lang === "vi" ? "Nhiều cựu sinh viên thành công trong lĩnh vực Toán học và Tin học." : "Successful alumni across Math & CS."}</li>
                  <li className="flex gap-2 items-start"><span className="text-sky-400">✔</span> {lang === "vi" ? "Cơ hội nghề nghiệp rộng mở; nền tảng vững chắc để học sau đại học." : "Career opportunities; solid foundation for post-graduate studies."}</li>
                </ul>
              </div>

            </div>
          </div>`;

  const injectedSection = welcomeMatch[0].replace(
    /<\/div>\s*<\/section>/,
    `${whyChooseBlock}\n        </div>\n      </section>`
  );
  content = content.replace(welcomeMatch[0], injectedSection);
}

fs.writeFileSync('src/App.tsx', content);
