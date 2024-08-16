"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "~~/components/ConnectWallet";
import PassportInfo from "~~/components/PassportInfo";
import PassportUpload from "~~/components/PassportUpload";
import VerificationForm from "~~/components/VerificationInfo";
import { Address } from "~~/components/scaffold-eth";

const Home: React.FC = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [step, setStep] = useState(2);
  const [passportData, setPassportData] = useState(null);

  const handlePassportUpload = data => {
    setPassportData(data);
    setStep(3);
  };

  const handlePassportInfoSubmit = () => {
    setStep(4);
  };

  const steps = [
    { title: "Connect Wallet", component: <ConnectWallet onConnect={() => setStep(2)} /> },
    { title: "Upload Passport", component: <PassportUpload onUpload={handlePassportUpload} /> },
    { title: "Confirm Passport Information", component: <PassportInfo data={passportData} onSubmit={handlePassportInfoSubmit} /> },
    { title: "Verify Passport Conditions", component: <VerificationForm /> },
  ];

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <h1 className="text-center text-4xl font-bold mb-8">SP Passport</h1>

      <div className="w-full max-w-3xl">
        {steps.map((element, index) => (
          <div key={index + 1} className="mb-4">
            <div
              className={`collapse collapse-arrow ${step === index ? "collapse-open" : "collapse-close"} bg-base-200`}
            >
              <input type="radio" name="my-accordion-2" checked={step === (index + 1)} readOnly onClick={() => setStep(index + 1)}/>
              <div className="collapse-title text-xl font-medium">
                Step {index + 1}: {element.title}
              </div>
              {/* <div className="collapse-content">{step === index && step.component}</div> */}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && !isConnected && <ConnectWallet onConnect={() => setStep(2)} />}

      {step === 2 && <PassportUpload onUpload={handlePassportUpload} />}

      {step === 3 && passportData && <PassportInfo data={passportData} onSubmit={handlePassportInfoSubmit} />}

      {step === 4 && <VerificationForm />}

      <div className="mt-8 text-center">
        <p>Connected Address:</p>
        <Address address={connectedAddress} />
        <p>Step: {step}</p>
      </div>
    </div>
  );
};

export default Home;
