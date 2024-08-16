import React, { useState } from "react";
import Image from "next/image";

interface PassportUploadProps {
  onUpload: (data: any) => void;
}

const PassportUpload: React.FC<PassportUploadProps> = ({ onUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    try {
      // TODO: Implement image upload and parsing logic using Gemini API
      // For now, we'll simulate the parsing with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated parsed data
      const parsedData = {
        firstName: "John",
        lastName: "Doe",
        citizenshipCountry: "United States",
        birthDate: "1990-01-01",
        passportNumber: "123456789",
        placeOfBirth: "New York",
        dateOfExpiry: "2030-01-01",
        gender: "Male",
      };

      onUpload(parsedData);
    } catch (error) {
      console.error("Error parsing passport:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Upload Passport Photo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {preview && (
          <div className="mb-4">
            <Image src={preview} alt="Passport preview" width={300} height={200} />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!image || isLoading}
        >
          {isLoading ? "Processing..." : "Upload and Parse"}
        </button>
      </form>
    </div>
  );
};

export default PassportUpload;