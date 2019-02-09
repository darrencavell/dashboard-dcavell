import React from "react";
import {Link} from "react-router-dom";

import './styles.css';

class Header extends React.Component {
    render(){
        return(
            <header>
                <div className="header-left">
                    <img src={"../../../img/logo.jpg"}/>
                </div>
                <div className="header-gap"></div>
                <div className="header-right">
                    {
                        localStorage.getItem('data') !== null ? (
                            <ul>
                                <li>
                                    <Link to={`/blog/1`}>Home</Link>
                                </li>
                                <li>
                                    <Link to={`/logout`}>Logout</Link>
                                </li>
                                <li>
                                    <Link to={`/blog/create`}>Create Blog</Link>
                                </li>
                            </ul>
                        ) : ( 
                            <ul>
                            <li>
                                <Link to={`/blog`}>Home</Link>
                            </li>
                                <li>
                                    <Link to={`/login`}>Login</Link>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </header>
        )
    }
}

export default Header;