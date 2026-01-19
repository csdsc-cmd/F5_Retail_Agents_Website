CRITICAL PROJECT CONTEXT & REQUIREMENTS:

## CURRENT APPLICATION STATE
This is a SIMPLE React application for pest control scheduling. The app has:
- Frontend: Simple React app at /Users/drewalexander/Desktop/pest-control-scheduler/frontend/src
  - Main component: PestControlScheduler.jsx (handles scheduling logic)
  - Map component: PestControlMap.jsx (displays routes on Leaflet map)
  - Simple App.js that renders <PestControlScheduler />
  - NO routing, NO authentication, NO enterprise structure
- Backend: Express API at /Users/drewalexander/Desktop/pest-control-scheduler/backend
  - server.js (main entry point)
  - Existing routes: /api/schedule, /api/jobs, /api/crews
  - Currently has NO database (needs to be added)

## PROBLEMS TO FIX (IN ORDER)

### PROBLEM 1: Broken App.js (CRITICAL - FIX FIRST)
The AI agent replaced the simple App.js with an enterprise structure requiring non-existent dependencies.

REQUIRED FIX:
- Restore App.js to simple structure:
  ```jsx
  import React from 'react';
  import './App.css';
  import PestControlScheduler from './components/PestControlScheduler';
  
  function App() {
    return (
      <div className="App">
        <PestControlScheduler />
      </div>
    );
  }
  
  export default App;
  ```

DEPENDENCIES TO REMOVE from any generated code:
- NO react-router-dom
- NO @mui/material
- NO notistack
- NO enterprise routing structure
- NO authentication

### PROBLEM 2: Map Displays All Jobs (Needs Toggle Feature)
Current behavior: PestControlMap.jsx shows ALL job markers immediately on load.

REQUIRED FIX:
1. Create new component: frontend/src/components/CrewTogglePanel.jsx
   - Displays checkbox for each crew in schedule
   - Shows crew color, name, job count
   - Checkbox to toggle crew route visibility
   - "Show All" / "Hide All" buttons
   - Separate toggle for unassigned jobs
   - Clean, simple Tailwind CSS styling

2. Modify existing file: frontend/src/components/PestControlMap.jsx
   - Add state: const [visibleCrews, setVisibleCrews] = useState({}) // Default: empty = no crews visible
   - Add state: const [showUnassigned, setShowUnassigned] = useState(false)
   - CRITICAL: Map starts EMPTY with NO visible markers
   - ONLY render markers for jobs where visibleCrews[job.crewId] === true
   - ONLY draw polyline routes for crews where visibleCrews[crewId] === true
   - Unassigned jobs (no crewId) only show when showUnassigned === true
   - Integrate <CrewTogglePanel /> component in the legend area
   - Pass toggle callbacks to CrewTogglePanel

3. Integration:
   - CrewTogglePanel receives: crews array, visibleCrews state, callbacks
   - User clicks checkbox → updates visibleCrews state → map re-renders with filtered markers
   - Performance: Use useMemo for filtered job lists

ARCHITECTURE REQUIREMENTS:
- Keep existing Leaflet map logic intact
- Maintain existing marker styles and popup content
- Don't break existing route drawing logic
- Use existing crewColors object
- Component composition pattern (CrewTogglePanel is presentational, PestControlMap is container)

### PROBLEM 3: No Database Persistence
Currently, schedules disappear on page refresh. Need simple SQLite database.

REQUIRED IMPLEMENTATION:
1. Install dependency: better-sqlite3 (NOT pg, NOT knex for migrations)

2. Create backend/db/scheduler.db (SQLite database file)

