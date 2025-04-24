// hooks/useMovieNotes.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { addNoteToList, toggleNoteStatus, removeNoteFromList } from "@/lib/appwrite";

export const useMovieNotes = (notes: string[], onRefresh: () => Promise<void>) => {
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<{
    type: 'add' | 'toggle' | 'delete';
    index?: number;
    note?: string;
  } | null>(null);

  const addNote = useCallback(async () => {
    if (!newNote.trim()) return;
    
    try {
      setSavingNote(true);
      setPendingOperation({ type: 'add', note: newNote.trim() });
      
      await addNoteToList(newNote.trim());
      setNewNote('');
      await onRefresh();
    } catch (error) {
      console.error("Failed to add note:", error);
      Alert.alert("Error", "Failed to add movie to your list");
    } finally {
      setSavingNote(false);
      setPendingOperation(null);
    }
  }, [newNote, onRefresh]);

  const toggleNote = useCallback(async (index: number) => {
    try {
      setPendingOperation({ type: 'toggle', index });
      await toggleNoteStatus(index);
      await onRefresh();
    } catch (error) {
      console.error("Failed to update note:", error);
      Alert.alert("Error", "Failed to update the note");
    } finally {
      setPendingOperation(null);
    }
  }, [onRefresh]);

  const deleteNote = useCallback(async (index: number) => {
    try {
      setPendingOperation({ type: 'delete', index });
      await removeNoteFromList(index);
      await onRefresh();
    } catch (error) {
      console.error("Failed to delete note:", error);
      Alert.alert("Error", "Failed to delete the note");
    } finally {
      setPendingOperation(null);
    }
  }, [onRefresh]);

  const isNoteCompleted = useCallback((note: string) => {
    return note.startsWith('[1]');
  }, []);

  const getNoteText = useCallback((note: string) => {
    if (note.startsWith('[0]') || note.startsWith('[1]')) {
      return note.substring(3);
    }
    return note;
  }, []);

  return {
    newNote,
    setNewNote,
    savingNote,
    pendingOperation,
    addNote,
    toggleNote,
    deleteNote,
    isNoteCompleted,
    getNoteText
  };
};