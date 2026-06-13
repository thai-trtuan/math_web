const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

console.log("--- STATS ---");
console.log(content.indexOf('400') > 0 ? "Found 400" : "Not found 400");
console.log(content.substring(content.indexOf('<div className="text-center sm:text-left">'), content.indexOf('<div className="text-center sm:text-left">') + 500));

console.log("\n--- RESEARCH ---");
console.log(content.substring(content.indexOf('MỘT SỐ HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT') - 100, content.indexOf('MỘT SỐ HOẠT ĐỘNG NGHIÊN CỨU NỔI BẬT') + 500));

console.log("\n--- PARTNER TITLE ---");
console.log(content.substring(content.indexOf('ĐỐI TÁC CHIẾN LƯỢC') - 100, content.indexOf('ĐỐI TÁC CHIẾN LƯỢC') + 200));

console.log("\n--- FOOTER ---");
console.log(content.substring(content.indexOf('<footer'), content.indexOf('<footer') + 1000));
console.log(content.substring(content.indexOf('toantin@hcmus') - 50 > 0 ? content.indexOf('toantin@hcmus') - 50 : content.indexOf('KHOA TOÁN'), content.indexOf('toantin@hcmus') + 500));

console.log("\n--- CONTACT ---");
console.log(content.substring(content.indexOf('Phòng F08-09') - 50 > 0 ? content.indexOf('Phòng F08-09') - 50 : 0, content.indexOf('Phòng F08-09') + 400));
