// src/data.ts

export interface NewsItem {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  category: "all" | "academic" | "activity";
  date: string;
  imageUrl: string;
  readTime: string;
  sdgs?: Array<"4" | "17" | "9" | string>;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  month: string;
  category: "undergrade" | "postgrade" | "scholarship";
  pinned?: boolean;
  priority?: "Khẩn" | "Quan trọng" | "Bình thường" | string;
}

export interface StudyProgram {
  id: string;
  name: string;
  nameEn: string;
  shortDesc: string;
  shortDescEn: string;
  detailedDesc: string;
  detailedDescEn: string;
  icon: string; // Lucide icon name
  duration: string;
  durationEn: string;
  credits: number;
  tracks: string[];
  tracksEn: string[];
  careers: string[];
  careersEn: string[];
}

export interface AlumniStory {
  id: string;
  name: string;
  classYear: string;
  position: string;
  positionEn: string;
  company: string;
  quote: string;
  quoteEn: string;
  avatar: string;
}

export interface FacultyStatistic {
  value: string;
  label: string;
  labelEn: string;
  icon: string;
}

export const STATISTICS: FacultyStatistic[] = [
  {
    value: "50+",
    label: "Năm truyền thống học thuật",
    labelEn: "Years of Academic Tradition",
    icon: "History",
  },
  {
    value: "140+",
    label: "Giảng viên, PGS, Giáo sư, Tiến sĩ",
    labelEn: "Professors, PhDs & Faculty Members",
    icon: "Award",
  },
  {
    value: "2,500+",
    label: "Sinh viên & Học viên cao học",
    labelEn: "Undergrad & Postgrad Students",
    icon: "Users",
  },
  {
    value: "350+",
    label: "Đề tài & Bài báo khoa học quốc tế",
    labelEn: "Scientific Projects & Key Publications",
    icon: "FileSpreadsheet",
  },
];

