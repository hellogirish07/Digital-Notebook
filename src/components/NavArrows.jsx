import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NavArrows = ({ onPrev, onNext, hasPrev, hasNext }) => (
  <>
    <button
      disabled={!hasPrev}
      onClick={onPrev}
      className="absolute left-10 top-1/2 -translate-y-1/2 z-30 p-2 text-gray-300 hover:text-gray-500 disabled:opacity-0 transition-all hidden md:block"
    >
      <ChevronLeft className="w-12 h-12" />
    </button>
    <button
      disabled={!hasNext}
      onClick={onNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-gray-300 hover:text-gray-500 disabled:opacity-0 transition-all hidden md:block"
    >
      <ChevronRight className="w-12 h-12" />
    </button>
  </>
);

export default NavArrows;
