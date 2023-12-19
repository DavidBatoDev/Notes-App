import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

function Note({ note, setNotes, setCurrentNoteId }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tempTitle, setTempTitle] = useState(note.title);
  const [tempContent, setTempContent] = useState(note.content);

  const displayContent = content?.replace(/\n/g, '<br>');

  useEffect(() => {
    if (!title || !content) {
        setEditMode(true);
    }
  }, [])

  const handleSave = () => {
    const updatedContent = content.replace(/<br\s*\/?>/gi, '\n');
    setNotes((prevNotes) => prevNotes.map(n => {
        if (n.id === note.id) {
            return {
            ...n,
            title,
            content: updatedContent,
            };
        } else {
            return n;
        }
    }))
    setEditMode(false);
  };

  const handleCancel = () => {
    // Revert changes to temporary state
    setTitle(tempTitle);
    setContent(tempContent);
    setEditMode(false);
  };

  return (
    <div className='bg-white w-full h-full p-5'>
      <div className='flex justify-between mb-4'>
        <button onClick={() => setCurrentNoteId(null)} className='text-black font-bold py-2 px-4 rounded'>
          <ArrowBackIcon />
        </button>
        <div>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className='text-black font-bold py-2 px-4 rounded'
            >
              <EditIcon />
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="mr-1 bg-red-500 hover:bg-red-700 rounded-full text-white font-bold py-2 px-4">
                Cancel
              </button>
              <button
                onClick={(title || tempTitle) ? handleSave : ""}
                className='ml-1 bg-green-500 hover:bg-green-700 rounded-full text-white font-bold py-2 px-4'
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
      <div className='h-4/5'>
        {!editMode ? (
          <>
            <h1 className='text-2xl font-bold mb-2'>{note.title}</h1>
            <p className='text-gray-700' dangerouslySetInnerHTML={{ __html: displayContent }} />
          </>
        ) : (
          <>
            <input
                placeholder='Add Title'
                className='w-full text-2xl font-bold mb-2 whitespace-nowrap outline-none'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder='Add Content'
                className='w-full text-gray-700 h-full outline-none resize-none'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Note;
