const sanitizeName = (name) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  
  // Remove leading/trailing whitespace
  let cleaned = name.trim();
  
  // Replace multiple spaces with single space
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  // Remove zero-width characters and other invisible characters
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
  
  // Check for non-Latin characters that might look like Latin
  const suspiciousChars = cleaned.match(/[а-я А-Я]/g); // Cyrillic that looks like Latin
  if (suspiciousChars) {
    console.warn('Suspicious characters detected (possible Cyrillic):', suspiciousChars);
  }
  
  return cleaned;
};

const validateName = (name) => {
  const cleaned = sanitizeName(name);
  
  // Test against your domain regex
  const isValid = /^[A-Za-z][A-Za-z ]*$/.test(cleaned);
  
  if (!isValid) {
    const invalidChars = cleaned.match(/[^A-Za-z ]/g);
    throw new Error(`Invalid characters in name: ${invalidChars ? invalidChars.join(', ') : 'unknown'}`);
  }
  
  return cleaned;
};

module.exports = {
  sanitizeName,
  validateName
};