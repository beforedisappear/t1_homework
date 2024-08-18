import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/hero/Hero";
import { Catalog } from "@/components/catalog/Catalog";
import { Faq } from "@/components/faq/Faq";

export function MainPage() {
  return (
    <>
      <Helmet>
        <title>Catalog | Goods4you</title>
      </Helmet>
      <Hero />
      <Catalog />
      <Faq />
    </>
  );
}
