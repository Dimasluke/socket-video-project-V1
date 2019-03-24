import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/dashboard' className="navbar-brand">Perspective</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <div>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link to='/createroom' className='nav-item'>Create Room</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/login'>Login hello</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                </nav>
            </div>
        )
    }
}

export default Navbar