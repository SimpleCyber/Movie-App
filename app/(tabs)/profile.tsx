import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { 
  signOut, 
  getCurrentUser, 
  addNoteToList, 
  removeNoteFromList 
} from "../../lib/appwrite"; 

const Profile = () => {
  const { isLoading, isLoggedIn, user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    savedMoviesCount: 0,
    joinDate: '',
    notes: [] as string[]
  });
  const [fetchingProfile, setFetchingProfile] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    // Once loading is done, check login status
    if (!isLoading && !isLoggedIn) {
      router.replace("/sign-in");
    } else if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoading, isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      setFetchingProfile(true);
      const userData = await getCurrentUser();
      if (userData) {
        setProfileData({
          name: userData.username || userData.name || '',
          email: userData.email || '',
          avatarUrl: userData.avatarUrl || '',
          savedMoviesCount: userData.saved_movies?.length ||
             0,
          joinDate: formatDate(userData.$createdAt || new Date().toISOString()),
          notes: Array.isArray(userData.notes) ? userData.notes : []
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setFetchingProfile(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Logout function
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  // Navigate to saved movies
  const goToSavedMovies = () => {
    router.push("/saved");
  };

  // Add a new note to the movie list
  const addNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      setSavingNote(true);
      
      // Use the API function to add the note
      await addNoteToList(newNote.trim());
      
      // Clear input field
      setNewNote('');
      
      // Refresh the profile to get updated notes
      await fetchUserProfile();
    } catch (error) {
      console.error("Failed to add note:", error);
      Alert.alert("Error", "Failed to add movie to your list");
    } finally {
      setSavingNote(false);
    }
  };

  // Delete a note
  const deleteNote = async (index: number) => {
    try {
      // Use the API function to remove the note by index
      await removeNoteFromList(index);
      
      // Refresh the profile to get updated notes
      await fetchUserProfile();
    } catch (error) {
      console.error("Failed to delete note:", error);
      Alert.alert("Error", "Failed to delete the note");
    }
  };

  // If loading global state or fetching profile
  if (isLoading || fetchingProfile) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="absolute w-full"
        resizeMode="cover"
      />
      
      <ScrollView className="flex-1 px-6">
        {/* Profile header section */}
        <View className="items-center mt-16">
          {profileData.avatarUrl ? (
            <Image 
              source={{ uri: profileData.avatarUrl }} 
              className="w-24 h-24 rounded-full"
              defaultSource={icons.person}
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-800 justify-center items-center">
              <Image source={icons.person} className="w-12 h-12" tintColor="#fff" />
            </View>
          )}
          
          <Text className="text-white text-2xl font-bold mt-4">{profileData.name}</Text>
          <Text className="text-gray-400">{profileData.email}</Text>
          <Text className="text-gray-500 text-sm mt-1">Member since {profileData.joinDate}</Text>
        </View>
        
        {/* Main options */}
        <View className="mt-10">
          <TouchableOpacity 
            onPress={goToSavedMovies}
            className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-3"
          >
            <Image source={icons.bookmark} className="w-6 h-6 mr-3" tintColor="#fff" />
            <Text className="text-white flex-1">Saved Movies</Text>
            <Text className="text-gray-400 mr-2">{profileData.savedMoviesCount}</Text>
            <Image source={icons.right} className="w-5 h-5" tintColor="#666" />
          </TouchableOpacity>
        </View>
        
        {/* Movie List */}
        <View className="mt-6">
          <Text className="text-white text-lg font-semibold mb-4">Movie List Items</Text>
          
          {/* Add new movie to list */}
          <View className="flex-row mb-4">
            <TextInput
              className="flex-1 bg-gray-800 text-white p-3 rounded-l-xl"
              placeholder="Add movie to your list..."
              placeholderTextColor="#666"
              value={newNote}
              onChangeText={setNewNote}
              maxLength={100} // Limit input length
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
          
          {/* Movie list items */}
          {profileData.notes.length === 0 ? (
            <View className="bg-gray-800 p-4 rounded-xl items-center justify-center">
              <Text className="text-gray-400 text-center">Your movie list is empty</Text>
              <Text className="text-gray-500 text-center text-sm mt-1">Add movies you want to watch</Text>
            </View>
          ) : (
            profileData.notes.map((note, index) => (
              <View key={index} className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-2">
                <Text className="flex-1 text-white">{note}</Text>
                <TouchableOpacity onPress={() => deleteNote(index)}>
                  <Image source={icons.trash || require('@/assets/icons/trash.png')} className="w-5 h-5" tintColor="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        
        {/* Logout button */}
        <TouchableOpacity 
          onPress={logout}
          className="bg-red-500 p-4 rounded-xl mt-10 items-center mb-8"
        >
          <Text className="text-white text-base font-medium">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;