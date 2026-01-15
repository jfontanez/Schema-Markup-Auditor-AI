# Quick Start Guide - Schema Markup Auditor

## Installation (5 minutes)

### Step 1: Prepare the Extension
1. Locate the `schema-auditor-extension` folder on your computer
2. Ensure all files are present (manifest.json, popup.html, css/, js/, icons/)

### Step 2: Load into Chrome
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar and press Enter
3. Turn ON "Developer mode" (toggle switch in top-right corner)
4. Click "Load unpacked" button
5. Navigate to and select the `schema-auditor-extension` folder
6. Click "Select Folder"

### Step 3: Verify Installation
✓ You should see "Schema Markup Auditor" in your extensions list
✓ The extension icon should appear in your Chrome toolbar
✓ Click the extension icon to open the interface

## First Use (2 minutes)

### Basic Audit (No AI Setup Required)
1. Visit any website (try: https://example.com)
2. Click the Schema Markup Auditor icon in your toolbar
3. Click "Audit Page" button
4. Review the results:
   - Summary shows total schemas found
   - "Schema Data" tab shows all structured data
   - "Issues" tab shows validation results

### Optional: Set Up AI Recommendations

#### Get an API Key (Choose One):

**Option A: OpenAI (ChatGPT)**
1. Go to https://platform.openai.com/signup
2. Sign up or log in
3. Navigate to API Keys section
4. Create new API key
5. Copy the key (you won't see it again!)

**Option B: Anthropic (Claude)**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create new API key
5. Copy the key

**Option C: Google (Gemini)**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create API key
4. Copy the key

#### Configure the Extension:
1. Open the extension
2. Click the Settings icon (gear icon)
3. Select your AI provider from dropdown
4. Paste your API key
5. (Optional) Enter specific model name
6. Click "Test Connection" to verify
7. Click "Save Settings"

## Using AI Recommendations

1. Audit any page
2. Go to "AI Recommendations" tab
3. Click "Get AI Recommendations"
4. Wait 5-15 seconds for AI analysis
5. Review detailed suggestions

## Tips for Best Results

### For Technical SEO Professionals:
- Audit pages before and after making changes
- Export reports for client documentation
- Use AI recommendations to identify missing schema opportunities
- Copy schema code to share with developers

### For Developers:
- Use the extension to debug schema implementation
- Copy extracted schema for testing
- Validate JSON-LD syntax before deployment
- Check for required properties

### For Content Teams:
- Ensure articles have proper Article schema
- Verify author and publication date markup
- Check FAQ and HowTo schema implementation
- Use AI for content-specific schema suggestions

## Common Use Cases

### E-commerce Sites:
Check for:
- Product schema (name, price, availability)
- Review/Rating schema
- Organization schema
- BreadcrumbList for navigation

### Blogs & News:
Check for:
- Article/BlogPosting schema
- Author (Person) schema
- Publisher (Organization) schema
- Date published/modified

### Local Businesses:
Check for:
- LocalBusiness schema
- Address and contact info
- Opening hours
- Reviews and ratings

### Recipes:
Check for:
- Recipe schema
- Ingredients list
- Cooking instructions
- Nutrition information

## Exporting Reports

1. After running an audit, click the export icon (download)
2. Save the JSON file
3. Use the report for:
   - Documentation
   - Tracking changes over time
   - Sharing with team members
   - Client reports

## Keyboard Shortcuts

While extension is open:
- Press `Esc` to close results or settings
- Use `Tab` to navigate between UI elements

## Troubleshooting

**Problem: "No schemas found"**
→ The page doesn't have schema markup (this is what you're checking for!)
→ Try auditing: schema.org, Amazon product pages, or recipe sites

**Problem: AI not working**
→ Check API key is correct
→ Verify you have API credits
→ Test connection in settings

**Problem: Extension icon not showing**
→ Right-click in toolbar area → select "Schema Markup Auditor"
→ Or find it in the extensions menu (puzzle piece icon)

**Problem: Can't click "Audit Page"**
→ Refresh the webpage
→ Some sites block extensions; try a different site

## What to Audit First

Good test pages with schema markup:
1. https://schema.org/LocalBusiness
2. https://schema.org/Recipe
3. https://developers.google.com/search/docs/appearance/structured-data
4. Any major e-commerce product page
5. Any news article on major publications

## Next Steps

1. ✓ Install extension
2. ✓ Try basic audit
3. ✓ Set up AI (optional)
4. → Audit your own websites
5. → Share with your team
6. → Use for client work

## Need Help?

- Read the full README.md
- Check Schema.org documentation: https://schema.org/
- Review Google's structured data guidelines
- Test with Google's Rich Results Test

---

**You're ready to start auditing! 🎉**
