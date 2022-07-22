import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
    return (
        <div className='max-w-3xl mx-auto'>
            <h2 className='text-5xl my-6 text-accent text-center'>Settings</h2>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mx-10'>
                <span className='text-xl'>Reset Password</span>
                <p className='text-xl'><Link to='/change-password' className='text-sm underline text-primary'>Reset Password</Link></p>
            </div>
        </div>
    )
}

export default Settings