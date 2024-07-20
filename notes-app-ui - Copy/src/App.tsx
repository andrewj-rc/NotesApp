import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type Note = {
  id: number;
  title: string;
  content: string;
}
function App() {
  const [notes, setNotes] = useState <Note[]>(
    [
      {id: 1,
      title: 'buy',
      content: 'milk, chees, butter'
      },
      {id: 2,
        title: 'build',
        content: 'tiny house, garage flat, bach'
      },
      {id: 3,
        title: 'projects',
        content: 'paint car'
      }
    ]
  );
  const [selectedNote, setSelectedNote] = useState <Note | null>(null)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const hanedleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return
    }
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updatedNoteList = notes.map((note) => 
      note.id === selectedNote.id ? updatedNote : note
    )

    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
    const updatedNoteList = notes.filter((note) => note.id !== noteId)

    setNotes(updatedNoteList);

  }

  return (
    <div className="app-container">
      <form 
        className="note-form"
        onSubmit={(event) => 
          selectedNote 
          ? hanedleUpdateNote(event)
          : handleAddNote(event)
        }
      >
        <input 
          value={title} 
          placeholder="Title"
          required 
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          value={content}
          placeholder="Enter Content" 
          rows={10} 
          required
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type="submit">Save</button>
            <button className='cancel-button' onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div 
            className='note-item'
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
                <button onClick={(event) => deleteNote(event, note.id)}>X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default App;
