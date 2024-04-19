import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../showImages";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

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
    setError(false);
  };

  const handllePage = () => {
    console.log(page);
    setPage(page + 1);
  };

  // ==========================================Modal============================================================

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };
  const inputError = () => {
    toast.error("Enter the text!!!");
  };
  // ==========================================Modal============================================================

  return (
    <>
      <SearchBar
        onSubmit={handleSearch}
        inputError={inputError}
        query={query}
      />

      {images.length > 0 ? (
        <>
          <ImageGallery images={images} openModal={openModal} />
          <ImageModal
            images={images}
            open={modalIsOpen}
            closeModal={closeModal}
            selectedImage={selectedImage}
            openModal={openModal}
          />
        </>
      ) : (
        <ErrorMessage images={images} query={query} />
      )}
      {loading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={handllePage} />}
    </>
  );
}

export default App;
