export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const handleImageUploadProduct = async (images) => {
  if (!images || images.length === 0) return [];

  return await Promise.all(
    images.map(async (file) => {
      if (file instanceof File) {
        try {
          return await toBase64(file);
        } catch (err) {
          console.error("Base64 conversion failed:", err);
          return null;
        }
      }
      return file.url || file;
    })
  ).then((uploaded) => uploaded.filter((img) => img !== null));
};


//  ! for convert into image_url to url

// export const handleImageUploadProduct = async (images) => {
//   if (!images || images.length === 0) return [];

//   return await Promise.all(
//     images.map(async (file) => {
//       if (file instanceof File) {
//         try {
//           const base64 = await toBase64(file);
//           return { url: base64 }; // Wrapping base64 string inside { url: ... }
//         } catch (err) {
//           console.error("Base64 conversion failed:", err);
//           return null;
//         }
//       }
//       return { url: file.url || file }; // Ensure existing URLs remain in { url: ... }
//     })
//   ).then((uploaded) => uploaded.filter((img) => img !== null));
// };
