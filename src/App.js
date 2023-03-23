import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Attendance from './artifacts/contracts/AttendanceRegister.sol/AttendanceRegister.json';

const attendanceAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    fetchAttendance();
  })

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchAttendance() {
    if (typeof window.ethereum !== 'undefined') {
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

  async function getSignerContract() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(attendanceAddress, Attendance.abi, signer);
      return contract;
    }
  }

  async function addAttendance() {
    if (!list) return
    if (typeof window.ethereum !== 'undefined') {
      const contract = await getSignerContract();
      const transaction = await contract.add(name)
      await transaction.wait();
      fetchAttendance();
      setName('');
    }
  }

  async function reset() {
    if (typeof window.ethereum !== 'undefined') {
      const contract = await getSignerContract();
      const transaction = await contract.reset()
      await transaction.wait();
      fetchAttendance();
    }
  }

  return (
    <div className="App">
      <h1>liste de présence</h1>
      <input onChange={e => setName(e.target.value)} value={name} placeholder="name" />
      <button onClick={addAttendance}> register</button>
      <button onClick={reset}> reset</button>
      <ul>{list.filter((item) => item !== '').map(item => <li>{item}</li>)}</ul>
      <img src="../img/class2.avif" alt=''></img>
    </div>
  );
}

export default App;
