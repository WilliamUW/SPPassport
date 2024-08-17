import React, { useState } from "react";

const VerificationForm: React.FC = () => {
  const [expiryDate, setExpiryDate] = useState<string | undefined>("2024-08-16");
  const [ageVerification, setAgeVerification] = useState(21);
  const [citizenshipCountry, setCitizenshipCountry] = useState("Canada");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const generateZKProof = (message: string) => {
    alert(message);

    setVerificationResult("Generating proof...");

    setTimeout(() => {
      setVerificationResult(`Verification successful! ZK proof generated.\n\nZK Proof Hash: 0xkjshdkj`);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Verify Passport Conditions</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="expiryDate">
            Verify passport is not expired on (YYYY-MM-DD):
          </label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={() => generateZKProof(`Generating ZK Proof to verify passport is not expired on ${expiryDate}`)}
            className="btn btn-primary w-full mt-2"
          >
            Generate ZK Proof for Expiry before {expiryDate}
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="ageVerification">
            Verify age over:
          </label>
          <input
            type="number"
            id="ageVerification"
            min="0"
            max="100"
            value={ageVerification}
            onChange={e => setAgeVerification(parseInt(e.target.value) ?? 21)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={() => generateZKProof(`Generating ZK Proof to verify age over: ${ageVerification}`)}
            className="btn btn-primary w-full mt-2"
          >
            Generate ZK Proof for Age over {ageVerification}
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="citizenshipCountry">
            Verify citizenship of:
          </label>
          <select
            id="citizenshipCountry"
            value={citizenshipCountry}
            onChange={e => setCitizenshipCountry(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
          <button
            onClick={() =>
              generateZKProof(`Generating ZK Proof to verify user is a citizenship of ${citizenshipCountry}`)
            }
            className="btn btn-primary w-full mt-2"
          >
            Generate ZK Proof for {citizenshipCountry} Citizenship
          </button>
        </div>
      </form>
      {verificationResult && <div className="mt-4 p-4 bg-success text-white rounded whitespace-pre-wrap">{verificationResult}</div>}
    </div>
  );
};

export default VerificationForm;
