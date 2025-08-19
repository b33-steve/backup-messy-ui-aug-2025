# .claude/commands/git-sync.md
# Sync PM33 development work with remote repository and ensure branch consistency
# WHY: Maintains synchronization between local and remote work following Claude Code git best practices
# RELEVANT FILES: git-backup.md, pm33-commit.md, git-pr.md, .github/workflows/daily-snapshot.yml

# PM33 Smart Git Sync

Synchronize PM33 Strategic Intelligence Platform development with remote repository and ensure branch consistency.

## Instructions

You are synchronizing work for the PM33 Strategic Intelligence Platform. Follow Claude Code best practices for git workflows.

### Project Context
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

### Smart Sync Process

#### 1. Pre-Sync Status Check
Run these commands in parallel to assess current state:
```bash
git status                          # Working directory status
git remote -v                       # Configured remotes
git branch -va                      # All branches (local and remote)
git log --oneline -5                # Recent local commits
git fetch --dry-run                 # Check for remote changes
```

#### 2. Fetch Latest Remote Changes
```bash
# Safely fetch all remote references
git fetch origin --prune

# Check if remote has new commits
BEHIND_COUNT=$(git rev-list --count HEAD..origin/$(git branch --show-current) 2>/dev/null || echo "0")
AHEAD_COUNT=$(git rev-list --count origin/$(git branch --show-current)..HEAD 2>/dev/null || echo "0")

echo "📊 Sync Status:"
echo "   Local commits ahead: $AHEAD_COUNT"
echo "   Remote commits behind: $BEHIND_COUNT"
```

#### 3. Handle Uncommitted Changes
If there are uncommitted changes, create strategic checkpoint:
```bash
if ! git diff-index --quiet HEAD --; then
    echo "💾 Creating strategic checkpoint for uncommitted changes..."
    git stash push -m "WIP: Strategic checkpoint before sync - $(date +%Y-%m-%d_%H:%M)"
    echo "✅ Changes stashed with strategic context"
fi
```

#### 4. Smart Merge/Rebase Strategy
```bash
# Check for conflicts and handle strategically
if [ "$BEHIND_COUNT" -gt 0 ]; then
    echo "🔄 Remote has $BEHIND_COUNT new commits. Syncing..."
    
    # Use rebase for clean history on feature branches
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo "🔀 Rebasing feature branch onto latest main..."
        git rebase origin/main
    else
        echo "🔀 Pulling latest changes on main branch..."
        git pull --ff-only origin main
    fi
else
    echo "✅ Local branch is up to date with remote"
fi
```

#### 5. Push Local Changes
```bash
if [ "$AHEAD_COUNT" -gt 0 ]; then
    echo "⬆️  Pushing $AHEAD_COUNT local commits to remote..."
    git push origin $(git branch --show-current)
    echo "✅ Local commits pushed to remote"
else
    echo "✅ No local commits to push"
fi
```

#### 6. Restore Stashed Changes
```bash
# Restore any stashed changes
if git stash list | grep -q "Strategic checkpoint before sync"; then
    echo "🔄 Restoring strategic checkpoint..."
    git stash pop
    echo "✅ Uncommitted changes restored"
fi
```

#### 7. Verify Sync Success
```bash
# Confirm successful sync
git status --porcelain
git log --oneline -3
echo "
🎯 PM33 Git Sync Summary - $(date +%Y-%m-%d %H:%M)
================================================

📊 Sync Results:
   Current branch: $(git branch --show-current)
   Latest commit: $(git log -1 --oneline)
   Working directory: $(if git diff-index --quiet HEAD --; then echo "Clean"; else echo "Has changes"; fi)
   Remote status: $(git status -b --porcelain | head -1 | sed 's/^## //')

🏗️ Strategic Development Status:
   Total project commits: $(git rev-list --count HEAD)
   Contributors: $(git log --pretty=format:'%an' | sort -u | wc -l)
   Days to $100K MRR: $(( ( $(date -d "2025-12-31" +%s) - $(date +%s) ) / 86400 ))

✅ Sync Status: Complete
"
```

### Integration Points

#### Daily Workflow Integration
- **Morning**: Start with `/git-sync` to get latest changes
- **During Development**: Use `/pm33-commit` for strategic commits
- **End of Day**: Use `/git-backup` for comprehensive backup

#### Conflict Resolution Strategy
If conflicts occur during sync:
1. **Analyze strategic impact** - which AI teams affected?
2. **Preserve PM33 context** - maintain strategic comments and architecture decisions
3. **Test after resolution** - ensure functionality across all 4 AI teams
4. **Document resolution** - add strategic comments explaining conflict resolution

#### Branch Protection
```bash
# Ensure critical branches are protected
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "⚠️  Working on main branch - consider creating feature branch"
    echo "Suggested: git checkout -b feature/[component]-[description]"
fi
```

### Error Recovery
If sync fails:
1. **Assess current state**: `git status`
2. **Check stash**: `git stash list`
3. **Abort if needed**: `git rebase --abort` or `git merge --abort`
4. **Restore safety**: `git stash pop` if needed
5. **Report status**: Provide clear summary of current state

Execute the smart git sync now, ensuring safe synchronization with strategic context preservation.