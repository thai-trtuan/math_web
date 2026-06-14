import React, { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Menu, 
  X, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Award, 
  Users, 
  BookOpen, 
  Clock, 
  Play, 
  Pause, 
  ExternalLink, 
  ArrowRight, 
  Laptop, 
  Database, 
  Cpu, 
  Infinity as InfinityIcon, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  History, 
  MessageSquare, 
  Copy, 
  Check,
  Briefcase,
  Layers,
  GraduationCap,
  Brain,
  Activity,
  ChevronUp,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  Video
} from "lucide-react";
import { 
  STATISTICS, 
  SLIDES, 
  NEWS_ITEMS, 
  NOTIFICATION_ITEMS, 
  STUDY_PROGRAMS, 
  ALUMNI_STORIES, 
  FAQS,
  StudyProgram
} from "./data";


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
export default function App() {
  // Localization state: "vi" or "en"
  const [lang, setLang] = useState<"vi" | "en">("vi");

  // Search filter term
  const [searchTerm, setSearchTerm] = useState("");

  // Slide Index
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter Categories (disabled as requested)

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Selected study program to display in detail modal
  const [selectedProgram, setSelectedProgram] = useState<StudyProgram | null>(null);

  // Expanded FAQ state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Copy contact confirmation state
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Custom elegant toast notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const showToast = (message: string) => {
    setToast({ message, visible: true });
    // Auto collapse after 3.5s
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Dynamic Contact Form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", title: "", msg: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Advisor Chat Assistant state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([]);
  const [customQuestion, setCustomQuestion] = useState("");

  // Auto-play interval for hero banner
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Horizontal slider ref for Student Announcements
  const notifSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying]);

  // Initial greeting for Chat advisor
  useEffect(() => {
    const welcomeMsg = lang === "vi" 
      ? "Xin chào! Mình là Trợ lý học vụ ảo Khoa Toán - Tin học. Bạn cần tìm hiểu thông tin tuyển sinh, ngành học hay học bổng thế?"
      : "Hello! I am the Virtual Academic Advisor for the Department of Mathematics & Computer Science. How can I assist you with admissions, majors, or scholarships today?";
    setChatMessages([{ sender: "bot", text: welcomeMsg }]);
  }, [lang]);

    // SDG Badge render helper - using standard UN SDG imagery
  const renderSdgSquare = (sdg: string) => {
    const num = parseInt(sdg, 10);
    if (!num || num < 1 || num > 17) return null;
    const url = `https://vietnam.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/${lang === "vi" ? "vi" : "en"}/SDG-${num}.svg`;
    return (
      <img 
        key={sdg} 
        src={url} 
        alt={`SDG ${sdg}`}
        className="w-8 h-8 rounded-none shadow-sm transition-all hover:scale-105 select-none object-cover" 
        title={`Sustainable Development Goal ${sdg}`}
      />
    );
  };
  // Mini SDG Square Badge render helper
  const renderMiniSdgSquare = (sdg: string) => renderSdgSquare(sdg);

  // Corporate Partner Logos renderer
  const renderPartnerLogo = (id: string) => {
    switch (id) {
      case "viasm":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-sky-500 hover:shadow-xs transition-all group shrink-0">
            <div className="w-8 h-8 bg-sky-950 rounded-lg flex items-center justify-center text-white text-xs font-mono font-black border border-sky-800 select-none shrink-0 shadow-3xs">∑</div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">VIASM</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-sky-600 transition-colors uppercase leading-none mt-1">VIỆN TOÁN CAO CẤP</span>
            </div>
          </div>
        );
      case "google":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-blue-500 hover:shadow-xs transition-all group shrink-0">
            <div className="flex gap-0.5 shrink-0 select-none">
              <span className="w-1.5 h-4 bg-blue-500 rounded-xs"></span>
              <span className="w-1.5 h-4 bg-red-500 rounded-xs mt-1"></span>
              <span className="w-1.5 h-4 bg-yellow-500 rounded-xs"></span>
              <span className="w-1.5 h-4 bg-green-500 rounded-xs mt-1"></span>
            </div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">Google AI Labs</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-blue-500 transition-colors uppercase leading-none mt-1">RESEARCH DIVISION</span>
            </div>
          </div>
        );
      case "microsoft":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-slate-400 hover:shadow-xs transition-all group shrink-0">
            <div className="grid grid-cols-2 gap-0.5 w-4.5 h-4.5 shrink-0 select-none mt-0.5">
              <div className="w-2 h-2 bg-[#f25022]"></div>
              <div className="w-2 h-2 bg-[#7fba00]"></div>
              <div className="w-2 h-2 bg-[#00a4ef]"></div>
              <div className="w-2 h-2 bg-[#ffb900]"></div>
            </div>
            <div className="flex flex-col text-left font-sans pl-0.5">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">Microsoft Academy</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase leading-none mt-1">GLOBAL SPONSOR</span>
            </div>
          </div>
        );
      case "fpt":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-orange-500 hover:shadow-xs transition-all group shrink-0">
            <div className="flex gap-0.5 select-none shrink-0">
              <span className="px-1 py-0.5 bg-orange-500 text-none font-black text-[8px] rounded-xs leading-none text-white">F</span>
              <span className="px-1 py-0.5 bg-blue-600 text-none font-black text-[8px] rounded-xs leading-none text-white">P</span>
              <span className="px-1 py-0.5 bg-green-600 text-none font-black text-[8px] rounded-xs leading-none text-white">T</span>
            </div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">FPT Software</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-orange-500 transition-colors uppercase leading-none mt-1">ACADEMIC SPONSOR</span>
            </div>
          </div>
        );
      case "vng":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-orange-500 hover:shadow-xs transition-all group shrink-0">
            <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white font-sans font-black text-[10px] select-none shadow-3xs uppercase tracking-tighter shrink-0">vng</div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">VNG Corporation</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-orange-600 transition-colors uppercase leading-none mt-1">R&D ENGAGEMENT</span>
            </div>
          </div>
        );
      case "momo":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-pink-500 hover:shadow-xs transition-all group shrink-0">
            <div className="w-7 h-7 bg-[#b00e5e] rounded-lg text-white font-black flex items-center justify-center text-[11px] uppercase tracking-tighter select-none shrink-0 shadow-3xs">Mo</div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">MoMo Fintech</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-pink-600 transition-colors uppercase leading-none mt-1">SCHOLARSHIP BOARD</span>
            </div>
          </div>
        );
      case "grab":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-emerald-500 hover:shadow-xs transition-all group shrink-0">
            <div className="px-1.5 py-1 bg-emerald-600 rounded-md text-white font-sans text-[8px] font-black leading-none select-none tracking-widest shrink-0">GRAB</div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">Grab AI Research</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-emerald-500 transition-colors uppercase leading-none mt-1">MOBILITY SPONSOR</span>
            </div>
          </div>
        );
      case "tma":
        return (
          <div key={id} className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-205 rounded-xl hover:border-indigo-500 hover:shadow-xs transition-all group shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-900 border border-indigo-700 text-white font-sans flex items-center justify-center font-extrabold text-[9px] select-none shadow-3xs shrink-0">TMA</div>
            <div className="flex flex-col text-left font-sans">
              <span className="text-[11px] font-extrabold leading-none text-slate-800 tracking-tight">TMA Solutions</span>
              <span className="text-[7.5px] font-black text-slate-400 group-hover:text-indigo-600 transition-colors uppercase leading-none mt-1">APPRENTICESHIP</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Translate labels helper
  const t = (key: string) => {
    const translations: Record<string, { vi: string; en: string }> = {
      // General Header / Topbar
      alumni: { vi: "Cựu sinh viên", en: "Alumni" },
      jobs: { vi: "Tuyển dụng", en: "Careers" },
      contact: { vi: "Liên hệ", en: "Contact" },
      searchPlaceholder: { vi: "Tìm kiếm thông tin học phần, tin tức...", en: "Search courses, news, events..." },
      titleSchool: { vi: "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN", en: "UNIVERSITY OF SCIENCE" },
      titleVnu: { vi: "ĐẠI HỌC QUỐC GIA TP.HỒ CHÍ MINH", en: "VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY" },
      titleDept: { vi: "KHOA TOÁN - TIN HỌC", en: "FACULTY OF MATHEMATICS & COMPUTER SCIENCE" },
      
      // Navigation Menu
      navIntro: { vi: "Giới thiệu", en: "About us" },

      secNewsTitle: { vi: "Tin tức - Sự kiện", en: "News & Events" },
      secProgramsTitle: { vi: "CHƯƠNG TRÌNH ĐÀO TẠO ĐẠI HỌC", en: "UNDERGRADUATE PROGRAMS" },

      navEdu: { vi: "Đào tạo", en: "Academics" },
      navResearch: { vi: "Nghiên cứu", en: "Research" },
      navStudent: { vi: "Sinh viên", en: "Student life" },
      navNews: { vi: "Tin tức - Sự kiện", en: "News & Events" },

      // Navigation Dropdown Items (Simplified mock links)
      subStaff: { vi: "Thông tin đội ngũ", en: " Staff" },
      subStructure: { vi: "Cơ cấu tổ chức", en: "Organizational ttructure" },
      subUniv: { vi: "Bậc Đại học", en: "Undergraduate Programs" },
      subPostGrad: { vi: "Sau Đại học", en: "Postgraduate Programs" },

      // Filter tabs
      notifScholar: { vi: "Học bổng - Việc làm", en: "Scholarship & Career" },

      // Button / Interactive
      viewDetails: { vi: "Xem chi tiết", en: "View Details" },
      close: { vi: "Đóng", en: "Close" },
      duration: { vi: "Thời gian học", en: "Duration" },
      credits: { vi: "Số tín chỉ", en: "Credits" },
      tracks: { vi: "Chuyên ngành sâu", en: "Specialization Tracks" },
      careers: { vi: "Cơ hội nghề nghiệp", en: "Career Opportunities" },
      readMore: { vi: "Xem thêm tất cả tin tức", en: "Read all stories" },
      exploreMore: { vi: "Khám phá bản đồ Khoa", en: "Explore Location Map" },

      // Contact form
      addrTitle: { vi: "ĐỊA CHỈ LIÊN HỆ", en: "ADDRESS" },
      addrDetail: { vi: "", en: "" },
      officeHour: { vi: "Giờ làm việc: Thứ Hai - Thứ Sáu, 08:00 - 11:30 & 13:30 - 16:30", en: "Working hours: Mon - Fri, 08:00 - 11:30 & 13:30 - 16:30" },
      formTitle: { vi: "Gửi thư đóng góp / Liên hệ công tác", en: "Get In Touch / Academic Inquiries" },
      formName: { vi: "Họ và tên của bạn", en: "Your full name" },
      formEmail: { vi: "Địa chỉ Email", en: "Email address" },
      formSubject: { vi: "Tiêu đề liên hệ", en: "Subject matter" },
      formMsg: { vi: "Nội dung thư liên hệ...", en: "Your message detailed context..." },
      formSubmit: { vi: "Gửi phản hồi ngay", en: "Submit Inquiry" },
      formSuccess: { vi: "Cảm ơn bạn! Thư của bạn đã gửi thành công tới Văn phòng Khoa Toán - Tin học.", en: "Thank you! Your message has been sent successfully to the Faculty Office." },
      copied: { vi: "Đã sao chép địa chỉ cứu cánh!", en: "Address copied to clipboard!" },

      // Chat assistant UI
      askBotTitle: { vi: "TƯ VẤN TUYỂN SINH MÙA THI 2026", en: "ADMISSION ADVISING BOT 2026" },
      suggestedQuestions: { vi: "Câu hỏi bạn có thể hỏi", en: "Common suggested queries:" },
      send: { vi: "Gửi", en: "Send" }
    };
    return translations[key]?.[lang] || key;
  };

  // Switch Slide
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Set Slider Auto Play
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Search filter applied to news & notifications (removed category restrictions as requested)
  const filteredNews = NEWS_ITEMS.filter((item) => {
    const titleMatch = (lang === "vi" ? item.title : item.titleEn)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const summaryMatch = (lang === "vi" ? item.summary : item.summaryEn)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (titleMatch || summaryMatch);
  });

  const filteredNotifs = NOTIFICATION_ITEMS.filter((item) => {
    const titleMatch = (lang === "vi" ? item.title : item.titleEn)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch;
  });

  // Copy address helper
  const handleCopyAddress = () => {
    const fullAddress = "227 Nguyễn Văn Cừ, Phường Chợ Quán, TP. Hồ Chí Minh";
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Clean title helper to strip "Thông báo" prefixes
  const cleanTitle = (titleStr: string): string => {
    let clean = titleStr.trim();
    // Case-insensitive replacement for Vietnamese
    clean = clean.replace(/^(thông báo về việc|thông báo v\/v|thông báo v\.v|thông báo tuyển học|thông báo tuyển sinh|thông báo)/i, "");
    // Case-insensitive replacement for English
    clean = clean.replace(/^(notice regarding|notice on they|notice on|notice about|notice of|notice)/i, "");
    // Clean up any leading spaces, punctuation, dashes
    clean = clean.replace(/^[\s\-\/:,]+/, "");
    // Capitalize first letter
    if (clean.length > 0) {
      clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    }
    return clean;
  };

  // Submit Contact Form Simulated
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.msg) {
      showToast(lang === "vi" ? "Vui lòng điền đầy đủ các thông tin bắt buộc!" : "Please fill in all required fields!");
      return;
    }
    setContactSubmitted(true);
    showToast(lang === "vi" ? "Đã gửi thư liên hệ thành công!" : "Contact form submitted successfully!");
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", title: "", msg: "" });
    }, 5000);
  };

  // Bot response simulation based on keywords
  const handleBotAsk = (questionText: string) => {
    if (!questionText.trim()) return;

    const newMsgs = [...chatMessages, { sender: "user" as const, text: questionText }];
    setChatMessages(newMsgs);

    setTimeout(() => {
      let reply = "";
      const q = questionText.toLowerCase();

      if (lang === "vi") {
        if (q.includes("điểm") || q.includes("tuyển sinh") || q.includes("chuẩn")) {
          reply = "Điểm chuẩn thi THPT của Khoa những năm gần đây dao động khoảng 24.5 - 27 điểm. Nhóm ngành Tin học, Khoa học dữ liệu, và Trí tuệ Nhân tạo có điểm trúng tuyển cao nhất.";
        } else if (q.includes("đào tạo") || q.includes("ngành") || q.includes("chương trình")) {
          reply = "Khoa hiện có 4 chương trình đào tạo trọng điểm: Cử nhân Toán học, Cử nhân Tin học, Cử nhân Khoa học Dữ liệu, và Cử nhân Trí tuệ Nhân tạo mới nổi.";
        } else if (q.includes("học bổng") || q.includes("hỗ trợ")) {
          reply = "Khoa liên kết nhiều đối tác doanh nghiệp lớn và Viện Nghiên cứu Cao cấp về Toán (VIASM) để trao tặng hàng trăm suất học bổng tài năng ưu tú lên đến 30 triệu đồng/suất mỗi năm.";
        } else if (q.includes("việc làm") || q.includes("cơ hội")) {
          reply = "Cơ hội nghề nghiệp cực kỳ rộng mở! 96% sinh viên tốt nghiệp có việc làm ngay trong năm đầu tiên tại các tập đoàn công nghệ toàn cầu (Google, Grab, FPT) hoặc làm nhà định phí tài chính đầu tư.";
        } else if (q.includes("địa chỉ") || q.includes("ở đâu")) {
          reply = "Văn phòng Khoa Toán - Tin học nằm tại dãy nhà C, Số 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM. Bạn có thể ghé thăm để được tư vấn trực tiếp!";
        } else {
          reply = "Khoa Toán - Tin học luôn sẵn lòng hỗ trợ bạn! Để nhận tư vấn chi tiết hơn theo nguyện vọng, bạn có thể gửi thông tin liên hệ qua Form bên dưới hoặc nhắn tin Zalo OA của Khoa nhé.";
        }
      } else {
        if (q.includes("score") || q.includes("admission") || q.includes("grade")) {
          reply = "Admissions range from 24.5 to 27 out of 30. Computer Science, Data Science, and AI are among the most competitive streams.";
        } else if (q.includes("major") || q.includes("program")) {
          reply = "We offer 4 top majors: Pure Mathematics, Computer Science, Data Science, and Artificial Intelligence (New specialization).";
        } else if (q.includes("scholar") || q.includes("funding")) {
          reply = "Numerous scholarships are provided by partner tech corporations and the Vietnam Institute for Advanced Study in Mathematics (VIASM), value up to 30M VND each.";
        } else if (q.includes("job") || q.includes("career")) {
          reply = "Superb prospects! 96% of graduates hire quickly into global software engineering firms (Google, VNG, Grab), advanced data analyst positions, or quantitative financial actuarial desks.";
        } else {
          reply = "The Faculty is delighted to assist you! For customized help, feel free to submit the inquiry form at the bottom or visit our office at 227 Nguyen Van Cu St, District 5, HCMC.";
        }
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  // Helper to resolve Icons
  const renderProgramIcon = (iconName: string) => {
    switch (iconName) {
      case "Sigma": return <InfinityIcon className="w-8 h-8 text-[#e2b13c]" />;
      case "Laptop": return <Laptop className="w-8 h-8 text-[#e2b13c]" />;
      case "Database": return <Database className="w-8 h-8 text-[#e2b13c]" />;
      case "Cpu": return <Cpu className="w-8 h-8 text-[#e2b13c]" />;
      default: return <BookOpen className="w-8 h-8 text-[#e2b13c]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-600">
      
      {/* ========================================== */}
      {/* 1. MAIN HEADER & BRANDING & LANGUAGE BAR   */}
      {/* ========================================== */}
      
      <header id="main-header" className="bg-white border-b border-slate-100 py-3.5 shadow-xs relative z-45">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding Left */}
          <div className="flex items-center space-x-3.5">
            {/* Elegant SVG Academic Emblem Seal representation of HCMUS */}
            <div className="w-12 h-12 bg-sky-600 rounded-lg p-2 flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="font-serif font-black text-xl tracking-wider text-white">U</span>
            </div>
            
            <div className="border-l-2 border-sky-600 pl-3.5 py-0.5">
              <p className="text-[10px] md:text-xs font-semibold tracking-wide text-slate-500 leading-tight">
                {t("titleVnu")}
              </p>
              <p className="text-[11px] md:text-xs font-bold tracking-wide text-sky-600 leading-tight">
                {t("titleSchool")}
              </p>
              <h1 className="text-base md:text-xl font-extrabold tracking-tight text-sky-600 mt-0.5 font-display flex items-center gap-1.5">
                {lang === "vi" ? "KHOA TOÁN - TIN HỌC" : "FACULTY OF MATHEMATICS & COMPUTER SCIENCE"}
              </h1>
            </div>
          </div>

          {/* Search bar & Language Toggle inside main header right portion */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder={lang === "vi" ? "Tìm kiếm..." : "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-full py-2 px-3.5 pl-8 w-44 sm:w-56 focus:outline-none focus:ring-1 focus:ring-sky-600 border border-slate-200 transition-all shadow-3xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-sky-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex bg-slate-100 rounded-full p-0.5 border border-slate-200">
              <button 
                onClick={() => setLang("vi")} 
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${lang === "vi" ? "bg-sky-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                VI
              </button>
              <button 
                onClick={() => setLang("en")} 
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${lang === "en" ? "bg-sky-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-700 hover:text-sky-600 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 2. NAVIGATION BAR (Desktop nested menus)     */}
      {/* ========================================== */}
      
      <nav id="navigation" className="bg-sky-600 text-white shadow-md relative z-30 hidden lg:block border-b border-sky-400/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px]">
          <div className="flex items-center h-12">
            <ul className="flex space-x-1 h-full">
              {/* Trang chủ */}
              <li className="h-full">
                <a href="#hero-slider" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  {lang === "vi" ? "Trang chủ" : "Home"}
                </a>
              </li>

              {/* Giới thiệu */}
              <li className="relative group/main h-full">
                <a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  {lang === "vi" ? "Giới thiệu" : "About us"}
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  <a href="#welcome-section" className="block px-4 py-2 text-xs font-bold text-sky-600 hover:bg-sky-50 transition-colors">
                    {lang === "vi" ? "Tổng quan" : "Overview"}
                  </a>
                  
                  {/* Cơ cấu tổ chức */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>{lang === "vi" ? "Cơ cấu tổ chức" : "Organizational Structure"}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-60 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#board" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Ban Chủ nhiệm" : "Board of Deans"}</a>
                      <a href="#council" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Hội đồng khoa học" : "Scientific Council"}</a>
                      <a href="#departments" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Bộ môn" : "Departments"}</a>
                      <a href="#faculty" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Thông tin đội ngũ" : "Staffs"}</a>
                    </div>
                  </div>

                  <a href="#party" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Đảng - Đoàn thể" : "Party & Unions"}</a>
                  <a href="#branding" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Bộ nhận diện thương hiệu" : "Brand Identity"}</a>
                </div>
              </li>

              {/* Tin tức - Sự kiện */}
              <li className="h-full">
                <a href="#news-section" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  {lang === "vi" ? "Tin tức - Sự kiện" : "News & Events"}
                </a>
              </li>

              {/* Đào tạo */}
              <li className="relative group/main h-full">
                <a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  {lang === "vi" ? "Đào tạo" : "Academics"}
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  {/* Đại học */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>{lang === "vi" ? "Đại học" : "Undergraduate"}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Chương trình Chuẩn" : "Standard Program"}</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Chương trình Cử nhân tài năng" : "Talented Program"}</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Chương trình Tăng cường tiếng Anh" : "High Quality (English) Program"}</a>
                    </div>
                  </div>

                  {/* Sau đại học */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>{lang === "vi" ? "Sau đại học" : "Postgraduate"}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Bậc Thạc sĩ" : "Master Level"}</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Bậc Tiến sĩ" : "PhD Level"}</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Thạc sĩ Toán ứng dụng Pháp - Việt" : "French-Vietnamese Master's Program in Applied Mathematics"}</a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Nghiên cứu - Hợp tác */}
              <li className="relative group/main h-full">
                <a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  {lang === "vi" ? "Nghiên cứu - Hợp tác" : "Research & Partnerships"}
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  {/* Nghiên cứu */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>{lang === "vi" ? "Nghiên cứu" : "Research"}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-60 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Định hướng nghiên cứu" : "Research Directions"}</a>
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Công trình NCKH" : "Scientific Projects"}</a>
                      <a href="#research font" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Công bố khoa học" : "Publications"}</a>
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Hoạt động học thuật" : "Academic Activities"}</a>
                    </div>
                  </div>

                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Quan hệ doanh nghiệp" : "Corporate Relations"}</a>
                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Hợp tác quốc tế" : "International Cooperations"}</a>
                </div>
              </li>

              {/* Hỗ trợ người học */}
              <li className="relative group/main h-full">
                <a href="#" onClick={(e) => e.preventDefault()} className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  {lang === "vi" ? "Hỗ trợ người học" : "Student Support"}
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  <a href="#advisor" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Giáo viên chủ nhiệm" : "Homeroom Teachers"}</a>
                  <a href="#advisor" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Cố vấn học tập" : "Academic Advisors"}</a>
                  <a href="#resources" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Tài nguyên học vụ" : "Academic Resources"}</a>
                  <a href="#news-section" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Học bổng" : "Scholarships"}</a>
                  <a href="#news-section" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Cơ hội việc làm" : "Job Opportunities"}</a>
                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Quy trình - Biểu mẫu" : "Procedures & Forms"}</a>
                  <a href="#alumni" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{lang === "vi" ? "Cựu sinh viên" : "Alumni"}</a>
                </div>
              </li>

              {/* Tuyển sinh */}
              <li className="h-full">
                <a href="#contact" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  {lang === "vi" ? "Tuyển sinh" : "Admissions"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay mask */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* Menu core body */}
          <div className="relative flex flex-col w-full max-w-sm bg-sky-900 h-full p-6 text-white overflow-y-auto shadow-2xl z-50">
            <div className="flex items-center justify-between border-b border-sky-800 pb-4 mb-6">
              <span className="font-extrabold text-white text-lg tracking-wider font-display">
                {lang === "vi" ? "TRANG CHỦ" : "HOME"}
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-sm bg-sky-950 text-slate-300">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Language Switch */}
            <div className="flex justify-center bg-sky-955 rounded-md p-1 mb-6 border border-sky-800/40">
              <button 
                onClick={() => { setLang("vi"); setMobileMenuOpen(false); }}
                className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all ${lang === "vi" ? "bg-white text-sky-900 shadow-sm" : "text-sky-200"}`}
              >
                Tiếng Việt
              </button>
              <button 
                onClick={() => { setLang("en"); setMobileMenuOpen(false); }}
                className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all ${lang === "en" ? "bg-white text-sky-900 shadow-sm" : "text-sky-200"}`}
              >
                English
              </button>
            </div>

            {/* Side Menu Links */}
            <ul className="space-y-4 text-xs font-bold">
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">{lang === "vi" ? "Giới Thiệu" : "About Us"}</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#welcome-section" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Tổng quan" : "Overview"}</a>
                  <a href="#board" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Cơ cấu tổ chức" : "Organizational Structure"}</a>
                  <a href="#party" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Đảng - Đoàn thể" : "Party & Union"}</a>
                  <a href="#branding" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Bộ nhận diện thương hiệu" : "Brand Identity"}</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">{lang === "vi" ? "Đào Tạo" : "Academics"}</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#edu-programs" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Đại học" : "Undergraduate"}</a>
                  <a href="#edu-programs" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Sau đại học" : "Postgraduate"}</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">{lang === "vi" ? "Nghiên cứu - Hợp tác" : "Research & Partnerships"}</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#research" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Định hướng nghiên cứu" : "Research Directions"}</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Quan hệ doanh nghiệp" : "Corporate Relations"}</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Hợp tác quốc tế" : "International Cooperations"}</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">{lang === "vi" ? "Hỗ trợ người học" : "Student Support"}</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#advisor" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Cố vấn học tập & GVCN" : "Academic Advisors"}</a>
                  <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Tài nguyên học vụ" : "Academic Resources"}</a>
                  <a href="#news-section" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Học bổng & Cơ hội nghề nghiệp" : "Scholarships & Careers"}</a>
                  <a href="#alumni" onClick={() => setMobileMenuOpen(false)} className="block py-1">{lang === "vi" ? "Cựu sinh viên" : "Alumni"}</a>
                </div>
              </li>
              <li>
                <a href="#news-section" onClick={() => setMobileMenuOpen(false)} className="block text-white uppercase font-bold py-1">
                  {lang === "vi" ? "Tin tức - Sự kiện" : "News & Events"}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-white uppercase font-bold py-1">
                  {lang === "vi" ? "Tuyển sinh" : "Admissions"}
                </a>
              </li>
            </ul>

            <div className="mt-auto pt-6 text-center text-xs text-sky-200 border-t border-sky-800">
              <p>Hotline: (028) 3835 0006</p>
              <p className="mt-1">Email: math@hcmus.edu.vn</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. HERO SLIDER                             */}
      {/* ========================================== */}
      
      <section id="hero-slider" className="relative h-[150px] md:h-[245px] w-full overflow-hidden bg-slate-900 text-white shadow-inner">
        {/* Carousel slide container */}
        {SLIDES.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out flex items-center ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Background cover image with custom grading shadow overlay */}
            <div className="absolute inset-0">
              <img 
                src={slide.imageUrl} 
                alt={lang === "vi" ? slide.title : slide.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent"></div>
            </div>

            {/* Slide overlay text */}
            <div className="relative max-w-7xl mx-auto px-6 w-full z-20">
            </div>
          </div>
        ))}

        {/* Carousel manual navigation arrows */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all z-20 focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all z-20 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
        </button>

        {/* Control bar: Indicators and Play/Pause */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-3.5 z-20 bg-slate-950/40 backdrop-blur-xs py-1.5 px-4 rounded-full">
          {/* Play/Pause */}
          <button 
            onClick={togglePlay} 
            className="text-slate-300 hover:text-amber-400 transition-colors"
            title={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <div className="w-px h-3 bg-slate-700"></div>

          {/* Indicators points */}
          <div className="flex space-x-2">
            {SLIDES.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-sky-400 w-6" : "bg-white/40 hover:bg-white/70"}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. WELCOME & KEY STATISTICS SECTION        */}
      {/* ========================================== */}
      
      <section id="welcome-section" className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Visual Images Grid Left (Col 5) */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-sm h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=500" 
                      alt="Giải thưởng" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-sm h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" 
                      alt="Hoạt động sinh viên" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-sm mt-8 h-[26rem]">
                  <img 
                    src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" 
                    alt="Giảng viên" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              {/* Year badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-sky-600/90 backdrop-blur-sm text-white flex flex-col items-center justify-center shadow-xl border-4 border-white">
                <span className="text-3xl md:text-5xl font-black">~70</span>
                <span className="text-sm md:text-base font-bold uppercase tracking-wider mt-1">Năm</span>
              </div>
            </div>

            {/* Content & Stats right (Col 7) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-bold text-sky-600 uppercase tracking-widest opacity-80">
                  {lang === "vi" ? "CHÀO MỪNG ĐẾN VỚI..." : "WELCOME TO..."}
                </h3>
                <h2 className="text-3xl md:text-4xl font-black text-sky-600 font-display">
                  {lang === "vi" ? "Khoa Toán - Tin học" : "Faculty of Mathematics & Computer Science"}
                </h2>
              </div>
              
              <div className="text-[15px] text-slate-700 leading-relaxed font-normal text-justify">
                {lang === "vi" ? (
                  <p>
                    Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM được thành lập lâu đời và là đơn vị đào tạo, cung cấp nguồn nhân lực chất lượng cao hàng đầu khu vực phía Nam về lĩnh vực Toán học, Tin học ứng dụng, Khoa học dữ liệu và Trí tuệ nhân tạo. Trải qua gần 30 năm hoạt động, Khoa đã phát triển vững chắc để trở thành một trong những khoa mũi nhọn trong hệ thống giáo dục đại học của Việt Nam.
                  </p>
                ) : (
                  <p>
                    The Faculty of Mathematics & Computer Science, VNUHCM-US, is a premier institution providing top-quality human resources in the South for Mathematics, Applied Informatics, Data Science, and Artificial Intelligence. With nearly 30 years of operation, the Faculty has steadily grown to become one of the leading faculties in Vietnam's higher education system.
                  </p>
                )}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-4">
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
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. KHỐI TIN TỨC & THÔNG BÁO                 */}
      {/* ========================================== */}
      
      <section id="news-section" className="pt-[52px] pb-[52px] bg-slate-50/50 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          
          {/* Header of News & Events section */}
          <div className="text-center mb-[36px]">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase ">
              {t("secNewsTitle")}
            </h2>
          </div>

          {filteredNews.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-xl p-10 text-center text-slate-500 text-xs shadow-3xs mb-10">
              <HelpCircle className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              Không tìm thấy bài viết tin tức nào khớp với kết quả chọn của bạn.
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Highlighted Article - Left Column (col 7) */}
                <div 
                  className="lg:col-span-7 group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200/50 p-5 shadow-3xs hover:shadow-md hover:border-sky-305 transition-all cursor-pointer"
                  
                >
                  <div>
                    <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 relative shadow-4xs shrink-0">
                      <img 
                        src={filteredNews[0].imageUrl} 
                        alt={lang === "vi" ? filteredNews[0].title : filteredNews[0].titleEn}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <h5 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-4">
                      {lang === "vi" ? filteredNews[0].title : filteredNews[0].titleEn}
                    </h5>
                    
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 font-sans font-medium mt-1.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {filteredNews[0].date}
                    </div>

                    {filteredNews[0].sdgs && filteredNews[0].sdgs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 mb-1">
                        {filteredNews[0].sdgs.map((sdg) => renderMiniSdgSquare(sdg))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold mt-3 text-justify line-clamp-3">
                      {lang === "vi" ? filteredNews[0].summary : filteredNews[0].summaryEn}
                    </p>
                  </div>
                </div>

                {/* Stack of Secondary Articles - Right Column (col 5) */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  {filteredNews.slice(1, 4).map((item) => (
                    <article 
                      key={item.id}
                      
                      className="flex flex-col sm:flex-row items-stretch gap-4 p-3 rounded-2xl border border-slate-200/50 bg-white hover:border-sky-600 hover:shadow-3xs transition-all cursor-pointer group"
                    >
                      {/* Landscape thumbnail */}
                      <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 self-center sm:self-stretch shadow-4xs">
                        <img 
                          src={item.imageUrl} 
                          alt={lang === "vi" ? item.title : item.titleEn}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Text detail */}
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0 text-left">
                        <div className="space-y-1">
                          <h6 className="text-[13px] md:text-base font-bold text-slate-900 group-hover:text-sky-600 leading-snug line-clamp-2 transition-colors font-sans">
                            {lang === "vi" ? item.title : item.titleEn}
                          </h6>
                          
                          <span className="flex items-center gap-1.5 text-xs text-slate-500 font-sans mt-1.5">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            {item.date}
                          </span>
                        </div>
                        
                        {item.sdgs && item.sdgs.length > 0 && (
                          <div className="flex gap-1.5 pt-2">
                            {item.sdgs.map((sdg) => renderMiniSdgSquare(sdg))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Center aligned read more button */}
              <div className="text-center mt-[24px]">
                <button 
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 justify-center text-sky-600 hover:text-sky-700 font-bold text-xs py-1.5 px-4.5 rounded-lg border border-slate-200 hover:border-sky-600 transition-all cursor-pointer shadow-3xs w-auto mx-auto"
                >
                  <span>{lang === "vi" ? "Xem thêm" : "Read more"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Divider between News & Announcements slider */}
          <div className="w-full h-px border-t border-slate-200 mt-[52px] mb-[52px]"></div>

          {/* Section 5B: Student Announcements Slider (As requested - Moved below as a horizontal slider) */}
          <div id="student-alerts" className="w-full space-y-0">
            {/* Announcements Header block */}
            <div className="flex flex-col items-center justify-center mb-[36px] w-full text-center relative">
              <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
                {lang === "vi" ? "THÔNG TIN CHO NGƯỜI HỌC" : "INFORMATION FOR LEARNERS"}
              </h2>
              {/* Navigation buttons */}
              <div className="absolute right-0 flex items-center gap-2 hidden md:flex shrink-0">
                <button 
                  onClick={() => {
                    if (notifSliderRef.current) {
                      notifSliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                    }
                  }}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-sky-600 hover:text-sky-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (notifSliderRef.current) {
                      notifSliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                    }
                  }}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-sky-600 hover:text-sky-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scroller slider rail view */}
            <div className="relative">
              <div 
                ref={notifSliderRef}
                className="flex gap-5 overflow-x-auto pb-4 pt-2 scroll-smooth select-none snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {filteredNotifs.length === 0 ? (
                  <div className="w-full bg-white border border-slate-200/50 rounded-2xl p-8 text-center text-slate-400 text-xs py-10 shadow-3xs text-left">
                    Không tìm thấy thông báo nào trong danh mục này khớp với kết quả tìm kiếm của bạn.
                  </div>
                ) : (
                  filteredNotifs.map((notif) => (
                    <div 
                      key={notif.id}
                      
                      className="w-80 shrink-0 bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between hover:border-sky-600 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 snap-start cursor-pointer group shadow-3xs text-left"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <span className="text-xs md:text-sm text-slate-500 font-sans font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {notif.date}
                          </span>
                          
                          {notif.priority && (notif.priority === "Khẩn" || notif.priority === "Quan trọng") && (
                            <div className="shrink-0 flex items-center">
                              {notif.priority === "Khẩn" ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 py-0.5 px-2 rounded-md shadow-3xs">
                                  
                                  {lang === "vi" ? "Khẩn" : "URGENT"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 py-0.5 px-2 rounded-md shadow-3xs">
                                  
                                  {lang === "vi" ? "Quan trọng" : "VITAL"}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <h5 className="text-[13px] md:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug font-sans line-clamp-2">
                          {cleanTitle(lang === "vi" ? notif.title : notif.titleEn)}
                        </h5>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="text-center mt-[24px]">
              <button 
                onClick={(e) => { e.preventDefault(); }}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 justify-center text-sky-600 hover:text-sky-700 font-bold text-xs py-1.5 px-4.5 rounded-lg border border-slate-200 hover:border-sky-600 transition-all cursor-pointer shadow-3xs w-auto mx-auto"
              >
                <span>{lang === "vi" ? "Xem thêm" : "Read more"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 6. KHỐI CÁC CHƯƠNG TRÌNH ĐÀO TẠO TRỌNG ĐIỂM */}
      {/* ========================================== */}
      
      <section id="edu-programs" className="bg-sky-600 py-16 text-white relative overflow-hidden">
        {/* Subtle geometric digital background details representing mathematical concepts */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 text-9xl font-serif text-white">∑</div>
          <div className="absolute bottom-10 left-5 text-9xl font-mono text-white">f(x)</div>
          <div className="absolute top-1/2 left-1/3 text-9xl text-white">∫</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-sans text-white uppercase">
              {t("secProgramsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STUDY_PROGRAMS.map((prog) => (
              <div 
                key={prog.id}
                
                className="bg-white rounded-2xl border border-white/10 p-6 shadow-3xs flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer group text-left"
              >
                <div className="space-y-4">
                  {/* Icon bubble */}
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-3xs">
                    {prog.icon === "Sigma" ? <InfinityIcon className="w-6 h-6 text-sky-600" /> :
                     prog.icon === "Laptop" ? <Laptop className="w-6 h-6 text-sky-600" /> :
                     prog.icon === "Database" ? <Database className="w-6 h-6 text-sky-600" /> :
                     <Cpu className="w-6 h-6 text-sky-600" />}
                  </div>
                  <div>
                    <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3">
                      {lang === "vi" ? prog.name : prog.nameEn}
                    </h4>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4">
                      {lang === "vi" ? prog.shortDesc : prog.shortDescEn}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors">
                  <span>{lang === "vi" ? "Tìm hiểu thêm" : "Learn more"}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic study program detail overview modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full text-slate-800 overflow-hidden transform transition-all duration-300 border border-slate-100 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-sky-800 text-white p-5 flex justify-between items-start">
              <div className="space-y-1">
                <span className="bg-sky-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-sm">
                  CURRICULUM SPECIFICATION
                </span>
                <h4 className="text-lg md:text-xl font-bold font-display leading-tight text-white uppercase mr-4">
                  {lang === "vi" ? selectedProgram.name : selectedProgram.nameEn}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedProgram(null)} 
                className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {lang === "vi" ? selectedProgram.detailedDesc : selectedProgram.detailedDescEn}
              </p>

              {/* Standard Attributes */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg text-xs md:text-sm border border-slate-100">
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-[9px]">{t("duration")}</span>
                  <span className="text-slate-800 font-extrabold">{lang === "vi" ? selectedProgram.duration : selectedProgram.durationEn}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-bold uppercase text-[9px]">{t("credits")}</span>
                  <span className="text-sky-700 font-extrabold">{selectedProgram.credits} Tín chỉ (Credits)</span>
                </div>
              </div>

              {/* Tracks */}
              <div className="space-y-2">
                <span className="text-sky-700 font-extrabold text-xs uppercase tracking-wider block flex items-center gap-1">
                  <Layers className="w-4 h-4 text-sky-500" />
                  {t("tracks")}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === "vi" ? selectedProgram.tracks : selectedProgram.tracksEn).map((track, idx) => (
                    <span key={idx} className="bg-sky-50 text-sky-800 border border-sky-100/50 rounded-sm py-1 px-2.5 text-xs font-semibold">
                      • {track}
                    </span>
                  ))}
                </div>
              </div>

              {/* Careers */}
              <div className="space-y-2">
                <span className="text-sky-700 font-extrabold text-xs uppercase tracking-wider block flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-sky-500" />
                  {t("careers")}
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 pl-4 list-disc">
                  {(lang === "vi" ? selectedProgram.careers : selectedProgram.careersEn).map((career, idx) => (
                    <li key={idx} className="font-semibold text-slate-700">{career}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400">Cần tư vấn sâu? Nhắn ngay hỗ trợ viên.</span>
              <button 
                onClick={() => { setSelectedProgram(null); setChatOpen(true); }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-5 rounded-md shadow-md transition-all uppercase text-[10px]"
              >
                Nhận Tư Vấn Trực Tiếp
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6C. OUTSTANDING RESEARCH ACTIVITIES        */}
      {/* ========================================== */}
      <section id="research-activities" className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
              {lang === "vi" ? "HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT" : "OUTSTANDING RESEARCH ACTIVITIES"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            
            <div className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="text-orange-500 mb-4 bg-orange-50 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-check"><path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"/><path d="m16 12 2 2 4-4"/><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3"/></svg>
                </div>
                <h3 className="text-5xl font-black text-slate-800 font-display tracking-tighter mb-2 group-hover:text-sky-600 transition-colors">300+</h3>
                <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase tracking-wide mb-3">
                  {lang === "vi" ? "CÔNG BỐ Q1/Q2" : "Q1/Q2 PUBLICATIONS"}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                  {lang === "vi" 
                    ? "Bài báo khoa học thuộc nhóm SCIE/SCOPUS xuất bản giai đoạn 2020-2025."
                    : "High-quality papers published in SCIE/SCOPUS journals during 2020-2025."}
                </p>
              </div>
            </div>

            <div className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="text-sky-500 mb-4 bg-sky-50 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical"><path d="M10 2v7.31L2 20.5V22h20v-1.5L14 9.31V2"/><path d="M8.5 2h7"/><path d="M14 9.31 20 20.5"/><path d="M4 20.5 10 9.31"/></svg>
                </div>
                <h3 className="text-5xl font-black text-slate-800 font-display tracking-tighter mb-2 group-hover:text-sky-600 transition-colors">50+</h3>
                <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase tracking-wide mb-3">
                  {lang === "vi" ? "ĐỀ TÀI TRỌNG ĐIỂM" : "KEY GRANTS"}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                  {lang === "vi" 
                    ? "Đề tài cấp Quốc gia NAFOSTED, cấp Bộ và cấp ĐHQG-HCM."
                    : "National (NAFOSTED), Ministerial, and VNU-HCM research grants."}
                </p>
              </div>
            </div>

            <div className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="text-emerald-500 mb-4 bg-emerald-50 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
                </div>
                <h3 className="text-5xl font-black text-slate-800 font-display tracking-tighter mb-2 group-hover:text-sky-600 transition-colors">40+</h3>
                <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase tracking-wide mb-3">
                  {lang === "vi" ? "ĐỐI TÁC CHUYỂN GIAO" : "TECH TRANSFERS"}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                  {lang === "vi" 
                    ? "Doanh nghiệp hợp tác và ứng dụng giải pháp Khoa học Dữ liệu, AI."
                    : "Corporate partners applying Data Science and AI solutions."}
                </p>
              </div>
            </div>

            <div className="text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="text-indigo-500 mb-4 bg-indigo-50 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <h3 className="text-5xl font-black text-slate-800 font-display tracking-tighter mb-2 group-hover:text-sky-600 transition-colors">100+</h3>
                <h4 className="text-sm font-bold text-slate-900 leading-snug font-sans uppercase tracking-wide mb-3">
                  {lang === "vi" ? "CHUYÊN GIA QUỐC TẾ" : "GUEST EXPERTS"}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[250px] mx-auto">
                  {lang === "vi" 
                    ? "Giáo sư, chuyên gia thỉnh giảng từ Pháp, Mỹ, Nhật Bản."
                    : "Guest professors and experts from France, USA, Japan."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8A. COOPERATION PARTNERS SLIDER            */}
      {/* ========================================== */}
      <section id="partners-slider" className="bg-white py-12 border-b border-slate-100 overflow-hidden relative">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
        `}} />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full mb-8 ">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
              {lang === "vi" ? "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP" : "ACADEMIC & INDUSTRIAL PARTNERS"}
            </h2>
          </div>
        </div>

        {/* Scrolling lane element */}
        <div className="relative w-full flex items-center bg-transparent py-4">
          <div className="flex w-[200%] gap-16 items-center animate-marquee select-none whitespace-nowrap font-sans">
            
            {/* Set 1 */}
            <div className="flex justify-around items-center gap-16 shrink-0">
              {/* VIASM */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Đang kết nối Viện Nghiên cứu Cao cấp về Toán (VIASM)..." : "Connecting to Vietnam Institute for Advanced Study in Mathematics (VIASM)...")}
                className="flex items-center gap-3.5 hover:opacity-85 transition-opacity cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-xl tracking-tight shadow-sm">∑</div>
                <span className="text-sky-600 text-2xl md:text-3xl font-black tracking-tight font-display">VIASM</span>
              </div>

              {/* Google */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-3xl md:text-4.5xl font-black tracking-tight font-display text-[#4285F4]">G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span>g<span className="text-[#34A853]">l</span>e</span>
              </div>

              {/* Microsoft */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <div className="grid grid-cols-2 gap-0.5 shrink-0 mt-1">
                  <span className="w-4 h-4 bg-[#F25022]"></span>
                  <span className="w-4 h-4 bg-[#7FBA00]"></span>
                  <span className="w-4 h-4 bg-[#00A4EF]"></span>
                  <span className="w-4 h-4 bg-[#FFB900]"></span>
                </div>
                <span className="text-[#737373] text-3xl md:text-4.5xl font-black font-display tracking-tight">Microsoft</span>
              </div>

              {/* FPT */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <div className="flex gap-1.5 font-black text-white text-base md:text-lg uppercase tracking-tighter mt-1">
                  <span className="bg-[#f37021] text-white px-2.5 rounded-md py-1 shadow-2xs">F</span>
                  <span className="bg-[#009245] text-white px-2.5 rounded-md py-1 shadow-2xs">P</span>
                  <span className="bg-[#0072bc] text-white px-2.5 rounded-md py-1 shadow-2xs">T</span>
                </div>
              </div>

              {/* VNG */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#f37021] text-3xl md:text-4.5xl font-black tracking-widest uppercase font-display">VNG</span>
              </div>

              {/* MoMo */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#a50064] text-4xl md:text-5xl font-black tracking-tight lowercase">m<span className="text-[#d80879] text-3.5xl">o</span>m<span className="text-[#d80879] text-3.5xl">o</span></span>
              </div>

              {/* Grab */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#00B14F] text-4xl md:text-5xl font-black tracking-normal lowercase font-sans">grab</span>
              </div>

              {/* TMA */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#005792] text-3xl md:text-4.5xl font-black tracking-wider font-display shrink-0">TMA</span>
              </div>
            </div>

            {/* Set 2 (Duplicate for infinite seamless scroll loop) */}
            <div className="flex justify-around items-center gap-16 shrink-0">
              {/* VIASM */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Đang kết nối Viện Nghiên cứu Cao cấp về Toán (VIASM)..." : "Connecting to Vietnam Institute for Advanced Study in Mathematics (VIASM)...")}
                className="flex items-center gap-3.5 hover:opacity-85 transition-opacity cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-sky-600 flex items-center justify-center text-white font-black text-xl tracking-tight shadow-sm">∑</div>
                <span className="text-sky-600 text-2xl md:text-3xl font-black tracking-tight font-display">VIASM</span>
              </div>

              {/* Google */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-3xl md:text-4.5xl font-black tracking-tight font-display text-[#4285F4]">G<span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span>g<span className="text-[#34A853]">l</span>e</span>
              </div>

              {/* Microsoft */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <div className="grid grid-cols-2 gap-0.5 shrink-0 mt-1">
                  <span className="w-4 h-4 bg-[#F25022]"></span>
                  <span className="w-4 h-4 bg-[#7FBA00]"></span>
                  <span className="w-4 h-4 bg-[#00A4EF]"></span>
                  <span className="w-4 h-4 bg-[#FFB900]"></span>
                </div>
                <span className="text-[#737373] text-3xl md:text-4.5xl font-black font-display tracking-tight">Microsoft</span>
              </div>

              {/* FPT */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <div className="flex gap-1.5 font-black text-white text-base md:text-lg uppercase tracking-tighter mt-1">
                  <span className="bg-[#f37021] text-white px-2.5 rounded-md py-1 shadow-2xs">F</span>
                  <span className="bg-[#009245] text-white px-2.5 rounded-md py-1 shadow-2xs">P</span>
                  <span className="bg-[#0072bc] text-white px-2.5 rounded-md py-1 shadow-2xs">T</span>
                </div>
              </div>

              {/* VNG */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#f37021] text-3xl md:text-4.5xl font-black tracking-widest uppercase font-display">VNG</span>
              </div>

              {/* MoMo */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#a50064] text-4xl md:text-5xl font-black tracking-tight lowercase">m<span className="text-[#d80879] text-3.5xl">o</span>m<span className="text-[#d80879] text-3.5xl">o</span></span>
              </div>

              {/* Grab */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#00B14F] text-4xl md:text-5xl font-black tracking-normal lowercase font-sans">grab</span>
              </div>

              {/* TMA */}
              <div 
                
                className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer"
              >
                <span className="text-[#005792] text-3xl md:text-4.5xl font-black tracking-wider font-display shrink-0">TMA</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. FOOTER & CONTACT INFO                   */}
      {/* ========================================== */}
      
      <footer id="contact" className="bg-sky-600 text-sky-100 pt-12 pb-8 border-t border-sky-500">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Column 1: Branding block (col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-2xl font-black font-display tracking-tight hover:text-sky-300 transition-colors">
              KHOA TOÁN - TIN HỌC
            </h4>
            
            <p className="text-xs text-sky-100 font-medium leading-relaxed opacity-90">
              {lang === "vi" 
                ? "© 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM" 
                : "© 2026 Faculty of Mathematics & Computer Science, VNUHCM-US"}
            </p>
            
            {/* Follow Us block */}
            <div className="space-y-2 pt-2">
              <span className="block text-[10px] font-bold text-sky-200 uppercase tracking-widest opacity-80">
                {lang === "vi" ? "Theo dõi chúng tôi" : "Follow Us"}
              </span>
              <div className="flex items-center space-x-3.5">
                {/* Facebook icon */}
                <a href="https://fb.com/khoatoantinhoc" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-[#1877F2] hover:bg-sky-100 flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                  <FacebookRealIcon className="w-4 h-4" />
                </a>
                {/* Zalo icon */}
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-[#0068FF] hover:bg-sky-100 flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                  <ZaloIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Specifications (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase pb-2">
              {lang === "vi" ? "THÔNG TIN LIÊN HỆ" : "CONTACT INFORMATION"}
            </h4>
            
            <ul className="space-y-3.5 text-xs text-sky-100 font-medium">
              <li className="leading-relaxed">
                <div className="text-white font-bold mb-1">{lang === "vi" ? "Văn phòng Khoa Toán - Tin học:" : "Faculty Office:"}</div>
                {lang === "vi" ? (
                  <ul className="space-y-1.5 mt-1">
                    <li className="flex items-start gap-1.5"><span className="text-white font-extrabold">•</span>Cơ sở 1: Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh</li>
                    <li className="flex items-start gap-1.5"><span className="text-white font-extrabold">•</span>Cơ sở 2: Phòng 8.5, Nhà điều hành, Khu đô thị Đại học Quốc gia, Phường Đông Hòa, Thành phố Hồ Chí Minh</li>
                  </ul>
                ) : (
                  <ul className="space-y-1.5 mt-1">
                    <li className="flex items-start gap-1.5"><span className="text-white font-extrabold">•</span>Campus 1: Room F08-09, Building F, 227 Nguyen Van Cu Street, Cho Quan Ward, HCMC</li>
                    <li className="flex items-start gap-1.5"><span className="text-white font-extrabold">•</span>Campus 2: Room 8.5, Administration Building, VNU Urban Area, Dong Hoa Ward, HCMC</li>
                  </ul>
                )}
              </li>
              <li className="flex items-start gap-1.5 pt-1">
                <span className="text-white font-extrabold">•</span>
                <span>{lang === "vi" ? "Số điện thoại" : "Phone"}: (028) 6288 4499 (EXT: 4300)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-white font-extrabold">•</span>
                <span>Email: <a href="mailto:math@hcmus.edu.vn" className="hover:text-white transition-all">math@hcmus.edu.vn</a></span>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Helpdesk (col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase pb-2">
              {lang === "vi" ? "Liên kết" : "Quick Links"}
            </h4>
            
            <ul className="space-y-3 text-xs text-sky-100 font-medium">
              <li>
                <a href="https://moodle.hcmus.edu.vn" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-white font-extrabold">•</span> 
                  {lang === "vi" ? "Moodle chương trình chuẩn" : "Moodle (Standard Program)"}
                </a>
              </li>
              <li>
                <a href="#link-moodle-project" onClick={(e) => { e.preventDefault(); }} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-white font-extrabold">•</span> 
                  {lang === "vi" ? "Moodle chương trình đề án" : "Moodle (High-Quality Program)"}
                </a>
              </li>
              <li>
                <a href="#helpdesk" onClick={(e) => { e.preventDefault(); }} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-white font-extrabold">•</span> 
                  {lang === "vi" ? "Hỗ trợ kỹ thuật Helpdesk" : "Helpdesk Tech Support"}
                </a>
              </li>
              <li>
                <a href="https://portal.hcmus.edu.vn" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-white font-extrabold">•</span> 
                  {lang === "vi" ? "Giảng dạy tại Portal HCMUS" : "HCMUS Faculty Portal"}
                </a>
              </li>
            </ul>
          </div>

        </div>

        
      </footer>

      {/* ========================================== */}
      {/* 10. AI ADMISSION CONSULTATION CHATBOT PANEL */}
      {/* ========================================== */}
      
            {/* Action floating buttons (FAB) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Hotline */}
        <a 
          href="tel:02862884499"
          className="bg-sky-600 text-white p-3 rounded-full hover:scale-[1.05] active:scale-95 transition-all outline-none"
          title="Hotline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>

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
          {chatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 animate-pulse" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 12h.01"/><path d="M15 12h.01"/></svg>
              {/* Unread banner pointing to the chat button, very prominent with glowing shadow */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-red-600 text-white text-[10.5px] font-bold px-3 py-1 rounded-xl shadow-[0_4px_14px_rgba(239,68,68,0.4)] whitespace-nowrap animate-bounce flex items-center gap-1.5 border-2 border-white select-none">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>{lang === "vi" ? "AI Tư vấn (1)" : "Consult AI (1)"}</span>
              </div>
            </>
          )}
        </button>

        {/* Scroll to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-slate-100 text-slate-500 p-3 rounded-full hover:bg-slate-200 hover:text-slate-800 hover:scale-[1.05] active:scale-95 transition-all outline-none"
          title="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-22 right-6 w-80 md:w-96 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden z-50 flex flex-col h-[480px] animate-scaleUp">
          
          {/* Chat Headers */}
          <div className="bg-sky-600 text-white p-4.5 flex justify-between items-center shrink-0 border-b border-sky-950">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8.5 h-8.5 rounded-full bg-[#e2b13c] flex items-center justify-center font-bold text-sky-600 text-sm">
                  AI
                </div>
                {/* Active pulse */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300 leading-tight">
                  {t("askBotTitle")}
                </h5>
                <p className="text-[10px] text-sky-200">Khoa Toán - Tin học Online</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-slate-300 hover:text-white p-1">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg max-w-[85%] text-xs leading-normal font-medium shadow-2xs ${
                  msg.sender === "user" 
                    ? "bg-sky-700 text-white rounded-br-none" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Preset suggested question chips */}
          <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200 shrink-0 text-left">
            <p className="text-[10px] font-bold text-slate-500 mb-1">{t("suggestedQuestions")}</p>
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-0.5">
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Điểm chuẩn xét tuyển là bao nhiêu?" : "What is the entry score standard?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Điểm chuẩn xét tuyển?" : "Entry criteria?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Khoa có bao nhiêu chương trình học?" : "What study programs are available?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Các chương trình học?" : "Study streams?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Cơ hội học bổng và hỗ trợ thế nào?" : "Is there any scholarship program?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Học bổng của khoa?" : "Scholarships?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Học toán ra làm nghề gì?" : "What can I work after pure mathematics?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Học toán ra làm gì?" : "Career prospects?"}
              </button>
            </div>
          </div>

          {/* User Input bar */}
          <div className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white shrink-0">
            <input 
              type="text"
              placeholder={lang === "vi" ? "Nhập câu hỏi của bạn..." : "Ask anything..."}
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBotAsk(customQuestion);
                  setCustomQuestion("");
                }
              }}
              className="flex-1 bg-slate-50 text-xs px-3 py-2.5 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
            <button 
              onClick={() => {
                handleBotAsk(customQuestion);
                setCustomQuestion("");
              }}
              className="bg-sky-600 text-[#e2b13c] font-black text-xs px-3 py-2.5 rounded hover:bg-sky-700 transition-all shrink-0"
            >
              {t("send")}
            </button>
          </div>

        </div>
      )}

      {/* Modern custom toast notification */}
      {toast.visible && (
        <div 
          id="toast-banner" 
          className="fixed bottom-6 left-6 z-50 max-w-xs md:max-w-sm bg-sky-700 text-white border-l-4 border-[#e2b13c] py-3 px-4.5 rounded shadow-2xl flex items-center justify-between gap-3 animate-fadeIn duration-200"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#e2b13c] shrink-0" />
            <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast((prev) => ({ ...prev, visible: false }))} 
            className="text-slate-400 hover:text-white ml-1 text-[10px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
