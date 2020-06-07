import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const renderOptions = (options) => (
    options.map(option => {
        return ( 
            <span 
                className="select-option-li"
                style={{display: 'block'}} 
            >
                - {option.name}
            </span> 
        )
    }) 
)

const ItemContainer = ({items}) => {
    return (
        <ol>
            {items.map(({id, name, select_options}) => { 
                return (
                    <li key={uuidv4()}>
                        {name}
                        {select_options ? renderOptions(select_options) : null}
                    </li>
                )
            })}
        </ol>
    );
}

export default ItemContainer;