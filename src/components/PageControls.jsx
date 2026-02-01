import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const PageControls = ({ onAddPage, onDeletePage, showDelete }) => (
  <div className="absolute right-4 bottom-4 z-30 flex gap-2">
    <button
      onClick={onAddPage}
      className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 hover:bg-gray-700 active:scale-95 transition-all"
    >
      <Plus className="w-5 h-5 md:w-6 md:h-6" />
    </button>
    {showDelete && (
      <button
        onClick={onDeletePage}
        className="p-3 bg-red-50 text-red-500 rounded-full shadow-md hover:bg-red-100 transition-all"
      >
        <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    )}
  </div>
);

export default PageControls;
