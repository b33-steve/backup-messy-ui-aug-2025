const fs = require('fs');
const path = require('path');

const generatePage = (pageName, templateType) => {
  const pageContent = `
import { PM33${templateType}Template } from '@/components/templates';
import { get${pageName}Data } from '@/data/${pageName.toLowerCase()}';

export default function ${pageName}Page() {
  const data = get${pageName}Data();
  
  return <PM33${templateType}Template data={data} />;
}
`;

  const dirPath = path.join(process.cwd(), 'app', `(app)`, pageName.toLowerCase());
  const filePath = path.join(dirPath, 'page.tsx');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  fs.writeFileSync(filePath, pageContent.trim());
  
  console.log(`✅ Created ${pageName} page using ${templateType} template`);
  console.log(`📁 Location: ${filePath}`);
};

// Usage: node scripts/generate-page.js Dashboard Dashboard
const [,, pageName, templateType] = process.argv;

if (!pageName || !templateType) {
  console.error('Usage: node scripts/generate-page.js <PageName> <TemplateType>');
  console.error('Example: node scripts/generate-page.js Dashboard Dashboard');
  process.exit(1);
}

generatePage(pageName, templateType);