// Content script to extract schema markup from the page

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractSchema') {
    try {
      const schemaData = extractAllSchemas();
      sendResponse({ success: true, data: schemaData });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep the message channel open for async response
});

/**
 * Extract all schema markup from the page
 */
function extractAllSchemas() {
  const schemas = {
    jsonLd: extractJSONLD(),
    microdata: extractMicrodata(),
    rdfa: extractRDFa(),
    pageInfo: {
      url: window.location.href,
      title: document.title,
      description: getMetaContent('description'),
      timestamp: new Date().toISOString()
    }
  };

  return schemas;
}

/**
 * Extract JSON-LD schema markup
 */
function extractJSONLD() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const jsonLdData = [];

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent);
      jsonLdData.push({
        id: `jsonld-${index}`,
        type: getSchemaType(data),
        raw: script.textContent,
        parsed: data,
        element: getElementInfo(script)
      });
    } catch (error) {
      jsonLdData.push({
        id: `jsonld-${index}`,
        type: 'Invalid',
        raw: script.textContent,
        error: error.message,
        element: getElementInfo(script)
      });
    }
  });

  return jsonLdData;
}

/**
 * Extract Microdata schema markup
 */
function extractMicrodata() {
  const items = document.querySelectorAll('[itemscope]');
  const microdataItems = [];

  items.forEach((item, index) => {
    const itemData = extractMicrodataItem(item);
    microdataItems.push({
      id: `microdata-${index}`,
      type: item.getAttribute('itemtype') || 'Unknown',
      properties: itemData,
      element: getElementInfo(item)
    });
  });

  return microdataItems;
}

/**
 * Extract properties from a Microdata item
 */
function extractMicrodataItem(element) {
  const properties = {};
  const propertyElements = element.querySelectorAll('[itemprop]');

  propertyElements.forEach(prop => {
    const propName = prop.getAttribute('itemprop');
    let propValue;

    if (prop.hasAttribute('itemscope')) {
      propValue = extractMicrodataItem(prop);
    } else if (prop.hasAttribute('content')) {
      propValue = prop.getAttribute('content');
    } else if (prop.tagName === 'META') {
      propValue = prop.getAttribute('content');
    } else if (prop.tagName === 'A' || prop.tagName === 'LINK') {
      propValue = prop.getAttribute('href');
    } else if (prop.tagName === 'IMG') {
      propValue = prop.getAttribute('src');
    } else {
      propValue = prop.textContent.trim();
    }

    if (properties[propName]) {
      if (Array.isArray(properties[propName])) {
        properties[propName].push(propValue);
      } else {
        properties[propName] = [properties[propName], propValue];
      }
    } else {
      properties[propName] = propValue;
    }
  });

  return properties;
}

/**
 * Extract RDFa schema markup
 */
function extractRDFa() {
  const rdfaElements = document.querySelectorAll('[typeof], [property], [vocab]');
  const rdfaItems = [];
  const processedElements = new Set();

  rdfaElements.forEach((element, index) => {
    // Skip if already processed as part of a parent
    if (processedElements.has(element)) return;

    const typeof_ = element.getAttribute('typeof');
    if (typeof_) {
      const properties = extractRDFaProperties(element, processedElements);
      rdfaItems.push({
        id: `rdfa-${index}`,
        type: typeof_,
        properties: properties,
        element: getElementInfo(element)
      });
    }
  });

  return rdfaItems;
}

/**
 * Extract properties from an RDFa element
 */
function extractRDFaProperties(element, processedElements) {
  const properties = {};
  const propertyElements = element.querySelectorAll('[property]');

  propertyElements.forEach(prop => {
    processedElements.add(prop);
    const propName = prop.getAttribute('property');
    let propValue;

    if (prop.hasAttribute('typeof')) {
      propValue = extractRDFaProperties(prop, processedElements);
    } else if (prop.hasAttribute('content')) {
      propValue = prop.getAttribute('content');
    } else if (prop.tagName === 'A') {
      propValue = prop.getAttribute('href');
    } else if (prop.tagName === 'IMG') {
      propValue = prop.getAttribute('src');
    } else {
      propValue = prop.textContent.trim();
    }

    if (properties[propName]) {
      if (Array.isArray(properties[propName])) {
        properties[propName].push(propValue);
      } else {
        properties[propName] = [properties[propName], propValue];
      }
    } else {
      properties[propName] = propValue;
    }
  });

  return properties;
}

/**
 * Get schema type from JSON-LD data
 */
function getSchemaType(data) {
  if (Array.isArray(data)) {
    return data.map(item => item['@type']).filter(Boolean).join(', ') || 'Multiple';
  }
  return data['@type'] || 'Unknown';
}

/**
 * Get element information for debugging
 */
function getElementInfo(element) {
  return {
    tagName: element.tagName,
    className: element.className,
    id: element.id,
    xpath: getXPath(element)
  };
}

/**
 * Get XPath for an element
 */
function getXPath(element) {
  if (element.id !== '') {
    return 'id("' + element.id + '")';
  }
  if (element === document.body) {
    return '/html/body';
  }

  let ix = 0;
  const siblings = element.parentNode?.childNodes || [];
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

/**
 * Get meta tag content
 */
function getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"], meta[property="og:${name}"]`);
  return meta ? meta.getAttribute('content') : '';
}
