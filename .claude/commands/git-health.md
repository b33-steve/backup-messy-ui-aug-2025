# .claude/commands/git-health.md  
# Comprehensive git repository health check for PM33 development with strategic analysis
# WHY: Ensures repository integrity and optimal development workflow for strategic intelligence platform
# RELEVANT FILES: git-sync.md, git-backup.md, pm33-status.md, .github/workflows/daily-snapshot.yml

# PM33 Git Repository Health Check

Perform comprehensive repository health analysis with strategic development insights for PM33 Strategic Intelligence Platform.

## Instructions

You are analyzing the git repository health for PM33 Strategic Intelligence Platform development. Provide strategic insights and actionable recommendations.

### Project Context
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

### Comprehensive Health Check Process

#### 1. Repository Structure Analysis
```bash
echo "🏗️ PM33 Repository Structure Health Check"
echo "========================================"

# Basic repository info
echo "📊 Repository Basics:"
echo "   Repository path: $(pwd | sed "s|$HOME|~|")"
echo "   Git version: $(git --version)"
echo "   Current branch: $(git branch --show-current)"
echo "   Total branches: $(git branch -a | wc -l | tr -d ' ')"
echo "   Remote repositories: $(git remote | wc -l | tr -d ' ')"

# Check for critical PM33 files
echo ""
echo "📋 PM33 Critical Files Status:"
critical_files=("CLAUDE.md" "INSTRUCTIONS-FOR-FUTURE-AGENTS.md" "PM33_PRODUCT_REQUIREMENTS_DOCUMENT.md" "package.json" ".env.example")
for file in "${critical_files[@]}"; do
    if find . -name "$file" -type f | head -1 | read; then
        echo "   ✅ $file: Present"
    else
        echo "   ❌ $file: Missing"
    fi
done
```

#### 2. Commit History & Quality Analysis  
```bash
echo ""
echo "📈 Commit History & Quality Analysis:"
echo "======================================"

# Commit statistics
TOTAL_COMMITS=$(git rev-list --count HEAD)
COMMITS_LAST_30_DAYS=$(git rev-list --count --since="30 days ago" HEAD)
COMMITS_TODAY=$(git rev-list --count --since="24 hours ago" HEAD)

echo "   Total commits: $TOTAL_COMMITS"
echo "   Commits (last 30 days): $COMMITS_LAST_30_DAYS"
echo "   Commits (today): $COMMITS_TODAY"
echo "   Average daily commits: $(( COMMITS_LAST_30_DAYS / 30 ))"

# Contributor analysis
echo "   Contributors: $(git log --pretty=format:'%an' | sort -u | wc -l)"
echo "   Claude Code attribution: $(git log --grep="Generated with Claude Code" --oneline | wc -l) commits"

# Recent commit messages quality
echo ""
echo "🎯 Recent Strategic Commits:"
git log --oneline -5 --pretty=format:"   %h %s"
```

#### 3. Working Directory Health
```bash
echo ""
echo "💾 Working Directory Health:"
echo "============================"

# Check working directory status
UNTRACKED=$(git ls-files --others --exclude-standard | wc -l)
MODIFIED=$(git diff --name-only | wc -l)  
STAGED=$(git diff --cached --name-only | wc -l)

echo "   Untracked files: $UNTRACKED"
echo "   Modified files: $MODIFIED"
echo "   Staged files: $STAGED"

if [ $UNTRACKED -gt 0 ]; then
    echo "   📁 Untracked files preview:"
    git ls-files --others --exclude-standard | head -5 | sed 's/^/      /'
fi

# Large files check (>1MB)
echo ""
echo "📦 Large Files Analysis:"
find . -type f -size +1M -not -path "./.git/*" -not -path "./node_modules/*" | head -5 | while read file; do
    size=$(ls -lh "$file" | awk '{print $5}')
    echo "   ⚠️  Large file: $file ($size)"
done
```

#### 4. Branch Strategy Assessment
```bash
echo ""
echo "🌿 Branch Strategy Health:"
echo "=========================="

# Branch analysis
CURRENT_BRANCH=$(git branch --show-current)
echo "   Current branch: $CURRENT_BRANCH"
echo "   Local branches: $(git branch | wc -l)"
echo "   Remote branches: $(git branch -r | wc -l)"

# Check if on main/master
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "   ⚠️  Working directly on main branch - consider feature branches"
else
    echo "   ✅ Working on feature branch: $CURRENT_BRANCH"
    
    # Check if branch is tracking remote
    if git rev-parse --abbrev-ref @{u} >/dev/null 2>&1; then
        echo "   ✅ Branch tracking remote"
        
        # Check sync status
        AHEAD=$(git rev-list --count @{u}..HEAD)
        BEHIND=$(git rev-list --count HEAD..@{u})
        echo "   📊 Sync status: $AHEAD ahead, $BEHIND behind"
    else
        echo "   ⚠️  Branch not tracking remote - consider pushing"
    fi
fi
```

