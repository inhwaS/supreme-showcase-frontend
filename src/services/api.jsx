import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log('api : ', process.env.REACT_APP_API_BASE_URL);
export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${apiUrl}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
    console.log(apiUrl);
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(`${apiUrl}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
