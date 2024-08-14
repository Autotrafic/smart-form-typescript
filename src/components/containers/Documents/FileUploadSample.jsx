import { useState } from "react";
import { BASE_API_URL } from "../../../utils/constants";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_API_URL}/files/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" onClick={handleSubmit}>
          Upload File
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
