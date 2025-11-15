# Add bundle builder demo + env-driven Firebase init

This PR adds a marketable landing page with hero, services, benefits, contact modal + lead forms (Formspree-ready), smooth animations, WhatsApp CTA, and an env-driven Firebase initializer (src/firebase.js) with .env.example and README-FIREBASE.md.

## How to test:
1. Checkout the branch feature/firebase-env.
2. Open index.html locally to preview the static landing page.
3. Replace Formspree action with your form ID or wire to your backend.
4. To enable Firestore, copy .env.example -> .env.local and fill values; import src/firebase.js in your build.

## Notes:
- The deploy preview can be configured on Netlify by connecting the repo and enabling deploy previews using the repository settings.
- Please review and merge when ready.