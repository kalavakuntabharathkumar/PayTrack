# PayTrack — Accessible Expense & Payments Dashboard

A responsive, client-side expense dashboard built with HTML5, CSS3 and vanilla JavaScript.

## Run
Open `index.html` in a modern browser. No build step or backend is required.

## Features
- Responsive layout designed for 320px–1440px screens
- Semantic landmarks, keyboard-accessible controls and visible focus states
- Transaction search and category filtering
- Add-transaction form with inline validation and live status feedback
- CSV export of the currently visible transaction list
- Accessibility notes and manual NVDA/axe audit checklist

## Accessibility
The interface uses labels, heading hierarchy, table captions, status announcements, sufficient contrast, and keyboard-operable controls. Run axe DevTools and test with NVDA to repeat the manual audit; the README does not claim that a particular Lighthouse score is guaranteed on every machine.

## Project structure
- `index.html` — semantic page structure
- `styles.css` — mobile-first responsive styling
- `app.js` — data, validation, filtering and CSV export
- `docs/` — usability test notes and audit checklist
