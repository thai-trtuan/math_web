const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Zalo and Facebook real logos.
// We can embed these icons at the top of the file as constant components.
const iconsBlock = `
const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.2 5.093c-1.39-1.92-4.14-3.093-7.2-3.093-6.07 0-11 4.477-11 10 0 2.924 1.39 5.568 3.593 7.37L4.7 21.64c-.2.246.06.602.35.485l3.24-1.284a12.016 12.016 12.016 0 0 0 5.71 1.159c6.07 0 11-4.477 11-10 0-2.825-1.12-5.405-3.8-6.907z" />
  </svg>
);

const FacebookRealIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
`;

if (!content.includes('ZaloIcon')) {
  content = content.replace("export default function App() {\n", iconsBlock + "export default function App() {\n");
}

// Update the Follow section in footer
const oldFollow = `<div className="space-y-2 pt-2">
              <span className="block text-[10px] font-bold text-sky-200 uppercase tracking-widest opacity-80">
                {lang === "vi" ? "Theo dõi chúng tôi" : "Follow Us"}
              </span>
              <div className="flex items-center space-x-3.5">
                {/* Facebook icon */}
                <a href="https://www.facebook.com/toantin.tuvantuyensinh" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white hover:bg-sky-500 hover:text-white transition-all shadow-2xs">
                  <Facebook className="w-4 h-4" />
                </a>
                {/* LinkedIn icon */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white hover:bg-sky-500 hover:text-white transition-all shadow-2xs">
                  <Linkedin className="w-4 h-4" />
                </a>
                {/* Youtube icon */}
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white hover:bg-red-600 hover:text-white transition-all shadow-2xs">
                  <Youtube className="w-4 h-4" />
                </a>
                {/* TikTok icon */}
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white hover:bg-slate-800 hover:text-white transition-all shadow-2xs">
                  <Video className="w-4 h-4" />
                </a>
                {/* Zalo icon */}
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all shadow-2xs">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>`;

const newFollow = `<div className="space-y-2 pt-2">
              <span className="block text-[10px] font-bold text-sky-200 uppercase tracking-widest opacity-80">
                {lang === "vi" ? "Theo dõi chúng tôi" : "Follow Us"}
              </span>
              <div className="flex items-center space-x-3.5">
                {/* Facebook icon */}
                <a href="https://fb.com/khoatoantinhoc" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                  <FacebookRealIcon className="w-4 h-4" />
                </a>
                {/* Zalo icon */}
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#0068FF] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm">
                  <ZaloIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>`;

content = content.replace(oldFollow, newFollow);

// Remove the old Facebook Link from contact office
const contactToRemoveRegex = /<li(?:[^<]*?)<span(?:[^<]*?)<a href="https:\/\/www\.facebook\.com\/toantin\.tuvantuyensinh"[^<]*?<\/a>\n\s*?<\/span>\n\s*?<\/li>/;
content = content.replace(contactToRemoveRegex, '');

// Update office address text and phone and email
const oldAddressVi = '"Lầu 2, Tòa nhà C, 227 đường Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh"';
const oldAddressEn = '"Floor 2, Building C, 227 Nguyen Van Cu Street, Ward 4, District 5, Ho Chi Minh City"';

const newAddrTextVi = `
                  "Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, TP.HCM & " +
                  "Phòng 8.5, Nhà điều hành, KĐT ĐHQG, Phường Đông Hòa, TP.Dĩ An, Bình Dương"
`;
const newAddrTextEn = `
                  "Room F08-09, Building F, 227 Nguyen Van Cu Street, Cho Quan Ward, HCMC & " +
                  "Room 8.5, Administration Building, VNU Urban Area, Dong Hoa Ward, Di An City, Binh Duong"
`;

content = content.replace(oldAddressVi, newAddrTextVi);
content = content.replace(oldAddressEn, newAddrTextEn);

