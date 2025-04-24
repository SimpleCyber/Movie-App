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
          saved_movies_date: [],
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
  


  