3. Create backend/models/ScheduleModel.js:
   ```javascript
   // Simple model using better-sqlite3
   // Table: schedules
   // Columns:
   //   - id (INTEGER PRIMARY KEY AUTOINCREMENT)
   //   - timestamp (TEXT, ISO 8601 format)
   //   - jobs_input (TEXT, JSON string)
   //   - crews_input (TEXT, JSON string)
   //   - schedule_result (TEXT, JSON string)
   //   - optimization_score (REAL)
   //   - metadata (TEXT, JSON string)
   
   // Methods:
   //   - initDatabase() - Create table if not exists
   //   - save(scheduleData) - Insert new schedule
   //   - list(limit, offset) - Get all schedules (paginated)
   //   - getById(id) - Get specific schedule
   //   - delete(id) - Delete schedule
   ```

4. Create backend/routes/scheduleHistory.js:
   ```javascript
   // Routes:
   // POST /api/schedule-history - Save new schedule
   // GET /api/schedule-history - List all schedules
   // GET /api/schedule-history/:id - Get specific schedule
   // DELETE /api/schedule-history/:id - Delete schedule
   ```

5. Modify backend/routes/schedule.js:
   - After generating schedule successfully, auto-save to database
   - Call ScheduleModel.save() with full schedule data

6. Register routes in backend/server.js:
   ```javascript
   app.use('/api/schedule-history', scheduleHistoryRoutes);
   ```

ARCHITECTURE REQUIREMENTS:
- Use better-sqlite3 (synchronous, simple, no migrations needed)
- Database file location: backend/db/scheduler.db
- Simple CRUD operations only
- JSON stored as TEXT (stringify on save, parse on read)
- NO ORM, NO migration system, NO complex queries
- Error handling for all operations
- Validation of required fields before saving

### PROBLEM 4: Frontend Schedule History (OPTIONAL - ONLY IF TIME)
ScheduleHistory components were generated but not properly integrated.

REQUIRED FIX (if implementing):
1. Verify these files exist and are correct:
   - frontend/src/components/ScheduleHistory/ScheduleHistory.jsx
   - frontend/src/services/schedulingAttemptApi.js (rename if needed to scheduleHistoryApi.js)

2. Add simple navigation to PestControlScheduler.jsx:
   - Add button: "View History" that toggles ScheduleHistory view
   - Simple show/hide, no routing required

3. Update API client to match backend routes (/api/schedule-history)

IF THESE FILES ARE BROKEN OR DON'T EXIST, SKIP THIS FEATURE.

## ARCHITECTURE & CODE STANDARDS

### Project Structure:
```
frontend/src/
  ├── App.js (SIMPLE, no routing)
  ├── components/
  │   ├── PestControlScheduler.jsx (main component)
  │   ├── PestControlMap.jsx (modify for toggles)
  │   ├── CrewTogglePanel.jsx (NEW - create this)
  │   ├── SchedulingBoard.jsx (existing)
  │   └── ScheduleHistory/ (existing, optional integration)
  └── services/
      └── scheduleHistoryApi.js (NEW - create this)

backend/
  ├── server.js (modify to register new routes)
  ├── db/
  │   └── scheduler.db (NEW - SQLite database)
  ├── models/
  │   └── ScheduleModel.js (NEW - create this)
  └── routes/
      ├── schedule.js (modify to auto-save)
      └── scheduleHistory.js (NEW - create this)
```

### Code Standards:
1. **React Components:**
   - Functional components with hooks
   - PropTypes for type checking
   - Clean JSX formatting
   - Descriptive variable names
   - Comments for complex logic

2. **State Management:**
   - Use useState for component state
   - Use useMemo for expensive computations
   - Use useCallback for event handlers passed to children
   - Keep state as close to usage as possible

3. **Styling:**
   - Tailwind CSS utility classes
   - Maintain existing color scheme
   - Responsive design (mobile-friendly)
   - Consistent spacing and typography

4. **Backend API:**
   - Express.js standard patterns
   - JSON request/response
   - Proper HTTP status codes (200, 201, 400, 404, 500)
   - Error handling middleware
   - Input validation
   - CORS enabled

