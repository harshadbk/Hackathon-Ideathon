# Citizen Components Folder

This folder contains all components specifically designed for the citizen user experience.

## Folder Structure

```
citizen/
├── CitizenHeader.jsx            # Navbar for citizen users
├── CitizenHeader.css            # Header/navbar styling
├── CitizenDashboard.jsx         # Main dashboard component that orchestrates all sections
├── CitizenDashboard.css         # Main dashboard wrapper styles
├── WelcomeSection.jsx           # Welcome greeting with citizen ID
├── WelcomeSection.css           # Welcome section styling
├── QuickActionsSection.jsx      # Quick action buttons (File RTI, Track, Appeal, etc.)
├── QuickActionsSection.css      # Quick actions styling
├── StatisticsSection.jsx        # RTI statistics cards (Total, Pending, Resolved, Appeals)
├── StatisticsSection.css        # Statistics styling
├── RecentRequestsSection.jsx    # Display recent RTI requests
├── RecentRequestsSection.css    # Recent requests styling
├── HelpSection.jsx              # Help cards (How to File, Timeline, Notifications)
├── HelpSection.css              # Help section styling
├── FeaturesSection.jsx          # Key features showcase
├── FeaturesSection.css          # Features styling
├── index.jsx                    # Barrel export for easy imports
└── README.md                    # This file
```

## Components Overview

### CitizenHeader
Main navigation bar for citizen users.
- Personalized user profile section
- 9 navigation menu items:
  - Home / Dashboard
  - File RTI Request
  - My Applications
  - Track Status
  - First Appeal
  - Second Appeal
  - Departments
  - Help / FAQ
  - Notifications
- User dropdown with Profile and Logout options
- Fully responsive mobile menu

### CitizenDashboard
Main orchestrating component that combines all dashboard sections into a complete dashboard.

### WelcomeSection
- Displays personalized welcome message
- Shows citizen ID and email
- Includes subtitle about dashboard functionality

### QuickActionsSection
- 6 action cards for common operations:
  - File New RTI Request
  - Track RTI Status
  - File First Appeal
  - View Responses
  - Ask AI Assistant
  - Departments Directory

### StatisticsSection
- Shows RTI activity metrics:
  - Total RTI Filed
  - Pending Requests (orange highlight)
  - Resolved Requests (green highlight)
  - Appeals Filed (blue highlight)

### RecentRequestsSection
- Lists 6 most recent RTI requests
- Empty state with call-to-action if no requests
- Links to "View All" applications page

### HelpSection
- 3 help cards:
  - How to File RTI
  - Response Timeline information
  - Stay Updated notifications

### FeaturesSection
- 6 feature cards highlighting system capabilities
- Shown in highlighted background section

## Usage

### Import Single Component
```jsx
import { CitizenHeader, WelcomeSection } from './components/citizen'
```

### Import Main Components
```jsx
import { CitizenHeader, CitizenDashboard } from './components/citizen'
// or
import CitizenHeader from './components/citizen/CitizenHeader'
import CitizenDashboard from './components/citizen/CitizenDashboard'
```

### Use in App
```jsx
<CitizenHeader 
  onNavigate={handleNavigate}
  onLogout={handleLogout}
  user={user}
/>

<CitizenDashboard 
  requests={requests}
  onNew={handleNewRTI}
  onOpen={handleOpenDetail}
  onTrack={handleTrack}
  user={user}
/>
```

## Styling

Each component has its own CSS file for:
- Isolation and maintainability
- Easy component-specific styling
- Clear separation of concerns
- Responsive design for all screen sizes

All components support responsive breakpoints:
- Desktop Large (1025px - 1440px)
- Medium Tablet (769px - 1024px)
- Mobile (481px - 768px)
- Small Mobile (320px - 480px)

## Integration Points

- **CitizenHeader**: Uses `user`, `onNavigate`, `onLogout` props
- **CitizenDashboard**: Uses `requests`, `onNew`, `onOpen`, `onTrack`, `user` props
- **WelcomeSection**: Uses `user` prop for personalization
- **QuickActionsSection**: Uses `onNew`, `onTrack` callbacks
- **StatisticsSection**: Uses `requests` prop for calculations
- **RecentRequestsSection**: Uses `requests`, `onNew`, `onOpen` props
- **HelpSection**: Pure presentation, no props required
- **FeaturesSection**: Pure presentation, no props required

## Key Features

✨ **Modular Design** - Each component is independent and reusable
✨ **Responsive** - Works on all device sizes
✨ **Self-contained** - All JSX and CSS in one folder
✨ **Easy Maintenance** - Component-specific styling
✨ **Scalable** - Easy to add new sections or features
✨ **Professional UI** - Modern, clean design with smooth transitions
