export function encryptStringNami(text) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      // Perform XOR operation between the ASCII value of the character and the key
      const encryptedChar = String.fromCharCode(text.charCodeAt(i) ^ 2709);
      encryptedText += encryptedChar;
    }
    return encryptedText;
  }
 export function decryptStringNami(encryptedText) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
      // Perform XOR operation between the ASCII value of the character and the key
      const decryptedChar = String.fromCharCode(encryptedText.charCodeAt(i) ^ 2709);
      decryptedText += decryptedChar;
    }
    return decryptedText;
  }