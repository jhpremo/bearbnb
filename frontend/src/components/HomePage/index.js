import React, { useState } from 'react';
import LoginFormPage from '../LoginFormPage';
function HomePage() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div className='HomePage-wrapper'>
            <button type="button" onClick={() => setShowLogin(!showLogin)}>LogIn</button>
            {showLogin && <LoginFormPage setShowLogin={setShowLogin} />}
        </div>
    )
}

export default HomePage
