// Popup script - Main application logic

let currentSchemaData = null;
let currentAnalysis = null;

// DOM elements
const mainView = document.getElementById('mainView');
const settingsView = document.getElementById('settingsView');
const resultsView = document.getElementById('resultsView');
const loadingState = document.getElementById('loadingState');

// Buttons
const auditBtn = document.getElementById('auditBtn');
const settingsBtn = document.getElementById('settingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const closeResultsBtn = document.getElementById('closeResultsBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const testApiBtn = document.getElementById('testApiBtn');
const exportBtn = document.getElementById('exportBtn');
const getAiRecommendationsBtn = document.getElementById('getAiRecommendationsBtn');
const goToSettingsBtn = document.getElementById('goToSettingsBtn');

// Filters
const schemaTypeFilter = document.getElementById('schemaTypeFilter');
const schemaFormatFilter = document.getElementById('schemaFormatFilter');

// Settings inputs
const aiProviderSelect = document.getElementById('aiProvider');
const apiKeyInput = document.getElementById('apiKey');
const modelSelectInput = document.getElementById('modelSelect');
const settingsMessage = document.getElementById('settingsMessage');

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
  loadSettings();
  attachEventListeners();
}

function attachEventListeners() {
  auditBtn.addEventListener('click', startAudit);
  settingsBtn.addEventListener('click', () => showView('settings'));
  closeSettingsBtn.addEventListener('click', () => showView('main'));
  closeResultsBtn.addEventListener('click', () => showView('main'));
  saveSettingsBtn.addEventListener('click', saveSettings);
  testApiBtn.addEventListener('click', testApiConnection);
  exportBtn.addEventListener('click', exportReport);
  getAiRecommendationsBtn.addEventListener('click', getAIRecommendations);
  goToSettingsBtn.addEventListener('click', () => showView('settings'));

  // Filters
  if (schemaTypeFilter) {
    schemaTypeFilter.addEventListener('change', applyFilters);
  }
  if (schemaFormatFilter) {
    schemaFormatFilter.addEventListener('change', applyFilters);
  }

  // About link
  const aboutLink = document.getElementById('aboutLink');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Schema Markup Auditor v1.0.0\n\nDeveloped by José Fontánez\n\nA professional tool for auditing and analyzing structured data on web pages with AI-powered recommendations.');
    });
  }

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}

/**
 * Show different views
 */
function showView(view) {
  mainView.classList.add('hidden');
  settingsView.classList.add('hidden');
  resultsView.classList.add('hidden');
  loadingState.classList.add('hidden');

  switch(view) {
    case 'settings':
      settingsView.classList.remove('hidden');
      break;
    case 'results':
      mainView.classList.remove('hidden');
      resultsView.classList.remove('hidden');
      break;
    case 'loading':
      mainView.classList.remove('hidden');
      loadingState.classList.remove('hidden');
      break;
    default:
      mainView.classList.remove('hidden');
  }
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
  tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
  const activeContent = document.getElementById(`${tabName}Tab`);

  if (activeBtn && activeContent) {
    activeBtn.classList.add('active');
    activeContent.classList.add('active');
  }
}

/**
 * Start schema audit
 */
async function startAudit() {
  showView('loading');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractSchema' });

    if (response.success) {
      currentSchemaData = response.data;
      currentAnalysis = analyzeSchemaData(currentSchemaData);
      displayResults(currentAnalysis);
      showView('results');
    } else {
      throw new Error(response.error || 'Failed to extract schema');
    }
  } catch (error) {
    console.error('Audit error:', error);
    alert('Error auditing page: ' + error.message);
    showView('main');
  }
}

/**
 * Analyze extracted schema data
 */
