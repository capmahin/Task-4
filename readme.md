# ThreeJS Cube Selection with Raycasting

This project demonstrates interactive 3D cube selection using Three.js with raycasting. Users can click on colorful cubes to select them, with visual feedback showing the selected cube.

## Features

- **Interactive 3D Scene**: A visually appealing 3D environment with a grid of colorful cubes
- **Cube Selection**: Click on any cube to select it with visual feedback
- **Visual Feedback**: Selected cubes change color to gold and slightly increase in size
- **Orbit Controls**: Pan, zoom, and rotate the camera view to see cubes from any angle
- **Responsive Design**: Automatically adjusts to window resizing
- **Keyboard Controls**: 
  - Press 'ESC' to deselect the currently selected cube
  - Press 'R' to randomly select a cube
- **Dynamic Lighting**: Ambient, directional, and point lights for realistic shading
- **Smooth Animations**: Gentle rotation animation on all cubes for visual appeal
- **Real-time Updates**: Selection information displayed in real-time on screen

## Technical Implementation Details

- **Three.js Framework**: Built with Three.js for 3D rendering and interactions
- **Raycasting System**: Uses Three.js raycasting for accurate object selection
- **OrbitControls**: Implements camera controls for intuitive scene navigation
- **ES6 Modules**: Utilizes modern JavaScript module system for clean code organization
- **Class-based Architecture**: Organized in a reusable CubeSelectionApp class
- **Event-driven Design**: Handles mouse clicks, keyboard input, and window resizing
- **Performance Optimized**: Efficient rendering with requestAnimationFrame
- **Shadow Mapping**: Realistic shadows cast by cubes onto the ground plane
- **Color Management**: Dynamic color generation for each cube with preservation of original colors
- **Scale Animation**: Smooth scaling transitions when selecting/deselecting cubes

## Project Structure

- `src/index.html`: Main HTML file with UI elements and information displays
- `src/script.js`: Core application logic in the CubeSelectionApp class
- `src/style.css`: Basic styling for the page
- `vite.config.js`: Vite configuration for the development server

## How Cube Selection Works

1. **Scene Setup**: Creates a 3x3 grid of uniquely colored cubes with proper lighting
2. **Raycasting Initialization**: Sets up raycaster and mouse vector for intersection detection
3. **Mouse Event Handling**: Captures click events and converts screen coordinates to 3D space
4. **Intersection Detection**: Uses raycasting to determine which cube was clicked
5. **Visual Feedback**: Changes color and scale of selected cube with gold highlight
6. **UI Updates**: Updates the on-screen display with selected cube information
7. **State Management**: Properly resets previously selected cubes when selecting new ones

## Development Workflow

- **Prerequisites**: Node.js installed on your machine
- **Installation**: Run `npm install` to install dependencies (Three.js, Vite, lil-gui)
- **Development Server**: Start with `npm run dev` to launch the Vite development server
- **Hot Reloading**: Automatic browser refresh on code changes
- **Production Build**: Use `npm run build` to create optimized production files
- **Preview Mode**: Run `npm run preview` to test the production build locally

## Dependencies

- **three**: ^0.168.0 - Core 3D library for rendering and interactions
- **lil-gui**: ^0.21.0 - Lightweight GUI controller (included but not actively used)
- **vite**: ^5.4.6 - Fast build tool and development server

## Browser Support

Works in all modern browsers that support WebGL and ES6 modules.