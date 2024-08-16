"use client"

import React, { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "~~/components/ConnectWallet";
import PassportInfo from "~~/components/PassportInfo";
import PassportUpload from "~~/components/PassportUpload";
import {Address} from "~~/components/scaffold-eth";
import VerificationForm from "~~/components/VerificationInfo";


const Home: React.FC = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [step, setStep] = useState(2);
  const [passportData, setPassportData] = useState(null);

  const handlePassportUpload = (data) => {
    setPassportData(data);
    setStep(3);
  };

  const handlePassportInfoSubmit = () => {
    setStep(4);
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <h1 className="text-center text-4xl font-bold mb-8">SP Passport</h1>

      {step === 1 && !isConnected && (
        <ConnectWallet onConnect={() => setStep(2)} />
      )}

      {step === 2 && (
        <PassportUpload onUpload={handlePassportUpload} />
      )}

      {step === 3 && passportData && (
        <PassportInfo data={passportData} onSubmit={handlePassportInfoSubmit} />
      )}

      {step === 4 && (
        <VerificationForm />
      )}

      <div className="mt-8 text-center">
        <p>Connected Address:</p>
        <Address address={connectedAddress} />
        <p>Step: {step}</p>
      </div>
    </div>
  );
};

export default Home;