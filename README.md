### 🎬 **Movie App **

App : Created with the react native using the tmdb api to showcase the Movies description and save the movies.

### 🖼️ App Screenshots

| Home | Details | Search | Profile | Saved |
|------|---------|--------|---------|-------|
| ![home](https://github.com/Movie-App/image/home.jpg) | ![details](https://github.com/Movie-App/image/deatil.jpg) | ![search](https://github.com/Movie-App/image/search.jpg) | ![profile](https://github.com/Movie-App/image/profile.jpg) | ![saved](https://github.com/Movie-App/image/saved.jpg) |

---

#### ✅ **Phase 1: Setup & Configuration**
- **Initial Setup:**
  ```bash
  npx create-expo-app@latest
  npx expo start
  ```
- **Project Structure Highlights:**
  | File/Folder          | Description                                                  |
  |----------------------|--------------------------------------------------------------|
  | `tsconfig.json`      | TypeScript safety enforcement                                |
  | `README.md`          | Project information                                          |
  | `package.json`       | Project dependencies and scripts                             |
  | `package-lock.json`  | Exact dependency versions                                    |
  | `app.json`           | App configuration and metadata                               |
  | `.gitignore`         | Excluded files from Git tracking                             |
  | `/app`               | Contains app pages and routing logic                         |

- **Tailwind + Nativewind Integration:**
  - Installed packages:
    ```bash
    npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
    ```
  - Setup files:
    - `tailwind.config.js`: Tailwind config with custom colors and paths
    - `globals.css`: Tailwind directives
    - `babel.config.js`: Add Nativewind presets
    - `metro.config.js`: Customized for Nativewind
    - `nativewind-env.d.ts`: Type definitions

---

#### 🚀 **Phase 2: Navigation Setup**
- **Implemented Pages**:
  - `Home`
  - `Search`
  - `Saved`
  - `Profile`

- **Bottom Navigation Bar:** ✅ Completed using React Navigation

---

#### 🎨 **Phase 3: App Customization**
- Customized **App Title** and **Icon**
- Playing videos integrated

---

#### 🔎 **Phase 4: Feature Development**
- **Search Movies** via TMDB API
- **Movie Details Page**: Poster, Trailer, Save Option
- **Saved/Watchlist Page**: View saved movies
- **Profile Page**: Login/Logout, Notes, Custom List

- **Data Sources:**
  - **TMDB API** – Trending movies, top 5 by user searches
  - **Appwrite DB** – Store and fetch saved movies
- **Technologies Used**: 
  - React Native, Expo, NativeWind, Appwrite, TMDB API

---


