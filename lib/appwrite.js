import { 
    Client,
    Account, 
    ID, 
    Databases, 
    Query,
  } from 'react-native-appwrite';
  
  export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '6809fb7300034760467a',
    databaseId: '6809fbd20009d96ccef7',
    userCollectionId: '6809fbe3001dfb32b8f9',
  };
    
  const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6809fb7300034760467a')
  .setPlatform('com.devhub.devhub');
  
  const account = new Account(client);
  const databases = new Databases(client);
  export { client, account, databases };

  // Register user
  export async function createUser(email, password, username) {
    try {
      // Optional: sign out any existing session
      try {
        await account.deleteSession('current');
      } catch (err) {
        // Ignore if no session exists
      }
  
      const newAccount = await account.create(ID.unique(), email, password);
  
      // Login after creation
      await account.createEmailPasswordSession(email, password);
  
      const newUser = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          saved_movies: [],
          notes:[],
        }
      );
  
      return newUser;
    } catch (error) {
      if (error.code === 409) {
        throw new Error('Email already exists. Please sign in instead.');
      }
      console.log(error);
      throw new Error(error.message || 'Unknown error during registration');
    }
  }
  
  export const signIn = async (email, password) => {
    try {
      // Prevent duplicate sessions
      try {
        await account.deleteSession('current');
      } catch (err) {
        // Ignore if no session exists
      }
  
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || 'Login failed');
    }
  }
  
  export const getCurrentUser = async () => {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw new Error('No current account found');
  
      const userDocs = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      );
  
      if (!userDocs || userDocs.documents.length === 0) throw new Error('User not found');
  
      return userDocs.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  export const signOut = async () => {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      throw new Error(error.message || 'Sign out failed');
    }
  }
  


















































// Core update function
export const updateUserData = async (updatedData) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not found');
    
    const updatedUser = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      user.$id,
      updatedData
    );
    return updatedUser;
  } catch (error) {
    console.error("Update error:", error);
    throw new Error(error.message || 'Failed to update user data');
  }
}

// Add note function
export const addNoteToList = async (noteText) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not found');
    
    // Get existing notes or initialize as empty array
    const notes = Array.isArray(user.notes) ? [...user.notes] : [];
    
    // Format: "[0]Movie Name" where 0 = incomplete, 1 = complete
    const formattedNote = `[0]${noteText}`.substring(0, 100); // Limit to 100 chars
    
    notes.push(formattedNote);
    
    return await updateUserData({ notes });
  } catch (error) {
    console.error("Add note error:", error);
    throw new Error(error.message || 'Failed to add note');
  }
}

// Toggle note completion status
export const toggleNoteStatus = async (noteIndex) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not found');
    
    const notes = Array.isArray(user.notes) ? [...user.notes] : [];
    
    if (noteIndex >= 0 && noteIndex < notes.length) {
      const note = notes[noteIndex];
      
      // Check if note has the expected format
      if (note.startsWith('[0]')) {
        // Change status from incomplete to complete
        notes[noteIndex] = note.replace('[0]', '[1]');
      } else if (note.startsWith('[1]')) {
        // Change status from complete to incomplete
        notes[noteIndex] = note.replace('[1]', '[0]');
      } else {
        // If note doesn't have the format, add it
        notes[noteIndex] = `[0]${note}`;
      }
      
      return await updateUserData({ notes });
    }
    
    throw new Error('Note index out of range');
  } catch (error) {
    console.error("Toggle note error:", error);
    throw new Error(error.message || 'Failed to update note');
  }
}

// Remove note function
export const removeNoteFromList = async (noteIndex) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error('User not found');
    
    const notes = Array.isArray(user.notes) ? [...user.notes] : [];
    
    // Remove the note at the specified index
    if (noteIndex >= 0 && noteIndex < notes.length) {
      notes.splice(noteIndex, 1);
      return await updateUserData({ notes });
    }
    
    throw new Error('Note index out of range');
  } catch (error) {
    console.error("Remove note error:", error);
    throw new Error(error.message || 'Failed to remove note');
  }
}