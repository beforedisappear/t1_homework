import styles from "@/components/productGallery/productGallery.module.scss";
import cn from "clsx";
import sneakersImg from "@/assets/images/productGallery/sneakers.jpg";

export function ProductGallery() {
  return (
    <div className={styles.product_gallery}>
      <div className={styles.product_gallery_main_photo}>
        <img src={sneakersImg} />
      </div>
      <div className={styles.product_gallery_carousel}>
        {new Array(6).fill("_").map((_, i) => (
          <div
            key={`product gallery ${i}`}
            className={cn(styles.product_gallery_carousel_img, {
              [styles.active]: i === 0,
            })}
          >
            <img src={sneakersImg} alt={`product image ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
