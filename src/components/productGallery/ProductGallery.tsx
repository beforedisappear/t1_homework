import styles from "@/components/productGallery/productGallery.module.scss";
import cn from "clsx";
import sneakersImg from "@/assets/images/productGallery/sneakers.jpg";

export function ProductGallery() {
  return (
    <section className={styles.product_gallery}>
      <div className={styles.product_gallery_main_photo}>
        <img
          src={sneakersImg}
          height={520}
          width={520}
          alt={`product main image`}
        />
      </div>
      <div className={styles.product_gallery_carousel}>
        {new Array(6).fill("_").map((_, i) => (
          <div
            key={`product gallery ${i}`}
            className={cn(styles.product_gallery_carousel_img, {
              [styles.active]: i === 0,
            })}
          >
            <img
              src={sneakersImg}
              height={70}
              width={70}
              alt={`product image ${i}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
