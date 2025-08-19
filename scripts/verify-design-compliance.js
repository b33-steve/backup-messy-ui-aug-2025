const fs = require('fs');
const path = require('path');

console.log('🔍 PM33 Design Compliance Verifier\n');

// Check if design docs exist
const requiredDocs = [
  'PM33_COMPLETE_UI_SYSTEM.md',
  'PM33_ Complete _UX_System.md',
  'CLAUDE_CODE_INSTRUCTIONS.md'
];

let allDocsPresent = true;
requiredDocs.forEach(doc => {
  if (fs.existsSync(doc)) {
    console.log(`✅ ${doc} found`);
  } else {
    console.log(`❌ ${doc} MISSING!`);
    allDocsPresent = false;
  }
});

if (!allDocsPresent) {
  console.log('\n❌ Missing required documentation!');
  process.exit(1);
}

// Check for compliance in recent files
console.log('\n📊 Checking recent components for compliance...\n');

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for design reference
  if (!content.includes('Design Reference: PM33_COMPLETE_UI_SYSTEM.md')) {
    issues.push('Missing design reference comment');
  }
  
  // Check for forbidden patterns
  if (content.includes('border: "1px solid black"') || 
      content.includes('border: \'1px solid black\'')) {
    issues.push('Contains forbidden black border');
  }
  
  if (content.includes('<Spinner') || content.includes('spinner')) {
    issues.push('Uses basic spinner instead of AIProcessingState');
  }
  
  if (!content.includes('gradient') && !content.includes('Gradient')) {
    issues.push('Missing gradient styling');
  }
  
  if (!content.includes('hover') && !content.includes('Hover')) {
    issues.push('Missing hover states');
  }
  
  return issues;
};

// Check all component files
const componentDirs = ['./app/frontend/src/components', './app/frontend/app/components', './app/frontend/components'];
let totalIssues = 0;

componentDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir, { recursive: true })
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const issues = checkFile(filePath);
      
      if (issues.length > 0) {
        console.log(`⚠️  ${file}:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
        totalIssues += issues.length;
      }
    });
  }
});

if (totalIssues === 0) {
  console.log('✅ All components follow PM33 design standards!');
} else {
  console.log(`\n⚠️  Found ${totalIssues} compliance issues`);
  console.log('Please fix these before proceeding.');
}