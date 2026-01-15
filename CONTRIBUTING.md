# Contributing to Schema Markup Auditor

Thank you for your interest in contributing to Schema Markup Auditor! 🎉

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Code Guidelines](#code-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

## How to Contribute

### Reporting Bugs

1. **Check existing issues** - Someone might have already reported it
2. **Create a detailed bug report** including:
   - Clear, descriptive title
   - Steps to reproduce the behavior
   - Expected vs actual results
   - Screenshots (if applicable)
   - Chrome version and operating system
   - Extension version

### Suggesting Features

1. **Check existing feature requests** in [Issues](../../issues?q=is%3Aissue+label%3Aenhancement)
2. **Create a new issue** with label "enhancement"
3. **Describe the feature** clearly:
   - What problem does it solve?
   - How would it work?
   - What are the benefits?
   - Are there any alternatives?

### Improving Documentation

Documentation improvements are always welcome! This includes:
- README updates
- Code comments
- API documentation
- Usage examples
- Fixing typos

## Development Setup

### Prerequisites

- Google Chrome (latest version)
- Git
- A code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of JavaScript, HTML, and CSS

### Installation

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/jfontanez/Schema-Markup-Auditor-AI.git
   cd Schema-Markup-Auditor-AI
   ```

3. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the cloned folder

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

### Project Structure

```
schema-markup-auditor/
├── css/
│   └── popup.css          # All styles
├── js/
│   ├── popup.js           # Main application logic
│   ├── content.js         # Schema extraction from pages
│   └── background.js      # Service worker
├── icons/                 # Extension icons
├── manifest.json          # Extension configuration
└── popup.html             # Main UI
```

## Code Guidelines

### JavaScript

- **Use vanilla JavaScript** - No frameworks or libraries
- **ES6+ syntax** - Use modern JavaScript features
- **Descriptive names** - Variables and functions should be self-documenting
- **Comments** - Explain complex logic, not obvious code
- **Error handling** - Always handle potential errors with try-catch
- **Async/await** - Prefer async/await over callbacks

**Example:**
```javascript
/**
 * Extract schema markup from the current page
 * @returns {Object} Schema data organized by format
 */
async function extractSchemas() {
  try {
    const jsonLd = extractJSONLD();
    const microdata = extractMicrodata();
    return { jsonLd, microdata };
  } catch (error) {
    console.error('Schema extraction failed:', error);
    return null;
  }
}
```

### CSS

- **CSS Variables** - Use existing CSS variables for consistency
- **BEM Naming** - Follow Block__Element--Modifier convention (loosely)
- **Mobile-first** - Although this is a desktop extension, keep it responsive
- **Comments** - Group related styles with comments

**Example:**
```css
/* Schema Item Cards */
.schema-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.schema-item:hover {
  border-color: var(--primary-color);
}
```

### HTML

- **Semantic HTML** - Use appropriate tags
- **Accessibility** - Add ARIA labels where needed
- **Valid markup** - Keep HTML valid and well-formed

## Testing

Before submitting a pull request, test your changes thoroughly:

### Manual Testing Checklist

- [ ] Extension loads without errors in Chrome
- [ ] All existing features still work
- [ ] New feature works as expected
- [ ] Test on different websites:
  - [ ] Site with JSON-LD
  - [ ] Site with Microdata
  - [ ] Site with RDFa
  - [ ] Site with no schema
  - [ ] Site with multiple schemas
- [ ] Test edge cases and error scenarios
- [ ] No console errors or warnings
- [ ] UI is responsive and looks good
- [ ] All buttons and interactions work

### Test Sites

Good sites for testing:
- https://schema.org/ (examples of all types)
- https://developers.google.com/search/docs/appearance/structured-data
- Major e-commerce sites (Amazon, eBay)
- News sites (CNN, BBC)
- Recipe sites (AllRecipes)

## Pull Request Process

### Before Submitting

1. **Update documentation** - If you changed functionality
2. **Test thoroughly** - Follow the testing checklist
3. **Check code style** - Make sure it matches existing code
4. **Commit messages** - Use clear, descriptive commit messages

### Commit Message Format

```
Type: Brief description

More detailed explanation (optional)

Fixes #123
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style/formatting (no functional changes)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: Add filter by schema format

Added dropdown to filter schemas by JSON-LD, Microdata, or RDFa.
Users can now focus on specific markup formats.

Closes #42
```

```
fix: Schema code copy not working

Fixed issue where escapeHtml() was preventing code from being
copied correctly. Now stores code in memory instead of HTML attributes.

Fixes #67
```

### Submitting the PR

1. **Push your branch** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues
   - Add screenshots for UI changes

3. **Respond to feedback** - Address any review comments promptly

4. **Keep it updated** - Rebase if main branch has changed
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

## Code of Conduct

### Our Standards

- **Be respectful** - Treat everyone with respect and kindness
- **Be collaborative** - Work together, help each other
- **Be inclusive** - Welcome people of all backgrounds
- **Be constructive** - Provide helpful, actionable feedback
- **Be patient** - Remember everyone was a beginner once

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Publishing others' private information
- Any unprofessional conduct

### Enforcement

Instances of unacceptable behavior may result in:
- Warning
- Temporary ban from project
- Permanent ban from project

Report issues to: [Your Email]

## Questions?

- **General questions**: Use [GitHub Discussions](../../discussions)
- **Bug reports**: Open an [Issue](../../issues/new?template=bug_report.md)
- **Feature requests**: Open an [Issue](../../issues/new?template=feature_request.md)
- **Security issues**: Email [Your Email] directly

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes for significant contributions
- Special thanks in project documentation

## Thank You! 🙏

Every contribution, no matter how small, is valuable and appreciated. Together we can make this tool better for the entire SEO and web development community!

---

**Happy coding!** 🚀