export const SLIDES = [
  {
    id: "slide-1",
    title: "KHOA TOÁN - TIN HỌC",
    subtitle: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    titleEn: "FACULTY OF MATHEMATICS & COMPUTER SCIENCE",
    subtitleEn: "VNU-HCM University of Science",
    description: "Nơi ươm mầm tài năng toán học, khoa học dữ liệu và công nghệ hàng đầu Việt Nam, hướng tới chuẩn mực quốc tế.",
    descriptionEn: "Deepening mathematical insights, driving data science, and empowering global computer science pioneers.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000",
    linkText: "Khám phá các Chuyên ngành",
    linkTextEn: "Explore Programs",
  },
  {
    id: "slide-2",
    title: "NGHIÊN CỨU KHOA HỌC ĐỈNH CAO",
    subtitle: "Kết nối Tri thức và Công nghệ Tương lai",
    titleEn: "EXCELLENCE IN RESEARCH",
    subtitleEn: "Connecting Knowledge with Future Tech",
    description: "Sở hữu các nhóm nghiên cứu mạnh về Toán Giải tích, Đại số, Thống kê ứng dụng, Học máy và Trí tuệ nhân tạo.",
    descriptionEn: "Home to leading research groups in Analysis, Algebra, Applied Statistics, Machine Learning, and Artificial Intelligence.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000",
    linkText: "Xem Đề tài & Tập san",
    linkTextEn: "View Publications",
  },
  {
    id: "slide-3",
    title: "MÔI TRƯỜNG DÂN CHỦ - SÁNG TẠO",
    subtitle: "Đồng hành cùng Doanh nghiệp & Hội nhập Quốc tế",
    titleEn: "INNOVATIVE STUDY EXPERIENCE",
    subtitleEn: "Partnering with Global Enterprises & Universities",
    description: "Hợp tác sâu rộng với các đại học Hoa Kỳ, Châu Âu, Nhật Bản và các tập đoàn công nghệ hàng đầu thế giới.",
    descriptionEn: "Strong cooperation with US, EU, Japanese universities and world-class technology corporations.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000",
    linkText: "Hoạt động Hợp tác",
    linkTextEn: "International Affairs",
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN, ĐHQG-HCM KÝ KẾT BIÊN BẢN GHI NHỚ HỢP TÁC CÙNG CÔNG TY CỔ PHẦN VĂN HÓA TÂN BÌNH (ALTA GROUP)",
    titleEn: "HCMUS and ALTA Group sign a Memorandum of Agreement (MoA) on technology development",
    summary: "Ngày 11/06/2026, tại Trường Đại học Khoa học tự nhiên, ĐHQG-HCM đã trang trọng diễn ra lễ ký kết Biên bản thỏa thuận hợp tác (MoA) giữa nhà trường và Công ty Cổ phần Văn hóa Tân Bình (ALTA Group). Nhằm tăng cường đào tạo thực tiễn và cung ứng nguồn lực CNTT chất lượng cao.",
    summaryEn: "On June 11, 2026, at HCMUS, a Memorandum of Agreement was signed between the university and ALTA Group, promoting academic partnerships and high-quality IT careers.",
    category: "activity",
    date: "11/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
    readTime: "5 phút đọc",
    sdgs: ["4", "17"]
  },
  {
    id: "news-2",
    title: "ĐOÀN SINH VIÊN KHOA TOÁN - TIN HỌC ĐẠT THÀNH TÍCH XUẤT SẮC TẠI KỲ THI OLYMPIC TOÁN HỌC SINH VIÊN TOÀN QUỐC LẦN THỨ 30",
    titleEn: "HCMUS Students Excel at the 30th National Mathematics Olympiad for College Students",
    summary: "Đội tuyển Olympic Toán học sinh viên Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM đã xuất sắc giành nhiều giải Nhất, Nhì toàn đoàn ở các bộ môn Đại số và Giải tích, tiếp tục khẳng định vị thế dẫn đầu trong công tác đào tạo mũi nhọn khoa học cơ bản.",
    summaryEn: "The Mathematics Olympiad team from the Faculty of Mathematics & Computer Science achieved outstanding success, claiming top ranks in both Algebra and Analysis at the 30th National Competition.",
    category: "academic",
    date: "10/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    readTime: "6 phút đọc",
    sdgs: ["4", "9"]
  },
  {
    id: "news-3",
    title: "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN LÀM VIỆC VỚI CÁC GIÁO SƯ THÌNH GIẢNG ĐẾN TỪ ĐẠI HỌC TURKU (PHẦN LAN)",
    titleEn: "HCMUS Collaborates with Visiting Professors from University of Turku (Finland)",
    summary: "Nhằm mở rộng chương trình trao đổi và nghiên cứu quốc tế ngành Toán học ứng dụng, đại diện nhà trường và Khoa Toán - Tin học đã có buổi gặp gỡ làm việc trực tiếp với phái đoàn GS ĐH Turku, Phần Lan.",
    summaryEn: "Representative from the Faculty met with the visiting researchers from the University of Turku to map out exchange semesters and PhD projects in statistics.",
    category: "academic",
    date: "09/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    readTime: "4 phút đọc",
    sdgs: ["4", "17"]
  },
  {
    id: "news-4",
    title: "HỘI THẢO CHUYÊN ĐỀ: 'CÁC XU HƯỚNG MỚI TRONG TRÍ TUỆ NHÂN TẠO VÀ TOÁN TỐI ƯU HÓA'",
    titleEn: "International Seminar: 'Emerging Trends in Artificial Intelligence and Mathematical Optimization'",
    summary: "Khoa Toán - Tin học phối hợp cùng Viện Toán học nghiên cứu cao cấp tổ chức buổi hội thảo học thuật bàn về sự hội tụ giữa mạng nơ-ron sâu và cấu trúc toán tối ưu hóa đa biến.",
    summaryEn: "The Faculty of Mathematics & Computer Science in collaboration with advanced institutes held an academic conference on the intersection of deep neural networks and multivariable optimization.",
    category: "academic",
    date: "09/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    readTime: "8 phút đọc",
    sdgs: ["9", "17"]
  },
  {
    id: "news-5",
    title: "KHOA TOÁN - TIN HỌC KÝ KẾT HỢP TÁC R&D TOÀN DIỆN CÙNG VNG CORPORATION",
    titleEn: "Faculty of Mathematics & Computer Science Signs Comprehensive R&D MoA with VNG",
    summary: "Sự kiện ký kết đặt nền móng nghiên cứu phát triển các mô hình xử lý ngôn ngữ tự nhiên Tiếng Việt chất lượng cao và hệ thống khuyến nghị dựa trên xử lý đồ thị quy mô lớn.",
    summaryEn: "A strategic partnership established to develop high-end Vietnamese natural language models and modern visual recommendation engines using graph neural networks.",
    category: "activity",
    date: "07/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600",
    readTime: "5 phút đọc",
    sdgs: ["9", "17"]
  },
  {
    id: "news-6",
    title: "CHIẾN DỊCH TÌNH NGUYỆN MÙA HÈ XANH 2026 KHOA TOÁN - TIN HỌC CHÍNH THỨC XUẤT QUÂN",
    titleEn: "Green Summer Student Volunteer Campaign 2026 Officially Launched",
    summary: "Đội hình tình nguyện của khoa mang ánh sáng tri thức công nghệ thông tin và giáo dục toán học ứng dụng thực hiện các lớp học tình thương và phổ cập tin học tại vùng sâu vùng xa.",
    summaryEn: "Faculty student volunteers officially deploy to organize continuous fundamental programming, internet usage courses, and mathematical mentoring classrooms for rural children.",
    category: "activity",
    date: "05/06/2026",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=300",
    readTime: "3 phút đọc",
    sdgs: ["4"]
  }
];

