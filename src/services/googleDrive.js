import { BASE_API_URL } from "../utils/constants";

export async function uploadFilesToDrive(files, orderData) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  orderData && formData.append("orderData", JSON.stringify(orderData));
  formData.append("folderName", orderData ? orderData.vehicle.plate : "❌ NO FOLDER NAME");

  await fetch(`${BASE_API_URL}/files/upload`, {
    method: "POST",
    body: formData,
  });
}
