import styles from "@/components/productGallery/productGallery.module.scss";
import cn from "clsx";
import { useState } from "react";

interface IProps {
  images: string[];
}

export function ProductGallery({ images }: IProps) {
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);

  return (
    <section
      className={styles.product_gallery}
      aria-label={"product card images slider"}
    >
      <div className={styles.product_gallery_main_photo} tabIndex={0}>
        <img
          src={images[mainPhotoIndex]}
          height={520}
          width={520}
          alt={`product main image`}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.product_gallery_carousel}>
          {images.map((el, i) => (
            <div
              key={`product gallery ${i}`}
              className={cn(styles.product_gallery_carousel_img, {
                [styles.active]: i === mainPhotoIndex,
              })}
              aria-label={`product image №${i + 1}`}
              onClick={() => setMainPhotoIndex(i)}
            >
              <img src={el} height={70} width={70} alt={`product image ${i}`} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
