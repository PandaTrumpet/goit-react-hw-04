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
  const [page, setPage] = useState(1);
  const [query, setQuuery] = useState("");

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);

        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
        setLoading(false);
      } catch (error) {
        toast.error("This is an error!");
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleSearch = async (newQuery) => {
    setQuuery(newQuery);
    setPage(1);
    setImages([]);
  };
  const handllePage = () => {
    console.log(page);
    setPage(page + 1);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}

      {images.length > 0 ? <ImageGallery images={images} /> : <ErrorMessage />}
      {images.length > 0 && <button onClick={handllePage}>Load more</button>}
    </>
  );
}

export default App;
