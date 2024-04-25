// colorUtils.ts
import { Paint } from './types'; // Assuming you have a types file for TypeScript types
import chroma from 'chroma-js';

function suggestHighlightShadow(baseHex: string | undefined) {
  if (!baseHex) {
    return { highlight: '', shadow: '' };
  }
  const baseColor = chroma(baseHex);
  const highlight = baseColor.brighten(1).saturate(0.5).hex();
  const shadow = baseColor.darken(1.5).desaturate(0.5).hex();

  return { highlight, shadow };
}


const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const colorDifference = (hex1: string, hex2: string): number => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return Math.sqrt(Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2));
};

const findClosestPaint = (hexCode: string, paints: Paint[]): Paint | null => {
  let minDifference = Number.MAX_VALUE;
  let closest = null;

  paints.forEach(paint => {
    const difference = colorDifference(hexCode, paint.hexCode);
    if (difference < minDifference) {
      minDifference = difference;
      closest = paint;
    }
  });

  return closest;
};

const getTextColorBasedOnBg = (bgHex: string): string => {
  // Convert hex to RGB
  const rgb = parseInt(bgHex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Using ITU-R BT.709 formula
  return luminance > 128 ? '#000000' : '#FFFFFF';
};


export { suggestHighlightShadow, findClosestPaint, getTextColorBasedOnBg };
