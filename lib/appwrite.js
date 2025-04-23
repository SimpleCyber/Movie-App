
import { 
    Client,
    Account, 
    ID, 
    Avatars, 
    Databases, 
    Query,
    Storage
   } from 'react-native-appwrite';


export const appWriteConfig = {
   endpoint:'https://cloud.appwrite.io/v1',
   platform :'com.dys.aora',
   projectId: '66b9b1e6003abcaa95de',
   databaseId :'66b9b3800012339a6149',
   userCollectionId:'66b9b3c20033574a204c',
   storageId :'66b9b623000af8d8b01d',
};

const{
} = appWriteConfig;
const client = new Client();

client
   .setEndpoint(appWriteConfig.endpoint) 
   .setProject(appWriteConfig.projectId)
   .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage =  new Storage(client);


// Register user
export async function createUser (email, password, username) {
  try {
   const newAccount  = await account.create(
       ID.unique(),
       email,
       password,
       username
   );

   if(!newAccount) throw Error;

   const avatarUrl = avatars.getInitials(username);

   await signIn(email, password);

   const newUser = await databases.createDocument(
       appWriteConfig.databaseId,
       appWriteConfig.userCollectionId,
       ID.unique(),
       {
           accountId  : newAccount.$id,
           email : email ,
           username : username,
           avatar : avatarUrl
       }
   );
   return newUser;

  }
  catch (error){
   console.log(error);
   throw new Error(error);
  }
}

export const signIn =  async (email, password) => {
   try {
       const session = await account.createEmailPasswordSession(email, password);
       return session;
   } 
   catch (error) {
       throw new Error(error);
   }
}

export const getCurrentUser = async () =>{
   try{
       const currentAccount = await account.get();

       if(!currentAccount) throw Error;

       const currentUser = await databases.listDocuments(
           appWriteConfig.databaseId,
           appWriteConfig.userCollectionId,
           [Query.equal('accountId', currentAccount.$id)]
       );

       if(!currentUser) throw Error;
       return currentUser.documents[0];
       
   }
   catch (error){
      console.log(error); 
   }
}



export const signOut = async() =>{
   try {
       const session =await account.deleteSession('current');

       return session;
   } catch (error) {
       throw new Error(error);
   }
}
