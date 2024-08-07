import { Hero } from "@/components/hero/Hero";
import { Catalog } from "@/components/catalog/Catalog";
import { Faq } from "@/components/faq/Faq";

export function MainPage() {
  return (
    <>
      <Hero />
      <Catalog />
      <Faq />
    </>
  );
}
