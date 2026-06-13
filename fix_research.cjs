const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldResearchSection = `<section id="student-activities" className="bg-slate-50 py-16 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          <div className="text-center mb-8 ">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
              {lang === "vi" ? "MỘT SỐ HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT" : "OUTSTANDING RESEARCH ACTIVITIES"}
            </h2>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              {lang === "vi" 
                ? "Khoa Toán - Tin học luôn dẫn đầu trong các nghiên cứu lý thuyết căn bản lẫn các bài toán ứng dụng thực tiễn, chuyển giao giải pháp cho các tập đoàn lớn toàn cầu và ghi dấu ấn sâu đậm trên bản đồ học thuật quốc tế."
                : "The Faculty of Mathematics & Computer Science continually leads in deep theoretical work and applied industrial technologies, publishing globally and transferring insights to major tech enterprises."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: AI Lab */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Đang liên kết tới AI & Machine Learning Lab..." : "Connecting to AI & Machine Learning Lab...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg font-mono">01</div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3">
                  {lang === "vi" ? "AI & Machine Learning Lab" : "AI & Machine Learning Lab"}
                </h4>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4">
                  {lang === "vi" 
                    ? "Tối ưu hóa thuật toán mạng nơ-ron sâu, mô hình học máy quy mô lớn, xử lý ngôn ngữ tự nhiên Tiếng Việt (LLM) và ứng dụng robotics hiện đại."
                    : "Optimizing deep neural network algorithms, large-scale machine learning models, Vietnamese LLM engines, and modern robot vision."}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors">
                <span>{lang === "vi" ? "Xem chi tiết" : "Read more"}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Quantum Crypto */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Đang liên kết tới Trung tâm Mật mã học..." : "Connecting to Cryptography & Security center...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg font-mono">02</div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3">
                  {lang === "vi" ? "Mật Mã Học & An Toàn Số" : "Cryptography & Digital Security"}
                </h4>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4">
                  {lang === "vi" 
                    ? "Nghiên cứu mật mã sau lượng tử, chữ ký số bảo mật tuyệt đối, an toàn hạ tầng thông tin quốc gia và ứng dụng Blockchain chống giả mạo."
                    : "Pioneering post-quantum cipher suites, secure electronic signatures, federal info-safety, and blockless anti-tampering designs."}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors">
                <span>{lang === "vi" ? "Xem chi tiết" : "Read more"}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Math Modeling */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Đang liên kết tới Lab Toán ứng dụng..." : "Connecting to Applied Mathematics Lab...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg font-mono">03</div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3">
                  {lang === "vi" ? "Toán Ứng Dụng & Mô Hình Hóa" : "Applied Math & Modeling"}
                </h4>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4">
                  {lang === "vi" 
                    ? "Phát triển công cụ phân tích mô phỏng dòng chảy, tối ưu hóa giao thông đô thị tự động, định phí bảo hiểm Actuary và phân tích rủi ro tài chính súc tích."
                    : "Simulating multivariable flow dynamics, urban traffic grid optimization, professional actuaries, and financial quantitative models."}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors">
                <span>{lang === "vi" ? "Xem chi tiết" : "Read more"}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Global Publications */}
            <div className="bg-white rounded-2xl border border-sky-600/20 bg-linear-to-b from-white to-sky-50/20 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer" onClick={() => showToast(lang === "vi" ? "Mở danh mục công bố Scopus/ISI..." : "Opening Scopus/ISI publications database...")}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-600/10 text-sky-600 flex items-center justify-center font-bold text-lg font-mono">04</div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3">
                  {lang === "vi" ? "Công Bố Quốc Tế Cao Cấp" : "Prestigious Global Papers"}
                </h4>
                <p className="text-sm text-slate-600 font-normal leading-relaxed mt-3 line-clamp-4">
                  {lang === "vi" 
                    ? "Top 5% bài báo học thuật xuất sắc tại các kỷ yếu Nature, Science và tạp chí Q1 uy tín thể hiện sức sáng tạo không giới hạn của toán học Việt Nam."
                    : "Top 5% world-class papers published in Nature, Science, and Q1 journals affirming the limitless creative power of Vietnamese mathematics."}
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-sky-600 group-hover:text-sky-800 transition-colors">
                <span>{lang === "vi" ? "Xem chi tiết" : "View papers"}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>`;

const newResearchSection = `<section id="student-activities" className="bg-slate-50 py-16 border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-[100px] w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-600 tracking-tight font-sans uppercase">
              {lang === "vi" ? "VÌ SAO CHỌN KHOA TOÁN - TIN HỌC?" : "WHY CHOOSE FACULTY OF MATH & CS?"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3 uppercase">
                  {lang === "vi" ? "TRUYỀN THỐNG & VỊ THẾ" : "TRADITION & PRESTIGE"}
                </h4>
                <ul className="text-sm text-slate-600 font-medium leading-relaxed mt-3 space-y-2">
                  {lang === "vi" ? (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Gần 70 năm đào tạo và nghiên cứu Toán học (30 năm định hướng ứng dụng).</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Trung tâm đào tạo và nghiên cứu Toán học trọng điểm tại khu vực phía Nam.</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Nearly 70 years of training and research (30 years of applied orientation).</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Leading key mathematical research and training center in the Southern region.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3 uppercase">
                  {lang === "vi" ? "CHẤT LƯỢNG & HỘI NHẬP" : "QUALITY & INTEGRATION"}
                </h4>
                <ul className="text-sm text-slate-600 font-medium leading-relaxed mt-3 space-y-2">
                  {lang === "vi" ? (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Bốn chương trình đào tạo đã được kiểm định chất lượng quốc tế ASIIN.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Hợp tác sâu rộng với các trường đại học, viện nghiên cứu, doanh nghiệp trong nước và quốc tế.</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Four training programs internationally accredited by ASIIN.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Extensive cooperation with domestic and international universities, institutes, and enterprises.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3 uppercase">
                  {lang === "vi" ? "ĐỘI NGŨ & ĐÀO TẠO" : "FACULTY & TRAINING"}
                </h4>
                <ul className="text-sm text-slate-600 font-medium leading-relaxed mt-3 space-y-2">
                  {lang === "vi" ? (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Đội ngũ giảng viên uy tín, tận tâm, có trình độ chuyên môn cao.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Đơn vị duy nhất trong ĐHQG-HCM đào tạo Toán - Tin học từ bậc cử nhân đến tiến sĩ.</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Reputable, dedicated, and highly qualified teaching staff.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>The only unit in VNU-HCM training Math & CS from bachelor to PhD levels.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-3xs hover:border-sky-600 hover:shadow-md transition-all text-left flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Laptop className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] md:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2 font-sans mt-3 uppercase">
                  {lang === "vi" ? "CỘNG ĐỒNG & CƠ HỘI" : "COMMUNITY & OPPORTUNITIES"}
                </h4>
                <ul className="text-sm text-slate-600 font-medium leading-relaxed mt-3 space-y-2">
                  {lang === "vi" ? (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Nhiều cựu sinh viên thành công trong lĩnh vực Toán học và Tin học.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Cơ hội nghề nghiệp rộng mở; nền tảng vững chắc để học tiếp Sau đại học trong nước và quốc tế.</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Numerous successful alumni in Mathematics and Computer Science fields.</li>
                      <li className="flex items-start gap-2"><span className="text-sky-500 font-bold">✔</span>Wide career opportunities; solid foundation for postgraduate studies worldwide.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

          </div>`;

content = content.replace(oldResearchSection, newResearchSection);

fs.writeFileSync('src/App.tsx', content);
