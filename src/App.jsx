import React, { useState, useEffect, useRef } from 'react';
// import Swal from 'sweetalert2';
import {
  NotebookStyles,
  BookSpine,
  PageControls,
  NavArrows,
  CoverPage,
  NotePage,
  InfoLabel,
} from './components';

const App = () => {
  // --- State & Initialization ---
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notebook_pages');
    const defaultInstructions = {
      id: 'instructions',
      title: '📖 App Instructions (Kaise Use Karein)',
      content: `Aapka swagat hai! Is notebook ko use karne ke liye neeche diye gaye nirdesh dekhein:

1. 📝 Edit Karein: Kisi bhi text (Heading ya Body) par click karein aur likhna shuru karein. Click bahar karte hi automatic save ho jayega.

2. 📖 Page Paltein (Desktop): Keyboard ki Arrow Keys (Left ← / Right →) ka use karein.

3. 📱 Page Paltein (Mobile): Screen par Left ya Right swipe karein.

4. ➕ Naya Page: Neeche diye gaye Plus (+) icon par click karein. Har note ka ek alag page hoga.

5. 🗑️ Delete Karein: Trash icon par click karke current page ko delete kar sakte hain.

6. 💾 Auto-Save: Aapka data aapke browser mein hamesha safe rahega, refresh karne par bhi nahi mitega.`,
      date: new Date().toLocaleDateString(),
    };

    return savedNotes ? JSON.parse(savedNotes) : [defaultInstructions];
  });

  const [ownerName, setOwnerName] = useState(() => {
    return localStorage.getItem('notebook_owner') || 'My Personal Diary';
  });

  const [currentPage, setCurrentPage] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const touchStartX = useRef(null);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('notebook_pages', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notebook_owner', ownerName);
  }, [ownerName]);

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isEditing) return;
      if (e.key === 'ArrowRight' && currentPage < notes.length - 1) {
        setCurrentPage((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > -1) {
        setCurrentPage((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, notes.length, isEditing]);

  // --- Swipe Gestures ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < notes.length - 1) {
        setCurrentPage((prev) => prev + 1);
      } else if (diff < 0 && currentPage > -1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
    touchStartX.current = null;
  };

  const startEditing = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (currentPage === -1) {
      setOwnerName(editValue);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[currentPage] = {
        ...updatedNotes[currentPage],
        [editField]: editValue,
      };
      setNotes(updatedNotes);
    }
    setIsEditing(false);
    setEditField(null);
  };

  const addPage = () => {
    const newNote = {
      id: Date.now(),
      title: 'Naya Page',
      content: '',
      date: new Date().toLocaleDateString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setCurrentPage(updatedNotes.length - 1);
    startEditing('content', '');
  };

  const deletePage = () => {
    Swal.fire({
      title: 'Remove this page?',
      text: 'This page will be permanently deleted. This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedNotes = notes.filter((_, index) => index !== currentPage);
        if (updatedNotes.length === 0) {
          setNotes([
            {
              id: Date.now(),
              title: 'Naya Page',
              content: '',
              date: new Date().toLocaleDateString(),
            },
          ]);
          setCurrentPage(0);
        } else {
          setNotes(updatedNotes);
          setCurrentPage(Math.max(-1, currentPage - 1));
        }
        setIsEditing(false);
        Swal.fire({
          title: 'Removed!',
          text: 'The page has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-400 bg-wood flex flex-col items-center justify-center p-2 md:p-4 font-sans text-gray-900 overflow-hidden">
      <NotebookStyles  />

      {/* Notebook Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="notebook-main relative w-full max-w-4xl flex shadow-2xl rounded-r-xl overflow-hidden bg-white border-y border-r border-gray-300 transition-all duration-300"
      >
        <BookSpine />

        <PageControls
          onAddPage={addPage}
          onDeletePage={deletePage}
          showDelete={currentPage !== -1}
        />

        <NavArrows
          onPrev={() => setCurrentPage((prev) => prev - 1)}
          onNext={() => setCurrentPage((prev) => prev + 1)}
          hasPrev={currentPage > -1}
          hasNext={currentPage < notes.length - 1}
        />

        {currentPage === -1 ? (
          <CoverPage
            ownerName={ownerName}
            isEditing={isEditing}
            editField={editField}
            editValue={editValue}
            onEditValueChange={setEditValue}
            onStartEditing={startEditing}
            onSaveEdit={saveEdit}
          />
        ) : (
          <NotePage
            note={notes[currentPage]}
            pageNumber={currentPage + 1}
            isEditing={isEditing}
            editField={editField}
            editValue={editValue}
            onEditValueChange={setEditValue}
            onStartEditing={startEditing}
            onSaveEdit={saveEdit}
          />
        )}
      </div>

      <InfoLabel />
    </div>
  );
};

export default App;
