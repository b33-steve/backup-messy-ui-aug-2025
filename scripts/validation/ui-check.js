#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 PM33 UI Validation Starting...\n');

let errors = 0;

// Forbidden patterns that indicate non-compliance
const FORBIDDEN = [
  { pattern: /backgroundColor:\s*['"]#/, message: 'Flat background colors found' },
  { pattern: /border:\s*['"]1px solid/, message: 'Basic borders found' },
  { pattern: /<button\s+(?!.*style)/, message: 'Unstyled button found' },
  { pattern: /className="border/, message: 'Tailwind border classes found' },
  { pattern: /text-gray-/, message: 'Wrong color tokens (use neutral)' }
];

// Required patterns that must exist
const REQUIRED = [
  { pattern: /linear-gradient/, message: 'Missing gradients' },
  { pattern: /backdropFilter|WebkitBackdropFilter/, message: 'Missing glass morphism' },
  { pattern: /boxShadow/, message: 'Missing shadows' },
  { pattern: /transition/, message: 'Missing animations' }
];

// Check all page files
const files = glob.sync('app/**/page.tsx');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  console.log(`Checking ${file}...`);
  
  // Check forbidden patterns
  FORBIDDEN.forEach(rule => {
    if (rule.pattern.test(content)) {
      console.error(`  ❌ ${rule.message}`);
      errors++;
    }
  });
  
  // Check required patterns
  REQUIRED.forEach(rule => {
    if (!rule.pattern.test(content)) {
      console.error(`  ❌ ${rule.message}`);
      errors++;
    }
  });
  
  if (errors === 0) {
    console.log(`  ✅ Compliant`);
  }
});

if (errors > 0) {
  console.error(`\n❌ Found ${errors} UI violations. Fix before proceeding.`);
  process.exit(1);
} else {
  console.log('\n✅ All UI components are compliant!');
}