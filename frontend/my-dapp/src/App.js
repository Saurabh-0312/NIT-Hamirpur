import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Button from "./components/Button";
import Card from "./components/Card";

const CONTRACT_ADDRESS = "0x0116686E2291dbd5e317F47faDBFb43B599786Ef";
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "_doctor", type: "address" },
      { internalType: "bool", name: "status", type: "bool" },
    ],
    name: "addDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patient", type: "address" },
      { internalType: "string", name: "_jsonData", type: "string" },
    ],
    name: "addPatientData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_patient", type: "address" },
      { internalType: "string", name: "_jsonData", type: "string" },
    ],
    name: "verifyPatientData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [verifyPatient, setVerifyPatient] = useState("");
  const [verifyData, setVerifyData] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      setContract(new ethers.Contract(CONTRACT_ADDRESS, ABI, signer));
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  };

  const addDoctor = async () => {
    if (contract) {
      await contract.addDoctor(doctor, true);
      alert("Doctor added!");
    }
  };

  const addPatientData = async () => {
    if (contract) {
      await contract.addPatientData(patient, jsonData);
      alert("Patient data added!");
    }
  };

  const verifyPatientData = async () => {
    if (contract) {
      try {
        await contract.verifyPatientData(verifyPatient, verifyData);
        alert("Valid Data");
      } catch (error) {
        alert("Invalid Data");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="p-6 text-center w-96 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold">Patient Data DApp</h1>
        {account ? (
          <p className="mt-4">Connected: {account}</p>
        ) : (
          <Button onClick={connectWallet} className="mt-4">
            Connect Wallet
          </Button>
        )}

        <div className="mt-4">
          <input
            type="text"
            placeholder="Doctor Address"
            className="p-2 border rounded"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          />
          <Button onClick={addDoctor} className="ml-2">
            Add Doctor
          </Button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Patient Address"
            className="p-2 border rounded"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Patient JSON Data"
            className="p-2 border rounded mt-2"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
          />
          <Button onClick={addPatientData} className="mt-2">
            Add Patient Data
          </Button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Verify Patient Address"
            className="p-2 border rounded"
            value={verifyPatient}
            onChange={(e) => setVerifyPatient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Verify JSON Data"
            className="p-2 border rounded mt-2"
            value={verifyData}
            onChange={(e) => setVerifyData(e.target.value)}
          />
          <Button onClick={verifyPatientData} className="mt-2">
            Verify Data
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default App;
