# .claude/commands/README.md
# PM33 Claude Code custom slash commands for strategic git workflows and development best practices
# WHY: Provides comprehensive git workflow automation following Claude Code best practices for PM33 Strategic Intelligence Platform
# RELEVANT FILES: All command files in this directory, CLAUDE.md, INSTRUCTIONS-FOR-FUTURE-AGENTS.md, .github/workflows/daily-snapshot.yml

# PM33 Claude Code Custom Commands

Strategic git workflow automation for PM33 Strategic Intelligence Platform development, following Claude Code best practices.

## 🎯 PM33 Mission Context

These commands support the development of PM33 Strategic Intelligence Platform:
- **Mission**: Transform PMs into PMOs through 4 agentic AI teams
- **Target**: $100K MRR by December 31, 2025
- **Architecture**: Services-based SAAS (Railway, Pinecone, Claude, OpenAI, Together AI)

## 📋 Available Commands

### Core Git Workflow Commands

#### `/pm33-commit`
**Purpose**: Create strategic commits with PM33 context  
**Best For**: Individual feature commits, bug fixes, documentation updates  
**Features**:
- ✅ Analyzes staged changes strategically
- ✅ Maps changes to 4 Agentic AI teams
- ✅ Includes business impact assessment
- ✅ Follows PM33 commit message standards
- ✅ Proper Claude Code attribution

**Usage Example**:
```
/pm33-commit
```

#### `/git-pr`  
**Purpose**: Create GitHub pull requests with strategic context  
**Best For**: Feature branches ready for review  
**Features**:
- ✅ Comprehensive branch analysis
- ✅ Strategic PR description template
- ✅ Business impact documentation
- ✅ Testing checklist integration
- ✅ Claude Code best practices compliance

**Usage Example**:
```
/git-pr
```

#### `/git-backup`
**Purpose**: Daily development backup with progress tracking  
**Best For**: End-of-day work preservation  
**Features**:
- ✅ Comprehensive daily backup creation
- ✅ Strategic progress documentation
- ✅ Remote synchronization verification
- ✅ Daily snapshot workflow triggering
- ✅ Development velocity analysis

**Usage Example**:
```
/git-backup
```

#### `/git-sync`
**Purpose**: Smart synchronization with remote repository  
**Best For**: Morning workflow start, collaboration sync  
**Features**:
- ✅ Safe fetch and merge operations
- ✅ Conflict resolution with strategic context
- ✅ Stash management for uncommitted work
- ✅ Branch protection guidance
- ✅ Sync status reporting

**Usage Example**:
```
/git-sync
```

#### `/git-health`
**Purpose**: Comprehensive repository health analysis  
**Best For**: Weekly health checks, troubleshooting  
**Features**:
- ✅ Repository structure analysis
- ✅ Commit quality assessment  
- ✅ Strategic development insights
- ✅ Security & best practices audit
- ✅ Actionable recommendations
- ✅ PM33 coding standards compliance

**Usage Example**:
```
/git-health
```

### Status & Analysis Commands

#### `/pm33-status` 
**Purpose**: Comprehensive PM33 development status report  
**Best For**: Project overview, stakeholder updates  
**Features**:
- ✅ Mission alignment tracking
- ✅ 4 Agentic AI teams progress
- ✅ Technical architecture status
- ✅ Development metrics analysis
- ✅ Next priorities identification

**Usage Example**:
```
/pm33-status
```

## 🔄 Integrated Daily Workflow

### Morning Routine
1. **Start with sync**: `/git-sync` - Get latest changes
2. **Check health**: `/git-health` - Verify repository state
3. **Plan work**: `/pm33-status` - Review priorities

### Development Workflow  
1. **Make changes**: Edit files following PM33 coding standards
2. **Strategic commits**: `/pm33-commit` - Commit with strategic context
3. **Feature completion**: `/git-pr` - Create strategic pull request

### End-of-Day Routine
1. **Daily backup**: `/git-backup` - Preserve all work
2. **Progress tracking**: Automatic via daily snapshot workflow

### Weekly Health Check
1. **Repository analysis**: `/git-health` - Comprehensive health assessment
2. **Strategic review**: `/pm33-status` - Mission alignment check

## 🏗️ Automated Daily Backup Integration

### GitHub Actions Integration
The **daily-snapshot.yml** workflow automatically:
- ✅ Runs repository health checks
- ✅ Creates strategic backup commits  
- ✅ Tracks 4 Agentic AI teams progress
- ✅ Calculates days to $100K MRR target
- ✅ Generates comprehensive development metrics
- ✅ Creates issues for critical changes

### Trigger Methods
```bash
# Automatic (daily at 6 PM PST)
# Via GitHub Actions schedule

# Manual trigger
gh workflow run daily-snapshot.yml

# Via Claude Code command
/git-backup
```

## 🎯 Strategic Benefits

### For PM33 Development
- ✅ **Strategic Context**: All commits tied to business objectives
- ✅ **Progress Tracking**: Continuous monitoring toward $100K MRR
- ✅ **Team Alignment**: 4 Agentic AI teams implementation visibility
- ✅ **Quality Assurance**: PM33 coding standards enforcement
- ✅ **Work Preservation**: Comprehensive daily backups

### Following Claude Code Best Practices
- ✅ **Smart Commit Messages**: Strategic context with business impact
- ✅ **Pull Request Excellence**: Comprehensive descriptions with testing
- ✅ **Repository Health**: Proactive maintenance and monitoring  
- ✅ **Collaboration Ready**: GitHub CLI integration for team workflows
- ✅ **Documentation First**: Strategic comments and header requirements

## 🔧 Configuration Requirements

### Prerequisites
- ✅ GitHub CLI installed and authenticated (`gh auth status`)
- ✅ Git repository with remote origin configured
- ✅ PM33 project structure with critical files (CLAUDE.md, etc.)
- ✅ Claude Code settings.json with proper permissions

### PM33-Specific Setup
- ✅ Daily snapshot GitHub Actions workflow active
- ✅ PM33 coding standards documented in CLAUDE.md
- ✅ Strategic Intelligence Platform context in all documentation
- ✅ 4 Agentic AI teams architecture references

## 🚀 Next Steps

1. **Test Commands**: Run `/git-health` to verify setup
2. **Daily Practice**: Use `/git-sync` each morning  
3. **Strategic Commits**: Replace `git commit` with `/pm33-commit`
4. **Work Preservation**: End each day with `/git-backup`
5. **Feature Development**: Use `/git-pr` for all pull requests

These commands ensure your PM33 Strategic Intelligence Platform development follows Claude Code best practices while maintaining strategic focus on the $100K MRR mission.