export const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Thông báo về việc Đăng ký học phần Học kỳ 1 (Niên khóa 2026 - 2027) hệ Đại học Chính quy",
    titleEn: "Course Registration Guide for Semester 1 (Academic Year 2026 - 2027) - Full-time Undergraduate",
    date: "11",
    month: "Th6",
    category: "undergrade",
    pinned: true,
    priority: "Khẩn"
  },
  {
    id: "notif-2",
    title: "Thông báo nộp hồ sơ xét Đạt chuẩn đầu ra Ngoại ngữ và Tin học đợt tháng 6 năm 2026",
    titleEn: "Application Notice for Foreign Language & IT Proficiency Graduation Benchmarks - June 2026",
    date: "10",
    month: "Th6",
    category: "undergrade",
    pinned: true,
    priority: "Quan trọng"
  },
  {
    id: "notif-3",
    title: "Thông báo bảo vệ Luận văn Thạc sĩ Khoa học đợt 1 năm 2026 chuyên ngành Toán Giải tích & Toán ứng dụng",
    titleEn: "Defense Schedule for Master of Science Thesis (Phase 1, 2026) - Analysis & Applied Math",
    date: "09",
    month: "Th6",
    category: "postgrade",
    pinned: true,
    priority: "Quan trọng"
  },
  {
    id: "notif-4",
    title: "Chương trình Học bổng Ươm mầm Tài năng Toán học năm 2026 tài trợ bởi Viện Nghiên cứu Cao cấp về Toán",
    titleEn: "VIASM Mathematics Talent Development Scholarship Program 2026 Applications Open",
    date: "08",
    month: "Th6",
    category: "scholarship",
    pinned: true,
    priority: "Khẩn"
  },
  {
    id: "notif-5",
    title: "Thông báo Đăng ký xét Đề tài Tốt nghiệp Cử nhân các lớp ngành Khoa học Dữ liệu và Trí tuệ Nhân tạo",
    titleEn: "Undergraduate Final Project Topic Proposal Allocations - Data Science and AI Programs",
    date: "05",
    month: "Th6",
    category: "undergrade",
    priority: "Bình thường"
  },
  {
    id: "notif-6",
    title: "Thông báo v/v Xét miễn, giảm học phí và hỗ trợ chi phí học tập học kỳ 2 cho sinh viên có hoàn cảnh khó khăn",
    titleEn: "Tuition Waiver & Financial Assistance Program for Semester 2 - Eligible Underprivileged Students",
    date: "02",
    month: "Th6",
    category: "undergrade",
    priority: "Quan trọng"
  },
  {
    id: "notif-7",
    title: "Thông báo tuyển sinh đào tạo trình độ Tiến sĩ khóa 2 năm 2026 ngành Cơ sở toán học cho Tin học và Toán ứng dụng",
    titleEn: "Admission Announcement for PhD Programs (Cohort 2, 2026) - Mathematical Foundations for CS & Applied Math",
    date: "25",
    month: "Th5",
    category: "postgrade",
    priority: "Bình thường"
  },
  {
    id: "notif-8",
    title: "Quyết định phê duyệt Đề cương chi tiết Luận án Tiến sĩ khóa 2025 chuyên ngành Thống kê và Tối ưu hóa khoa học",
    titleEn: "Approval of PhD Dissertation Proposal Synopsis Guidelines - Class of 2025 Statistics & Optimization",
    date: "22",
    month: "Th5",
    category: "postgrade",
    priority: "Quan trọng"
  },
  {
    id: "notif-9",
    title: "Thông báo Tuyển dụng Trợ giảng (TA) môn Đại số Tuyến tính và Giải tích trong Học kỳ Hè năm 2026",
    titleEn: "Recruitment for Teaching Assistants (TA) in Linear Algebra & Calculus - Summer Semester 2026",
    date: "20",
    month: "Th5",
    category: "scholarship",
    priority: "Quan trọng"
  },
  {
    id: "notif-10",
    title: "Học bổng Doanh nghiệp ALTA Group vinh danh tân Thủ khoa Đạt chứng chỉ quốc tế và thành tích nghiên cứu",
    titleEn: "ALTA Group Corporate Scholarships Award Ceremony - Honoring Academic Leaders with Global Certificates",
    date: "15",
    month: "Th5",
    category: "scholarship",
    priority: "Quan trọng"
  }
];

