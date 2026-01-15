# Installation Guide - Schema Markup Auditor

## Step-by-Step Installation Instructions

### Prerequisites
- Google Chrome browser (or any Chromium-based browser like Edge, Brave, etc.)
- Basic computer skills

---

## Method 1: Install from Folder (Recommended for Development)

### Step 1: Extract the Extension Files

1. Locate the `schema-auditor-extension.zip` file you downloaded
2. Right-click the zip file and select "Extract All..." or "Unzip"
3. Choose a location on your computer (e.g., Desktop or Documents)
4. Remember this location - you'll need it in Step 3

**Alternative**: If you received the folder directly, skip to Step 2.

### Step 2: Open Chrome Extensions Page

1. Open Google Chrome
2. In the address bar, type: `chrome://extensions/` and press Enter
3. OR: Click the three dots menu (⋮) → More tools → Extensions

You should now see the Chrome Extensions management page.

### Step 3: Enable Developer Mode

1. Look for the "Developer mode" toggle in the **top-right corner** of the page
2. Click the toggle to turn it **ON**
3. You should now see additional buttons appear: "Load unpacked", "Pack extension", etc.

### Step 4: Load the Extension

1. Click the **"Load unpacked"** button (appears after enabling Developer mode)
2. A file browser window will open
3. Navigate to where you extracted the extension
4. Select the **`schema-auditor-extension`** folder (the one containing manifest.json)
5. Click **"Select Folder"** or **"Open"**

### Step 5: Verify Installation

1. You should now see "Schema Markup Auditor" in your extensions list
2. The extension should show:
   - Name: Schema Markup Auditor
   - Status: Enabled (toggle should be blue/on)
   - Version: 1.0.0
3. Look for the extension icon in your Chrome toolbar (top-right, next to the address bar)
   - It's a purple/blue icon with a lightbulb
   - If you don't see it, click the puzzle piece icon and pin it

**Congratulations! The extension is now installed.**

---

## Method 2: Install from Chrome Web Store (Coming Soon)

When published to the Chrome Web Store:

1. Visit the extension's Chrome Web Store page
2. Click "Add to Chrome"
3. Confirm by clicking "Add extension"
4. The extension will install automatically

---

## First-Time Setup

### Configure AI Settings (Optional but Recommended)

1. Click the Schema Auditor icon in your toolbar
2. Click the **⚙️ (settings)** icon in the top-right of the popup
3. Fill in your preferences:

   **AI Provider Options:**
   - **OpenAI (ChatGPT)**: Best for general use, widely available
   - **Anthropic (Claude)**: Excellent for detailed analysis
   - **Google (Gemini)**: Good for integration with Google services

4. Enter your API key for your chosen provider
5. (Optional) Specify a model name if you want to use a specific version
6. (Optional) Enable "Automatically run AI analysis after audit"
7. Click **"Save Settings"**

### Getting Your API Key

**For OpenAI:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key immediately (you won't see it again!)
5. Paste into extension settings

**For Anthropic (Claude):**
1. Go to https://console.anthropic.com/
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy and paste into extension settings

**For Google (Gemini):**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy and paste into extension settings

---

## Testing Your Installation

### Quick Test Run

1. Go to any website (try: https://www.amazon.com or any blog)
2. Click the Schema Auditor extension icon
3. Click **"Run Audit"** button
4. You should see:
   - Summary cards showing schema found
   - List of schemas (if any exist on the page)
   - Any issues detected

### Test AI Recommendations (if configured)

1. After running an audit, click the **"AI Insights"** tab
2. Click **"Generate AI Recommendations"**
3. Wait 5-10 seconds for AI to analyze
4. Review the recommendations

---

## Troubleshooting Installation

### Problem: "Load unpacked" button doesn't appear
**Solution**: Make sure Developer Mode is enabled (toggle in top-right)

### Problem: Error when loading - "Manifest file is missing or unreadable"
**Solution**: 
- Make sure you selected the correct folder (should contain manifest.json)
- Don't select the zip file itself, extract it first
- Check that all files were extracted properly

### Problem: Extension icon doesn't appear in toolbar
**Solution**:
- Click the puzzle piece icon in Chrome toolbar
- Find "Schema Markup Auditor" in the list
- Click the pin icon next to it

### Problem: Extension loads but doesn't work on certain pages
**Solution**:
- Extension cannot run on Chrome's internal pages (chrome://, chrome-extension://)
- Try it on a regular website (http:// or https://)
- Refresh the page after installing the extension

### Problem: AI recommendations not working
**Solution**:
- Verify your API key is entered correctly
- Check that you have available credits with your AI provider
- Make sure you're connected to the internet
- Check browser console (F12) for error messages

### Problem: "This extension may soon no longer be supported"
**Solution**:
- This is normal for unpacked extensions
- The extension will continue to work
- This message won't appear for published extensions

---

## Updating the Extension

When a new version is released:

### For Unpacked Installation:
1. Download the new version
2. Go to `chrome://extensions/`
3. Find Schema Markup Auditor
4. Click the refresh icon (🔄)
5. OR: Remove the extension and reinstall with new files

### For Chrome Web Store Installation:
1. Updates happen automatically
2. OR: Go to `chrome://extensions/`
3. Click "Update" button at the top

---

## Uninstalling

If you need to remove the extension:

1. Go to `chrome://extensions/`
2. Find "Schema Markup Auditor"
3. Click **"Remove"**
4. Confirm removal
5. (Optional) Delete the extension folder from your computer

---

## Privacy & Security Notes

- ✅ All settings stored locally in your browser
- ✅ API keys never shared with third parties
- ✅ No tracking or analytics
- ✅ No data collection
- ✅ Open source - you can review all code

---

## Need More Help?

- Read the full **README.md** for detailed documentation
- Check **QUICKSTART.md** for quick start guide
- Review common issues in the main README's Troubleshooting section
- Inspect browser console (F12) for error messages

---

## Next Steps

Now that the extension is installed:

1. ✅ Test it on a few different websites
2. ✅ Set up your AI provider for recommendations
3. ✅ Explore the different tabs (Audit, AI Insights, Report)
4. ✅ Try copying schema code from well-implemented sites
5. ✅ Export a report to see the full audit details

**Happy auditing! 🚀**
