// components/profile/MovieNotesList.tsx
import React, { memo } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator 
} from "react-native";
import { icons } from "@/constants/icons";
import { useMovieNotes } from "@/hooks/useMovieNotes";

interface MovieNotesListProps {
  notes: string[];
  onRefresh: () => Promise<void>;
}

const MovieNotesList = memo(({ notes, onRefresh }: MovieNotesListProps) => {
  const { 
    newNote, 
    setNewNote, 
    savingNote, 
    pendingOperation,
    addNote,
    toggleNote,
    deleteNote,
    isNoteCompleted,
    getNoteText
  } = useMovieNotes(notes, onRefresh);

  return (
    <View className="mt-6">
      <Text className="text-white text-lg font-semibold mb-4">Create your movie list:</Text>
      
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 bg-gray-800 text-white p-3 rounded-l-xl"
          placeholder="Add movie to your list..."
          placeholderTextColor="#666"
          value={newNote}
          onChangeText={setNewNote}
          maxLength={97}
          editable={!savingNote}
        />
        <TouchableOpacity 
          onPress={addNote}
          disabled={savingNote || !newNote.trim()}
          className={`bg-blue-500 justify-center items-center px-4 rounded-r-xl ${(!newNote.trim() || savingNote) ? 'opacity-50' : ''}`}
        >
          {savingNote ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-medium">Add</Text>
          )}
        </TouchableOpacity>
      </View>
      
      {notes.length === 0 ? (
        <EmptyNotesList />
      ) : (
        notes.map((note, index) => (
          <NoteItem 
            key={index} 
            note={note} 
            index={index}
            onToggle={toggleNote}
            onDelete={deleteNote}
            isCompleted={isNoteCompleted(note)}
            noteText={getNoteText(note)}
            isPending={
              (pendingOperation?.type === 'toggle' && pendingOperation.index === index) ||
              (pendingOperation?.type === 'delete' && pendingOperation.index === index)
            }
          />
        ))
      )}
    </View>
  );
});

const EmptyNotesList = memo(() => (
  <View className="bg-gray-800 p-4 rounded-xl items-center justify-center">
    <Text className="text-gray-400 text-center">Your movie list is empty</Text>
    <Text className="text-gray-500 text-center text-sm mt-1">Add movies you want to watch</Text>
  </View>
));

interface NoteItemProps {
  note: string;
  index: number;
  onToggle: (index: number) => void;
  onDelete: (index: number) => void;
  isCompleted: boolean;
  noteText: string;
  isPending: boolean;
}

const NoteItem = memo(({ 
  index, 
  onToggle, 
  onDelete, 
  isCompleted, 
  noteText, 
  isPending 
}: NoteItemProps) => (
  <View className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-2">
    <TouchableOpacity 
      onPress={() => onToggle(index)} 
      disabled={isPending}
      className="mr-3"
    >
      <View className={`w-6 h-6 rounded-sm border border-gray-400 justify-center items-center ${isCompleted ? 'bg-green-500 border-green-500' : ''}`}>
        {isCompleted && (
          <Image source={icons.check || require('@/assets/icons/check.png')} className="w-4 h-4" tintColor="#fff" />
        )}
        {isPending && (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </View>
    </TouchableOpacity>
    <Text className={`flex-1 text-white ${isCompleted ? 'line-through text-gray-400' : ''} ${isPending ? 'opacity-50' : ''}`}>
      {noteText}
    </Text>
    <TouchableOpacity 
      onPress={() => onDelete(index)}
      disabled={isPending}
    >
      {isPending ? (
        <ActivityIndicator size="small" color="#ff6b6b" />
      ) : (
        <Image source={icons.trash || require('@/assets/icons/trash.png')} className="w-5 h-5" tintColor="#ff6b6b" />
      )}
    </TouchableOpacity>
  </View>
));

MovieNotesList.displayName = 'MovieNotesList';
EmptyNotesList.displayName = 'EmptyNotesList';
NoteItem.displayName = 'NoteItem';

export default MovieNotesList;