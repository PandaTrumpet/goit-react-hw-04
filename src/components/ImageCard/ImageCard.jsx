import css from "./ImageCard.module.css";
export default function ImageCard({ image, openModal }) {
  return (
    <div>
      <img
        className={css.imageCard}
        onClick={() => openModal(image)}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}
