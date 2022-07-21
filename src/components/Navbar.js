import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import navLogo from '../assets/navlogo.png'
import auth from '../firebase.init'
import { signOut } from 'firebase/auth';
import { ClipLoader } from 'react-spinners'

const Navbar = () => {
    const menuBar = <>
        <li><Link to="/item1">Item 1</Link></li>
        <li><Link to="/item2">Item 2</Link></li>
        <li><Link to="/item3">Item 3</Link></li>
        <li><Link to="/item4">Item 4</Link></li>
        <li><Link to="/item5">Item 5</Link></li>
    </>

    const [user, loading] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
    };

    // loadings //
    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={loading} size={150} />
        </div>
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuBar}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img src={navLogo} alt="brand" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuBar}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" alt='owner' />
                            </div>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="settings">Settings</Link></li>
                            <li><button onClick={logout}>Log out</button></li>
                        </ul>
                    </div> :

                    <Link to="/security"><button className='btn btn-ghost'>Login</button></Link>
                }
            </div>
        </div>

    )
}

export default Navbar