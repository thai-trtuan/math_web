const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newFab = `<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Zalo OA */}
        <a 
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-[#0068FF] text-white p-3 rounded-full hover:scale-[1.05] active:scale-95 transition-all outline-none"
          title="Nhắn tin Zalo OA"
        >
          <ZaloIcon className="w-5 h-5" />
        </a>

        {/* Chat */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none"
          title="Chat AI Tư Vấn Tuyển Sinh"
        >
          {chatOpen ? <X className="w-5 h-5" /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 12h.01"/><path d="M15 12h.01"/></svg>}
          {/* Unread dot signal */}
          {!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-sky-600 animate-pulse"></span>}
        </button>
      </div>`;

const pattern = /<div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white\/90 backdrop-blur-md p-2 rounded-full shadow-\[0_8px_30px_rgb\(0,0,0,0\.12\)\] border border-slate-100">[\s\S]*?<\/button>\s*<\/div>/;

if (pattern.test(content)) {
  const oldFab = `      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Hotline */}
        <a 
          href="tel:02862884499"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-[1.05] active:scale-95 transition-all outline-none"
          title="Hotline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>

        {/* Zalo OA */}
        <a 
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all outline-none"
          title="Nhắn tin qua Zalo OA"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        </a>

        {/* Chat */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none"
          title="Chat tư vấn AI"
        >
          {chatOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
          {/* Unread dot signal */}
          {!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-sky-600 animate-pulse"></span>}
        </button>
      </div>`;
  content = content.replace(pattern, oldFab);
}

fs.writeFileSync('src/App.tsx', content);
