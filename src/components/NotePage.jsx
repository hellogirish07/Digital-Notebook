import React from 'react';
import { Clock } from 'lucide-react';

const NotePage = ({
  note,
  pageNumber,
  isEditing,
  editField,
  editValue,
  onEditValueChange,
  onStartEditing,
  onSaveEdit,
}) => (
  <div className="flex-1 ml-8 p-6 md:p-14 relative overflow-hidden bg-white">
    <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-100 z-0" />
    <div
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)',
        backgroundSize: '100% 2.5rem',
        backgroundPosition: '0 1.5rem',
      }}
    />

    <div className="relative z-10 h-full flex flex-col pl-6">
      <div className="flex flex-col items-end mb-4 font-sans text-lg text-pink-400">
        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
          Page {pageNumber}
        </span>
        <span className="text-[9px] md:text-[11px] flex items-center gap-1 mt-1 font-medium italic">
          <Clock className="w-2.5 h-2.5" /> {note.date}
        </span>
      </div>

      {/* Editable Heading */}
      {isEditing && editField === 'title' ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onBlur={onSaveEdit}
          onKeyDown={(e) => e.key === 'Enter' && onSaveEdit()}
          className="handwriting-heading text-3xl md:text-4xl font-bold bg-transparent border-none outline-none w-full mb-4 text-black"
        />
      ) : (
        <h2
          onClick={() => onStartEditing('title', note.title)}
          className="handwriting-heading text-3xl md:text-4xl font-bold text-black mb-4 cursor-text hover:bg-gray-50 transition-colors"
        >
          {note.title || 'Untitled'}
        </h2>
      )}

      {/* Editable Body */}
      {isEditing && editField === 'content' ? (
        <textarea
          autoFocus
          value={editValue}
          onChange={(e) => onEditValueChange(e.target.value)}
          onBlur={onSaveEdit}
          className="handwriting-body flex-1 bg-transparent outline-none w-full resize-none leading-[2.5rem] text-blue-700 text-xl md:text-2xl custom-scroll"
        />
      ) : (
        <div
          onClick={() => onStartEditing('content', note.content)}
          className="handwriting-body flex-1 text-xl md:text-2xl text-blue-700 leading-[2.5rem] whitespace-pre-wrap overflow-y-auto custom-scroll cursor-text hover:bg-gray-50 transition-colors"
        >
          {note.content || (
            <span className="text-blue-200 italic">Click here to start writing...</span>
          )}
        </div>
      )}
    </div>
  </div>
);

export default NotePage;
