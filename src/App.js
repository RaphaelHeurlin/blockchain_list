import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Attendance from './artifacts/contracts/AttendanceRegister.sol/AttendanceRegister.json';

const attendanceAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchGreeting();
  }, [])

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(attendanceAddress, Attendance.abi, provider);
      try {
        const data = await contract.get();
        setList(data);
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  async function addAttendance() {
    if (!list) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(attendanceAddress, Attendance.abi, signer);
      const transaction = await contract.add(name)
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <p>{list}</p>
      <h1>liste de présence</h1>
      <input onChange={e => setName(e.target.value)} placeholder="name" />
      <button onClick={addAttendance}> register</button>
      <img src="../img/class2.avif" alt=''></img>
    </div>
  );
}

export default App;