export const STUDY_PROGRAMS: StudyProgram[] = [
  {
    id: "prog-1",
    name: "Cử nhân Toán học",
    nameEn: "B.S. in Mathematics",
    shortDesc: "Đào tạo tư duy logic tối cao, cung cấp nền tảng toán lý thuyết vững chắc giúp tiếp cận sâu các lĩnh vực nghiên cứu khoa học cơ bản.",
    shortDescEn: "Develop rigorous logical mindset, solid pure mathematics foundations for deep academic research and high-level applications.",
    detailedDesc: "Chương trình Cử nhân Toán học giữ vị trí cốt lõi và truyền thống nhất của khoa, hướng tới trang bị cho người học tư duy trừu tượng, cách tiếp cận khoa học sắc bén và công cụ toán học hiện đại. Chương trình được công nhận chất lượng bởi các tổ chức uy tín quốc tế.",
    detailedDescEn: "The Bachelor of Mathematics program lies at the very academic core of our school. It covers deep abstract reasoning, rigorous proof logic, and state-of-the-art analytical tools. Accredited to meet premium standards.",
    icon: "Sigma",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 135,
    tracks: ["Giải tích toán học", "Đại số và Hình học", "Phương trình vi phân", "Tối ưu hóa và Lý thuyết điều khiển"],
    tracksEn: ["Mathematical Analysis", "Algebra & Geometry", "Differential Equations", "Optimization & Control Theory"],
    careers: ["Giảng viên Đại học", "Nhà nghiên cứu khoa học", "Chuyên viên phân tích mô hình", "Kiến trúc sư giải thuật thuật toán"],
    careersEn: ["University Lecturer", "Scientific Researcher", "Quantitative Analysis Expert", "Core Architect for Algorithms"]
  },
  {
    id: "prog-2",
    name: "Cử nhân Tin học (Toán - Tin)",
    nameEn: "B.S. in Computer Science",
    shortDesc: "Sự kết hợp hoàn hảo giữa nền toán học ứng dụng và kỹ thuật công nghệ thông tin. Sáng tạo giải thuật giải quyết bài toán phức tạp.",
    shortDescEn: "The premier synergy of computational math, software development, and algorithm optimization to solve complex software problems.",
    detailedDesc: "Là sự giao thoa khoa học giữa Toán và Công nghệ thông tin, chương trình trang bị chiều sâu phát triển phần mềm, mật mã học, đồ họa máy tính và tối ưu hóa giải thuật vượt trội để giải thích các mô hình số lớn.",
    detailedDescEn: "At the intersection of computing and mathematics, this program imparts extensive systems and software experience, security foundations, cryptographic designs, and superior algorithmic tuning.",
    icon: "Laptop",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 135,
    tracks: ["Khoa học máy tính", "Mật mã & An toàn thông tin", "Đồ họa & Thị giác máy tính", "Hệ thống thông tin ứng dụng"],
    tracksEn: ["Computer Science", "Cryptography & Information Security", "Computer Graphics & Vision", "Applied Information Systems"],
    careers: ["Kỹ sư Phát triển Phần mềm", "Chuyên gia Mật mã & Cyber-Security", "Nhà sáng tạo Game & Đồ họa", "Trưởng dự án phần mềm cao cấp"],
    careersEn: ["Senior Software Engineer", "Cybersecurity & Crypto Analyst", "Graphics & Game Developer", "Technical Product Manager"]
  },
  {
    id: "prog-3",
    name: "Cử nhân Khoa học Dữ liệu",
    nameEn: "B.S. in Data Science",
    shortDesc: "Tìm kiếm tri thức ẩn từ dữ liệu lớn. Kết hợp thống kê, lập trình và nghiệp vụ kinh doanh dẫn dắt xu hướng chuyển đổi số toàn cầu.",
    shortDescEn: "Discover valuable hidden insight from gigantic datasets. Combines custom statistical modelling, programming, and core business skills.",
    detailedDesc: "Khoa học Dữ liệu (Data Science) đang là ngành mũi nhọn dẫn đầu cách mạng 4.0. Sinh viên được trang bị kiến thức Thống kê hiện đại, phương pháp xử lý Dữ liệu lớn (Big Data), lập trình Python/R/SQL chuyên sâu phục vụ chuyển dịch kinh tế.",
    detailedDescEn: "Data Science is the premier driver of the digital revolution. Students learn modern database architectures, exploratory analytics, Python/R, cloud infrastructure, and statistics to lead data-driven corporate environments.",
    icon: "Database",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 140,
    tracks: ["Thống kê ứng dụng", "Phân tích Dữ liệu lớn", "Kỹ thuật Dữ liệu", "Business Analytics Quốc tế"],
    tracksEn: ["Applied Statistics", "Big Data Analytics", "Data Engineering", "International Business Analytics"],
    careers: ["Kỹ sư dữ liệu (Data Engineer)", "Nhà phân tích dữ liệu (Data Analyst)", "Business Intelligence Specialist", "Nhà giải pháp hạ tầng dữ liệu"],
    careersEn: ["Data Engineer", "Data Analyst", "Business Intelligence Specialist", "Data Infrastructure Architect"]
  },
  {
    id: "prog-4",
    name: "Cử nhân Trí tuệ Nhân tạo",
    nameEn: "B.S. in Artificial Intelligence",
    shortDesc: "Xây dựng các giải pháp thông minh vượt trội, mô hình máy học (ML), xử lý ngôn ngữ tự nhiên (NLP) và robot thông minh.",
    shortDescEn: "Build high-end smart agents, machine learning (ML) models, advanced NLP engines, and autonomous robotic solutions.",
    detailedDesc: "Ngành đào tạo đỉnh cao đột phá mới nổi kết hợp chặt chẽ giữa toán tối ưu nâng cao và học máy sâu (Deep Learning). Người học được huấn luyện rèn luyện thuật toán mạng nơ-ron sinh sinh học hàng đầu phục vụ thực tế.",
    detailedDescEn: "Our groundbreaking AI specialization prepares elite elites. Integrating state-of-the-art vector calculus, Deep Neural Architectures, Large Language Modelling (LLM), and real-time robotic systems.",
    icon: "Cpu",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 140,
    tracks: ["Học máy chuyên sâu (Machine Learning)", "Xử lý Ngôn ngữ Tự nhiên & LLM", "Thị giác máy tính nâng cao", "Hệ thống tự hành & Robotics"],
    tracksEn: ["Deep & Machine Learning", "NLP & LLM Architectures", "Advanced Computer Vision", "Autonomous Systems & Robotics"],
    careers: ["Kỹ sư Trí tuệ nhân tạo (AI Engineer)", "Kỹ sư học máy (ML Engineer)", "Phát triển ứng dụng AI & LLM", "Chuyên gia R&D Robot thông minh"],
    careersEn: ["AI Engineer", "Machine Learning Specialist", "LLM Solution Developer", "Advanced Robotics R&D Expert"]
  }
];

