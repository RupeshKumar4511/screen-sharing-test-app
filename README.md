# Screen Share Test App

A simple React application that tests and validates browser screen sharing
using the getDisplayMedia API with proper lifecycle handling.

--------------------------------------------------
🚀 Features
--------------------------------------------------

- Start screen sharing
- Detect permission states:
  granted / denied / cancelled / error / unsupported
- Detect manual stop from browser UI (track.onended)
- Manual "Stop Sharing" button
- Proper media cleanup (no leaks)
- Fresh stream on every retry
- React Router based navigation

--------------------------------------------------
🧭 Frontend Routes
--------------------------------------------------

/              → Home Page

/screen-test   → Screen Share Test Page

Routing handled using react-router-dom (v6).

--------------------------------------------------
🧠 Screen Sharing Flow
--------------------------------------------------

1. User clicks "Start Screen Sharing"
2. App calls:
   navigator.mediaDevices.getDisplayMedia()

3. If permission granted:
   - Live video preview shown
   - Resolution metadata displayed
   - Stop Sharing button enabled

4. If user stops sharing from:
   - Browser sharing toolbar
   - App Stop button
   - Unexpected browser interruption

   → track.onended fires
   → All tracks stopped
   → Stream reference cleared
   → Video element cleared
   → UI updates immediately

--------------------------------------------------
🔁 Retry Logic
--------------------------------------------------

- Cleanup always runs before starting again
- Old streams are never reused
- All tracks are properly stopped
- Prevents memory leaks

State Flow:

idle → requesting → granted → stopped
                   ↓
                denied / cancelled / error

--------------------------------------------------
📂 Project Structure
--------------------------------------------------

```bash 

src/
 ├── App.jsx
 ├── components/
 │    ├── Home.jsx
 │    ├── ScreenTest.jsx
 │    └── Button.jsx
 ├── hooks/
 │    └── useScreenShare.js


```

--------------------------------------------------
🛠 Installation
--------------------------------------------------

npm install
npm install react-router-dom

--------------------------------------------------
▶ Run the App
--------------------------------------------------

npm run dev
# or
npm start

--------------------------------------------------
🌐 Browser Requirements
--------------------------------------------------

- Works in Chrome, Edge, Brave
- Requires HTTPS or localhost
- Requires user interaction to initiate screen sharing

--------------------------------------------------
✅ Summary
--------------------------------------------------

This project demonstrates a production-ready
React implementation of browser screen sharing with:

- Proper lifecycle detection
- Manual and automatic stop handling
- Clean React state management
- Safe retry flow
- No media track leaks