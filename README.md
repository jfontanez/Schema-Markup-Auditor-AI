# Schema Markup Auditor - Chrome Extension

<div align="center">

![Version](https://img.shields.io/badge/version-v1.0.1-alpha-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow.svg)
![Manifest](https://img.shields.io/badge/Manifest-V3-orange.svg)

**A professional Chrome extension for auditing and analyzing structured data (schema markup) on any webpage with AI-powered recommendations.**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [AI Integration](#ai-integration) • [Contributing](#contributing)

</div>

---

## 🎯 Overview

Schema Markup Auditor is a powerful tool designed for SEO professionals, web developers, and content teams to audit, validate, and optimize structured data implementation on websites. It combines automated validation with AI-powered recommendations to provide comprehensive schema analysis.

## ✨ Features

### Core Auditing Capabilities

- **🔍 Multi-Format Detection**
  - JSON-LD (JavaScript Object Notation for Linked Data)
  - Microdata (HTML attribute-based markup)
  - RDFa (Resource Description Framework in Attributes)

- **✅ Comprehensive Validation**
  - Real-time syntax error detection
  - Required property checking for 15+ schema types
  - Missing field warnings
  - Schema.org compliance verification

- **📊 Individual Schema Viewing**
  - Expand/collapse functionality for each schema
  - Property preview with key-value pairs
  - Raw JSON/markup display
  - Filter by schema type or format

- **🔗 External Validation**
  - One-click Google Rich Results Test integration
  - Direct Schema.org Validator submission
  - Instant validation workflow

### AI-Powered Recommendations

- **🤖 Multi-Provider Support**
  - OpenAI (GPT-4, GPT-3.5-turbo)
  - Anthropic (Claude Opus, Sonnet, Haiku)
  - Google (Gemini Pro)

- **💡 Smart Analysis**
  - Page content analysis
  - Missing schema opportunities identification
  - Improvement suggestions for existing markup
  - Best practices tailored to page type

### Professional Features

- **📤 Export & Share**
  - JSON report generation
  - Copy schema code to clipboard
  - View raw schema in new window
  - Shareable audit reports

- **🎨 Modern Interface**
  - Clean, intuitive design
  - Tabbed navigation (Schema Data, Issues, AI Recommendations)
  - Summary dashboard with key metrics
  - Responsive layout

## 🚀 Installation

### From Source (For Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/jfontanez/Schema-Markup-Auditor-AI.git
   cd Schema-Markup-Auditor-AI
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the extension folder

3. **Verify Installation**
   - Extension icon should appear in Chrome toolbar
   - Click to open and start auditing

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

## 📖 Usage

### Basic Audit

1. Navigate to any webpage you want to audit
2. Click the Schema Markup Auditor icon in your toolbar
3. Click **"Audit Current Page"**
4. Review results in three organized tabs:
   - **Schema Data**: All extracted schema markup with filters
   - **Issues**: Validation errors and warnings
   - **AI Recommendations**: Smart suggestions (if AI configured)

### Individual Schema Analysis

Each detected schema can be:
- **Expanded/Collapsed**: Click header to toggle view
- **Copied**: One-click copy to clipboard
- **Viewed Raw**: Open in new window with syntax highlighting
- **Validated**: Send to Google or Schema.org validators

### Filtering Schemas

- **By Type**: Filter to specific schema types (Organization, Article, Product, etc.)
- **By Format**: View only JSON-LD, Microdata, or RDFa schemas
- Filters update dynamically based on detected schemas

### External Validation

Each schema includes buttons to:
- **Google Test**: Validate with Google Rich Results Test
- **Schema.org**: Validate with official Schema.org Validator

## 🤖 AI Integration

### Setup

1. Click the **Settings** icon (gear) in the extension
2. Select your preferred AI provider
3. Enter your API key
4. (Optional) Specify a model
5. Click **Test Connection** to verify
6. Click **Save Settings**

### Getting API Keys

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
- **Google**: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Recommended Models

- **Best Quality**: Claude Opus or GPT-4
- **Balanced**: Claude Sonnet or GPT-3.5-turbo
- **Budget**: Google Gemini (generous free tier)

## 🛠️ Technical Details

### Technology Stack

- **Manifest Version**: V3 (latest Chrome extension standard)
- **JavaScript**: Vanilla ES6+ (no frameworks, no dependencies)
- **CSS**: Custom design system with CSS variables
- **APIs**: Direct integration with AI providers
- **Storage**: Chrome's local storage API (secure, private)

### File Structure

```
schema-auditor-extension/
├── manifest.json              # Extension configuration
├── popup.html                 # Main UI
├── css/
│   └── popup.css             # Styles (~800 lines)
├── js/
│   ├── popup.js              # Main logic (~1000 lines)
│   ├── content.js            # Schema extraction (~250 lines)
│   └── background.js         # Service worker
├── icons/                     # Extension icons (16, 48, 128)
└── docs/                      # Documentation
```

### Supported Schema Types

The extension validates and provides specific recommendations for:

- Organization, Person, LocalBusiness
- Article, BlogPosting, NewsArticle
- Product, Offer, AggregateRating
- Event, WebSite, WebPage
- Recipe, HowTo, FAQPage
- BreadcrumbList, and more...

## 📊 Use Cases

### Screenshots

> **Coming Soon**: Screenshots will be added to showcase the extension's interface and features.

### For SEO Professionals
- Client website audits
- Competitive analysis
- Monthly reporting
- Implementation verification
- Training team members

### For Web Developers
- Debug schema during development
- Validate JSON-LD syntax
- Check required properties
- Test before deployment

### For Content Teams
- Ensure proper article schema
- Verify author and date markup
- Check FAQ/HowTo implementation
- Validate recipe structured data

## 🔒 Privacy & Security

- ✅ **Local Processing**: All schema extraction happens locally
- ✅ **No Tracking**: Extension doesn't track browsing activity
- ✅ **Secure Storage**: API keys stored in Chrome's secure storage
- ✅ **Direct API Calls**: No intermediary servers
- ✅ **Open Source**: Full transparency of code

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- Use the [Issues](https://github.com/jfontanez/Schema-Markup-Auditor-AI/issues) page
- Provide detailed description
- Include steps to reproduce
- Add screenshots if applicable

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Comment complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📝 Roadmap

Future enhancements planned:

- [ ] Historical tracking (compare schema changes over time)
- [ ] Bulk auditing (multiple URLs in sequence)
- [ ] Custom validation rules
- [ ] Schema generation with AI
- [ ] Rich results preview
- [ ] WordPress plugin integration
- [ ] Team collaboration features

## 🐛 Known Issues

Currently no major issues. Please report any bugs you find!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**José Fontánez**

- Professional SEO & Web Development Contractor
- Specialized in Technical SEO and Automation
- GitHub: [@jfontanez](https://github.com/jfontanez)

## 🙏 Acknowledgments

- Schema.org for structured data standards
- Google for Rich Results Test
- OpenAI, Anthropic, and Google for AI APIs
- Chrome Extensions community for best practices

## 📞 Support

For issues, questions, or suggestions:
- 🐛 **Issues**: [GitHub Issues](https://github.com/jfontanez/Schema-Markup-Auditor-AI/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jfontanez/Schema-Markup-Auditor-AI/discussions)

## ⭐ Star History

If you find this tool useful, please consider giving it a star!

---

<div align="center">

**Built with ❤️ for SEO professionals and web developers**

[Report Bug](https://github.com/jfontanez/Schema-Markup-Auditor-AI/issues) • [Request Feature](https://github.com/jfontanez/Schema-Markup-Auditor-AI/issues)

</div>
