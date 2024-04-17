import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import { fetchImages } from "../../showImages";
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSearch = async (nameImage) => {
    try {
      setLoading(true);
      setImages([]);
      const data = await fetchImages(nameImage);
      setImages(data);
      setLoading(false);
    } catch (error) {
      toast.error("This is an error!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}

      {images.length > 0 ? <ImageGallery images={images} /> : <ErrorMessage />}
    </>
  );
}

export default App;