function analyzeSchemaData(data) {
  const analysis = {
    totalSchemas: 0,
    schemasByType: {},
    issues: [],
    warnings: [],
    schemas: []
  };

  // Analyze JSON-LD
  data.jsonLd.forEach(schema => {
    analysis.totalSchemas++;
    
    const schemaInfo = {
      id: schema.id,
      format: 'JSON-LD',
      type: schema.type,
      raw: schema.raw,
      parsed: schema.parsed,
      element: schema.element
    };

    if (schema.error) {
      analysis.issues.push({
        severity: 'error',
        schema: schema.id,
        title: 'Invalid JSON-LD Syntax',
        description: schema.error
      });
      schemaInfo.hasError = true;
    } else {
      // Validate JSON-LD
      const validation = validateJSONLD(schema.parsed);
      schemaInfo.validation = validation;
      analysis.issues.push(...validation.errors);
      analysis.warnings.push(...validation.warnings);
    }

    analysis.schemas.push(schemaInfo);
    analysis.schemasByType[schema.type] = (analysis.schemasByType[schema.type] || 0) + 1;
  });

  // Analyze Microdata
  data.microdata.forEach(schema => {
    analysis.totalSchemas++;
    
    const schemaInfo = {
      id: schema.id,
      format: 'Microdata',
      type: schema.type,
      properties: schema.properties,
      element: schema.element
    };

    // Validate Microdata
    const validation = validateMicrodata(schema);
    schemaInfo.validation = validation;
    analysis.issues.push(...validation.errors);
    analysis.warnings.push(...validation.warnings);

    analysis.schemas.push(schemaInfo);
    analysis.schemasByType[schema.type] = (analysis.schemasByType[schema.type] || 0) + 1;
  });

  // Analyze RDFa
  data.rdfa.forEach(schema => {
    analysis.totalSchemas++;
    
    const schemaInfo = {
      id: schema.id,
      format: 'RDFa',
      type: schema.type,
      properties: schema.properties,
      element: schema.element
    };

    // Validate RDFa
    const validation = validateRDFa(schema);
    schemaInfo.validation = validation;
    analysis.issues.push(...validation.errors);
    analysis.warnings.push(...validation.warnings);

    analysis.schemas.push(schemaInfo);
    analysis.schemasByType[schema.type] = (analysis.schemasByType[schema.type] || 0) + 1;
  });

  return analysis;
}

/**
 * Validate JSON-LD schema
 */
function validateJSONLD(data) {
  const errors = [];
  const warnings = [];

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const itemValidation = validateSchemaItem(item, `[${index}]`);
      errors.push(...itemValidation.errors);
      warnings.push(...itemValidation.warnings);
    });
  } else {
    const itemValidation = validateSchemaItem(data, '');
    errors.push(...itemValidation.errors);
    warnings.push(...itemValidation.warnings);
  }

  return { errors, warnings };
}

/**
 * Validate individual schema item
 */
function validateSchemaItem(item, path = '') {
  const errors = [];
  const warnings = [];

  // Check for @context
  if (!item['@context']) {
    warnings.push({
      severity: 'warning',
      title: 'Missing @context',
      description: `Schema${path} is missing @context property. This may cause validation issues.`
    });
  }

  // Check for @type
  if (!item['@type']) {
    errors.push({
      severity: 'error',
      title: 'Missing @type',
      description: `Schema${path} is missing required @type property.`
    });
  }

  // Check for common required fields based on schema type
  const type = item['@type'];
  if (type) {
    const requiredFields = getRequiredFields(type);
    requiredFields.forEach(field => {
      if (!item[field]) {
        warnings.push({
          severity: 'warning',
          title: `Missing recommended property: ${field}`,
          description: `${type} schema${path} should include "${field}" property.`
        });
      }
    });
  }

  return { errors, warnings };
}

/**
 * Get required fields for common schema types
 */
function getRequiredFields(type) {
  const requirements = {
    'Organization': ['name', 'url'],
    'Person': ['name'],
    'Article': ['headline', 'author', 'datePublished'],
    'NewsArticle': ['headline', 'author', 'datePublished'],
    'BlogPosting': ['headline', 'author', 'datePublished'],
    'Product': ['name', 'image', 'description'],
    'Event': ['name', 'startDate', 'location'],
    'Recipe': ['name', 'recipeIngredient', 'recipeInstructions'],
    'LocalBusiness': ['name', 'address'],
    'WebSite': ['name', 'url'],
    'WebPage': ['name', 'url'],
    'BreadcrumbList': ['itemListElement'],
    'FAQPage': ['mainEntity'],
    'HowTo': ['name', 'step']
  };

  return requirements[type] || [];
}

/**
 * Validate Microdata schema
 */
function validateMicrodata(schema) {
  const errors = [];
  const warnings = [];

  if (!schema.type || schema.type === 'Unknown') {
    errors.push({
      severity: 'error',
      title: 'Missing itemtype',
      description: 'Microdata item is missing itemtype attribute.'
    });
  }

  if (Object.keys(schema.properties).length === 0) {
    warnings.push({
      severity: 'warning',
      title: 'No properties found',
      description: 'Microdata item has no itemprop properties.'
    });
  }

  return { errors, warnings };
}

