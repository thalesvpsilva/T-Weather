# T-Weather Forecast App 🚀

![Angular Version](https://img.shields.io/badge/Angular-v20-red)
![Node Version](https://img.shields.io/badge/Node.js-v22+-green)
![Test Framework](https://img.shields.io/badge/Tests-Jest-orange)

A modern Angular sample project showcasing the latest features and best practices, built as an interactive weather forecast application.

## 🎯 Featured Angular Technologies

- **Angular v20** (Release Candidate) - Latest Angular features
- **Standalone Components** (v14+) - No NgModule dependencies
- **Angular Signals** (v16+) - Modern reactive primitives
- **New Control Flow** (v17+) - @if, @for, @switch syntax
- **Modern inject()** function - Dependency injection
- **Angular Material** - UI component library

## 🔧 Technical Details

### Project Structure
```
src/
├── app/
│   ├── core/                   # Global scope components
│   ├── private/                # Components granted upon login
│       ├── more-days-forecast/ # Following days forecast feature
│       ├── weather             # Weather forecast feature
│   ├── public/                 # Public components
│       ├── login/              # Login feature
│       ├── not-found/          # Not Found Page
│   ├── shared/                 # Shared components
│   ├── app.routes.ts           # Route configuration
│   └── app.component.ts        # Root component
├── assets /                    # Static assets
└── styles.scss                 # Global styles
└── theme.scss                  # Theme definition
```
### Modern Angular Patterns Used

1. **Standalone Components**: No NgModule dependencies
   ```typescript
   @Component({
     standalone: true,
     imports: [HeaderComponent, RouterOutlet]
     // ...
   })
   ```

2. **Signal-based State Management**:
   ```typescript
   public valueSelected = output<IGeocodingResponse>();
   ```

3. **Modern Dependency Injection**:
   ```typescript
    private readonly _sessionStorageService = inject(SessionStorageService);
    private readonly _router = inject(Router);
   ```

## 🛠️ Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 🚀 Deployment

The project includes GitHub Actions for:
- ✅ **Continuous Integration** - Automated testing
- ✅ **Build Verification** - Ensure production builds work
- ✅ **Dependency Updates** - Automated dependency management

## 🏗️ Project Architecture

This application demonstrates modern Angular architecture patterns:

- **Feature-based structure** with lazy-loaded routes
- **Standalone components** eliminating NgModule complexity
- **Signal-based state management** for cart functionality
- **Reactive forms** with typed validators
- **Service-based architecture** with dependency injection
- **Material Design** for consistent UI/UX

### Prerequisites

- **Open Weather API Key** - [Get API Key](https://home.openweathermap.org/api_keys)
    - After signing up, create your API Key and place it in `src/environments/environments.development.ts`:

    ```typescript
    openWeather: {
        url: 'https://api.openweathermap.org/',
        token: 'PUT_YOUR_API_KEY_HERE'
    }
    ```
