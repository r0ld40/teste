import { Component } from "react";
import './style.css';

export class Button extends Component {
    
    render() {
        const { func, disabled } = this.props

        return (
            <button 
                className="buu" 
                onClick = { func } 
                disabled = { disabled }
            >
                Load more posts
            </button>
        );
    }
}