/**
 * Sanitises the input text by removing unwanted characters and whitespace.
 * @param {string} text - The text to sanitise.
 * @returns {string} - The sanitised text.
 */
const sanitiseText = (text) => {
  console.log('Original input:', JSON.stringify(text), `(length: ${text.length})`);
  
  // Remove leading/trailing whitespace
  let cleanedText = text.trim();
  console.log('After trim:', JSON.stringify(cleanedText), `(length: ${cleanedText.length})`);
  
  // Replace multiple spaces with single space
  cleanedText = cleanedText.replace(/\s+/g, ' ');
  console.log('After space replacement:', JSON.stringify(cleanedText), `(length: ${cleanedText.length})`);
  
  // Remove zero-width characters and other invisible characters
  cleanedText = cleanedText.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '');
  console.log('After invisible char removal:', JSON.stringify(cleanedText), `(length: ${cleanedText.length})`);
  
  // Check for non-Latin characters that might look like Latin
  const suspiciousChars = cleanedText.match(/[а-я А-Я]/g);
  if (suspiciousChars) {
    console.warn('Suspicious characters detected (possible Cyrillic):', suspiciousChars);
  }
  
  if (cleanedText.length === 0) {
    console.warn('Sanitised text is empty.');
  }

  return cleanedText;
};

module.exports = {
  sanitiseText
};