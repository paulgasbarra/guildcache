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
    <div className="flex flex-col max-h-96">
      <label className="text-gray-700 font-medium mr-2">Notes:</label>
      <textarea
        className="h-32 mb-2"
        value={note}
        onChange={handleTextChange}
      />
      <button
        className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-60 w-96 rounded-md p-2"
        onClick={handleButtonClick}
      >
        Save Notes
      </button>
    </div>
  );
};

export default NotesField;