export const ALUMNI_STORIES: AlumniStory[] = [
  {
    id: "alumni-1",
    name: "GS.TS. Ngô Chí Trung",
    classYear: "Cựu SV Khóa 1982",
    position: "Giám đốc Nghiên cứu Lab Mật mã ứng dụng",
    positionEn: "Research Director, Applied Cryptography Lab",
    company: "University of Paris-Saclay, Pháp",
    quote: "Nền tảng Toán đại số vững chắc tại Khoa Toán - Tin học chính là bệ đỡ hoàn hảo nhất giúp tôi thực hiện các nghiên cứu mật mã đột phá có tầm ảnh hưởng toàn cầu.",
    quoteEn: "The solid mathematical foundations I gained here acted as the perfect launchpad for my cryptographic breakthroughs later in Paris.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "alumni-2",
    name: "Bà Nguyễn Lê Thy Vân",
    classYear: "Cựu SV Khóa 2012",
    position: "Trưởng nhóm Giải thuật Data Science",
    positionEn: "Lead Data Scientist",
    company: "Grab Singapore",
    quote: "Không chỉ học giải thuật, Khoa đã dạy tôi tư duy phân tích rành mạch. Đứng trước hàng triệu gigabyte dữ liệu hỗn độn, tư duy Toán giúp tôi tìm ra lời giải thông thái tối ưu nhất.",
    quoteEn: "The Faculty didn't just teach me coding; they taught me how to think. When dealing with millions of gigabytes, a mathematical mind finds the optimal route.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "alumni-3",
    name: "Ông Trần Đăng Khoa",
    classYear: "Cựu SV Khóa 2018",
    position: "Kỹ sư Học máy Cao cấp (Senior ML Engineer)",
    positionEn: "Senior ML Research Engineer",
    company: "Google DeepMind, London",
    quote: "Toán học chính là linh hồn của Trí tuệ Nhân tạo. Những bài giảng giải tích đa biến, xác suất thống kê ở trường vô cùng quan trọng khi tôi phát triển các mô hình ngôn ngữ lớn sau này.",
    quoteEn: "Math is the absolute soul of AI. Multivariable calculus and probability models are deeply embedded when building state-of-the-art LLMs.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
  }
];

