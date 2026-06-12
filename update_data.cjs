const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const newPrograms = `export const STUDY_PROGRAMS: StudyProgram[] = [
  {
    id: "prog-1",
    name: "Chương trình Chuẩn",
    nameEn: "Standard Program",
    shortDesc: "Đào tạo cơ bản và chuyên sâu về Toán học, Tin học ứng dụng, Khoa học dữ liệu và Trí tuệ nhân tạo, thiết kế theo chuẩn giáo dục hiện đại.",
    shortDescEn: "Fundamental and in-depth training in Mathematics, Computer Science, Data Science, and AI, designed according to modern academic standards.",
    detailedDesc: "Chương trình đào tạo chuẩn thiết kế theo định hướng ứng dụng và nghiên cứu, sinh viên được trang bị đầy đủ kiến thức phân tích toán học, lập trình... đảm bảo 100% sinh viên đáp ứng tốt yêu cầu công nghiệp.",
    detailedDescEn: "Designed with both practical and theoretical foundations. Students gain deep analytical and programming skills to stay ready for the demanding job markets.",
    icon: "Sigma",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 135,
    tracks: ["Toán học", "Toán ứng dụng", "Toán - Tin", "Khoa học Máy tính"],
    tracksEn: ["Mathematics", "Applied Math", "Math & CS", "Computer Science"],
    careers: ["Nghiên cứu viên", "Kỹ sư AI", "Kỹ sư Phần mềm", "Chuyên viên phân tích"],
    careersEn: ["Researcher", "AI Engineer", "Software Engineer", "Data Analyst"]
  },
  {
    id: "prog-2",
    name: "Chương trình Cử nhân tài năng",
    nameEn: "Talented Bachelor Program",
    shortDesc: "Ươm mầm các tài năng trẻ với tố chất nghiên cứu xuất sắc, rèn luyện kỹ năng giải quyết bài toán phức tạp mang tầm quốc tế.",
    shortDescEn: "Nurturing gifted young minds with excellent research intuition, training to solve complex international-level challenges.",
    detailedDesc: "Chương trình đặc biệt dành riêng cho sinh viên ưu tú có thành tích xuất sắc. Đội ngũ giảng dạy là các giáo sư đầu ngành. Sinh viên được ưu tiên tham gia các dự án nghiên cứu khoa học ngay từ năm đầu.",
    detailedDescEn: "Exclusive program tailored for elite students with exceptional performance. Lectured by leading professors with priority access to premier scientific research projects.",
    icon: "Laptop",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 140,
    tracks: ["Nghiên cứu Toán học", "Khoa học Máy tính Tiên tiến"],
    tracksEn: ["Advanced Mathematical Research", "Advanced Computer Science"],
    careers: ["Giảng viên Đại học", "Nghiên cứu viên cấp cao", "Chuyên gia dữ liệu", "Lãnh đạo công nghệ"],
    careersEn: ["University Lecturer", "Senior Researcher", "Data Expert", "Tech Leader"]
  },
  {
    id: "prog-3",
    name: "Chương trình Tăng cường tiếng Anh",
    nameEn: "High-Quality (English) Program",
    shortDesc: "Môi trường học tập 100% bằng tiếng Anh, đào tạo nhân lực toàn cầu, dễ dàng hội nhập với mạng lưới chuyên gia quốc tế.",
    shortDescEn: "100% English medium instruction, forging global human resources readily integrable with the worldwide expert network.",
    detailedDesc: "Chương trình giảng dạy hoàn toàn bằng tiếng Anh chuyên ngành. Sinh viên được trải nghiệm các bộ giáo trình chuẩn quốc tế, làm việc với các chuyên gia nước ngoài, mở rộng cơ hội học bổng quốc tế.",
    detailedDescEn: "Taught strictly in specialized English. Students experience global-standard curriculum and interact directly with international experts and professors.",
    icon: "Database",
    duration: "4 Năm",
    durationEn: "4 Years",
    credits: 135,
    tracks: ["Toán - Tin Quốc tế", "Khoa học Dữ liệu Quốc tế"],
    tracksEn: ["Global CS", "Global Data Science"],
    careers: ["Kỹ sư quốc tế", "Chuyên gia tư vấn", "Giám đốc dữ liệu", "Phân tích tài chính quốc tế"],
    careersEn: ["International Engineer", "Consultant", "Chief Data Officer", "Global Financial Analyst"]
  }
];`;

content = content.replace(/export const STUDY_PROGRAMS: StudyProgram\[\] = \[[\s\S]*?\];\n/, newPrograms + '\n');
fs.writeFileSync('src/data.ts', content);
console.log('Updated STUDY_PROGRAMS');
