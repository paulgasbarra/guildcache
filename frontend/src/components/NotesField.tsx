import React from "react";
import { useState, useEffect } from "react";

interface NotesFieldProps {
  notes: string;
  updateNote: (newNote: string) => void;
}

const NotesField: React.FC<NotesFieldProps> = ({ notes, updateNote }) => {
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setNote(notes);
  }, [notes]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleButtonClick = () => {
    updateNote(note);
  };

  return (
    <div className="flex flex-col">
      <label className="text-blue-700 font-medium mr-2">Notes:</label>
      <textarea value={note} onChange={handleTextChange} />
      <button
        className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full rounded-md p-2"
        onClick={handleButtonClick}
      >
        Save Notes
      </button>
    </div>
  );
};

export default NotesField;
