import axios from "axios";
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
axios.defaults.baseURL = "https://api.unsplash.com/";

const MyAccess = "cIUf9bXb36_1RvGK2bM3pRL6HteZFy7ObUmepTTvDDE";

export const fetchImages = async (nameImage, currentPage) => {
  const response = await axios.get(`search/photos/?client_id=${MyAccess}`, {
    params: {
      page: currentPage,
      query: nameImage,
      per_page: 12,
    },
  });
  console.log(response.data.results);
  return response.data.results;
};
