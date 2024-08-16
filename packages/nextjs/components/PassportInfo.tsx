import React, { useState } from "react";

interface PassportData {
  firstName: string;
  lastName: string;
  citizenshipCountry: string;
  birthDate: string;
  passportNumber: string;
  placeOfBirth: string;
  dateOfExpiry: string;
  gender: string;
}

interface PassportInfoProps {
  data: PassportData;
  onSubmit: () => void;
}

const PassportInfo: React.FC<PassportInfoProps> = ({ data, onSubmit }) => {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement logic to save the confirmed/edited data
    onSubmit();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Confirm Passport Information</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {Object.entries(editedData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-full">
          Confirm and Continue
        </button>
      </form>
    </div>
  );
};

export default PassportInfo;