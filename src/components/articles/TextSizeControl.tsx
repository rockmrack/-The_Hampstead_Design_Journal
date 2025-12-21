'use client';

import React, { useEffect, useState } from 'react';
import { Minus, Plus, Type } from 'lucide-react';

export default function TextSizeControl() {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const savedSize = localStorage.getItem('article-font-size');
    if (savedSize) {
      const size = parseInt(savedSize);
      setFontSize(size);
      document.documentElement.style.setProperty('--article-font-scale', `${size / 100}`);
    }
  }, []);

  const adjustSize = (delta: number) => {
    const newSize = Math.min(Math.max(fontSize + delta, 80), 150);
    setFontSize(newSize);
    localStorage.setItem('article-font-size', newSize.toString());
    document.documentElement.style.setProperty('--article-font-scale', `${newSize / 100}`);
  };

  return (
    <div className="flex items-center gap-2 text-hampstead-charcoal/60 bg-hampstead-grey/20 px-3 py-1.5 rounded-full">
      <Type className="w-4 h-4" />
      <button
        onClick={() => adjustSize(-10)}
        disabled={fontSize <= 80}
        className="p-1 hover:text-hampstead-black disabled:opacity-30 transition-colors"
        aria-label="Decrease font size"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-xs font-medium w-8 text-center">{fontSize}%</span>
      <button
        onClick={() => adjustSize(10)}
        disabled={fontSize >= 150}
        className="p-1 hover:text-hampstead-black disabled:opacity-30 transition-colors"
        aria-label="Increase font size"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}
