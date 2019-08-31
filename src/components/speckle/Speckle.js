import React from 'react';
import Tippy from '@tippy.js/react';
import './Speckle.css';

export const Speckle = (props) => (
    <Tippy content={props.count + 1}>
        <div className={props.active ? 'speckle speckle--active' : 'speckle'}></div>
    </Tippy>
);