export const FAQS = [
  {
    question: "Điểm trúng tuyển ước tính của Khoa Toán - Tin học tầm khoảng mức nào?",
    questionEn: "What is the typical admission score for the Faculty?",
    answer: "Điểm chuẩn biến động tùy theo từng kỳ thi tuyển sinh và các phương thức xét tuyển (Xét tuyển thẳng, Xét điểm ĐGNL ĐHQG-HCM, Xét điểm thi THPT). Ở các năm gần đây, điểm chuẩn thi THPT quốc tế dao động từ 24.5 đến 27 điểm. Nhóm ngành CNTT (Tin học), Khoa học dữ liệu và Trí tuệ nhân tạo thường có mức điểm chuẩn nhỉnh hơn đôi chút.",
    answerEn: "Admission scores vary by entry mode (Direct, VNU Academic Aptitude, or High School Exams). Recent High School thresholds range around 24.5 - ~27.0. Top streams such as CS, Data Science, and AI are highly competitive."
  },
  {
    question: "Cơ hội việc làm của sinh viên theo học ngành Toán học thuần túy ra sao?",
    questionEn: "What are the career prospects for pure Mathematics majors?",
    answer: "Sinh viên tốt nghiệp Toán học hoàn toàn không bị hạn chế cơ hội. Bên cạnh công việc giảng dạy và nghiên cứu cao cấp, các tập đoàn Tài chính, Chứng khoán, Ngân hàng, Bảo hiểm (Định phí rủi ro - Actuary), và các tổ chức an ninh mạng đặc biệt săn đón sinh viên Toán vì tư duy mô hình hóa vượt bậc.",
    answerEn: "Prospects are far wider than teaching. Finance houses, Investment banks, Insurance (Actuarial sciences), and cybersecurity institutions heavily headhunt Math graduates for their profound analytical models."
  },
  {
    question: "Khoa có các chương trình liên kết du học, trao đổi sinh viên quốc tế nào?",
    questionEn: "Does the Faculty offer international study or exchange opportunities?",
    answer: "Khoa có thỏa thuận hợp tác và trao đổi sinh viên chặt chẽ với Đại học Kyoto (Nhật Bản), Đại học National Singapore (NUS), Đại học Paris-Sorbonne (Pháp) cùng các học bổng ngắn hạn tại Đài Loan, Châu Âu. Nhiều Giáo sư quốc tế cũng đến thỉnh giảng trợ giúp kết nối hồ sơ xin học bổng Sau Đại học của sinh viên.",
    answerEn: "We maintain student exchanges and credit transfers with prestigious global universities such as Kyoto University, NUS, Sorbonne, and several systems in Europe. Internationally renowned visiting professors assist students in applying for MS/PhD scholarships."
  }
];
