# Movie-App

# Phase 1 : Setup React native

    npx create-expo-app@latest
    
    - This will create all the files and folders
  
    npx expo start 

    - Connect with the mobile expo go , live changes are visible here

# 1.1 : Understanding the basic file structure

    - tsconfig.json : impose the ts saftery through the project
    - Readme : information about the project
    - packagelock.json & package.json : project dependencies and metadata
  
    - app.json : configuration for the project , also known as app config, change the behaviour of the project
    - gitignore : ignore the important files

    - app [Folder] : help us in routes

# 1.2 : Development started
     
     npm run reset-project
     No


# 1.3 : Additional packages
    npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context


    - Lets create the configration file
        1. npx tailwindcss init
        2. Update tailwind.config.js
        3. in app folder / create global.css
        4. crate babel.config.js in root folder
        5. npx expo customize metro.config.js
        6. create nativewind-env.d.ts in root folder
