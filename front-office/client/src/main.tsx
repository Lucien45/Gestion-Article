import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootApp from './App';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("L'élément root n'a pas été trouvé dans le document.");
}

createRoot(rootElement).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);