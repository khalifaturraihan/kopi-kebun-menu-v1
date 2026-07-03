import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StickyNav from "@/components/StickyNav";
import SignatureSpread from "@/components/SignatureSpread";
import MenuSection from "@/components/MenuSection";
import PhotoBand from "@/components/PhotoBand";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/CategoryFilter";
import { drinks, food } from "@/lib/menu";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.column}>
      <Hero />
      <Marquee />
      <StickyNav />
      <SignatureSpread />
      <main className={styles.drinks}>
        {drinks.map((cat) => (
          <MenuSection key={cat.id} category={cat} variant="drinks" />
        ))}
      </main>
      <PhotoBand />
      <main className={styles.food}>
        {food.map((cat) => (
          <MenuSection key={cat.id} category={cat} variant="food" />
        ))}
      </main>
      <Footer />
      <CategoryFilter />
    </div>
  );
}
