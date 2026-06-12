import { useState, useEffect, useRef, FormEvent } from "react";
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
  ChevronUp
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
      : "Hello! I am the Virtual Academic Advisor for the Department of Math & Computer Science. How can I assist you with admissions, majors, or scholarships today?";
    setChatMessages([{ sender: "bot", text: welcomeMsg }]);
  }, [lang]);

  // SDG Square Badge render helper - styled strictly according to official UN SDG logos (https://vietnam.un.org/vi/sdgs)
  const renderSdgSquare = (sdg: string) => {
    if (sdg === "4") {
      const titleVi = <>GIÁO DỤC<br/>CÓ CHẤT LƯỢNG</>;
      const titleEn = <>QUALITY<br/>EDUCATION</>;
      return (
        <div key={sdg} className="w-[42px] h-[42px] bg-[#C5192D] text-white p-1 rounded-[1.5px] flex flex-col justify-between shrink-0 font-sans shadow-5xs transition-all hover:scale-105 select-none" title="SDG 4: Giáo dục có chất lượng | Quality Education">
          <span className="text-[13px] font-black leading-none text-left tracking-tighter">4</span>
          <span className="text-[4px] font-black leading-[4.5px] tracking-tighter text-left uppercase whitespace-nowrap block">
            {lang === "vi" ? titleVi : titleEn}
          </span>
        </div>
      );
    }
    if (sdg === "9") {
      const titleVi = <>CÔNG NGHIỆP, SÁNG TẠO<br/>& PT HẠ TẦNG</>;
      const titleEn = <>INDUSTRY, INNOVATION<br/>& INFRASTRUCTURE</>;
      return (
        <div key={sdg} className="w-[42px] h-[42px] bg-[#F36D25] text-white p-1 rounded-[1.5px] flex flex-col justify-between shrink-0 font-sans shadow-5xs transition-all hover:scale-105 select-none" title="SDG 9: Công nghiệp, Sáng tạo và Phát triển hạ tầng | Industry, Innovation & Infrastructure">
          <span className="text-[13px] font-black leading-none text-left tracking-tighter">9</span>
          <span className="text-[3.6px] font-black leading-[4px] tracking-tighter text-left uppercase whitespace-nowrap block font-sans">
            {lang === "vi" ? titleVi : titleEn}
          </span>
        </div>
      );
    }
    if (sdg === "17") {
      const titleVi = <>QUAN HỆ ĐỐI TÁC<br/>VÌ CÁC MỤC TIÊU</>;
      const titleEn = <>PARTNERSHIPS<br/>FOR THE GOALS</>;
      return (
        <div key={sdg} className="w-[42px] h-[42px] bg-[#19486A] text-white p-1 rounded-[1.5px] flex flex-col justify-between shrink-0 font-sans shadow-5xs transition-all hover:scale-105 select-none" title="SDG 17: Quan hệ đối tác vì các mục tiêu | Partnerships for the Goals">
          <span className="text-[13px] font-black leading-none text-left tracking-tighter">17</span>
          <span className="text-[4px] font-black leading-[4.5px] tracking-tighter text-left uppercase whitespace-nowrap block">
            {lang === "vi" ? titleVi : titleEn}
          </span>
        </div>
      );
    }
    return null;
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
      alumni: { vi: "Cựu Sinh Viên", en: "Alumni" },
      jobs: { vi: "Tuyển Dụng", en: "Careers" },
      contact: { vi: "Liên Hệ", en: "Contact" },
      searchPlaceholder: { vi: "Tìm kiếm thông tin học phần, tin tức...", en: "Search courses, news, events..." },
      hotline: { vi: "Hotline Giáo Vụ", en: "Academic Hotline" },
      titleSchool: { vi: "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN", en: "UNIVERSITY OF SCIENCE" },
      titleVnu: { vi: "ĐẠI HỌC QUỐC GIA TP.HỒ CHÍ MINH", en: "VIETNAM NATIONAL UNIVERSITY - HCM" },
      titleDept: { vi: "KHOA TOÁN - TIN HỌC", en: "FACULTY OF MATHEMATICS & COMPUTER SCIENCE" },
      
      // Navigation Menu
      navIntro: { vi: "Giới Thiệu", en: "About Us" },
      navEdu: { vi: "Đào Tạo", en: "Academics" },
      navResearch: { vi: "Nghiên Cứu", en: "Research" },
      navStudent: { vi: "Sinh Viên", en: "Student Life" },
      navNews: { vi: "Tin Tức - Thông Báo", en: "News & Events" },
      navCareersPost: { vi: "Hướng Nghiệp", en: "Partnership" },

      // Navigation Dropdown Items (Simplified mock links)
      subHistory: { vi: "Lịch sử hình thành", en: "Our History" },
      subStaff: { vi: "Đội ngũ giảng viên", en: "Faculty & Staff" },
      subStructure: { vi: "Cơ cấu tổ chức", en: "Department Structure" },
      subUniv: { vi: "Bậc Đại học", en: "Undergraduate Streams" },
      subPostGrad: { vi: "Sau Đại học", en: "Graduate & PhD" },
      subLab: { vi: "Nhóm nghiên cứu mạnh", en: "Key Laboratories" },
      subSeminar: { vi: "Hội nghị & Hội thảo", en: "Symposiums & Conferences" },
      subRegulation: { vi: "Học vụ & Quy chế", en: "Student Policy Guides" },
      subYouth: { vi: "Đoàn - Hội khoa", en: "Youth Union & Student Union" },

      // Titles of section
      secStats: { vi: "NHỮNG CON SỐ ẤN TƯỢNG", en: "STATS AT A GLANCE" },
      secNewsTitle: { vi: "Tin Tức Sự Kiện Mới Nhất", en: "Latest News & Dynamic Events" },
      secNotifTitle: { vi: "Thông Báo Quan Trọng", en: "Key Notifications" },
      secProgramsTitle: { vi: "Chương Trình Đào Tạo Trọng Điểm", en: "Key Academic Programs" },
      secAlumniTitle: { vi: "Tự Hào Cựu Sinh Viên Khoa Toán - Tin học", en: "Inspiring Alumni Stories" },
      secFaqTitle: { vi: "Giải Đáp Thắc Mắc Thường Gặp", en: "Frequently Asked Questions" },

      // Filter tabs
      tabAll: { vi: "Tất cả tin tức", en: "All News" },
      tabAcademic: { vi: "Học thuật - Nghiên cứu", en: "Academic & R&D" },
      tabActivity: { vi: "Sự kiện - Phong trào", en: "Student Activity" },
      notifUnder: { vi: "Đại học Chính quy", en: "Undergraduate" },
      notifPost: { vi: "Sau Đại học", en: "Postgraduate" },
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
      addrTitle: { vi: "ĐỊA CHỈ LIÊN HỆ", en: "CONTACT HEADQUARTER" },
      addrDetail: { vi: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam", en: "227 Nguyen Van Cu Str, Ward 4, District 5, Ho Chi Minh City, Vietnam" },
      officeHour: { vi: "Giờ làm việc: Thứ Hai - Thứ Sáu, 07:30 - 11:30 & 13:30 - 17:00", en: "Working hours: Mon - Fri, 07:30 - 11:30 & 13:30 - 17:00" },
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
    const fullAddress = "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.Hồ Chí Minh, Việt Nam";
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
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
          reply = "Khoa Toán - Tin học luôn sẵn lòng hỗ trợ bạn! Để nhận tư vấn chi tiết hơn theo nguyện vọng, bạn có thể gửi thông tin liên hệ qua Form bên dưới hoặc nhắn tin cho Fanpage của Khoa nhé.";
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
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-900">
      
      {/* ========================================== */}
      {/* 1. MAIN HEADER & BRANDING & LANGUAGE BAR   */}
      {/* ========================================== */}
      
      <header id="main-header" className="bg-white border-b border-sky-100 py-3.5 shadow-xs relative z-45">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding Left */}
          <div className="flex items-center space-x-3.5">
            {/* Elegant SVG Academic Emblem Seal representation of HCMUS */}
            <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-500 rounded-lg p-2 flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="font-serif font-black text-xl tracking-wider text-white">U</span>
            </div>
            
            <div className="border-l-2 border-sky-500 pl-3.5 py-0.5">
              <p className="text-[10px] md:text-xs font-semibold tracking-wide text-slate-500 leading-tight">
                {t("titleVnu")}
              </p>
              <p className="text-[11px] md:text-xs font-bold tracking-wide text-sky-800 leading-tight">
                {t("titleSchool")}
              </p>
              <h1 className="text-base md:text-xl font-extrabold tracking-tight text-sky-600 mt-0.5 font-display flex items-center gap-1.5">
                KHOA TOÁN - TIN HỌC
              </h1>
            </div>
          </div>

          {/* Search bar & Language Toggle inside main header right portion */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder={lang === "vi" ? "Tìm kiếm thông tin..." : "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-full py-2 px-3.5 pl-8 w-44 sm:w-56 focus:outline-none focus:ring-1 focus:ring-sky-500 border border-slate-200 transition-all shadow-3xs"
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
      
      <nav id="navigation" className="bg-sky-600 text-white shadow-md relative z-30 hidden lg:block border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px]">
          <div className="flex items-center h-12">
            <ul className="flex space-x-1 h-full">
              {/* Trang chủ */}
              <li className="h-full">
                <a href="#hero-slider" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  Trang chủ
                </a>
              </li>

              {/* Giới thiệu */}
              <li className="relative group/main h-full">
                <a href="#intro" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  Giới thiệu
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  <a href="#welcome-section" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Tổng quan</a>
                  
                  {/* Cơ cấu tổ chức */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>Cơ cấu tổ chức</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-60 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#board" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Ban Chủ nhiệm</a>
                      <a href="#council" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Hội đồng khoa học</a>
                      <a href="#departments" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Bộ môn</a>
                      <a href="#faculty" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Thông tin đội ngũ</a>
                    </div>
                  </div>

                  <a href="#party" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Đảng - Đoàn thể</a>
                  <a href="#branding" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Bộ nhận diện thương hiệu</a>
                </div>
              </li>

              {/* Tin tức - Sự kiện */}
              <li className="h-full">
                <a href="#news-section" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  Tin tức - Sự kiện
                </a>
              </li>

              {/* Đào tạo */}
              <li className="relative group/main h-full">
                <a href="#edu-programs" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  Đào tạo
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  {/* Đại học */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>Đại học</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Chương trình Chuẩn</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Chương trình Cử nhân tài năng</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Chương trình Tăng cường tiếng Anh</a>
                    </div>
                  </div>

                  {/* Sau đại học */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>Sau đại học</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-72 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Bậc Thạc sĩ</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Bậc Tiến sĩ</a>
                      <a href="#edu-programs" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Thạc sĩ Toán ứng dụng Pháp - Việt</a>
                    </div>
                  </div>
                </div>
              </li>

              {/* Nghiên cứu - Hợp tác */}
              <li className="relative group/main h-full">
                <a href="#research" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  Nghiên cứu - Hợp tác
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  {/* Nghiên cứu */}
                  <div className="relative group/nested">
                    <div className="flex justify-between items-center px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer transition-colors">
                      <span>Nghiên cứu</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="absolute left-full top-0 w-60 bg-white rounded-md shadow-2xl border border-slate-100 py-1.5 hidden group-hover/nested:block text-slate-700">
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Định hướng nghiên cứu</a>
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Công trình NCKH</a>
                      <a href="#research font" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Công bố khoa học</a>
                      <a href="#research" className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">Hoạt động học thuật</a>
                    </div>
                  </div>

                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Quan hệ doanh nghiệp</a>
                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Hợp tác quốc tế</a>
                </div>
              </li>

              {/* Hỗ trợ người học */}
              <li className="relative group/main h-full">
                <a href="#students" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap gap-1">
                  Hỗ trợ người học
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </a>
                <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-md shadow-2xl border border-slate-100 py-2 hidden group-hover/main:block text-slate-800 z-50">
                  <a href="#advisor" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Giáo viên chủ nhiệm</a>
                  <a href="#advisor" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Cố vấn học tập</a>
                  <a href="#resources" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Tài nguyên học vụ</a>
                  <a href="#news-section" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Học bổng</a>
                  <a href="#news-section" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Cơ hội việc làm</a>
                  <a href="#contact" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Quy trình - Biểu mẫu</a>
                  <a href="#alumni" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">Cựu sinh viên</a>
                </div>
              </li>

              {/* Tuyển sinh */}
              <li className="h-full">
                <a href="#contact" className="px-4.5 h-full flex items-center text-xs font-bold uppercase hover:bg-sky-700 hover:text-white transition-all whitespace-nowrap">
                  Tuyển sinh
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
              <span className="font-extrabold text-white text-lg tracking-wider font-display">TRANG CHỦ</span>
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
                <div className="text-white mb-1.5 uppercase opacity-60">Giới Thiệu</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#welcome-section" onClick={() => setMobileMenuOpen(false)} className="block py-1">Tổng quan</a>
                  <a href="#board" onClick={() => setMobileMenuOpen(false)} className="block py-1">Cơ cấu tổ chức</a>
                  <a href="#party" onClick={() => setMobileMenuOpen(false)} className="block py-1">Đảng - Đoàn thể</a>
                  <a href="#branding" onClick={() => setMobileMenuOpen(false)} className="block py-1">Bộ nhận diện thương hiệu</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">Đào Tạo</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#edu-programs" onClick={() => setMobileMenuOpen(false)} className="block py-1">Bậc Đại học</a>
                  <a href="#edu-programs" onClick={() => setMobileMenuOpen(false)} className="block py-1">Sau đại học</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">Nghiên cứu - Hợp tác</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#research" onClick={() => setMobileMenuOpen(false)} className="block py-1">Định hướng nghiên cứu</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">Quan hệ doanh nghiệp</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1">Hợp tác quốc tế</a>
                </div>
              </li>
              <li>
                <div className="text-white mb-1.5 uppercase opacity-60">Hỗ trợ người học</div>
                <div className="pl-3 space-y-2 border-l border-sky-700 text-sky-100 font-semibold">
                  <a href="#advisor" onClick={() => setMobileMenuOpen(false)} className="block py-1">Cố vấn học tập & GVCN</a>
                  <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="block py-1">Tài nguyên học vụ</a>
                  <a href="#news-section" onClick={() => setMobileMenuOpen(false)} className="block py-1">Học bổng & Cơ hội nghề nghiệp</a>
                  <a href="#alumni" onClick={() => setMobileMenuOpen(false)} className="block py-1">Cựu sinh viên</a>
                </div>
              </li>
              <li>
                <a href="#news-section" onClick={() => setMobileMenuOpen(false)} className="block text-white uppercase font-bold py-1">
                  Tin tức - Sự kiện
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-white uppercase font-bold py-1">
                  Tuyển sinh
                </a>
              </li>
            </ul>

            <div className="mt-auto pt-6 text-center text-xs text-sky-200 border-t border-sky-800">
              <p>Hotline: (028) 3835 0006</p>
              <p className="mt-1">Email: toantin@hcmus.edu.vn</p>
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
      
      <section id="welcome-section" className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Images Grid Left (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md border-2 border-sky-50 bg-slate-100 transform hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" 
                      alt="Student group studying" 
                      className="w-full h-40 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden col-span-2 shadow-sm border border-slate-100 bg-slate-50 p-4 transform hover:scale-[1.02] transition-transform duration-300 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-extrabold uppercase text-sky-600 tracking-wider">AUN-QA certified</span>
                    <p className="text-[10px] text-slate-505 font-semibold mt-1">Đạt tiêu chuẩn chất lượng mạng lưới ĐH Đông Nam Á</p>
                  </div>
                </div>
                <div className="space-y-4 pt-6">
                  <div className="rounded-2xl overflow-hidden col-span-1 shadow-md border-2 border-sky-50 bg-slate-100 transform hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500" 
                      alt="Collaboration session" 
                      className="w-full h-56 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Stats grid Right (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="pb-4 border-b border-slate-200/50">
                <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight font-display uppercase">
                  {lang === "vi" ? "GIỚI THIỆU CHUNG" : "ABOUT THE FACULTY"}
                </h2>
              </div>
              
              <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM được thành lập lâu đời và là đơn vị đào tạo, cung cấp nguồn nhân lực chất lượng cao hàng đầu khu vực phía Nam về lĩnh vực Toán học, Tin học ứng dụng, Khoa học dữ liệu và Trí tuệ nhân tạo. Hiện tại, Khoa đang đào tạo bậc Đại học các ngành mũi nhọn có tính ứng dụng cao, phục vụ mạnh mẽ cho sự phát triển của cách mạng công nghiệp và chuyển đổi số.
                </p>
                <p>
                  Ngành Toán học và các chương trình liên kết của Khoa đã đạt tiêu chuẩn kiểm định quốc tế AUN-QA (Asean University Network Quality Assurance) khẳng định uy tín và chất lượng đào tạo vượt trội.
                </p>
              </div>

              {/* Statistics grid layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100/35">
                  <p className="text-2xl font-black text-sky-600 font-display">2000+</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">Sinh viên Đại học</p>
                </div>
                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100/35">
                  <p className="text-2xl font-black text-sky-600 font-display">100+</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">Giảng viên chất lượng</p>
                </div>
                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100/35">
                  <p className="text-2xl font-black text-sky-600 font-display">30-50</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">Đề tài NCKH hàng năm</p>
                </div>
                <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100/35">
                  <p className="text-2xl font-black text-sky-600 font-display">70-100</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">Công bố khoa học/năm</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. KHỐI TIN TỨC & THÔNG BÁO                 */}
      {/* ========================================== */}
      
      <section id="news-section" className="py-16 bg-slate-50/50 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          
          {/* Header of News & Events section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/60 pb-5 mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight font-display uppercase">
                {t("secNewsTitle")}
              </h2>
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-xl p-10 text-center text-slate-500 text-xs shadow-3xs mb-10">
              <HelpCircle className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              Không tìm thấy bài viết tin tức nào khớp với kết quả chọn của bạn.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
              
              {/* Highlighted Article - Left Column (col 7) */}
              <div 
                className="lg:col-span-7 group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200/50 p-5 shadow-3xs hover:shadow-md hover:border-sky-305 transition-all cursor-pointer"
                onClick={() => showToast(lang === 'vi' ? `Đang mở tin tức: ${filteredNews[0].title}` : `Opening story: ${filteredNews[0].titleEn}`)}
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
                  
                  <h5 className="text-[15px] md:text-[17px] font-black text-sky-900 group-hover:text-sky-650 transition-colors uppercase font-sans tracking-tight leading-snug mt-4">
                    {lang === "vi" ? filteredNews[0].title : filteredNews[0].titleEn}
                  </h5>
                  
                  <div className="text-xs text-slate-500 font-mono font-bold mt-1.5 block">
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
                    onClick={() => showToast(lang === 'vi' ? `Đang mở bài viết: ${item.title}` : `Opening story: ${item.titleEn}`)}
                    className="flex flex-col sm:flex-row items-stretch gap-4 p-3 rounded-2xl border border-slate-200/50 bg-white hover:border-sky-305 hover:shadow-3xs transition-all cursor-pointer group"
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
                        <h6 className="text-[13px] font-black text-sky-900 group-hover:text-sky-600 leading-snug line-clamp-2 uppercase font-sans">
                          {lang === "vi" ? item.title : item.titleEn}
                        </h6>
                        
                        <span className="text-[10px] text-slate-500 font-mono font-bold block mt-1.5">
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
                
                <div className="pt-2 mt-4 text-center">
                  <button 
                    onClick={() => showToast(lang === "vi" ? "Đang chuyển hướng tới trang Lưu trữ danh mục Tin tức..." : "Navigating to News Archive Catalog...")}
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 justify-center text-sky-800 font-extrabold text-xs py-2 px-6 rounded-lg border border-slate-205 transition-all cursor-pointer shadow-3xs"
                  >
                    {lang === "vi" ? "Xem thêm" : "Read more"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Divider between News & Announcements slider */}
          <div className="w-full h-px bg-slate-250/60 my-10 border-t border-slate-200"></div>

          {/* Section 5B: Student Announcements Slider (As requested - Moved below as a horizontal slider) */}
          <div id="student-alerts" className="w-full space-y-6">
            {/* Announcements Header block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50 pb-5 text-left">
              <div>
                <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight font-display uppercase">
                  {lang === "vi" ? "THÔNG BÁO CHO NGƯỜI HỌC" : "ACADEMIC ANNOUNCEMENTS"}
                </h2>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-end gap-4 shrink-0">
                {/* Slider manual arrow controllers */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (notifSliderRef.current) {
                        notifSliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                      }
                    }}
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-sky-500 hover:text-sky-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
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
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-sky-500 hover:text-sky-600 flex items-center justify-center transition-all cursor-pointer shadow-3xs active:scale-95"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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
                      onClick={() => showToast(lang === 'vi' ? `Mở tài liệu thông báo: ${notif.title}` : `Opening publication: ${notif.titleEn}`)}
                      className="w-80 shrink-0 bg-white border border-slate-200/55 p-5 rounded-2xl flex flex-col justify-between hover:border-sky-305 hover:shadow-xs hover:translate-y-[-2px] transition-all duration-300 snap-start cursor-pointer group shadow-3xs text-left"
                    >
                      <div>
                        {/* Title */}
                        <p className="text-xs sm:text-[13px] font-extrabold text-slate-800 group-hover:text-sky-600 leading-relaxed font-sans line-clamp-3 my-3">
                          {lang === "vi" ? notif.title : notif.titleEn}
                        </p>

                        <div className="flex items-center justify-between gap-3 mt-2">
                          {/* Date Info */}
                          <span className="text-[10px] text-slate-500 font-mono font-bold block">
                            {notif.date} {notif.month} 2026
                          </span>

                          {/* Level indicator tag */}
                          {notif.priority && (notif.priority === "Khẩn" || notif.priority === "Quan trọng") && (
                            <div className="shrink-0">
                              {notif.priority === "Khẩn" ? (
                                <span className="inline-flex items-center gap-1 text-[8px] font-black text-red-650 bg-red-50 border border-red-100 py-0.5 px-2 rounded-md shadow-3xs">
                                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping shrink-0"></span>
                                  {lang === "vi" ? "Khẩn" : "URGENT"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[8px] font-black text-amber-750 bg-amber-50 border border-amber-100 py-0.5 px-2 rounded-md shadow-3xs">
                                  <span className="w-1 h-1 bg-amber-500 rounded-full shrink-0"></span>
                                  {lang === "vi" ? "Quan trọng" : "VITAL"}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 text-center">
              <button 
                onClick={(e) => { e.preventDefault(); showToast(lang === 'vi' ? "Đang liên kết toàn bộ lưu trữ thông báo học vụ..." : "Loading database of all historically stored announcements..."); }}
                className="inline-flex items-center gap-2 justify-center bg-white hover:bg-slate-50 text-sky-800 font-extrabold text-xs py-2 px-6 rounded-lg border border-slate-205 transition-all cursor-pointer shadow-3xs"
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
      
      <section id="edu-programs" className="bg-gradient-to-b from-sky-900 to-sky-950 py-16 text-white relative overflow-hidden">
        {/* Subtle geometric digital background details representing mathematical concepts */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 text-9xl font-serif">∑</div>
          <div className="absolute bottom-10 left-5 text-9xl font-mono">f(x)</div>
          <div className="absolute top-1/2 left-1/3 text-9xl">∫</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] relative z-10">
          <div className="text-center mb-10 pb-6 border-b border-white/20">
            <h2 className="text-2xl md:text-3.5xl font-black tracking-tight font-display text-white uppercase relative">
              {t("secProgramsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Đào tạo Đại học */}
            <div className="bg-white rounded-[20px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden">
              <div className="w-full h-56 relative overflow-hidden bg-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                  alt="Đào tạo đại học" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 md:p-8 flex items-center justify-between">
                <h4 className="text-xl md:text-2xl font-black font-display text-[#003366] tracking-tight">
                  {lang === "vi" ? "Đào tạo đại học" : "Undergraduate"}
                </h4>
                <button 
                  onClick={() => showToast(lang === "vi" ? "Đang liên kết tới trang tuyển sinh chương trình Đại học..." : "Heading to Undergraduate Admissions gateway...")}
                  className="w-12 h-12 rounded-full bg-[#003366] text-white flex items-center justify-center hover:bg-sky-800 transition-colors shadow-md outline-none"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Column 2: Đào tạo Sau Đại học */}
            <div className="bg-white rounded-[20px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden">
              <div className="w-full h-56 relative overflow-hidden bg-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                  alt="Đào tạo sau đại học" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 md:p-8 flex items-center justify-between">
                <h4 className="text-xl md:text-2xl font-black font-display text-[#003366] tracking-tight">
                  {lang === "vi" ? "Đào tạo sau đại học" : "Postgraduate"}
                </h4>
                <button 
                  onClick={() => showToast(lang === "vi" ? "Đang liên kết tới trang tuyển sinh chương trình Sau Đại học..." : "Heading to Postgraduate Admissions gateway...")}
                  className="w-12 h-12 rounded-full bg-[#003366] text-white flex items-center justify-center hover:bg-sky-800 transition-colors shadow-md outline-none"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
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
      <section id="student-activities" className="bg-slate-50 py-16 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          <div className="pb-6 border-b border-slate-200/50 mb-10 w-full text-left">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 font-display uppercase tracking-tight">
              {lang === "vi" ? "MỘT SỐ HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT" : "OUTSTANDING RESEARCH ACTIVITIES"}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left intro text (Col 4) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                {lang === "vi" 
                  ? "Khoa Toán - Tin học luôn dẫn đầu trong các nghiên cứu lý thuyết căn bản lẫn các bài toán ứng dụng thực tiễn, chuyển giao giải pháp cho các tập đoàn lớn toàn cầu và ghi dấu ấn trên bản đồ học thuật quốc tế."
                  : "The Faculty of Mathematics & Computer Science continually leads in deep theoretical work and applied industrial technologies, publishing globally and transferring insights to major tech enterprises."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => showToast(lang === "vi" ? "Đang kết nối để hiển thị các Đề tài NCKH xuất sắc..." : "Connecting to show elite Scientific Projects...")}
                  className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-3 px-6 rounded-md shadow-md transition-all text-xs uppercase cursor-pointer"
                >
                  {lang === "vi" ? "Công Bố Khoa Học" : "Scientific Publications"}
                </button>
              </div>
            </div>

            {/* Right Stats Grid (Col 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* Stat 1 */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-black text-[#003366] font-display mb-2">40+</div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {lang === "vi" ? "Bài báo khoa học quốc tế / năm" : "International Papers / year"}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">ISI/Scopus Q1, Q2 liên tục xuất bản</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-black text-sky-500 font-display mb-2">15+</div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {lang === "vi" ? "Nhóm nghiên cứu & Labs" : "Research Groups & Labs"}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">Chuyên sâu từ lý thuyết đến chuyển giao AI</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-black text-amber-500 font-display mb-2">25+</div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {lang === "vi" ? "Hội nghị & Hội thảo" : "Conferences & Seminars"}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">Hợp tác cùng chuyên gia học thuật toàn cầu</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-black text-emerald-600 font-display mb-2">12+</div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {lang === "vi" ? "Dự án cấp Quốc gia & Bộ" : "National & Ministry Projects"}
                </h4>
                <p className="text-xs text-slate-500 mt-2 font-medium">Đóng góp trọng tâm kinh tế số, xã hội</p>
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
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full mb-10 pb-6 border-b border-slate-200/50">
          <div className="flex flex-col text-center">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 tracking-tight font-display uppercase">
              {lang === "vi" ? "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP" : "ACADEMIC & INDUSTRIAL PARTNERS"}
            </h2>
          </div>
        </div>

        {/* Scrolling lane element */}
        <div className="relative w-full flex items-center bg-transparent py-2">
          <div className="flex w-[200%] gap-16 items-center animate-marquee select-none whitespace-nowrap font-sans">
            
            {/* Set 1 */}
            <div className="flex justify-around items-center gap-16 shrink-0">
              {/* VIASM */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Đang kết nối Viện Nghiên cứu Cao cấp về Toán (VIASM)..." : "Connecting to Vietnam Institute for Advanced Study in Mathematics (VIASM)...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer group grayscale hover:grayscale-0"
              >
                <div className="w-8 h-8 rounded bg-sky-800 flex items-center justify-center text-white font-extrabold text-sm tracking-tight group-hover:bg-sky-600">∑</div>
                <span className="text-slate-800 text-xl font-black tracking-tight font-display">VIASM</span>
              </div>

              {/* Google */}
              <div 
                onClick={() => showToast("Connecting to Google research program...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-2xl font-black tracking-tight font-display text-blue-600">G<span className="text-red-500">o</span><span className="text-amber-500">o</span>g<span className="text-green-500">l</span>e</span>
              </div>

              {/* Microsoft */}
              <div 
                onClick={() => showToast("Connecting to Microsoft collaboration portfolio...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <div className="grid grid-cols-2 gap-0.5 shrink-0 mt-1">
                  <span className="w-3.5 h-3.5 bg-red-500"></span>
                  <span className="w-3.5 h-3.5 bg-green-500"></span>
                  <span className="w-3.5 h-3.5 bg-blue-500"></span>
                  <span className="w-3.5 h-3.5 bg-amber-400"></span>
                </div>
                <span className="text-slate-800 text-2xl font-black font-display tracking-tight">Microsoft</span>
              </div>

              {/* FPT */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Kết nối chương trình tài trợ & thực tập FPT..." : "Connecting to FPT internship gateway...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <div className="flex gap-1 font-black text-white text-sm uppercase tracking-tighter mt-1">
                  <span className="bg-orange-500 text-white px-2 rounded-sm py-0.5">F</span>
                  <span className="bg-sky-600 text-white px-2 rounded-sm py-0.5">P</span>
                  <span className="bg-emerald-500 text-white px-2 rounded-sm py-0.5">T</span>
                </div>
              </div>

              {/* VNG */}
              <div 
                onClick={() => showToast("Connecting to VNG talent camp...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-slate-800 text-2xl font-black tracking-widest uppercase font-display hover:text-orange-500 transition-colors">VNG</span>
              </div>

              {/* MoMo */}
              <div 
                onClick={() => showToast("Connecting to MoMo Fintech analytics lab...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-[#a50064] text-3xl font-black tracking-tight lowercase">m<span className="text-[#d80879] text-2xl">o</span>m<span className="text-[#d80879] text-2xl">o</span></span>
              </div>

              {/* Grab */}
              <div 
                onClick={() => showToast("Connecting to Grab urban transport research hub...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-emerald-600 text-3xl font-black tracking-normal lowercase font-sans">grab</span>
              </div>

              {/* TMA */}
              <div 
                onClick={() => showToast("Connecting to TMA engineering network...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-sky-800 text-2xl font-black tracking-wider font-display shrink-0">TMA</span>
              </div>
            </div>

            {/* Set 2 (Duplicate for infinite seamless scroll loop) */}
            <div className="flex justify-around items-center gap-16 shrink-0">
              {/* VIASM */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Đang kết nối Viện Nghiên cứu Cao cấp về Toán (VIASM)..." : "Connecting to Vietnam Institute for Advanced Study in Mathematics (VIASM)...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer group grayscale hover:grayscale-0"
              >
                <div className="w-8 h-8 rounded bg-sky-800 flex items-center justify-center text-white font-extrabold text-sm tracking-tight group-hover:bg-sky-600">∑</div>
                <span className="text-slate-800 text-xl font-black tracking-tight font-display">VIASM</span>
              </div>

              {/* Google */}
              <div 
                onClick={() => showToast("Connecting to Google research program...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-2xl font-black tracking-tight font-display text-blue-600">G<span className="text-red-500">o</span><span className="text-amber-500">o</span>g<span className="text-green-500">l</span>e</span>
              </div>

              {/* Microsoft */}
              <div 
                onClick={() => showToast("Connecting to Microsoft collaboration portfolio...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <div className="grid grid-cols-2 gap-0.5 shrink-0 mt-1">
                  <span className="w-3.5 h-3.5 bg-red-500"></span>
                  <span className="w-3.5 h-3.5 bg-green-500"></span>
                  <span className="w-3.5 h-3.5 bg-blue-500"></span>
                  <span className="w-3.5 h-3.5 bg-amber-400"></span>
                </div>
                <span className="text-slate-800 text-2xl font-black font-display tracking-tight">Microsoft</span>
              </div>

              {/* FPT */}
              <div 
                onClick={() => showToast(lang === "vi" ? "Kết nối chương trình tài trợ & thực tập FPT..." : "Connecting to FPT internship gateway...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <div className="flex gap-1 font-black text-white text-sm uppercase tracking-tighter mt-1">
                  <span className="bg-orange-500 text-white px-2 rounded-sm py-0.5">F</span>
                  <span className="bg-sky-600 text-white px-2 rounded-sm py-0.5">P</span>
                  <span className="bg-emerald-500 text-white px-2 rounded-sm py-0.5">T</span>
                </div>
              </div>

              {/* VNG */}
              <div 
                onClick={() => showToast("Connecting to VNG talent camp...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-slate-800 text-2xl font-black tracking-widest uppercase font-display hover:text-orange-500 transition-colors">VNG</span>
              </div>

              {/* MoMo */}
              <div 
                onClick={() => showToast("Connecting to MoMo Fintech analytics lab...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-[#a50064] text-3xl font-black tracking-tight lowercase">m<span className="text-[#d80879] text-2xl">o</span>m<span className="text-[#d80879] text-2xl">o</span></span>
              </div>

              {/* Grab */}
              <div 
                onClick={() => showToast("Connecting to Grab urban transport research hub...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-emerald-600 text-3xl font-black tracking-normal lowercase font-sans">grab</span>
              </div>

              {/* TMA */}
              <div 
                onClick={() => showToast("Connecting to TMA engineering network...")}
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0"
              >
                <span className="text-sky-800 text-2xl font-black tracking-wider font-display shrink-0">TMA</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. FOOTER & CONTACT INFO                   */}
      {/* ========================================== */}
      
      <footer id="contact" className="bg-[#003366] text-slate-300 pt-16 pb-12 border-t border-sky-900/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Column 1: Branding block (col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-2xl font-black font-display tracking-tight hover:text-sky-300 transition-colors">
              toantin@hcmus
            </h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              © 2026 Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM. <br />
              Đơn vị đào tạo, cung cấp nguồn nhân lực Toán học, Tin học ứng dụng và Trí tuệ nhân tạo hàng đầu miền Nam Việt Nam.
            </p>
            
            {/* Follow Us block */}
            <div className="space-y-2 pt-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Theo dõi chúng tôi</span>
              <div className="flex items-center space-x-3.5">
                {/* Facebook icon */}
                <a href="https://www.facebook.com/toantin.tuvantuyensinh" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-sky-600 hover:text-white transition-all shadow-2xs">
                  <span className="font-extrabold text-sm">F</span>
                </a>
                {/* LinkedIn icon */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-sky-600 hover:text-white transition-all shadow-2xs">
                  <span className="font-extrabold text-sm">L</span>
                </a>
                {/* Youtube icon */}
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-red-600 hover:text-white transition-all shadow-2xs">
                  <span className="font-extrabold text-xs">YT</span>
                </a>
                {/* TikTok icon */}
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-2xs">
                  <span className="font-extrabold text-xs">TT</span>
                </a>
                {/* Zalo icon */}
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-2xs">
                  <span className="font-extrabold text-xs">Z</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Specifications (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase pb-2 border-b border-slate-800">
              Văn phòng Khoa Toán - Tin học:
            </h4>
            
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              <li className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-sky-400 font-extrabold">•</span>
                <span>Lầu 2, Tòa nhà C, 227 đường Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-sky-400 font-extrabold">•</span>
                <span>SĐT: (028) 3835 0006 (EXT: 4000)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-sky-400 font-extrabold">•</span>
                <span>Email: <a href="mailto:toantin@hcmus.edu.vn" className="hover:text-white transition-all">toantin@hcmus.edu.vn</a></span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-sky-400 font-extrabold">•</span>
                <span>
                  Tư vấn tuyển sinh: <a href="https://www.facebook.com/toantin.tuvantuyensinh" target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-300 font-bold underline transition-colors">https://www.facebook.com/toantin.tuvantuyensinh</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Helpdesk (col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase pb-2 border-b border-slate-800">
              Liên kết
            </h4>
            
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li>
                <a href="https://moodle.hcmus.edu.vn" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-sky-400 font-extrabold">›</span> Moodle chương trình chuẩn
                </a>
              </li>
              <li>
                <a href="#link-moodle-project" onClick={(e) => { e.preventDefault(); showToast("Đang kết nối tới Moodle đề án..."); }} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-sky-400 font-extrabold">›</span> Moodle chương trình đề án
                </a>
              </li>
              <li>
                <a href="#helpdesk" onClick={(e) => { e.preventDefault(); showToast("Đang kết nối tới trung tâm Helpdesk..."); }} className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-sky-400 font-extrabold">›</span> Hỗ trợ kỹ thuật Helpdesk
                </a>
              </li>
              <li>
                <a href="https://portal.hcmus.edu.vn" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="text-sky-400 font-extrabold">›</span> Giảng dạy tại Portal HCMUS
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Small Copyright Line */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] border-t border-slate-800/60 pt-5 text-center flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-medium gap-3">
          <p>Trang thông tin chính thống của Khoa Toán - Tin học, Trường Đại học Khoa học tự nhiên, ĐHQG-HCM.</p>
          <p>Mã nguồn tuyển sinh được cấu trúc chuẩn hóa cho môi trường vận hành chất lượng cao.</p>
        </div>
      </footer>

      {/* ========================================== */}
      {/* 10. AI ADMISSION CONSULTATION CHATBOT PANEL */}
      {/* ========================================== */}
      
      {/* Action floating buttons (FAB) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">
        
        {/* Hotline */}
        <a 
          href="tel:02838350006"
          className="bg-[#003366] text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all outline-none"
          title="Hotline"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Chat */}
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#003366] text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all relative outline-none"
          title="Chat tư vấn"
        >
          {chatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          
          {/* Unread dot signal */}
          {!chatOpen && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-[#003366] animate-pulse"></span>}
        </button>

        {/* Scroll To Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 p-3 rounded-full hover:scale-105 active:scale-95 transition-all mt-1 outline-none"
          title="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-22 right-6 w-80 md:w-96 bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden z-50 flex flex-col h-[480px] animate-scaleUp">
          
          {/* Chat Headers */}
          <div className="bg-[#003366] text-white p-4.5 flex justify-between items-center shrink-0 border-b border-sky-950">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8.5 h-8.5 rounded-full bg-[#e2b13c] flex items-center justify-center font-bold text-[#003366] text-sm">
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
                    ? "bg-[#0b3c5d] text-white rounded-br-none" 
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
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-[#003366] text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Điểm chuẩn xét tuyển?" : "Entry criteria?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Khoa có bao nhiêu chương trình học?" : "What study programs are available?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-[#003366] text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Các chương trình học?" : "Study streams?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Cơ hội học bổng và hỗ trợ thế nào?" : "Is there any scholarship program?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-[#003366] text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
              >
                {lang === "vi" ? "Học bổng của khoa?" : "Scholarships?"}
              </button>
              <button 
                onClick={() => handleBotAsk(lang === "vi" ? "Học toán ra làm nghề gì?" : "What can I work after pure mathematics?")}
                className="bg-white hover:bg-sky-50 text-slate-600 hover:text-[#003366] text-[10px] font-semibold py-1 px-2.5 rounded border border-slate-200 shadow-3xs transition-all max-w-[170px] truncate"
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
              className="flex-1 bg-slate-50 text-xs px-3 py-2.5 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003366]"
            />
            <button 
              onClick={() => {
                handleBotAsk(customQuestion);
                setCustomQuestion("");
              }}
              className="bg-[#003366] text-[#e2b13c] font-black text-xs px-3 py-2.5 rounded hover:bg-[#002244] transition-all shrink-0"
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
          className="fixed bottom-6 left-6 z-50 max-w-xs md:max-w-sm bg-[#002244] text-white border-l-4 border-[#e2b13c] py-3 px-4.5 rounded shadow-2xl flex items-center justify-between gap-3 animate-fadeIn duration-200"
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
