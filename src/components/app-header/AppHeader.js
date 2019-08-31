import React from 'react';
import './AppHeader.css';

export const AppHeader = (props) => (
    <header className="app-header">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
    </header>
)