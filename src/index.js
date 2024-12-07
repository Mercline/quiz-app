import React from 'react';  // Import React for JSX support
import ReactDOM from 'react-dom/client';  // Import ReactDOM to render the app to the DOM
import './index.css';  // Global CSS styles (which include Tailwind CSS)
import App from './App';  // The main app component
import reportWebVitals from './reportWebVitals';  // For measuring app performance

// Get the 'root' div from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance if desired (optional)
reportWebVitals();
