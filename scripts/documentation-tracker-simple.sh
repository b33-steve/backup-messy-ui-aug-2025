#!/bin/bash
# PM33 Documentation Tracking & Backup System
# Simple version - prevents future loss of critical architecture documentation

set -e

echo "🔍 PM33 Documentation Tracker"
echo "================================================="

# Create backup directory
DOCS_BACKUP_DIR="${HOME}/pm33-docs-backups"
mkdir -p "$DOCS_BACKUP_DIR"

# Check critical files
echo "📋 Checking Critical Documentation Files"
echo ""

CRITICAL_FILES=(
    "DOCUMENTATION_INDEX.md"
    "CLAUDE.md"
    "docs/shared/PM33_COMPLETE_UI_SYSTEM.md"
    "docs/shared/PM33_COMPLETE_UX_SYSTEM.md"
    "docs/shared/PM33_COMPLETE_DEVELOPMENT_PLAN.md"
    "docs/shared/CLAUDE_CODE_INSTRUCTIONS.md"
    "docs/system/SYSTEM-DOCUMENTATION.md"
    "docs/deployment/PM33_PRODUCTION_DEPLOYMENT_GUIDE.md"
    "app/(marketing)/docs/PM33_MARKETING_WEBSITE_STRATEGY.md"
    "app/(app)/docs/APP_THEME_GUIDE.md"
)

missing_files=0
for file in "${CRITICAL_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file"
        # Add to git if not tracked
        git add "$file" 2>/dev/null || true
    else
        echo "❌ MISSING: $file"
        ((missing_files++))
    fi
done

# Create backup
echo ""
echo "💾 Creating Documentation Backup"
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_file="$DOCS_BACKUP_DIR/pm33-docs-$timestamp.tar.gz"

# Create backup of all documentation
find . -name "*.md" -type f | grep -E "(docs/|DOCUMENTATION_INDEX|CLAUDE\.md)" | tar -czf "$backup_file" -T - 2>/dev/null || true

if [[ -f "$backup_file" ]]; then
    backup_size=$(du -h "$backup_file" | cut -f1)
    echo "✅ Backup created: $backup_file ($backup_size)"
else
    echo "⚠️  Backup creation failed"
fi

# Health report
echo ""
echo "📊 Documentation Health Report"
echo "================================================="
echo "Timestamp: $(date)"
echo "Critical files found: $((${#CRITICAL_FILES[@]} - missing_files))/${#CRITICAL_FILES[@]}"
echo "Missing files: $missing_files"
echo "Latest backup: $backup_file"

# Git status
echo ""
echo "🔄 Documentation Files in Git"
git ls-files "*.md" | grep -E "(docs/|DOCUMENTATION_INDEX|CLAUDE\.md)" | wc -l | xargs echo "Tracked documentation files:"

# Commit any new documentation files
if ! git diff --cached --quiet; then
    echo ""
    echo "📤 New documentation files added to git"
    echo "Run 'git commit -m \"docs: track additional files\"' to save"
fi

echo ""
echo "🎉 Documentation tracking complete!"

exit $([[ $missing_files -eq 0 ]] && echo 0 || echo 1)