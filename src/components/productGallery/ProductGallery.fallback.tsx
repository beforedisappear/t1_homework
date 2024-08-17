import styles from "@/components/productGallery/productGallery.module.scss";
import cn from "clsx";

export function ProductGalleryFallback() {
  return (
    <div className={styles.product_gallery}>
      <div
        className={cn(styles.product_gallery_main_photo, styles.loading)}
      ></div>

      <div
        className={cn(styles.product_gallery_carousel, styles.loading)}
      ></div>
    </div>
  );
}
