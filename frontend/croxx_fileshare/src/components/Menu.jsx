import React from 'react';
import logo from './logo.svg'
export default class Menu extends React.Component{
    render(){
        return ( 
        <div className='parent-container'>
            <div className='logo'>
                <img src={logo} alt="fileshare logo" />
             </div>
         </div>
        )
}
}