#!/usr/bin/env tsx
/**
 * PM33 UI Consistency Validator
 * 
 * Validates that all core app components follow PM33 design system standards:
 * - No Mantine imports in core app
 * - All pages use PM33PageWrapper
 * - Consistent color variables usage
 * - Glass morphism values match specification
 * - Proper icon library usage (lucide-react only)
 * - All required PM33 components are present
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, relative, extname } from 'path'
import { glob } from 'glob'

// Color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

interface ValidationResult {
  file: string
  issues: ValidationIssue[]
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  rule: string
  message: string
  line?: number
  column?: number
}

class UIConsistencyValidator {
  private results: ValidationResult[] = []
  private readonly coreAppPath = 'app/(app)'
  private readonly componentPaths = [
    'app/(app)',
    'components/PM33*',
    'app/(app)/components/pm33-ui'
  ]

  // PM33 Design System specifications
  private readonly specifications = {
    glassColors: [
      'backdrop-blur-sm',
      'backdrop-blur-md', 
      'backdrop-blur-lg',
      'backdrop-blur-xl'
    ],
    glassOpacities: [
      'bg-white/80',
      'bg-white/90',
      'bg-white/50',
      'bg-gray-50/80',
      'bg-blue-50/80',
      'bg-green-50/80',
      'bg-yellow-50/80',
      'bg-red-50/80'
    ],
    requiredPM33Components: [
      'PM33PageWrapper',
      'PM33Navigation', 
      'PM33Card',
      'PM33Button',
      'PM33AIProcessing'
    ],
    semanticColors: [
      'text-foreground',
      'text-muted-foreground',
      'pm33-text-gradient'
    ],
    forbiddenMantineImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/form',
      '@mantine/notifications'
    ],
    forbiddenTablerImports: [
      '@tabler/icons-react'
    ],
    allowedIconImports: [
      'lucide-react'
    ]
  }

  async validate(): Promise<void> {
    console.log(`${colors.bold}${colors.cyan}🔍 PM33 UI Consistency Validation${colors.reset}\n`)
    
    // Get all TypeScript/TSX files in core app
    const files = await this.getFiles()
    
    console.log(`Found ${files.length} files to validate...\n`)
    
    // Validate each file
    for (const file of files) {
      await this.validateFile(file)
    }
    
    // Generate report
    this.generateReport()
  }

  private async getFiles(): Promise<string[]> {
    const patterns = [
      'app/(app)/**/*.{ts,tsx}',
      'components/PM33*.{ts,tsx}',
      'app/(app)/components/**/*.{ts,tsx}'
    ]
    
    const allFiles: string[] = []
    
    for (const pattern of patterns) {
      try {
        const files = await glob(pattern, { 
          ignore: ['**/*.d.ts', '**/node_modules/**', '**/.next/**'] 
        })
        allFiles.push(...files)
      } catch (error) {
        console.warn(`Warning: Could not process pattern ${pattern}`)
      }
    }
    
    // Remove duplicates and return
    return [...new Set(allFiles)]
  }

  private async validateFile(filePath: string): Promise<void> {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const lines = content.split('\n')
      const result: ValidationResult = { file: filePath, issues: [] }
      
      // Run all validation rules
      this.validateImports(content, lines, result)
      this.validatePageWrapper(content, lines, result, filePath)
      this.validateColorUsage(content, lines, result)
      this.validateGlassMorphism(content, lines, result)
      this.validateIconUsage(content, lines, result)
      this.validateComponentCompliance(content, lines, result, filePath)
      
      if (result.issues.length > 0) {
        this.results.push(result)
      }
      
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error)
    }
  }

  private validateImports(content: string, lines: string[], result: ValidationResult): void {
    lines.forEach((line, index) => {
      // Check for forbidden Mantine imports in core app
      if (result.file.includes('app/(app)')) {
        this.specifications.forbiddenMantineImports.forEach(mantineImport => {
          if (line.includes(`from '${mantineImport}'`) || line.includes(`from "${mantineImport}"`)) {
            result.issues.push({
              type: 'error',
              rule: 'no-mantine-in-core-app',
              message: `Forbidden Mantine import '${mantineImport}' found in core app. Use PM33 components instead.`,
              line: index + 1
            })
          }
        })
      }

      // Check for forbidden Tabler icons
      this.specifications.forbiddenTablerImports.forEach(tablerImport => {
        if (line.includes(`from '${tablerImport}'`) || line.includes(`from "${tablerImport}"`)) {
          result.issues.push({
            type: 'error', 
            rule: 'no-tabler-icons',
            message: `Forbidden Tabler icon import '${tablerImport}' found. Use 'lucide-react' instead.`,
            line: index + 1
          })
        }
      })

      // Check for proper icon library usage
      if (line.includes('import') && line.includes('icon') && !line.includes('lucide-react')) {
        const hasLucide = this.specifications.allowedIconImports.some(allowed => 
          line.includes(allowed)
        )
        if (!hasLucide && (line.includes('Icon') || line.includes('icon'))) {
          result.issues.push({
            type: 'warning',
            rule: 'icon-library-consistency', 
            message: 'Icon import detected. Ensure using lucide-react for consistency.',
            line: index + 1
          })
        }
      }
    })
  }

  private validatePageWrapper(content: string, lines: string[], result: ValidationResult, filePath: string): void {
    // Check if this is a page file
    const isPageFile = filePath.includes('/page.tsx') && filePath.includes('app/(app)')
    
    if (isPageFile) {
      const hasPM33PageWrapper = content.includes('PM33PageWrapper')
      const hasPM33Navigation = content.includes('PM33Navigation')
      
      if (!hasPM33PageWrapper) {
        result.issues.push({
          type: 'error',
          rule: 'missing-pm33-page-wrapper',
          message: 'Core app page must use PM33PageWrapper component.',
          line: 1
        })
      }
      
      if (!hasPM33Navigation) {
        result.issues.push({
          type: 'error', 
          rule: 'missing-pm33-navigation',
          message: 'Core app page must use PM33Navigation component.',
          line: 1
        })
      }

      // Check for old navigation patterns
      if (content.includes('CoreAppNavigation')) {
        result.issues.push({
          type: 'error',
          rule: 'deprecated-navigation',
          message: 'Replace CoreAppNavigation with PM33Navigation.',
          line: 1
        })
      }
    }
  }

  private validateColorUsage(content: string, lines: string[], result: ValidationResult): void {
    lines.forEach((line, index) => {
      // Check for hardcoded gray colors
      const grayColorPattern = /text-gray-\d+|bg-gray-\d+|border-gray-\d+/g
      const grayMatches = line.match(grayColorPattern)
      
      if (grayMatches) {
        grayMatches.forEach(match => {
          if (!match.includes('gray-50') && !match.includes('gray-100') && 
              !match.includes('gray-200') && !match.includes('gray-300')) {
            result.issues.push({
              type: 'warning',
              rule: 'semantic-color-usage',
              message: `Replace '${match}' with semantic color classes like 'text-foreground' or 'text-muted-foreground'.`,
              line: index + 1
            })
          }
        })
      }

      // Check for hardcoded slate colors
      const slateColorPattern = /text-slate-\d+|bg-slate-\d+|border-slate-\d+/g
      const slateMatches = line.match(slateColorPattern)
      
      if (slateMatches) {
        slateMatches.forEach(match => {
          result.issues.push({
            type: 'error',
            rule: 'forbidden-slate-colors',
            message: `Replace '${match}' with semantic color classes like 'text-foreground' or 'text-muted-foreground'.`,
            line: index + 1
          })
        })
      }

      // Check for dark mode specific classes
      if (line.includes('dark:')) {
        result.issues.push({
          type: 'info',
          rule: 'dark-mode-usage',
          message: 'Dark mode classes detected. Ensure semantic colors are used for better theme consistency.',
          line: index + 1
        })
      }
    })
  }

  private validateGlassMorphism(content: string, lines: string[], result: ValidationResult): void {
    lines.forEach((line, index) => {
      // Check for backdrop-blur usage
      if (line.includes('backdrop-blur')) {
        const validBlur = this.specifications.glassColors.some(blur => line.includes(blur))
        if (!validBlur) {
          // Extract the backdrop-blur value
          const blurMatch = line.match(/backdrop-blur-[\w]+/)
          if (blurMatch) {
            result.issues.push({
              type: 'warning',
              rule: 'glass-morphism-consistency',
              message: `Backdrop blur '${blurMatch[0]}' may not match PM33 specifications. Use: ${this.specifications.glassColors.join(', ')}.`,
              line: index + 1
            })
          }
        }
      }

      // Check for glass morphism opacity patterns
      if (line.includes('bg-white/') || line.includes('bg-gray-50/')) {
        const validOpacity = this.specifications.glassOpacities.some(opacity => line.includes(opacity))
        if (!validOpacity) {
          result.issues.push({
            type: 'info',
            rule: 'glass-opacity-consistency',
            message: 'Glass morphism opacity detected. Ensure it matches PM33 specifications.',
            line: index + 1
          })
        }
      }

      // Check for missing backdrop-blur with transparency
      if ((line.includes('bg-white/') || line.includes('bg-gray-50/')) && 
          !content.includes('backdrop-blur')) {
        result.issues.push({
          type: 'warning',
          rule: 'missing-backdrop-blur',
          message: 'Transparent background found without backdrop-blur. Add backdrop-blur for proper glass morphism.',
          line: index + 1
        })
      }
    })
  }

  private validateIconUsage(content: string, lines: string[], result: ValidationResult): void {
    lines.forEach((line, index) => {
      // Check for icon components without proper import
      const iconPattern = /<[A-Z][a-zA-Z]*\s+/g
      const iconMatches = line.match(iconPattern)
      
      if (iconMatches && line.includes('size=') && !content.includes('lucide-react')) {
        result.issues.push({
          type: 'warning',
          rule: 'icon-import-missing',
          message: 'Icon component detected but lucide-react import not found. Ensure proper icon library usage.',
          line: index + 1
        })
      }

      // Check for icon size consistency
      if (line.includes('size={') || line.includes('size="')) {
        const sizeMatch = line.match(/size=["'{]?(\d+)/)
        if (sizeMatch) {
          const size = parseInt(sizeMatch[1])
          if (![12, 14, 16, 18, 20, 24].includes(size)) {
            result.issues.push({
              type: 'info',
              rule: 'icon-size-consistency',
              message: `Icon size ${size} detected. Consider using standard sizes: 12, 14, 16, 18, 20, 24.`,
              line: index + 1
            })
          }
        }
      }
    })
  }

  private validateComponentCompliance(content: string, lines: string[], result: ValidationResult, filePath: string): void {
    // Check for required PM33 components in core app pages
    if (filePath.includes('app/(app)') && filePath.includes('/page.tsx')) {
      // Should have PM33 imports
      const hasPM33Import = content.includes("from '@/components/PM33")
      if (!hasPM33Import) {
        result.issues.push({
          type: 'warning',
          rule: 'missing-pm33-imports',
          message: 'Core app page should import PM33 components.',
          line: 1
        })
      }
    }

    // Check for old component usage patterns
    const deprecatedPatterns = [
      { pattern: 'glass-card', replacement: 'PM33Card' },
      { pattern: 'btn-primary', replacement: 'PM33Button variant="primary"' },
      { pattern: 'btn-secondary', replacement: 'PM33Button variant="secondary"' },
      { pattern: '<Card', replacement: 'PM33Card' },
      { pattern: '<Button', replacement: 'PM33Button' }
    ]

    lines.forEach((line, index) => {
      deprecatedPatterns.forEach(({ pattern, replacement }) => {
        if (line.includes(pattern) && result.file.includes('app/(app)')) {
          result.issues.push({
            type: 'warning',
            rule: 'deprecated-component-usage',
            message: `Replace '${pattern}' with '${replacement}' for PM33 consistency.`,
            line: index + 1
          })
        }
      })
    })

    // Check component headers for compliance checklist
    const isComponentFile = filePath.endsWith('.tsx') && !filePath.includes('/page.tsx')
    if (isComponentFile && result.file.includes('app/(app)')) {
      const hasComplianceChecklist = content.includes('Compliance Checklist')
      if (!hasComplianceChecklist) {
        result.issues.push({
          type: 'info',
          rule: 'missing-compliance-header',
          message: 'Component should include PM33 compliance checklist in header comment.',
          line: 1
        })
      }
    }
  }

  private generateReport(): void {
    console.log(`${colors.bold}${colors.cyan}📊 Validation Report${colors.reset}\n`)
    
    if (this.results.length === 0) {
      console.log(`${colors.green}✅ All files pass PM33 UI consistency validation!${colors.reset}\n`)
      return
    }

    let totalErrors = 0
    let totalWarnings = 0
    let totalInfo = 0

    // Count issues by type
    this.results.forEach(result => {
      result.issues.forEach(issue => {
        switch (issue.type) {
          case 'error': totalErrors++; break
          case 'warning': totalWarnings++; break
          case 'info': totalInfo++; break
        }
      })
    })

    // Summary
    console.log(`${colors.bold}Summary:${colors.reset}`)
    console.log(`${colors.red}• ${totalErrors} errors${colors.reset}`)
    console.log(`${colors.yellow}• ${totalWarnings} warnings${colors.reset}`)
    console.log(`${colors.cyan}• ${totalInfo} info${colors.reset}`)
    console.log(`${colors.white}• ${this.results.length} files with issues${colors.reset}\n`)

    // Detailed results
    this.results.forEach(result => {
      const relativePath = relative(process.cwd(), result.file)
      console.log(`${colors.bold}${colors.white}📄 ${relativePath}${colors.reset}`)
      
      result.issues.forEach(issue => {
        const typeColor = issue.type === 'error' ? colors.red : 
                         issue.type === 'warning' ? colors.yellow : colors.cyan
        const typeIcon = issue.type === 'error' ? '❌' : 
                        issue.type === 'warning' ? '⚠️ ' : 'ℹ️ '
        
        console.log(`  ${typeIcon} ${typeColor}${issue.type.toUpperCase()}${colors.reset} [${issue.rule}]`)
        console.log(`    ${issue.message}`)
        if (issue.line) {
          console.log(`    ${colors.magenta}Line ${issue.line}${colors.reset}`)
        }
        console.log()
      })
    })

    // Fix suggestions
    console.log(`${colors.bold}${colors.green}🔧 Quick Fix Suggestions:${colors.reset}`)
    console.log(`• Replace Mantine imports with PM33 components`)
    console.log(`• Update color classes to semantic variants (text-foreground, text-muted-foreground)`)
    console.log(`• Add backdrop-blur to transparent backgrounds`)
    console.log(`• Use lucide-react for all icons`)
    console.log(`• Ensure all pages use PM33PageWrapper and PM33Navigation`)
    console.log()

    // Exit with error code if there are errors
    if (totalErrors > 0) {
      console.log(`${colors.red}${colors.bold}❌ Validation failed with ${totalErrors} errors${colors.reset}`)
      process.exit(1)
    } else {
      console.log(`${colors.green}${colors.bold}✅ No critical errors found${colors.reset}`)
    }
  }
}

// Main execution
async function main() {
  const validator = new UIConsistencyValidator()
  await validator.validate()
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error)
}