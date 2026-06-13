const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

appContent = appContent.replace(
  /React\.SVGProps<SVGSVGElement>/g,
  'React.SVGProps<SVGSVGElement>'
);
appContent = appContent.replace(
  /import \{ useState, useEffect, useRef, FormEvent \} from "react";/,
  'import React, { useState, useEffect, useRef, FormEvent } from "react";'
);

fs.writeFileSync('src/App.tsx', appContent);
