import { useSelector } from "react-redux";
import React from 'react'; 

const App = () => {
    const authState = useSelector(state => state.authState);
    React.useEffect(() => {
        console.log(authState); 
    })
    return (
        <h2>Hi Raghavan</h2>
    )
}

export default App; 