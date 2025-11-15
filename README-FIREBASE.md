````markdown name=README-FIREBASE.md
```markdown
Firebase setup notes
--------------------

Files added:
- src/firebase.js          — flexible env-based initialization (exports: app, db, auth)
- .env.example            — example environment variables

How to use
1. Copy .env.example -> .env.local (or .env) and fill in your Firebase project values.
2. Make sure .env* is in .gitignore so secrets are not committed.
3. In your app import:
   import { db, auth } from './src/firebase';
   // Use db for Firestore reads/writes and auth for authentication.

Environment variable naming (supported):
- Create React App: REACT_APP_FIREBASE_*
- Next.js: NEXT_PUBLIC_FIREBASE_* 
- Vite: VITE_FIREBASE_*
- Generic: FIREBASE_*

Notes:
- The file prevents re-initializing the Firebase app on hot reloads.
- The demo script (script.js) falls back to mock product data. To use Firestore, create a 'products' collection and ensure your build includes src/firebase.js so script.js can import and read db.
```
````