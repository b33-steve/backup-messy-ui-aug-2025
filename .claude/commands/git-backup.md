# .claude/commands/git-backup.md
# Create comprehensive daily backup with PM33 strategic context and progress tracking
# WHY: Ensures daily work preservation with strategic intelligence progress documentation
# RELEVANT FILES: .github/workflows/daily-snapshot.yml, pm33-commit.md, git-pr.md, CLAUDE.md

# PM33 Daily Backup & Progress Tracking

Create comprehensive daily backup with strategic progress documentation and ensure work preservation.

## Instructions

You are creating a daily backup for the PM33 Strategic Intelligence Platform development. This command ensures daily work preservation following Claude Code best practices.

### Project Context
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

### Daily Backup Process

#### 1. Pre-Backup Analysis
Run these commands in parallel to gather comprehensive status:
```bash
git status                    # Current working state
git diff --staged            # Staged changes ready for commit
git diff                     # Unstaged modifications
git log --oneline -10        # Recent commit history
git branch -v               # Current branch status
```

#### 2. Analyze Strategic Progress
Evaluate progress across PM33's 4 Agentic AI Teams:
- **Strategic Intelligence AI Team**: Analysis and competitive intelligence features
- **Workflow Execution AI Team**: PM tool integrations and automation  
- **Data Intelligence AI Team**: Analytics and learning capabilities
- **Communication AI Team**: Stakeholder reporting and alignment features

#### 3. Create Strategic Backup Commit
If there are uncommitted changes, create a comprehensive backup commit:

```bash
git add -A
git commit -m "$(cat <<'EOF'
📸 Daily PM33 Development Backup - $(date +%Y-%m-%d)

🎯 Strategic Progress Summary:
[Analyze and summarize today's work across the 4 AI teams]

🏗️ Architecture Updates:
[Document any architectural decisions or service integrations]

📊 Business Progress:
Days to $100K MRR target: [Calculate days until Dec 31, 2025]
Development velocity: [Assess current progress rate]

🔧 Technical Status:
- Files modified: [Count of changed files]
- Features added/enhanced: [List key improvements]
- Documentation updates: [Note documentation changes]
- Testing status: [Current test coverage/status]

💾 Backup Details:
- Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)
- Branch: $(git branch --show-current)
- Total commits today: $(git log --since="24 hours ago" --oneline | wc -l | tr -d ' ')
- Working directory: $(pwd | sed "s|$HOME|~|")

🧠 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

#### 4. Push to Remote (Backup Insurance)
Ensure work is preserved remotely:
```bash
# Check if remote exists and push
git remote -v
if git remote | grep -q origin; then
    git push origin $(git branch --show-current)
    echo "✅ Daily backup pushed to remote repository"
else
    echo "⚠️  No remote configured - work is local only"
fi
```

#### 5. Trigger Daily Snapshot Workflow
If GitHub Actions daily snapshot exists, trigger it:
```bash
# Trigger the daily snapshot workflow manually if it exists
if gh workflow list | grep -q "daily-snapshot"; then
    gh workflow run daily-snapshot.yml
    echo "✅ Daily snapshot workflow triggered"
else
    echo "ℹ️  Daily snapshot workflow not found"
fi
```

#### 6. Create Progress Summary
Generate a daily progress report:
```bash
echo "
📊 PM33 Daily Progress Report - $(date +%Y-%m-%d)
==============================================

🎯 Mission Progress:
   Target: $100K MRR by December 31, 2025
   Days remaining: $(( ( $(date -d "2025-12-31" +%s) - $(date +%s) ) / 86400 )) days

🏗️ Development Status:
   Current branch: $(git branch --show-current)
   Commits today: $(git log --since="24 hours ago" --oneline | wc -l)
   Files in project: $(find . -name "*.tsx" -o -name "*.ts" -o -name "*.md" -o -name "*.py" | wc -l)
   
📋 4 Agentic AI Teams Status:
   ✅ Strategic Intelligence: [Current implementation status]
   ✅ Workflow Execution: [Current implementation status]  
   ✅ Data Intelligence: [Current implementation status]
   ✅ Communication: [Current implementation status]

💾 Backup Status:
   ✅ Local backup: Complete
   ✅ Remote backup: $(if git remote | grep -q origin; then echo "Complete"; else echo "Local only"; fi)
   ✅ Daily snapshot: Triggered

🔄 Next Session Priorities:
   [Based on current progress, suggest next steps]
"
```

### Integration with Existing Workflows

#### Auto-trigger from Daily Snapshot
The existing `.github/workflows/daily-snapshot.yml` should trigger this backup:
- Runs daily at 6 PM PST (2 AM UTC)
- Creates comprehensive project status
- Includes backup verification
- Generates development metrics

#### Manual Trigger Options
```bash
# Quick daily backup
/git-backup

# Or via GitHub CLI
gh workflow run daily-snapshot.yml
```

### Success Criteria
✅ All changes committed with strategic context  
✅ Work pushed to remote repository  
✅ Daily snapshot workflow triggered  
✅ Progress report generated  
✅ Strategic development metrics captured  

Execute the daily backup process now, ensuring comprehensive work preservation and strategic progress documentation.