#### 5. Strategic Development Analysis
```bash
echo ""
echo "🎯 PM33 Strategic Development Health:"
echo "===================================="

# Calculate days to target
DAYS_TO_TARGET=$(( ( $(date -d "2025-12-31" +%s) - $(date +%s) ) / 86400 ))
echo "   Days to $100K MRR target: $DAYS_TO_TARGET"

# Development velocity
if [ $COMMITS_LAST_30_DAYS -gt 0 ]; then
    echo "   Development velocity: $(( COMMITS_LAST_30_DAYS * 12 )) commits/year (projected)"
    echo "   Strategic milestone pace: $(if [ $COMMITS_LAST_30_DAYS -gt 10 ]; then echo "On track"; else echo "Needs acceleration"; fi)"
else
    echo "   Development velocity: No recent activity"
fi

# Check for 4 Agentic AI Teams implementation
echo ""
echo "🏗️ Agentic AI Teams Implementation Status:"
ai_teams=("Strategic Intelligence" "Workflow Execution" "Data Intelligence" "Communication")
for team in "${ai_teams[@]}"; do
    # Check for team-related files and commits
    team_files=$(find . -name "*.md" -o -name "*.tsx" -o -name "*.py" | xargs grep -l "$team" 2>/dev/null | wc -l)
    team_commits=$(git log --grep="$team" --oneline | wc -l)
    echo "   $team: $team_files files, $team_commits commits"
done
```

#### 6. Repository Security & Best Practices
```bash
echo ""
echo "🔒 Security & Best Practices:"
echo "============================="

# Check for sensitive files
echo "   🔍 Sensitive file scan:"
sensitive_patterns=(".env" "*.key" "*.pem" "secrets" "credentials")
for pattern in "${sensitive_patterns[@]}"; do
    if find . -name "$pattern" -not -path "./.git/*" | head -1 | read; then
        echo "   ⚠️  Found potential sensitive files: $pattern"
    fi
done

# Check .gitignore exists
if [ -f .gitignore ]; then
    echo "   ✅ .gitignore: Present ($(wc -l < .gitignore) rules)"
else
    echo "   ❌ .gitignore: Missing"
fi

# Check for PM33 coding standards compliance
echo ""
echo "📝 PM33 Coding Standards Compliance:"
header_compliant=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.py" | head -10 | while read file; do
    if head -4 "$file" | grep -q "^#\|^//.*\..*" 2>/dev/null; then
        echo "compliant"
    fi
done | wc -l)
total_code_files=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.py" | wc -l)
echo "   Header comments compliance: $header_compliant/$total_code_files files"
```

#### 7. Actionable Recommendations
```bash
echo ""
echo "🚀 Strategic Recommendations:"
echo "============================="

# Generate recommendations based on health check
if [ $UNTRACKED -gt 5 ]; then
    echo "   📁 Consider organizing untracked files - high count detected"
fi

if [ $MODIFIED -gt 0 ]; then
    echo "   💾 Commit pending changes to preserve development progress"
fi

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "   🌿 Create feature branch for safer development workflow"
fi

if [ $COMMITS_TODAY -eq 0 ]; then
    echo "   📈 No commits today - consider daily progress commits"
fi

if [ $DAYS_TO_TARGET -lt 100 ] && [ $COMMITS_LAST_30_DAYS -lt 20 ]; then
    echo "   ⚡ Accelerate development pace to meet $100K MRR target"
fi

echo "   ✅ Use /git-backup for daily work preservation"
echo "   ✅ Use /git-sync to maintain remote synchronization"
echo "   ✅ Use /pm33-commit for strategic commit messaging"

echo ""
echo "📊 Health Score: $(if [ $MODIFIED -eq 0 ] && [ $COMMITS_LAST_30_DAYS -gt 10 ]; then echo "🟢 HEALTHY"; elif [ $MODIFIED -lt 5 ] && [ $COMMITS_LAST_30_DAYS -gt 5 ]; then echo "🟡 GOOD"; else echo "🟠 NEEDS ATTENTION"; fi)"
```

Execute comprehensive repository health check now, providing strategic insights and actionable recommendations for PM33 development.