import React from 'react';
import logo from "./Group 3.svg";
import './menu.css';
export default class Menu extends React.Component{
    render(){
        return(
            <div className='parentContainer'>
                <div className="logo">
                    <img src={logo} alt="fileshare logo"/>
                </div>
                <div className='navigation'>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Privacy</li>
                    </ul>
                </div>
            </div>
        );
    }
}