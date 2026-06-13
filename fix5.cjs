const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Revert Stats to 2000+
const the400StatsPattern = /<div className="text-center sm:text-left">\s*<p className="text-3xl md:text-5xl font-black text-sky-600 font-display">400<\/p>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
const stats2000 = `<div className="text-center sm:text-left">
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
content = content.replace(the400StatsPattern, stats2000);

// 2. Unify spacing and header styles. Ensure they all match this template:
// className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase"
// inside a <div className="text-center mb-8">

// Fix Programs section title spacing
content = content.replace(
  /<div className="text-center mb-8 ">/g,
  '<div className="text-center mb-8">'
);
content = content.replace(
  /<div className="text-center mb-10 pb-6 border-b border-white\/25">/g,
  '<div className="text-center mb-8">'
);
content = content.replace(
  /h2 className="text-2xl md:text-3xl font-bold tracking-tight font-sans text-white uppercase relative"/g,
  'h2 className="text-2xl md:text-3xl font-bold tracking-tight font-sans text-white uppercase"'
);

// Fix Partner section title
content = content.replace(
  /<div className="flex flex-col text-center">/g,
  '<div className="text-center mb-8">'
);
content = content.replace(
  /h2 className="text-2xl md:text-3\.5xl font-black text-slate-900 tracking-tight font-display uppercase"/g,
  'h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase"'
);

// 3. Convert the old VÌ SAO CHỌN Khoa to MỘT SỐ HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT with new numbers
// I previously injected VÌ SAO CHỌN in id="student-activities". Let's replace that whole section.

const researchSectionRegex = /<section id="student-activities" className="bg-slate-50 py-16 border-t border-slate-200\/40">[\s\S]*?<\/section>/;
const newResearchContent = `<section id="research-activities" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
              {lang === "vi" ? "HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT" : "OUTSTANDING RESEARCH ACTIVITIES"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Đang liên kết danh mục xếp hạng Web of Science..." : "Opening WoS publications...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-2xl font-mono group-hover:scale-110 transition-transform">
                  <div className="text-orange-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"/><path d="m16 12 2 2 4-4"/><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"/></svg></div>
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-sans uppercase">
                  {lang === "vi" ? "CÔNG BỐ QUỐC TẾ Q1/Q2" : "Q1/Q2 PUBLICATIONS"}
                </h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2 line-clamp-4">
                  {lang === "vi" 
                    ? "Đội ngũ giảng viên, nghiên cứu viên công bố hàng trăm bài báo khoa học chất lượng cao trên các tạp chí quốc tế chuẩn SCIE/SCOPUS hàng năm."
                    : "Hundreds of high-quality papers published annually in prestigious SCIE/SCOPUS indexed international journals by our researchers."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-sky-600 uppercase">
                <span>{lang === "vi" ? "Xem thống kê" : "View stats"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Mở danh sách đề tài NAFOSTED..." : "Opening NAFOSTED projects...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-2xl font-mono group-hover:scale-110 transition-transform">
                  <div className="text-sky-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical"><path d="M10 2v7.31L2 20.5V22h20v-1.5L14 9.31V2"/><path d="M8.5 2h7"/><path d="M14 9.31 20 20.5"/><path d="M4 20.5 10 9.31"/></svg></div>
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-sans uppercase">
                  {lang === "vi" ? "ĐỀ TÀI TRỌNG ĐIỂM" : "KEY RESEARCH GRANTS"}
                </h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2 line-clamp-4">
                  {lang === "vi" 
                    ? "Chủ trì nhiều đề tài nghiên cứu cấp Quốc gia (NAFOSTED), cấp Bộ, cấp ĐHQG-HCM, mang lại giá trị khoa học cốt lõi vững chắc."
                    : "Leading numerous National (NAFOSTED), Ministerial, and VNU-HCM research grants contributing to solid core scientific values."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-sky-600 uppercase">
                <span>{lang === "vi" ? "Các đề tài" : "Grants list"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Đang liên kết ứng dụng và chuyển giao AI..." : "Connecting to Applied AI & Tech Transfer...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-2xl font-mono group-hover:scale-110 transition-transform">
                  <div className="text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg></div>
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-sans uppercase">
                  {lang === "vi" ? "ỨNG DỤNG & CHUYỂN GIAO" : "APPLIED R&D & TRANSFER"}
                </h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2 line-clamp-4">
                  {lang === "vi" 
                    ? "Hợp tác chặt chẽ cùng doanh nghiệp công nghệ, ngân hàng phát triển các mô hình Trí tuệ nhân tạo, tối ưu hóa và mật mã."
                    : "Working closely with tech firms and banks to develop state-of-the-art AI, optimization, and advanced cryptography systems."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-sky-600 uppercase">
                <span>{lang === "vi" ? "Mô hình ứng dụng" : "Applied Models"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-600/20 bg-linear-to-b from-white to-sky-50/20 p-6 hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Xem mạng lưới hợp tác nghiên cứu..." : "Opening global network...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-2xl font-mono group-hover:scale-110 transition-transform shadow-md">
                  <div className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg></div>
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-sans uppercase">
                  {lang === "vi" ? "MẠNG LƯỚI QUỐC TẾ" : "GLOBAL NETWORK"}
                </h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2 line-clamp-4">
                  {lang === "vi" 
                    ? "Hàng loạt giáo sư, chuyên gia thỉnh giảng từ Pháp, Mỹ, Nhật Bản... đến làm việc, giảng dạy và trao đổi khoa học thường xuyên."
                    : "Continuous academic exchange with top tier professors and researchers from France, USA, Japan, and other developed nations."}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-sky-600 uppercase">
                <span>{lang === "vi" ? "Mạng lưới đối tác" : "Partners"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>`;

content = content.replace(researchSectionRegex, newResearchContent);

// 4. Contact fixing
// - Address 1 & 2
const oldAddressPattern = /"Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, TP\.HCM \& " \+\s*"Phòng 8\.5, Nhà điều hành, KĐT ĐHQG, Phường Đông Hòa, TP\.Dĩ An, Bình Dương"/;
const newAddressPatternList = `(
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh</li>
                      <li>Phòng 8.5, Nhà điều hành, Khu đô thị Đại học Quốc gia, Phường Đông Hòa, Thành phố Hồ Chí Minh</li>
                    </ul>
                  )`;

// We have translation strings at the top "addrDetail"
// Then we use it inside the li.
content = content.replace(
  /addrDetail: \{ vi: "[^"]*", en: "[^"]*" \},/,
  'addrDetail: { vi: "", en: "" },' // Cleared so we can render manually
);

const renderAddressOld = /{lang === "vi" \? t\("addrDetail"\) : t\("addrDetail"\)}/;
const renderAddressNew = `{lang === "vi" ? (
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh</li>
                      <li>Phòng 8.5, Nhà điều hành, Khu đô thị Đại học Quốc gia, Phường Đông Hòa, Thành phố Hồ Chí Minh</li>
                    </ul>
                  ) : (
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Room F08-09, Building F, 227 Nguyen Van Cu Street, Cho Quan Ward, HCMC</li>
                      <li>Room 8.5, Administration Building, VNU Urban Area, Dong Hoa Ward, HCMC</li>
                    </ul>
                  )}`;
content = content.replace(renderAddressOld, renderAddressNew);

// 5. Footer changes
content = content.replace(
  /toantin@hcmus/,
  'KHOA TOÁN - TIN HỌC'
);

// We need to replace background color of footer social icons. I made them #1877F2 and #0068FF, maybe the user wants white icons inside rounded bg or white logos?
// "Thay đổi màu sắc logo các trang mạng xã hội ở phần THEO DÕI CHÚNG TÔI để nổi bật hơn trên màu nền hiện tại"
content = content.replace(/bg-\[#1877F2\]/g, 'bg-white text-[#1877F2] hover:bg-sky-100');
content = content.replace(/bg-\[#0068FF\]/g, 'bg-white text-[#0068FF] hover:bg-sky-100');

// Replace "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM." with 
// "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM"
// And replace the other line
const copyrightLines = /<div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-\[100px\] text-[10px] md:text-xs text-sky-200\/60 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left font-medium">[\s\S]*?<\/div>/;

const newCopyrightLines = `<div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] text-[10px] md:text-xs text-sky-200/80 flex flex-col md:flex-row justify-center items-center gap-4 text-center font-medium">
          <p>
            {lang === "vi" 
              ? "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM"
              : "© 2026 Faculty of Mathematics & Computer Science, VNUHCM-US"}
          </p>
        </div>`;

content = content.replace(copyrightLines, newCopyrightLines);


// 6. FAB behavior. Right now we use a small direct scale format, I will restore it to the white bordered format.
const fabRegex = /<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1\.5 transform scale-90 sm:scale-100 origin-bottom-right">[\s\S]*?<div className="fixed /;

// I'll manually locate the FAB wrapper
content = content.replace(
  /<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1\.5 transform scale-90 sm:scale-100 origin-bottom-right">/,
  '<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">'
);
content = content.replace(
  /className="bg-\[#0068FF\] text-white p-3\.5 rounded-full hover:scale-105 active:scale-95 transition-all outline-none shadow-lg"/,
  'className="bg-[#0068FF] text-white p-3 rounded-full hover:scale-[1.05] active:scale-95 transition-all outline-none"'
);
content = content.replace(
  /className="bg-sky-600 text-white p-3\.5 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none shadow-lg"/,
  'className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none"'
);

// We should append "Vì sao chọn khoa Toán - Tin học" exactly like the flyer somewhere nicely. Maybe inside the Intro section. Let's create an elegant grid directly inside the "about-section"
const aboutSectionMatch = content.match(/<section id="about-section"[\s\S]*?<\/section>/);
if (aboutSectionMatch) {
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug font-sans uppercase">
                    {lang === "vi" ? "CỘNG ĐỒNG & CƠ HỘI" : "COMMUNITY & CHANCES"}
                  </h4>
                </div>
                <ul className="text-xs text-slate-300 font-medium leading-relaxed space-y-1.5 flex-1">
                  <li className="flex gap-2 items-start"><span className="text-sky-400">✔</span> {lang === "vi" ? "Nhiều cựu sinh viên thành công trong lĩnh vực Toán học và Tin học." : "Successful alumni across Math & CS."}</li>
                  <li className="flex gap-2 items-start"><span className="text-sky-400">✔</span> {lang === "vi" ? "Cơ hội nghề nghiệp rộng mở; nền tảng vững chắc để học sau đại học." : "Broad career opportunities; solid foundation for post-graduate studies."}</li>
                </ul>
              </div>

            </div>
          </div>`;

  const injectedSection = aboutSectionMatch[0].replace(
    /<\/div>\s*<\/div>\s*<\/section>/,
    `</div>\n</div>\n${whyChooseBlock}\n</section>`
  );
  content = content.replace(aboutSectionMatch[0], injectedSection);
}

fs.writeFileSync('src/App.tsx', content);
