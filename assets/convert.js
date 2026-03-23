const fs = require('fs');
const path = require('path');

// SVG를 PNG로 변환 (sharp 없이 순수 node로)
// rsvg-convert 또는 inkscape 없이 처리하기 위해
// html -> canvas -> png 방식 사용

const { execSync } = require('child_process');

const files = [
  { svg: 'logo-light.svg', png: 'logo-light.png' },
  { svg: 'logo-dark.svg', png: 'logo-dark.png' },
];

const dir = path.join(__dirname);

for (const f of files) {
  const svgPath = path.join(dir, f.svg);
  const pngPath = path.join(dir, f.png);

  try {
    // macOS의 경우 qlmanage로 변환 시도
    execSync(`qlmanage -t -s 600 -o "${dir}" "${svgPath}" 2>/dev/null`, { stdio: 'pipe' });
    console.log(`Converted ${f.svg} -> preview`);
  } catch (e) {
    console.log(`qlmanage failed for ${f.svg}: ${e.message}`);
  }
}

console.log('Done');
