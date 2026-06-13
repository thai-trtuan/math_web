const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'bạn có thể gửi thông tin liên hệ qua Form bên dưới hoặc nhắn tin cho Fanpage của Khoa',
  'bạn có thể gửi thông tin liên hệ qua Form bên dưới hoặc nhắn tin Zalo OA của Khoa'
);

content = content.replace(
  'You can send your inquiry through the form below or message our Fanpage',
  'You can send your inquiry through the form below or message our Zalo OA'
);

fs.writeFileSync('src/App.tsx', content);
