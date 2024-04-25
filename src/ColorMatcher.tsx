// ColorMatcher.tsx
import React, { useState } from 'react';
import { Paint } from './types';
import { findClosestPaint, suggestHighlightShadow, getTextColorBasedOnBg } from './colorUtils';
import './ColorMatcher.css';
import citPaints from './assets/cit-data.json';
import armyPainterPaints from './assets/army-painter-data.json';
import p3Paints from './assets/p3-data.json';
import vallejoPaints from './assets/vallejo-data.json';

const paints: Paint[] = [
  ...citPaints.paints,
  ...armyPainterPaints.paints,
  ...p3Paints.paints,
  ...vallejoPaints.paints,
];

const ColorMatcher: React.FC = () => {
  const [inputHex, setInputHex] = useState<string>('');
  const [closestPaint, setClosestPaint] = useState<Paint | null>(null);
  const [closestHighlightPaint, setClosestHighlightPaint] = useState<Paint | null>(null);
  const [closestShadowPaint, setClosestShadowPaint] = useState<Paint | null>(null);

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputHex(event.target.value);
  };

  const findColor = () => {
    const paint = findClosestPaint(inputHex, paints);
    setClosestPaint(paint);

    if (paint) {
      const { highlight, shadow } = suggestHighlightShadow(paint.hexCode);
      const closestHighlight = findClosestPaint(highlight, paints);
      const closestShadow = findClosestPaint(shadow, paints);
      setClosestHighlightPaint(closestHighlight);
      setClosestShadowPaint(closestShadow);
    }
  };

  return (
    <div className="container">
      <div className="input-area">
        <input type="text" value={inputHex} onChange={handleHexChange} placeholder="Enter HEX code" />
        <button onClick={findColor}>Find Closest Color</button>
      </div>
      {inputHex && <div className="hex hex-input" style={{ backgroundColor: inputHex, color: getTextColorBasedOnBg(inputHex) }}>{inputHex}</div>}
      {closestShadowPaint && (
        <div className="hex hex-shadow" style={{ backgroundColor: closestShadowPaint.hexCode, color: getTextColorBasedOnBg(closestShadowPaint.hexCode) }}>
          Shadow<br />
          {closestShadowPaint.name}<br />
          {closestShadowPaint.company}: {closestShadowPaint.range}
        </div>
      )}
      {closestPaint && (
        <div className="hex hex-closest" style={{ backgroundColor: closestPaint.hexCode, color: getTextColorBasedOnBg(closestPaint.hexCode) }}>
          Base<br />
          {closestPaint.name}<br />
          {closestPaint.company}: {closestPaint.range}
        </div>
      )}
      {closestHighlightPaint && (
        <div className="hex hex-highlight" style={{ backgroundColor: closestHighlightPaint.hexCode, color: getTextColorBasedOnBg(closestHighlightPaint.hexCode) }}>
          Highlight<br />
          {closestHighlightPaint.name}<br />
          {closestHighlightPaint.company}: {closestHighlightPaint.range}
        </div>
      )}
    </div>
  );
};

export default ColorMatcher;
