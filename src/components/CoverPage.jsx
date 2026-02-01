import React from 'react';
import { Book } from 'lucide-react';

const CoverPage = ({
  ownerName,
  isEditing,
  editField,
  editValue,
  onEditValueChange,
  onStartEditing,
  onSaveEdit,
}) => (
  <div className="flex-1 ml-8 relative flex items-center justify-center bg-gray-800">
    <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay" />
    <div className="z-10 w-4/5 h-4/5 border-2 border-gray-600 rounded flex flex-col items-center justify-center p-6 text-center bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-700 rounded-full flex items-center justify-center mb-6 border border-gray-500 shadow-xl">
        <Book className="w-8 h-8 md:w-10 md:h-10 text-gray-200" />
      </div>

      {isEditing && editField === 'owner' ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onBlur={onSaveEdit}
          onKeyDown={(e) => e.key === 'Enter' && onSaveEdit()}
          className="cover-title text-3xl md:text-5xl text-amber-100 bg-transparent border-b border-amber-200 border-opacity-30 outline-none text-center w-full"
        />
      ) : (
        <h1
          onClick={() => onStartEditing('owner', ownerName)}
          className="cover-title text-4xl md:text-6xl text-amber-100 cursor-pointer hover:text-amber-200 transition-colors"
        >
          {ownerName}
        </h1>
      )}
      <div className="w-20 md:w-32 h-px bg-amber-200 bg-opacity-30 my-6" />
      <p className="text-[8px] md:text-[10px] text-gray-400 font-sans tracking-[0.3em] uppercase">
        Private Notes Archive
      </p>
    </div>
  </div>
);

export default CoverPage;
