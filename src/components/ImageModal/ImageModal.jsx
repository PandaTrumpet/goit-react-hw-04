import Modal from "react-modal";
import css from "./ImageModal.module.css";
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(60, 60, 60, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    width: "900px",
  },
};

export default function ImageModal({ open, closeModal, selectedImage }) {
  return (
    <>
      <div>
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Image Modal"
          ariaHideApp={false}
        >
          {selectedImage && (
            <>
              <img
                onClick={closeModal}
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description}
              />
              <div className={css.modalPhotoContainer}>
                <p className={css.modalText}>
                  Photo by: {selectedImage.user.name}
                </p>
                <p className={css.modalText}>
                  Instagram: {selectedImage.user.instagram_username}
                </p>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
