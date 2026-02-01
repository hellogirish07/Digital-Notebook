import React from 'react';

const NotebookStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Indie+Flower&family=Dancing+Script:wght@700&display=swap');
      .handwriting-heading { font-family: 'Caveat', cursive; }
      .handwriting-body { font-family: 'Indie Flower', cursive; }
      .cover-title { font-family: 'Dancing Script', cursive; color: #d6d3d1; }
      
      .custom-scroll::-webkit-scrollbar { width: 4px; }
      .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      
      /* Book Spine Style */
      .book-spine {
        background: linear-gradient(to right, #d6d3d1 0%, #e7e5e4 20%, #fafaf9 100%);
        box-shadow: inset -5px 0 10px -5px rgba(0,0,0,0.2);
      }

      /* Noise texture for local run without external images */
      .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      /* Fixed Height Container to prevent shrinking during edit */
      .notebook-main {
        height: 85vh;
        min-height: 500px;
        max-height: 800px;
      }
    `}
  </style>
);

export default NotebookStyles;
