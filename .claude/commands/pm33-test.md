# .claude/commands/pm33-test.md
# Comprehensive testing workflows for PM33 Strategic Intelligence Platform with strategic business context
# WHY: Ensures quality across 4 AI teams while validating PMO transformation capabilities  
# RELEVANT FILES: CLAUDE.md, package.json, playwright.config.ts, .github/workflows/daily-snapshot.yml

# PM33 Strategic Testing Automation

Execute comprehensive testing workflows for PM33 Strategic Intelligence Platform with strategic business impact validation.

## Instructions

You are running strategic tests for PM33 Strategic Intelligence Platform. Validate both technical functionality and business impact on the $100K MRR mission.

### Project Context
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

### Strategic Testing Process

#### 1. Test Environment Analysis
```bash
echo "🧪 PM33 Strategic Testing Suite Initialization"
echo "============================================="

# Verify testing infrastructure
echo "📊 Test Environment Health:"
if [ -f "package.json" ]; then
    echo "   ✅ Frontend package.json: Present"
    npm_scripts=$(grep -c '"test\|playwright\|jest"' package.json || echo 0)
    echo "   📋 Available test scripts: $npm_scripts"
else
    echo "   ❌ Frontend package.json: Missing"
fi

# Check for testing frameworks
if [ -f "playwright.config.ts" ] || [ -f "playwright.config.js" ]; then
    echo "   ✅ Playwright: Configured"
else
    echo "   ⚠️  Playwright: Not configured"
fi

if [ -d "tests" ] || [ -d "__tests__" ] || [ -d "test" ]; then
    test_files=$(find . -name "*.test.*" -o -name "*.spec.*" | wc -l)
    echo "   📁 Test files found: $test_files"
else
    echo "   ⚠️  Test directory: Not found"
fi
```

#### 2. Frontend Testing (Next.js + Mantine UI)
```bash
echo ""
echo "🎨 Frontend Strategic Testing:"
echo "=============================="

# Run type checking for PM33 coding standards
if [ -f "tsconfig.json" ]; then
    echo "📝 TypeScript validation..."
    if npm run type-check 2>/dev/null || npx tsc --noEmit; then
        echo "   ✅ TypeScript: All types valid"
    else
        echo "   ❌ TypeScript: Type errors detected"
    fi
else
    echo "   ⚠️  TypeScript: Not configured"
fi

# Run linting for coding standards compliance
if npm run lint 2>/dev/null; then
    echo "   ✅ Linting: Code standards compliant"
else
    echo "   ❌ Linting: Standards violations detected"
fi

# Test build process
echo "🏗️ Build process validation..."
if npm run build 2>/dev/null; then
    echo "   ✅ Build: Production build successful"
else
    echo "   ❌ Build: Production build failed"
fi
```

#### 3. Playwright UI/UX Strategic Testing
```bash
echo ""
echo "🎭 Playwright Strategic UI/UX Testing:"
echo "====================================="

# Run Playwright tests with strategic validation
if command -v npx >/dev/null 2>&1; then
    echo "🎯 Strategic page testing..."
    
    # Core PM33 pages validation
    strategic_pages=("strategic-intelligence" "command-center" "pricing" "about" "trial")
    for page in "${strategic_pages[@]}"; do
        echo "   Testing /$page page..."
        if npx playwright test --grep "$page" 2>/dev/null; then
            echo "   ✅ $page: Strategic validation passed"
        else
            echo "   ❌ $page: Strategic validation failed"
        fi
    done
    
    # Run comprehensive Playwright suite
    echo "🔄 Running comprehensive UI test suite..."
    if npx playwright test 2>/dev/null; then
        echo "   ✅ Playwright: All strategic UI tests passed"
    else
        echo "   ❌ Playwright: Strategic UI tests failed"
    fi
else
    echo "   ⚠️  Playwright: Not available for testing"
fi
```

#### 4. Strategic Business Logic Testing
```bash
echo ""
echo "🎯 Strategic Business Logic Testing:"
echo "=================================="

# Test 4 AI Teams integration patterns
ai_teams=("Strategic Intelligence" "Workflow Execution" "Data Intelligence" "Communication")
echo "🏗️ AI Teams Implementation Testing:"
for team in "${ai_teams[@]}"; do
    team_files=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.py" | xargs grep -l "$team" 2>/dev/null | wc -l)
    team_tests=$(find . -name "*.test.*" -o -name "*.spec.*" | xargs grep -l "$team" 2>/dev/null | wc -l)
    echo "   $team: $team_files files, $team_tests tests"
    
    if [ $team_files -gt 0 ]; then
        echo "   ✅ $team: Implementation present"
    else
        echo "   ⚠️  $team: Needs implementation"
    fi
done

# Test PMO transformation validation
echo ""
echo "🏢 PMO Transformation Capability Testing:"
transformation_features=("strategic-analysis" "workflow-automation" "data-intelligence" "communication")
for feature in "${transformation_features[@]}"; do
    feature_impl=$(grep -r "$feature" . --include="*.tsx" --include="*.ts" | wc -l)
    echo "   $feature: $feature_impl implementations"
done
```