/**
 * Validate RDFa schema
 */
function validateRDFa(schema) {
  const errors = [];
  const warnings = [];

  if (!schema.type) {
    errors.push({
      severity: 'error',
      title: 'Missing typeof',
      description: 'RDFa item is missing typeof attribute.'
    });
  }

  if (Object.keys(schema.properties).length === 0) {
    warnings.push({
      severity: 'warning',
      title: 'No properties found',
      description: 'RDFa item has no property attributes.'
    });
  }

  return { errors, warnings };
}

/**
 * Display analysis results
 */
function displayResults(analysis) {
  // Update summary stats
  document.getElementById('totalSchemas').textContent = analysis.totalSchemas;
  document.getElementById('issuesCount').textContent = analysis.issues.length;
  document.getElementById('warningsCount').textContent = analysis.warnings.length;

  // Display schemas
  displaySchemas(analysis.schemas);

  // Display issues
  displayIssues([...analysis.issues, ...analysis.warnings]);

  // Check AI configuration
  checkAIConfiguration();
}

/**
 * Display schemas in the UI
 */
function displaySchemas(schemas) {
  const schemasList = document.getElementById('schemasList');
  schemasList.innerHTML = '';

  if (schemas.length === 0) {
    schemasList.innerHTML = '<div class="empty-state">No schema markup found on this page.</div>';
    return;
  }

  // Populate filter dropdowns
  populateSchemaFilters(schemas);

  // Store schemas globally for filtering
  window.allSchemas = schemas;

  // Display schemas
  renderSchemas(schemas);
}

/**
 * Populate schema type filter dropdown
 */
function populateSchemaFilters(schemas) {
  const typeFilter = document.getElementById('schemaTypeFilter');
  if (!typeFilter) return;

  // Get unique schema types
  const types = [...new Set(schemas.map(s => s.type))].sort();
  
  // Clear existing options except "All"
  typeFilter.innerHTML = '<option value="all">All Schema Types</option>';
  
  // Add type options
  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}

/**
 * Apply filters to schema display
 */
function applyFilters() {
  const typeFilter = document.getElementById('schemaTypeFilter');
  const formatFilter = document.getElementById('schemaFormatFilter');
  
  const selectedType = typeFilter ? typeFilter.value : 'all';
  const selectedFormat = formatFilter ? formatFilter.value : 'all';

  let filtered = window.allSchemas || [];

  // Filter by type
  if (selectedType !== 'all') {
    filtered = filtered.filter(s => s.type === selectedType);
  }

  // Filter by format
  if (selectedFormat !== 'all') {
    filtered = filtered.filter(s => s.format.toLowerCase().replace(/[^a-z]/g, '') === selectedFormat.replace('-', ''));
  }

  renderSchemas(filtered);
}

/**
 * Render schemas to the DOM
 */
