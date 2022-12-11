import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import Nested from './Nested';
import Absolute from './Absolute';
import Rect from './Rect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<><Nested /><Absolute /><Rect /></>);

