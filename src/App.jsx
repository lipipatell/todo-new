import { useState } from 'react'
import Inputbox from './Inputbox'
import Toast from './Toast';

function App() {
  const [inputValue, setInputValue] = useState('');
   const [toastMsg, setToastMsg] = useState("");

  return (
    <>

    <Toast message={toastMsg} />

    <Inputbox
      inputValue={inputValue}
      setInputValue={setInputValue}
    />
    
    </>
  )
}

export default App