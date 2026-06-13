const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newRenderMethod = `  // SDG Badge render helper - using standard UN SDG imagery
  const renderSdgSquare = (sdg: string) => {
    const num = parseInt(sdg, 10);
    if (!num || num < 1 || num > 17) return null;
    const padded = num < 10 ? \`0\${num}\` : \`\${num}\`;
    const url = \`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-\${padded}.jpg\`;
    return (
      <img 
        key={sdg} 
        src={url} 
        alt={\`SDG \${sdg}\`}
        className="w-[42px] h-[42px] rounded-sm shadow-sm transition-all hover:scale-105 select-none object-cover" 
        title={\`Sustainable Development Goal \${sdg}\`}
      />
    );
  };`;

content = content.replace(
  /\/\/ SDG Square Badge render helper[\s\S]*?(?=  \/\/ Mini SDG Square Badge render helper)/,
  newRenderMethod + '\n'
);

fs.writeFileSync('src/App.tsx', content);