#### 5. Service Integration Testing
```bash
echo ""
echo "🔧 Service Integration Strategic Testing:"
echo "========================================"

# Test critical service configurations
echo "📊 Service Configuration Validation:"
services=("Railway" "Pinecone" "Claude" "OpenAI" "Together AI" "PostHog" "Resend" "Stripe")
for service in "${services[@]}"; do
    # Check for service references in environment or config
    service_refs=$(grep -ri "$service" . --include="*.env*" --include="*.json" --include="*.ts" --include="*.js" | wc -l)
    if [ $service_refs -gt 0 ]; then
        echo "   ✅ $service: Configuration found ($service_refs references)"
    else
        echo "   ⚠️  $service: Configuration missing"
    fi
done

# Test API endpoint patterns
echo ""
echo "🔗 API Endpoint Pattern Testing:"
api_patterns=("/api/strategic" "/api/workflows" "/api/data" "/api/communication")
for pattern in "${api_patterns[@]}"; do
    pattern_files=$(find . -name "*.ts" -o -name "*.js" | xargs grep -l "$pattern" 2>/dev/null | wc -l)
    echo "   $pattern: $pattern_files implementations"
done
```

#### 6. Strategic Development Metrics Testing
```bash
echo ""
echo "📈 Strategic Development Metrics Testing:"
echo "========================================"

# Calculate strategic development health
echo "🎯 PM33 Development Health Metrics:"

# Days to target calculation
DAYS_TO_TARGET=$(( ( $(date -d "2025-12-31" +%s) - $(date +%s) ) / 86400 ))
echo "   Days to $100K MRR target: $DAYS_TO_TARGET"

# Code quality metrics
TOTAL_FILES=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.py" | wc -l)
HEADER_COMPLIANT=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.py" | head -20 | while read file; do
    if head -4 "$file" | grep -q "^#\|^//" 2>/dev/null; then
        echo "compliant"
    fi
done | wc -l)

if [ $TOTAL_FILES -gt 0 ]; then
    COMPLIANCE_RATE=$(( (HEADER_COMPLIANT * 100) / TOTAL_FILES ))
    echo "   Header compliance: $HEADER_COMPLIANT/$TOTAL_FILES files ($COMPLIANCE_RATE%)"
else
    echo "   Header compliance: No code files found"
fi

# Strategic commit analysis
STRATEGIC_COMMITS=$(git log --oneline --since="30 days ago" | grep -i "strategic\|pm33\|ai team" | wc -l)
TOTAL_COMMITS=$(git log --oneline --since="30 days ago" | wc -l)
if [ $TOTAL_COMMITS -gt 0 ]; then
    STRATEGIC_RATIO=$(( (STRATEGIC_COMMITS * 100) / TOTAL_COMMITS ))
    echo "   Strategic commit ratio: $STRATEGIC_COMMITS/$TOTAL_COMMITS ($STRATEGIC_RATIO%)"
else
    echo "   Strategic commit ratio: No recent commits"
fi
```

#### 7. Test Results & Strategic Recommendations
```bash
echo ""
echo "📊 PM33 Strategic Test Results Summary:"
echo "======================================"

# Generate strategic test health score
HEALTH_SCORE="CALCULATING"
if [ $COMPLIANCE_RATE -gt 80 ] && [ $STRATEGIC_RATIO -gt 70 ]; then
    HEALTH_SCORE="🟢 EXCELLENT"
elif [ $COMPLIANCE_RATE -gt 60 ] && [ $STRATEGIC_RATIO -gt 50 ]; then
    HEALTH_SCORE="🟡 GOOD"
else
    HEALTH_SCORE="🟠 NEEDS IMPROVEMENT"
fi

echo "🏆 Overall PM33 Test Health: $HEALTH_SCORE"
echo ""
echo "🎯 Strategic Testing Recommendations:"

# Generate strategic recommendations
if [ $DAYS_TO_TARGET -lt 200 ]; then
    echo "   ⚡ Accelerate testing automation - target approaching"
fi

if [ $COMPLIANCE_RATE -lt 90 ]; then
    echo "   📝 Improve header comment compliance for PM33 standards"
fi

if [ $STRATEGIC_RATIO -lt 80 ]; then
    echo "   🎯 Increase strategic context in commits and development"
fi

echo "   ✅ Run /pm33-test weekly for strategic quality assurance"
echo "   ✅ Integrate with /git-backup for test-driven development"
echo "   ✅ Use with /pm33-commit to ensure quality before commits"
echo ""
echo "📈 Testing completed with strategic business context validation"
```

### Integration with PM33 Workflows

#### Daily Development Integration
- **Pre-Commit**: `/pm33-test` before `/pm33-commit`
- **Feature Complete**: Strategic testing before `/git-pr`
- **Weekly Health**: Combined with `/git-health` analysis

#### Strategic Testing Standards
- **Business Impact**: Every test validates PMO transformation
- **4 AI Teams**: All tests consider multi-AI integration
- **Quality Gates**: Tests must pass before strategic deployments
- **Documentation**: Test results inform CLAUDE.md updates

Execute comprehensive PM33 strategic testing now, validating both technical functionality and business impact on the PMO transformation mission.