const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /{lang === "vi"\s*\?\s*"Phòng F08-09, Tòa nhà F, 227 Nguyễn Văn Cừ, Phường Chợ Quán, TP\.HCM & "\s*\+\s*"Phòng 8\.5, Nhà điều hành, KĐT ĐHQG, Phường Đông Hòa, TP\.Dĩ An, Bình Dương"\s*:\s*"Room F08-09, Building F, 227 Nguyen Van Cu Street, Cho Quan Ward, HCMC & "\s*\+\s*"Room 8\.5, Administration Building, VNU Urban Area, Dong Hoa Ward, Di An City, Binh Duong"\s*}/;

const newAddress = `{lang === "vi" ? (
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

content = content.replace(regex, newAddress);

fs.writeFileSync('src/App.tsx', content);
