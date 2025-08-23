# Google OAuth Setup Guide for PM33

## 🎯 **Quick Setup Instructions**

### **Step 1: Google Cloud Console Setup**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Search for "Google+ API" and enable it (or use Google Identity API)

### **Step 2: Create OAuth 2.0 Credentials**
1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Choose **Web application**
3. Set **Name**: "PM33 Production App"
4. Add **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### **Step 3: Copy Credentials**
1. Copy **Client ID** and **Client Secret**
2. Update `.env.local` file:
```bash
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

### **Step 4: Test the Integration**
1. Restart your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/signin`
3. Click "Sign in with Google"
4. Complete the OAuth flow

## 🔒 **Security Notes**
- **Never commit** real credentials to version control
- Use different credentials for development vs production
- Regularly rotate your client secrets
- Monitor OAuth usage in Google Cloud Console

## 🚨 **Current Status**
- ✅ NextAuth.js configured
- ✅ API routes created
- ✅ Environment variables set up
- ⏳ **Need real Google OAuth credentials** for full functionality
- ⏳ Demo mode active with placeholder credentials

## 📱 **Testing Without Real Credentials**
The system is set up to work in demo mode. You'll see authentication pages and flows, but Google OAuth will not work until real credentials are added.