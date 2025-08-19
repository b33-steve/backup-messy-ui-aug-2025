# .claude/commands/git-pr.md
# Create GitHub pull request with PM33 strategic context and proper formatting
# WHY: Streamlines PR creation following Claude Code best practices with strategic intelligence focus
# RELEVANT FILES: pm33-commit.md, pm33-status.md, .github/workflows/daily-snapshot.yml, CLAUDE.md

# PM33 Smart Pull Request

Create a GitHub pull request for PM33 Strategic Intelligence Platform with proper context and formatting.

## Instructions

You are creating a pull request for the PM33 Strategic Intelligence Platform. Follow these guidelines from Claude Code best practices:

### Project Context
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025  
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

### PR Creation Process
1. **Analyze Current Branch Changes**
   - Run `git status` to see untracked files
   - Run `git diff` to see staged and unstaged changes
   - Check if current branch tracks remote and is up to date
   - Run `git log` and `git diff [base-branch]...HEAD` to understand full commit history

2. **Analyze All Changes for PR Summary**
   - Look at ALL commits that will be included (not just latest)
   - Understand the complete scope of changes from base branch divergence
   - Draft comprehensive PR summary covering all modifications

3. **Create Pull Request with Strategic Context**

### PR Title Format
```
🎯 [Component]: [Brief strategic description]
```

### PR Description Template
```markdown
## Summary
[1-3 bullet points describing the strategic changes and their impact on PM33's mission]

## Strategic Impact
**Agentic AI Teams Affected**: [List which of the 4 AI teams are impacted]
**Business Impact**: [How this contributes to $100K MRR target]

## Changes Overview
- [Key change 1 with business context]
- [Key change 2 with business context] 
- [Key change 3 with business context]

## Technical Details
[Technical implementation details for reviewers]

## Testing
- [ ] Manual testing completed
- [ ] All existing functionality verified
- [ ] New features tested across responsive breakpoints
- [ ] Code follows PM33 coding standards (header comments, strategic comments)

## Deployment Considerations
[Any considerations for deployment or rollback]

🧠 Generated with [Claude Code](https://claude.ai/code)
```

### Component Types (Same as commit standards)
- **Strategic Intelligence**: AI strategic analysis features
- **Workflow Execution**: Task automation and PM tool integration
- **Data Intelligence**: Analytics and learning capabilities
- **Communication**: Stakeholder and executive reporting
- **Design System**: UI/UX for marketing vs app contexts
- **Documentation**: Project documentation and guides
- **Infrastructure**: Service setup and integrations

### Steps to Execute
1. Analyze branch changes and commit history
2. Create branch if needed and push to remote with `-u` flag
3. Create PR using `gh pr create` with the strategic template above
4. Return the PR URL so user can review

### Example PR Creation
```bash
gh pr create --title "🎯 Strategic Intelligence: Add confidence scoring visualization" --body "$(cat <<'EOF'
## Summary
- Implemented ConfidenceIndicator component with color-coded certainty levels
- Added AI processing states for strategic analysis workflows  
- Enhanced user experience for strategic decision-making

## Strategic Impact
**Agentic AI Teams Affected**: Strategic Intelligence AI Team (primary)
**Business Impact**: Improved confidence visualization drives Enterprise tier adoption and user trust

## Changes Overview
- New ConfidenceIndicator React component with professional dark theme
- AI processing state management for real-time feedback
- Strategic decision-making UI patterns for PMO transformation

## Technical Details
- Uses Mantine UI components following APP_DESIGN_SYSTEM.md
- Implements proper TypeScript interfaces for confidence scoring
- Follows PM33 coding standards with strategic header comments

## Testing
- [x] Manual testing completed across confidence levels
- [x] Responsive design tested on mobile, tablet, desktop
- [x] Follows PM33 design system color tokens
- [x] Strategic commenting explains decision-making logic

🧠 Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

Create the pull request now following these strategic guidelines.