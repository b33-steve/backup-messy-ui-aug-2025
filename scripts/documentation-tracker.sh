#!/bin/bash
# PM33 Documentation Tracking & Backup System
# Prevents future loss of critical architecture documentation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCS_BACKUP_DIR="${HOME}/pm33-docs-backups"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}🔍 PM33 Documentation Tracker${NC}"
echo "================================================="

# Create backup directory if it doesn't exist
mkdir -p "$DOCS_BACKUP_DIR"

# Function to check if file exists and is tracked in git
check_file_status() {
    local file="$1"
    local description="$2"
    
    if [[ -f "$file" ]]; then
        if git ls-files --error-unmatch "$file" &>/dev/null; then
            echo -e "✅ ${GREEN}$description${NC} - File exists and tracked"
        else
            echo -e "⚠️  ${YELLOW}$description${NC} - File exists but NOT tracked in git"
            echo "   Adding to git..."
            git add "$file"
        fi
    else
        echo -e "❌ ${RED}$description${NC} - FILE MISSING!"
        return 1
    fi
}

# Function to validate cross-references
validate_cross_references() {
    echo -e "\n${BLUE}🔗 Validating Cross-References${NC}"
    
    local broken_refs=0
    
    # Find all markdown files with references
    for md_file in $(find . -name "*.md" -type f); do
        # Extract references to other .md files
        while IFS= read -r line; do
            # Match patterns like [text](path/file.md) or [text](../path/file.md)
            if [[ $line =~ \[.*\]\(([^)]+\.md)\) ]]; then
                ref_path="${BASH_REMATCH[1]}"
                
                # Convert relative paths to absolute from the markdown file's directory
                if [[ $ref_path =~ ^\.\./ ]] || [[ $ref_path =~ ^[^/] ]]; then
                    # Relative path - resolve from the markdown file's directory
                    md_dir=$(dirname "$md_file")
                    full_path="$md_dir/$ref_path"
                    # Normalize the path
                    full_path=$(cd "$md_dir" && realpath "$ref_path" 2>/dev/null || echo "$full_path")
                else
                    # Absolute path from project root
                    full_path="$ref_path"
                fi
                
                if [[ ! -f "$full_path" ]]; then
                    echo -e "   ${RED}BROKEN LINK${NC} in $md_file: $ref_path"
                    ((broken_refs++))
                fi
            fi
        done < "$md_file"
    done
    
    if [[ $broken_refs -eq 0 ]]; then
        echo -e "✅ ${GREEN}All cross-references valid${NC}"
    else
        echo -e "❌ ${RED}Found $broken_refs broken cross-references${NC}"
    fi
    
    return $broken_refs
}

# Critical files to track
echo -e "\n${BLUE}📋 Checking Critical Documentation Files${NC}"

# Core documentation files
CRITICAL_FILES=(
    "DOCUMENTATION_INDEX.md:Master Documentation Index"
    "CLAUDE.md:Primary Development Instructions"
    "docs/shared/PM33_COMPLETE_UI_SYSTEM.md:Master UI System"
    "docs/shared/PM33_COMPLETE_UX_SYSTEM.md:Master UX System"
    "docs/shared/PM33_COMPLETE_DEVELOPMENT_PLAN.md:Development Plan"
    "docs/shared/CLAUDE_CODE_INSTRUCTIONS.md:Enforcement Rules"
    "docs/shared/PM33_ONBOARDING_WORKFLOW_DIAGRAM.md:Onboarding Workflow"
    "docs/shared/CLAUDE_CODE_CROSS_DIRECTORY_INSTRUCTIONS.md:Cross-Directory Setup"
    "docs/system/MULTITENANT_ARCHITECTURE.md:Multitenant Architecture"
    "docs/system/PM33_UX_ARCHITECTURE_PLAN.md:UX Architecture"
    "docs/system/SYSTEM-DOCUMENTATION.md:System Documentation Index"
    "docs/deployment/PM33_PRODUCTION_DEPLOYMENT_GUIDE.md:Production Deployment"
    "docs/deployment/DEPLOYMENT.md:Deployment Pipeline"
    "app/(marketing)/docs/PM33_MARKETING_WEBSITE_STRATEGY.md:Marketing Strategy"
    "app/(marketing)/docs/PM33_PRICING_STRATEGY.md:Pricing Strategy"
    "app/(marketing)/docs/MARKETING_THEME_GUIDE.md:Marketing Theme Guide"
    "app/(marketing)/docs/MARKETING_DESIGN_SYSTEM.md:Marketing Design System"
    "app/(app)/docs/APP_THEME_GUIDE.md:App Theme Guide"
    "app/(app)/docs/APP_DESIGN_SYSTEM.md:App Design System"
    "app/(app)/docs/CORE_APP_DESIGN_SYSTEM.md:Core App Design System"
)

