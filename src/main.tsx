import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { CampaignMediaProvider } from './context/CampaignMediaContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <CampaignMediaProvider>
      <App />
    </CampaignMediaProvider>
  </ThemeProvider>
);

