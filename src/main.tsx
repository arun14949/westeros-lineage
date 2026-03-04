import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Fade out and remove the loading screen
const loader = document.getElementById('loading-screen');
if (loader) {
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 400);
}
