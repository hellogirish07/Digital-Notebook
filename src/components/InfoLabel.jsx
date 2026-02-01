import React from 'react';
import { Info } from 'lucide-react';

const InfoLabel = () => (
  <div className="mt-4 flex items-center gap-3 text-gray-500 opacity-60 uppercase tracking-[0.2em] text-[7px] md:text-[9px] font-sans">
    <span className="flex items-center gap-1">
      <Info className="w-2.5 h-2.5 md:w-3 md:h-3" /> Swipe/Arrows to turn
    </span>
    <span>•</span>
    <span>Click text to edit</span>
  </div>
);

export default InfoLabel;
