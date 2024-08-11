import './style.css';
import React from 'react';

const Button = ({ text, onClick, disabled }) => {
    return (
        <button 
            className="button" 
            onClick = { onClick } 
            disabled = { disabled }
        >
            {text}
        </button>
    );
}

export default Button;