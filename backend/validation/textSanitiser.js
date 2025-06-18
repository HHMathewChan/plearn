/**
 * Sanitises the input text by removing unwanted characters and whitespace.
 * @param {string} text - The text to sanitise.
 * @returns {string} - The sanitised text.
 */
const sanitiseText = (text) => {
  
  // Remove leading/trailing whitespace
  let cleanedText = text.trim();
  
  // Replace multiple spaces with single space
  cleanedText = cleanedText.replace(/\s+/g, ' ');
  
  // Remove zero-width characters and other invisible characters
  cleanedText = cleanedText.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
  
  // Check for non-Latin characters that might look like Latin
  const suspiciousChars = cleanedText.match(/[а-я А-Я]/g); // Cyrillic that looks like Latin
  if (suspiciousChars) {
    console.warn('Suspicious characters detected (possible Cyrillic):', suspiciousChars);
  }
  
  return cleanedText;
};

module.exports = {
  sanitiseText
};