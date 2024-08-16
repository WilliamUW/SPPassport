import React, { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, Part } from "@google/generative-ai";

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

    alert(`Using Gemini 1.5 Pro to parse your passport... \n\nPlease wait up to 30 seconds!`)
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(",")[1];

        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });
        const prompt = `System Prompt for Passport Photo Parsing

User Input: Upload a passport photo image.

Task: Parse the image and extract the following information in JSON format:

{
  "firstName": "string",
  "lastName": "string",
  "citizenshipCountry": "string",
  "birthDate": "YYYY-MM-DD",
  "passportNumber": "string",
  "placeOfBirth": "string",
  "dateOfExpiry": "YYYY-MM-DD",
  "gender": "string"
}`;
        const image: Part = {
          inlineData: {
            data: base64Image || "",
            mimeType: "image/png",
          },
        };

        const result = await model.generateContent([prompt, image]);
        console.log(result.response.text());

        const generatedContent = result.response.text().replaceAll("```", "").replaceAll("json", "");
        const parsedData = JSON.parse(generatedContent);
        onUpload(parsedData);
      };
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
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        {preview && (
          <div className="mb-4">
            <Image src={preview} alt="Passport preview" width={300} height={200} />
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!image || isLoading}>
          {isLoading ? "Processing..." : "Upload and Parse"}
        </button>
      </form>
    </div>
  );
};

export default PassportUpload;