function renderSchemas(schemas) {
  const schemasList = document.getElementById('schemasList');
  schemasList.innerHTML = '';

  if (schemas.length === 0) {
    schemasList.innerHTML = '<div class="empty-state">No schemas match the selected filters.</div>';
    return;
  }

  // Store code content for each schema
  window.schemaCodeStore = {};

  schemas.forEach((schema, index) => {
    const schemaItem = document.createElement('div');
    schemaItem.className = 'schema-item collapsed';
    schemaItem.dataset.schemaId = schema.id;

    const formatClass = schema.format.toLowerCase().replace(/[^a-z]/g, '');
    
    // Build properties display
    let propertiesHtml = '';
    if (schema.properties) {
      propertiesHtml = buildPropertiesHtml(schema.properties);
    } else if (schema.parsed) {
      propertiesHtml = buildPropertiesHtml(schema.parsed);
    }

    // Build code content
    let codeContent = '';
    if (schema.format === 'JSON-LD') {
      codeContent = schema.raw || JSON.stringify(schema.parsed, null, 2);
    } else {
      codeContent = JSON.stringify(schema.properties || schema.parsed, null, 2);
    }

    // Store code content
    window.schemaCodeStore[schema.id] = codeContent;

    // Count properties
    let propertyCount = 0;
    if (schema.properties) {
      propertyCount = Object.keys(schema.properties).length;
    } else if (schema.parsed && typeof schema.parsed === 'object') {
      propertyCount = Object.keys(schema.parsed).length;
    }

    schemaItem.innerHTML = `
      <div class="schema-header" data-schema-id="${schema.id}">
        <div class="schema-header-left">
          <div class="schema-type">${escapeHtml(schema.type)}</div>
          <div class="schema-meta">
            <span class="schema-format ${formatClass}">${schema.format}</span>
            <span class="schema-property-count">${propertyCount} ${propertyCount === 1 ? 'property' : 'properties'}</span>
          </div>
        </div>
        <div class="schema-expand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
      <div class="schema-body">
        ${propertiesHtml ? `
          <div class="schema-properties">
            <h4>Properties</h4>
            <div class="property-list">
              ${propertiesHtml}
            </div>
          </div>
        ` : ''}
        <div class="schema-code">
          <pre>${escapeHtml(codeContent)}</pre>
        </div>
        <div class="schema-actions">
          <button class="secondary-btn copy-schema-btn" data-schema-ref="${schema.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            Copy Code
          </button>
          <button class="secondary-btn view-json-btn" data-schema-ref="${schema.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View Raw
          </button>
        </div>
        <div class="schema-validators">
          <button class="validator-btn google-validator" data-schema-ref="${schema.id}" title="Validate with Google Rich Results Test">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            Google Test
          </button>
          <button class="validator-btn schema-validator" data-schema-ref="${schema.id}" title="Validate with Schema.org Validator">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Schema.org
          </button>
        </div>
      </div>
    `;

    schemasList.appendChild(schemaItem);
  });

  // Add click handlers for expand/collapse
  document.querySelectorAll('.schema-header').forEach(header => {
    header.addEventListener('click', function() {
      const schemaItem = this.closest('.schema-item');
      schemaItem.classList.toggle('collapsed');
    });
  });

  // Add copy functionality
  document.querySelectorAll('.copy-schema-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const schemaId = e.currentTarget.dataset.schemaRef;
      const code = window.schemaCodeStore[schemaId];
      
      if (code) {
        navigator.clipboard.writeText(code);
        const originalText = e.currentTarget.innerHTML;
        e.currentTarget.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Copied!
        `;
        setTimeout(() => {
          e.currentTarget.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  // Add view raw functionality
  document.querySelectorAll('.view-json-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const schemaId = e.currentTarget.dataset.schemaRef;
      const code = window.schemaCodeStore[schemaId];
      
      if (code) {
        // Open in new window
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        newWindow.document.write(`
          <html>
            <head>
              <title>Schema Raw Data</title>
              <style>
                body { 
                  font-family: 'Courier New', monospace; 
                  padding: 20px; 
                  background: #1a1a1a; 
                  color: #10b981; 
                  margin: 0;
                }
                pre { 
                  white-space: pre-wrap; 
                  word-wrap: break-word;
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.5;
                }
                .header {
                  background: #2563eb;
                  color: white;
                  padding: 16px 20px;
                  margin: -20px -20px 20px -20px;
                  border-bottom: 2px solid #10b981;
                }
                .header h1 {
                  margin: 0;
                  font-size: 18px;
                  font-weight: 600;
                }
                .copy-btn {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 8px 16px;
                  background: #10b981;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-size: 13px;
                  font-weight: 500;
                }
                .copy-btn:hover {
                  background: #059669;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Schema Markup - Raw Data</h1>
              </div>
              <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('pre').textContent); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy All', 1500)">Copy All</button>
              <pre>${escapeHtml(code)}</pre>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    });
  });

  // Add Google validator functionality
  document.querySelectorAll('.google-validator').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const schemaId = e.currentTarget.dataset.schemaRef;
      const code = window.schemaCodeStore[schemaId];
      
      if (code) {
        try {
          // Get current page URL
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          const pageUrl = tab.url;
          
          // Open Google Rich Results Test with the URL
          const googleTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(pageUrl)}`;
          window.open(googleTestUrl, '_blank');
        } catch (error) {
          console.error('Error opening Google validator:', error);
          alert('Error opening Google Rich Results Test. Please try again.');
        }
      }
    });
  });

  // Add Schema.org validator functionality
  document.querySelectorAll('.schema-validator').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const schemaId = e.currentTarget.dataset.schemaRef;
      const code = window.schemaCodeStore[schemaId];
      
      if (code) {
        // Create a form to POST the schema code to the validator
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://validator.schema.org/';
        form.target = '_blank';
        
        const input = document.createElement('textarea');
        input.name = 'code';
        input.value = code;
        form.appendChild(input);
        
        const levelInput = document.createElement('input');
        levelInput.type = 'hidden';
        levelInput.name = 'level';
        levelInput.value = 'on';
        form.appendChild(levelInput);
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      }
    });
  });
}

/**
 * Build HTML for properties display
 */
function buildPropertiesHtml(properties, level = 0) {
  if (!properties || typeof properties !== 'object') {
    return '';
  }

  let html = '';
  const indent = level > 0 ? 'style="margin-left: ' + (level * 16) + 'px;"' : '';

  for (const [key, value] of Object.entries(properties)) {
    // Skip internal properties
    if (key.startsWith('@')) continue;

    let displayValue = '';
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      displayValue = '<span class="property-value nested">[Object]</span>';
    } else if (Array.isArray(value)) {
      displayValue = `<span class="property-value nested">[Array of ${value.length}]</span>`;
    } else {
      const valueStr = String(value);
      displayValue = `<span class="property-value">${escapeHtml(valueStr.length > 100 ? valueStr.substring(0, 100) + '...' : valueStr)}</span>`;
    }

    html += `
      <div class="property-item" ${indent}>
        <span class="property-name">${escapeHtml(key)}:</span>
        ${displayValue}
      </div>
    `;
  }

  return html;
}

/**
 * Display issues and warnings
 */
function displayIssues(issues) {
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  if (issues.length === 0) {
    issuesList.innerHTML = '<div class="empty-state">✓ No issues found! Your schema markup looks good.</div>';
    return;
  }

  issues.forEach(issue => {
    const issueItem = document.createElement('div');
    issueItem.className = `issue-item ${issue.severity}`;

    issueItem.innerHTML = `
      <div class="issue-header">
        <span class="issue-severity">${issue.severity}</span>
        <span class="issue-title">${escapeHtml(issue.title)}</span>
      </div>
      <div class="issue-description">${escapeHtml(issue.description)}</div>
    `;

    issuesList.appendChild(issueItem);
  });
}

/**
 * Check if AI is configured
 */
async function checkAIConfiguration() {
  const settings = await chrome.storage.local.get(['aiProvider', 'apiKey']);
  const aiContent = document.getElementById('aiRecommendations');
  
  if (settings.aiProvider && settings.apiKey) {
    aiContent.querySelector('.ai-config-notice').classList.add('hidden');
    getAiRecommendationsBtn.classList.remove('hidden');
  } else {
    aiContent.querySelector('.ai-config-notice').classList.remove('hidden');
    getAiRecommendationsBtn.classList.add('hidden');
  }
}

/**
 * Get AI recommendations
 */
async function getAIRecommendations() {
  const aiContentDiv = document.getElementById('aiContent');
  aiContentDiv.innerHTML = '<div class="ai-loading"><div class="spinner"></div><span>Getting AI recommendations...</span></div>';

  try {
    const settings = await chrome.storage.local.get(['aiProvider', 'apiKey', 'model']);
    
    if (!settings.aiProvider || !settings.apiKey) {
      throw new Error('AI provider or API key not configured');
    }

    const prompt = buildAIPrompt(currentSchemaData, currentAnalysis);
    const recommendations = await callAI(settings, prompt);

    aiContentDiv.innerHTML = `<div class="ai-content">${formatAIResponse(recommendations)}</div>`;
  } catch (error) {
    aiContentDiv.innerHTML = `<div class="ai-error">Error getting recommendations: ${escapeHtml(error.message)}</div>`;
  }
}

/**
 * Build prompt for AI
 */
function buildAIPrompt(schemaData, analysis) {
  const pageUrl = schemaData.pageInfo.url;
  const pageTitle = schemaData.pageInfo.title;
  
  let prompt = `You are a Schema.org structured data expert. Analyze the following webpage and its existing schema markup, then provide specific recommendations for improvements.\n\n`;
  
  prompt += `Page Information:\n`;
  prompt += `- URL: ${pageUrl}\n`;
  prompt += `- Title: ${pageTitle}\n\n`;
  
  prompt += `Current Schema Markup Summary:\n`;
  prompt += `- Total schemas found: ${analysis.totalSchemas}\n`;
  prompt += `- Schema types: ${Object.keys(analysis.schemasByType).join(', ')}\n`;
  prompt += `- Issues found: ${analysis.issues.length}\n`;
  prompt += `- Warnings: ${analysis.warnings.length}\n\n`;

  if (analysis.schemas.length > 0) {
    prompt += `Existing Schemas:\n`;
    analysis.schemas.forEach(schema => {
      prompt += `- ${schema.type} (${schema.format})\n`;
    });
    prompt += `\n`;
  }

  prompt += `Please provide:\n`;
  prompt += `1. An assessment of the current schema implementation\n`;
  prompt += `2. Specific recommendations for missing or incomplete schema types that would benefit this page\n`;
  prompt += `3. Suggestions for improving existing schema markup\n`;
  prompt += `4. Best practices this page should follow\n\n`;
  
  prompt += `Format your response in clear sections with specific, actionable recommendations.`;

  return prompt;
}

/**
 * Call AI API
 */
async function callAI(settings, prompt) {
  const { aiProvider, apiKey, model } = settings;

  switch (aiProvider) {
    case 'openai':
      return await callOpenAI(apiKey, model, prompt);
    case 'anthropic':
      return await callAnthropic(apiKey, model, prompt);
    case 'google':
      return await callGoogle(apiKey, model, prompt);
    default:
      throw new Error('Unknown AI provider');
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAI(apiKey, model, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a Schema.org structured data expert.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Call Anthropic API
 */
async function callAnthropic(apiKey, model, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model || 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API request failed');
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * Call Google Gemini API
 */
async function callGoogle(apiKey, model, prompt) {
  const modelName = model || 'gemini-pro';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Google API request failed');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Format AI response for display
 */
function formatAIResponse(response) {
  // Convert markdown-style formatting to HTML
  let formatted = response
    .replace(/### (.*?)$/gm, '<h4>$1</h4>')
    .replace(/## (.*?)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n- /g, '<li>')
    .replace(/<li>/g, '</p><ul><li>')
    .replace(/<\/li>(?!<li>)/g, '</li></ul><p>');

  return `<p>${formatted}</p>`;
}

/**
 * Export report
 */
function exportReport() {
  if (!currentAnalysis) return;

  const report = {
    generatedAt: new Date().toISOString(),
    pageInfo: currentSchemaData.pageInfo,
    summary: {
      totalSchemas: currentAnalysis.totalSchemas,
      schemasByType: currentAnalysis.schemasByType,
      issuesCount: currentAnalysis.issues.length,
      warningsCount: currentAnalysis.warnings.length
    },
    schemas: currentAnalysis.schemas,
    issues: [...currentAnalysis.issues, ...currentAnalysis.warnings]
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `schema-audit-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  const settings = await chrome.storage.local.get(['aiProvider', 'apiKey', 'model']);
  
  if (settings.aiProvider) {
    aiProviderSelect.value = settings.aiProvider;
  }
  if (settings.apiKey) {
    apiKeyInput.value = settings.apiKey;
  }
  if (settings.model) {
    modelSelectInput.value = settings.model;
  }
}