5. **Database:**
   - Synchronous operations (better-sqlite3)
   - Prepared statements for security
   - Transaction support where needed
   - Proper error handling
   - Database initialization on first run

6. **Error Handling:**
   - Try/catch blocks for async operations
   - Graceful degradation
   - User-friendly error messages
   - Console logging for debugging
   - Don't crash the app on errors

7. **Testing Requirements:**
   - Code must compile without errors
   - No missing imports
   - No undefined variables
   - Components must render without crashing
   - API endpoints must respond correctly
   - Database operations must work

### DO NOT:
- ❌ Add routing (react-router-dom)
- ❌ Add authentication
- ❌ Use PostgreSQL or any SQL migrations
- ❌ Create enterprise file structure
- ❌ Add Material-UI or other UI frameworks (except what's already there)
- ❌ Create pages/ directory
- ❌ Add contexts/AuthContext
- ❌ Break existing working code
- ❌ Add complex state management (Redux, Zustand)

### DO:
- ✅ Keep it simple
- ✅ Use SQLite with better-sqlite3
- ✅ Maintain existing component structure
- ✅ Follow existing code style
- ✅ Test that it works
- ✅ Preserve working features
- ✅ Use Tailwind CSS for styling
- ✅ Add helpful comments

## IMPLEMENTATION ORDER (CRITICAL)

Execute in this exact sequence:

### Phase 1: Fix Broken App.js (5 minutes)
- Restore simple App.js
- Verify it compiles
- Test: App loads without errors

### Phase 2: Implement Map Toggles (30 minutes)
- Create CrewTogglePanel.jsx component
- Modify PestControlMap.jsx to add toggle state
- Integrate CrewTogglePanel into map
- Test: Map starts empty, toggles work, routes appear/disappear

### Phase 3: Implement SQLite Database (30 minutes)
- Create ScheduleModel.js with better-sqlite3
- Create scheduleHistory.js routes
- Modify schedule.js to auto-save
- Register routes in server.js
- Test: Can save and retrieve schedules

### Phase 4: Test Integration (15 minutes)
- Test full workflow: Generate schedule → Auto-saves to DB
- Test map toggles work with saved schedules
- Test API endpoints with curl or Postman
- Verify no console errors

### Phase 5: Optional History UI Integration (20 minutes - if time)
- Only if Phases 1-4 work perfectly
- Add history view toggle to PestControlScheduler
- Connect to API
- Test: Can view list of past schedules

## SUCCESS CRITERIA

The project is complete when:
1. ✅ App.js is simple and loads without errors
2. ✅ Map starts EMPTY with no visible markers
3. ✅ User can toggle individual crew routes on/off
4. ✅ CrewTogglePanel component exists and works
5. ✅ SQLite database saves schedules automatically
6. ✅ API endpoints work: POST, GET list, GET by ID
7. ✅ No console errors in browser or terminal
8. ✅ No missing dependencies
9. ✅ Code is clean and follows standards
10. ✅ All existing features still work

## TESTING CHECKLIST

Before marking complete, verify:
- [ ] npm start runs without errors
- [ ] Browser loads app without errors
- [ ] Map displays and is initially empty
- [ ] Can generate a schedule
- [ ] Schedule auto-saves to database
- [ ] Can toggle crew routes on/off
- [ ] "Show All" / "Hide All" buttons work
- [ ] Backend server starts without errors
- [ ] Database file is created
- [ ] Can retrieve saved schedules via API
- [ ] No TypeScript errors
- [ ] No missing imports
- [ ] No broken components

## NOTES FOR AI AGENTS

- This is a REAL working application, not a demo
- Do NOT hallucinate components that don't exist
- Do NOT add dependencies without checking package.json first
- Do NOT break existing working code
- ASK if uncertain about existing structure
- Keep changes minimal and focused
- Follow the exact file paths provided
- Test each phase before moving to next
- Simple is better than complex
- Working is better than perfect
