// hooks/useMovieNotes.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { addNoteToList, toggleNoteStatus, removeNoteFromList } from "@/lib/appwrite";

export const useMovieNotes = (notes: string[], onRefresh: () => Promise<void>) => {
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const addNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      setSavingNote(true);
      
      await addNoteToList(newNote.trim());
      
      setNewNote('');
      
      await onRefresh();
    } catch (error) {
      console.error("Failed to add note:", error);
      Alert.alert("Error", "Failed to add movie to your list");
    } finally {
      setSavingNote(false);
    }
  };

  const toggleNote = async (index: number) => {
    try {
      await toggleNoteStatus(index);
      await onRefresh();
    } catch (error) {
      console.error("Failed to update note:", error);
      Alert.alert("Error", "Failed to update the note");
    }
  };

  const deleteNote = async (index: number) => {
    try {
      await removeNoteFromList(index);
      await onRefresh();
    } catch (error) {
      console.error("Failed to delete note:", error);
      Alert.alert("Error", "Failed to delete the note");
    }
  };

  const isNoteCompleted = (note: string) => {
    return note.startsWith('[1]');
  };

  const getNoteText = (note: string) => {
    if (note.startsWith('[0]') || note.startsWith('[1]')) {
      return note.substring(3);
    }
    return note;
  };

  return {
    newNote,
    setNewNote,
    savingNote,
    addNote,
    toggleNote,
    deleteNote,
    isNoteCompleted,
    getNoteText
  };
};