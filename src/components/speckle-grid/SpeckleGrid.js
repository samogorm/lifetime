import React from 'react';
import './SpeckleGrid.css';
import { Speckle } from '../speckle/Speckle';

const pushCountToArray = count => {
    let speckles = [];
    for(let i = 0; i < count; i++) {
        speckles.push(i);
    }

    return speckles;
}

const renderSpeckles = (inactive, active) => {
    let speckles = pushCountToArray(inactive);

    return speckles.map(speckle => {
        return(
            <Speckle
                key={speckle}
                count={speckle}
                active={speckle < active ? true : false}
            />
        )
    })
}

export const SpeckleGrid = (props) => (
    <div className="speckle-grid">
        {renderSpeckles(props.total, props.age)}
    </div>
)