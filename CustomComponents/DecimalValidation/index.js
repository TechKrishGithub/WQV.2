export const Validate=(text,myValue)=>
{
    const sanitizedText = text.replace(/^0+/, '');
        
    // Allow only one decimal point
    if (sanitizedText.indexOf('.') !== -1 && text.slice(-1) === '.') {
      // Check if the input already contains a second decimal point
      const decimalIndex = sanitizedText.indexOf('.');
      const secondDecimalIndex = sanitizedText.indexOf('.', decimalIndex + 1);
      
      if (secondDecimalIndex !== -1) {
        // If a second decimal point is found, do not update the input value
        return;
      }
  }
  myValue(text)
}