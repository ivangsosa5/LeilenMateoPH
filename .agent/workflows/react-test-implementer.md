---
description: Implementation specialist following RED → GREEN → REFACTOR cycle
---

# ⚙️ react-test-implementer Agent

## Role
Implementation specialist for LeilenMateoPH project following the TDD cycle.

## Purpose
Write the **minimal amount of code** necessary to make all failing tests pass (GREEN phase).

---

## Workflow Steps

### 1. Verify RED Phase Complete
- Confirm tests exist and are currently failing
- Review test expectations to understand requirements
- Identify what needs to be implemented

### 2. Create Component Structure

Based on Container/Presentational pattern:

**For UI Components:**
```
src/features/[feature]/components/[ComponentName]/
├── [ComponentName].jsx          # Container (logic)
├── [ComponentName]View.jsx      # Presentational (UI)
├── [ComponentName].test.jsx     # Tests (already exists)
└── index.js                     # Barrel export
```

**For Simple Components:**
```
src/components/[ComponentName]/
├── [ComponentName].jsx
├── [ComponentName].test.jsx
└── index.js
```

### 3. Implement Minimal Code (GREEN Phase)

Write **only** the code needed to pass tests:

```javascript
// ComponentName.jsx
import { useState } from 'react';
import ComponentNameView from './ComponentNameView';

export default function ComponentName({ data, onAction }) {
  // Minimal logic to satisfy tests
  const [state, setState] = useState(null);
  
  const handleAction = () => {
    // Only implement what tests require
    onAction?.();
  };

  return (
    <ComponentNameView 
      data={data}
      onAction={handleAction}
    />
  );
}
```

```javascript
// ComponentNameView.jsx
export default function ComponentNameView({ data, onAction }) {
  return (
    <div>
      {/* Minimal UI to pass tests */}
    </div>
  );
}
```

### 4. Run Tests (Verify GREEN)
// turbo
```bash
npm run test -- [ComponentName].test.jsx
```

**Expected:** All tests should PASS (GREEN phase).

### 5. Apply Code Quality Tools
// turbo
```bash
npm run lint -- --fix
npm run format
```

### 6. REFACTOR Phase (if needed)

Only refactor if:
- Code duplication exists
- Performance can be improved without breaking tests
- Readability can be enhanced

**Rules:**
- ✅ Tests must still pass after refactoring
- ✅ Keep changes minimal and focused
- ✅ One refactor at a time

### 7. Final Verification
// turbo
```bash
npm run test -- [ComponentName].test.jsx
```

---

## Implementation Guidelines

### React 19 Best Practices
✅ Use functional components only  
✅ Prefer built-in hooks over custom ones (when possible)  
✅ Use `use` hook for async operations (React 19 feature)  
✅ Implement proper error boundaries  
✅ Follow Container/Presentational pattern  

### State Management
- **Local state:** `useState` for component-specific state
- **Server state:** React Query for API data
- **Form state:** Controlled components with `useState`
- **Global state:** Context API (only when truly global)

### Code Style
- **Naming:** PascalCase for components, camelCase for functions/variables
- **Props:** Destructure in function signature
- **Early returns:** Handle edge cases first
- **Comments:** Only for complex business logic

### Performance
- Use `React.memo()` only when profiling shows benefit
- Avoid premature optimization
- Keep components small and focused

---

## Handoff to Next Agent

After GREEN phase is complete:
1. Verify all tests pass
2. Run linting and formatting
3. Update `task.md` with completion status
4. **Delegate to:** `git-workflow-manager` for commit (if feature complete)
5. **OR Delegate to:** `react-mentor` for code review (if complex)

---

## Example Usage

**Receiving from tdd-test-first:**
- Tests exist at: `src/features/gallery/components/PhotoGallery/PhotoGallery.test.jsx`
- Tests are failing (RED phase)
- Requirements documented in tests

**react-test-implementer Actions:**
1. Create `PhotoGallery.jsx` (container)
2. Create `PhotoGalleryView.jsx` (presentational)
3. Implement minimal code to pass tests
4. Run tests → Verify GREEN
5. Apply ESLint + Prettier
6. Hand off to next agent

---

## Integration with React Query

For components fetching data:

```javascript
import { useQuery } from '@tanstack/react-query';

export default function DataComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['key'],
    queryFn: fetchFunction,
  });

  if (isLoading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  
  return <DataComponentView data={data} />;
}
```

---

## Notes

- **Minimal code:** Don't add features not covered by tests
- **Test-driven:** Let tests guide implementation
- **Refactor carefully:** Only when tests are green
- **Keep it simple:** Complexity should be justified by tests
