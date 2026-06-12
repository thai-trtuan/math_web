const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `      {/* Action floating buttons (FAB) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Hotline */}
        <a 
          href="tel:02838350006"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all outline-none"
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
          {chatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          
          {/* Unread dot signal */}
          {!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-sky-600 animate-pulse"></span>}
        </button>

        {/* Scroll To Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-sky-600 p-3 rounded-full hover:scale-105 active:scale-95 transition-all mt-1 outline-none"
          title="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>`;

content = content.replace(
  /\{\/\* Action floating buttons \(FAB\) \*\/\}[\s\S]*?<\/div>/,
  replacement
);

content = content.replace(/focus:ring-\[\#003366\]/g, 'focus:ring-sky-600');
content = content.replace(/bg-\[\#0b3c5d\]/g, 'bg-sky-700');

fs.writeFileSync('src/App.tsx', content);
