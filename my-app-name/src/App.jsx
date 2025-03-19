import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '/server/server.js'

import ClaimForm from "./ClaimForm";

const App = () => {
    return (
        <div>
            <h1>Claim Verification App</h1>
            <ClaimForm />
        </div>
    );
};

export default App;


