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
            ```
            /** @type {import('tailwindcss').Config} */
                module.exports = {
                // NOTE: Update this to include the paths to all of your component files.
                content: ["./app/**/*.{js,jsx,ts,tsx}"],
                presets: [require("nativewind/preset")],
                theme: {
                    extend: {
                    colors:{
                        primary :'#030014',
                        secondary :'#151312',
                        accent : '#AB8BFF',
                        light : {
                        100 : '#D6CF77',
                        200: '#A8B5DB',
                        300: '#9CA4AB',
                        },
                        dark :{
                        100 : '#221F3D',
                        200: '#0F0D23',
                        }
                    }
                    },
                },
                plugins: [],
                }
            ```
        
        3. in app folder / create globals.css
            ```
                @tailwind base;
                @tailwind components;
                @tailwind utilities;
            ```



        4. crate babel.config.js in root folder
            ```
                module.exports = function (api) {
                    api.cache(true);
                    return {
                    presets: [
                        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
                        "nativewind/babel",
                    ],
                    };
                };
            ```
        5. npx expo customize metro.config.js  this will create it

            ```
            const { getDefaultConfig } = require("expo/metro-config");
            const { withNativeWind } = require('nativewind/metro');

            const config = getDefaultConfig(__dirname)

            module.exports = withNativeWind(config, { input: './app/globals.css' })
            ```
        6. create nativewind-env.d.ts in root folder
            ```
                /// <reference types="nativewind/types" />
            ```
