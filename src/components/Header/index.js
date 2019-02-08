import React from "react";

import './styles.css';

class Header extends React.Component {
    render(){
        return(
            <header>
                <div className="header-left">
                    <img src={process.env.PUBLIC_URL + "img/logo.jpg"}/>
                </div>
                <div className="header-gap"></div>
                <div className="header-right">
                    <ul>
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Login</a>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;