missing_files=0
for file_info in "${CRITICAL_FILES[@]}"; do
    IFS=':' read -r filepath description <<< "$file_info"
    if ! check_file_status "$filepath" "$description"; then
        ((missing_files++))
    fi
done

# Create documentation backup
echo -e "\n${BLUE}💾 Creating Documentation Backup${NC}"
backup_file="$DOCS_BACKUP_DIR/pm33-docs-$TIMESTAMP.tar.gz"

tar -czf "$backup_file" \
    DOCUMENTATION_INDEX.md \
    CLAUDE.md \
    docs/ \
    app/\(marketing\)/docs/ \
    app/\(app\)/docs/ \
    2>/dev/null || echo "Warning: Some files may not exist yet"

echo -e "✅ ${GREEN}Backup created: $backup_file${NC}"

# Display backup size
if [[ -f "$backup_file" ]]; then
    backup_size=$(du -h "$backup_file" | cut -f1)
    echo "   Size: $backup_size"
fi

# Validate cross-references
validate_cross_references
cross_ref_status=$?

# Generate health report
echo -e "\n${BLUE}📊 Documentation Health Report${NC}"
echo "================================================="
echo "Timestamp: $(date)"
echo "Critical files tracked: $((${#CRITICAL_FILES[@]} - missing_files))/${#CRITICAL_FILES[@]}"
echo "Missing files: $missing_files"
echo "Cross-reference status: $([[ $cross_ref_status -eq 0 ]] && echo "✅ All valid" || echo "❌ $cross_ref_status broken")"
echo "Latest backup: $backup_file"
echo "Project root: $PROJECT_ROOT"

# Git status for documentation
echo -e "\n${BLUE}🔄 Git Status for Documentation${NC}"
git status --porcelain | grep "\.md$" | head -10

# Count total documentation files
total_md_files=$(find . -name "*.md" -type f | wc -l)
tracked_md_files=$(git ls-files "*.md" | wc -l)
echo -e "\nTotal .md files: $total_md_files"
echo "Git-tracked .md files: $tracked_md_files"

# Push to remote if changes exist
if git diff --cached --quiet && git diff --quiet; then
    echo -e "\n✅ ${GREEN}No documentation changes to commit${NC}"
else
    echo -e "\n${YELLOW}📤 Documentation changes detected${NC}"
    echo "Run 'git add . && git commit -m \"docs: update\" && git push' to save changes"
fi

# Generate recovery commands if files are missing
if [[ $missing_files -gt 0 ]]; then
    echo -e "\n${RED}🚨 RECOVERY NEEDED${NC}"
    echo "Missing files detected. Recovery options:"
    echo "1. Restore from backup: tar -xzf $backup_file"
    echo "2. Check git history: git log --follow -- [filename]"
    echo "3. Contact support if files are permanently lost"
fi

# Create quick recovery script
cat > "$DOCS_BACKUP_DIR/restore-docs-$TIMESTAMP.sh" << 'EOL'
#!/bin/bash
# Quick documentation restoration script
echo "Restoring PM33 documentation..."
cd "$(dirname "${BASH_SOURCE[0]}")/../app/frontend"
tar -xzf "$1" --overwrite
git add docs/ app/*/docs/ DOCUMENTATION_INDEX.md CLAUDE.md
echo "Documentation restored. Review changes with 'git status'"
EOL

chmod +x "$DOCS_BACKUP_DIR/restore-docs-$TIMESTAMP.sh"

echo -e "\n${BLUE}🔧 Maintenance Files Created${NC}"
echo "Backup: $backup_file"
echo "Recovery script: $DOCS_BACKUP_DIR/restore-docs-$TIMESTAMP.sh"

# Cleanup old backups (keep last 10)
echo -e "\n${BLUE}🧹 Cleaning Old Backups${NC}"
cd "$DOCS_BACKUP_DIR"
ls -t pm33-docs-*.tar.gz 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
echo "Kept last 10 backups, cleaned older ones"

echo -e "\n${GREEN}🎉 Documentation tracking complete!${NC}"
echo "================================================="

exit $([[ $missing_files -eq 0 && $cross_ref_status -eq 0 ]] && echo 0 || echo 1)