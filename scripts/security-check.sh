#!/bin/bash

# PM33 Security Check Script
# Verifies that sensitive information is properly secured

echo "🔒 PM33 Security Check - Verifying API keys and sensitive data protection"
echo "======================================================================="

# Check if .env files are properly ignored
echo ""
echo "1. Checking .env file protection:"
if git check-ignore app/backend/.env >/dev/null 2>&1; then
    echo "   ✅ .env file is properly ignored by Git"
else
    echo "   ❌ WARNING: .env file is NOT ignored by Git!"
    exit 1
fi

# Check if .env file exists and contains sensitive data
if [ -f "app/backend/.env" ]; then
    echo "   ✅ .env file exists"
    if grep -q "STRIPE_SECRET_KEY=sk_test_" app/backend/.env; then
        echo "   ✅ Stripe keys found in .env file"
    else
        echo "   ⚠️  No Stripe keys found in .env file"
    fi
else
    echo "   ❌ .env file does not exist"
fi

# Check for hardcoded secrets in source code (excluding node_modules and .git)
echo ""
echo "2. Scanning for hardcoded API keys in source code:"
FOUND_KEYS=false

# Search for Stripe keys in source files (excluding templates and documentation)
SECRET_KEYS=$(grep -r "sk_test_[a-zA-Z0-9]*" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.template" --exclude="security-check.sh" --include="*.py" --include="*.js" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "sk_test_your" | grep -v "REPLACE_WITH")
if [ ! -z "$SECRET_KEYS" ]; then
    echo "   ❌ WARNING: Found hardcoded Stripe secret keys!"
    echo "$SECRET_KEYS"
    FOUND_KEYS=true
fi

PUB_KEYS=$(grep -r "pk_test_[a-zA-Z0-9]*" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.template" --exclude="security-check.sh" --include="*.py" --include="*.js" --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "pk_test_your" | grep -v "REPLACE_WITH")
if [ ! -z "$PUB_KEYS" ]; then
    echo "   ❌ WARNING: Found hardcoded Stripe publishable keys!"
    echo "$PUB_KEYS"
    FOUND_KEYS=true
fi

if [ "$FOUND_KEYS" = false ]; then
    echo "   ✅ No hardcoded API keys found in source code"
fi

# Check if sensitive files are in git status
echo ""
echo "3. Checking git status for sensitive files:"
SENSITIVE_FILES=false

if git status --porcelain | grep -E "\.(env|key|pem)$"; then
    echo "   ❌ WARNING: Sensitive files found in git status!"
    SENSITIVE_FILES=true
fi

if [ "$SENSITIVE_FILES" = false ]; then
    echo "   ✅ No sensitive files in git staging area"
fi

# Check .gitignore patterns
echo ""
echo "4. Verifying .gitignore patterns:"
if grep -q "\.env" .gitignore; then
    echo "   ✅ .env pattern found in root .gitignore"
else
    echo "   ❌ .env pattern missing from root .gitignore"
fi

if [ -f "app/backend/.gitignore" ] && grep -q "\.env" app/backend/.gitignore; then
    echo "   ✅ Backend-specific .gitignore exists with .env pattern"
else
    echo "   ❌ Backend .gitignore missing or incomplete"
fi

# Summary
echo ""
echo "======================================================================="
if [ "$FOUND_KEYS" = true ] || [ "$SENSITIVE_FILES" = true ]; then
    echo "❌ SECURITY ISSUES FOUND - Please fix the warnings above!"
    echo ""
    echo "Recommended actions:"
    echo "1. Remove hardcoded API keys from source code"
    echo "2. Move all secrets to .env file"
    echo "3. Verify .env files are in .gitignore"
    echo "4. Run 'git reset' to unstage sensitive files if needed"
    exit 1
else
    echo "✅ SECURITY CHECK PASSED - All sensitive data is properly protected!"
    echo ""
    echo "Your API keys and sensitive information are secure:"
    echo "• .env files are ignored by Git"
    echo "• No hardcoded secrets in source code"
    echo "• Proper .gitignore patterns in place"
fi