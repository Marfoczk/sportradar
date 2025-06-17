# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### `npm run dev`
to start dev environment on your local machine

### `npx vitest`
to run blazing fast test with watch mode

### TDD approach
Install and config vitest, use ReactTestingLibrary.
Create smoke tests for MVP, build functionality, as soon as those tests are passing, refactor, add more tests, or move to the next functionality and repeat the cycle.

### Testing strategy
Based on queries priority mentioned in [ReactTestingLibrary docs](https://testing-library.com/docs/queries/about#priority) i should focus on highest possible queries specifity.

### Future improvements
- Could use langChain.js for prediction for next matches` outcomes
- input validation (text input vs number input or "Team names cannot be empty" vs 'required' prop)
- do not allow to add multiple games with same team
- unify CSS styles with REM or PX
- optional spread in Button.tsx