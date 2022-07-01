import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import 'services/youtubeAPI';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