/**
 * Save settings to storage
 */
async function saveSettings() {
  const settings = {
    aiProvider: aiProviderSelect.value,
    apiKey: apiKeyInput.value,
    model: modelSelectInput.value
  };

  await chrome.storage.local.set(settings);
  
  showSettingsMessage('Settings saved successfully!', 'success');
  
  setTimeout(() => {
    showView('main');
  }, 1500);
}

/**
 * Test API connection
 */
async function testApiConnection() {
  const provider = aiProviderSelect.value;
  const apiKey = apiKeyInput.value;
  const model = modelSelectInput.value;

  if (!provider || !apiKey) {
    showSettingsMessage('Please select a provider and enter an API key', 'error');
    return;
  }

  showSettingsMessage('Testing connection...', 'info');

  try {
    const testPrompt = 'Respond with "Connection successful" if you receive this message.';
    await callAI({ aiProvider: provider, apiKey, model }, testPrompt);
    showSettingsMessage('Connection successful! ✓', 'success');
  } catch (error) {
    showSettingsMessage('Connection failed: ' + error.message, 'error');
  }
}

/**
 * Show settings message
 */
function showSettingsMessage(message, type) {
  settingsMessage.textContent = message;
  settingsMessage.className = `settings-message ${type}`;
  settingsMessage.classList.remove('hidden');

  if (type === 'success') {
    setTimeout(() => {
      settingsMessage.classList.add('hidden');
    }, 3000);
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