content = content.replace(/\(028\) 3835 0006 \(EXT: 4000\)/g, '(028) 6288 4499 (EXT: 4300)');
content = content.replace(/toantin@hcmus\.edu\.vn/g, 'math@hcmus.edu.vn');


// Update standard bottom footer text (copyright)
const cpyLines = `<p>
            {lang === "vi" 
              ? "Trang thông tin chính thống của Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM."
              : "The official portal of the Faculty of Mathematics & Computer Science, VNUHCM-US."}
          </p>
          <p>
            {lang === "vi"
              ? "Mã nguồn tuyển sinh được cấu trúc chuẩn hóa cho môi trường vận hành chất lượng cao."
              : "Recruitment portal systematically engineered for high-availability environment."}
          </p>`;

const newCpyLines = `<p>
            {lang === "vi" 
              ? "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM."
              : "© 2026 Faculty of Mathematics & Computer Science, VNUHCM-University of Science."}
          </p>`;

content = content.replace(cpyLines, newCpyLines);

// Remove the copyright text from the brand header since we moved it bottom
const pBrandRegex = /<p className="text-xs text-sky-100 font-medium leading-relaxed opacity-90">(.*?)<\/p>/s;
content = content.replace(pBrandRegex, `<p className="text-xs text-sky-100 font-medium leading-relaxed opacity-90">
              {lang === "vi"
                ? "Đơn vị đào tạo, cung cấp nguồn nhân lực Toán học, Tin học ứng dụng và Trí tuệ nhân tạo hàng đầu miền Nam Việt Nam."
                : "The leading academic institution providing human resources in Mathematics, Applied Informatics and AI in Southern Vietnam."}
            </p>`);


// Fix font "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP"
content = content.replace(
  /{lang === "vi" \? "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP" : "STRATEGIC PARTNERS & ENTERPRISES"}/,
  '{lang === "vi" ? "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP" : "STRATEGIC PARTNERS & ENTERPRISES"}'
);
content = content.replace(
  /className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-800 to-slate-500 uppercase pb-1"/,
  'className="text-xl md:text-2xl font-bold tracking-tight text-sky-600 uppercase pb-1"'
);


// Shrink SDG sizes
content = content.replace(/className="w-\[42px\] h-\[42px\]/g, 'className="w-8 h-8');

// Fix FAB scaling (make it relatively smaller) and icons
const oldFab = `      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Hotline */}
        <a 
          href="tel:02838350006"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-[1.05] active:scale-95 transition-all outline-none"
          title="Hotline"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Zalo OA */}
        <a 
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all outline-none"
          title="Nhắn tin qua Zalo OA"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Chat */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none"
          title="Chat tư vấn AI"
        >
          {chatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}`;

const newFab = `      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5 transform scale-90 sm:scale-100 origin-bottom-right">
        
        {/* Zalo OA */}
        <a 
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-[#0068FF] text-white p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all outline-none shadow-lg"
          title="Nhắn tin Zalo OA"
        >
          <ZaloIcon className="w-5 h-5" />
        </a>

        {/* Chat */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-sky-600 text-white p-3.5 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none shadow-lg"
          title="Chat AI Tư Vấn Tuyển Sinh"
        >
          {chatOpen ? <X className="w-5 h-5" /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 12h.01"/><path d="M15 12h.01"/></svg>}
          {/* Unread dot signal */}
          {!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-sky-600 animate-pulse"></span>}`;

// Note: I will replace the wrapper and children. In the original, there's a big block with `<div className="...bg-white p-2... hover:scale-105...`. By omitting the big white wrapper and making icons shadow-lg directly, it feels cleaner and smaller.
content = content.replace(
  /<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\] border border-slate-100">[\s\S]*?{!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-sky-600 animate-pulse"><\/span>}/,
  newFab
);

// We need to also fix where I did a regex replace and left the `<button...` unclosed if it doesn't match properly, let's use a simpler regex target to be safe. Let's fix that.

fs.writeFileSync('src/App.tsx', content);
