export default function hexToRGBA(hex, opacity) {
    // Remove the "#" if it's present in the hex color
    const sanitizedHex = hex.replace('#', '');
  
    // Parse the hex color into RGB components
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);
  
    // Return the RGBA string with the opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }