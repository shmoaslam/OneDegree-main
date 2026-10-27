import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dp3myexav/image/upload";
const UPLOAD_PRESET = "onedegree";

export const uploadToCloudinary = async (file, folder = "collections") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export const handleImageUpload = async (images) => {
  return await Promise.all(
    images.map(async (file) => {
      if (file instanceof File) {
        try {
          const cloudinaryUrl = await uploadToCloudinary(file, "products");
          return { url: cloudinaryUrl };
        } catch (err) {
          console.error("Cloudinary upload failed:", err);
          return null;
        }
      }
      return { url: file.url || "" };
    })
  ).then((uploaded) => uploaded.filter((img) => img !== null));
};
