# Specification

## Summary
**Goal:** Add a new "Know Your Healthcare Rights" informational page to the Healthcare Navigation Help app, with full navigation integration.

**Planned changes:**
- Create a new `RightsPage.tsx` component with sections covering: emergency care rights, itemized bill and dispute rights, interpreter/language assistance rights, medical records access, right to a second opinion, right to appeal insurance denials, and surprise billing protections
- Style the page using cards and callout boxes consistent with the existing warm teal-green design system (matching `ChallengesPage.tsx` and other informational pages)
- Register a new route `/healthcare-rights` in `App.tsx`
- Add a navigation link to the Rights page in `Navigation.tsx`
- Add a quick-link card for the Rights page on the `HomePage` quick-links grid

**User-visible outcome:** Users can discover and navigate to a new "Know Your Healthcare Rights" page from both the site-wide nav bar and the homepage quick-links grid, where they can read about their fundamental patient and healthcare consumer rights in plain, accessible language.
