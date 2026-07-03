import type { StaticImageData } from "next/image";
import coffeePhoto from "@/public/img/coffee.webp";
import coldbrewPhoto from "@/public/img/coldbrew.webp";
import teaPhoto from "@/public/img/tea.webp";
import mocktailPhoto from "@/public/img/mocktail.webp";
import breadPhoto from "@/public/img/bread.webp";
import noodlesPhoto from "@/public/img/noodles.webp";
import ricePhoto from "@/public/img/rice.webp";

export type MenuItem = { name: string; desc?: string; price: string };

export type Category = {
  id: string;
  name: string;
  nav: string;
  note?: string;
  photo?: StaticImageData;
  isNew?: boolean;
  items: MenuItem[];
};

export type NumberedCategory = Category & { num: string };

const rawData: Category[] = [
  { id: "signature", name: "Signature", nav: "Signature", items: [
    { name: "Kopi Susu Gula Aren", price: "27K" },
    { name: "Kopi Susu Kebun Pandan", price: "27K" },
  ]},
  { id: "coffee", name: "Coffee", nav: "Coffee", note: "Reguler / Grande", photo: coffeePhoto, items: [
    { name: "Espresso", price: "18K" },
    { name: "Americano / Long Black", desc: "Hot / Iced", price: "25K" },
    { name: "Piccolo", desc: "Hot", price: "24K" },
    { name: "Cappuccino / Latte", desc: "Hot / Iced", price: "28K" },
    { name: "Latte Flavour", desc: "Caramel / Hazelnut / Vanilla", price: "30K" },
    { name: "Café Latté Oatside", desc: "Hot / Iced", price: "28 / 38K" },
    { name: "Moccachino", desc: "Hot / Iced", price: "29K" },
    { name: "Sweet Baileys", desc: "Non-alcohol · Hot / Iced", price: "32K" },
  ]},
  { id: "manualbrew", name: "Manual Brew", nav: "Manual", note: "Tubruk · V60 · Vietnam Drip · Japanese", items: [
    { name: "Reguler Beans", price: "25K" },
    { name: "Guest Beans", price: "30K" },
  ]},
  { id: "coldbrew", name: "Cold Brew", nav: "Cold Brew", note: "Botol siap minum", photo: coldbrewPhoto, items: [
    { name: "Mix Berry", price: "30K" },
    { name: "Pomegranate", price: "30K" },
    { name: "Lychee & Peach", price: "30K" },
  ]},
  { id: "bottle", name: "Bottle Package", nav: "Bottle", note: "500 ml / 1000 ml", items: [
    { name: "Americano", price: "40 / 75K" },
    { name: "Kopi Susu Gula Aren / Pandan", price: "45 / 85K" },
    { name: "Chocolate / Taro / Red Velvet / Greentea", price: "50 / 90K" },
  ]},
  { id: "tea", name: "Tea", nav: "Tea", photo: teaPhoto, items: [
    { name: "Sweet Tea", desc: "Hot / Iced", price: "10K" },
    { name: "Lemon Tea", desc: "Hot / Iced", price: "22K" },
    { name: "Lychee Tea", desc: "Hot / Iced", price: "24K" },
    { name: "Lychee Tea Yakult", desc: "Hot / Iced", price: "27K" },
  ]},
  { id: "noncoffee", name: "Non-Coffee", nav: "Non-Coffee", items: [
    { name: "Mineral Water", price: "10K" },
    { name: "Coffee Beer", desc: "Non-alcohol · Iced", price: "20K" },
    { name: "Avocado Latte", desc: "Hot / Iced", price: "26K" },
    { name: "Taro Latte", desc: "Hot / Iced", price: "26K" },
    { name: "Chocolate Latte", desc: "Hot / Iced", price: "27K" },
    { name: "Red Velvet Latte", desc: "Hot / Iced", price: "27K" },
    { name: "Strawberry Latte", desc: "Iced", price: "27K" },
    { name: "Green Tea Latte", desc: "Hot / Iced", price: "29K" },
  ]},
  { id: "mocktail", name: "Mocktail", nav: "Mocktail", isNew: true, photo: mocktailPhoto, items: [
    { name: "Mont Blanc", price: "32K" },
    { name: "Berrycano", price: "29K" },
    { name: "Black Lemongrass", price: "30K" },
    { name: "Orange Deluxe", desc: "Iced", price: "25K" },
    { name: "Black Sunkist", desc: "Iced", price: "25K" },
    { name: "Green Dewata", desc: "Iced", price: "25K" },
    { name: "Strawberry Sparkling", desc: "Iced", price: "26K" },
    { name: "American Squash", desc: "Coffee Iced", price: "27K" },
  ]},
  { id: "hotsnack", name: "Hot Snack", nav: "Snack", photo: breadPhoto, items: [
    { name: "Mix Platter", desc: "French fries, sosis & chicken karage", price: "35K" },
    { name: "Singkong Renyah", desc: "Aren + cinnamon / Keju", price: "16–18K" },
    { name: "Soft Cireng", desc: "Keju / Ayam / Ayam Pedas", price: "21K" },
    { name: "Cireng Kebun", price: "19K" },
    { name: "Ekado Udang", desc: "Goreng / Kukus", price: "20K" },
    { name: "Roti Bakar / Kukus", desc: "Single topping · meses, keju, choco, tiramisu", price: "18–24K" },
    { name: "Roti Double Topping", desc: "Keju + C. crunchy / Tiramisu", price: "27K" },
    { name: "Rosang Bakar", desc: "Roti pisang · meses + keju", price: "20K" },
    { name: "Pisang Goreng / Bakar", desc: "8 topping pilihan", price: "18–24K" },
    { name: "Dimsum", desc: "Original, saus mentai, nori", price: "16–20K" },
    { name: "Risoles Smoke Beef", desc: "Cheesy mayo", price: "18K" },
    { name: "Risoles Rogout Ayam", price: "18K" },
    { name: "Tahu Crunchy / Tahu Bakso", price: "18K" },
    { name: "Pangsit Goreng Ayam", price: "18K" },
    { name: "Dumpling Keju", price: "18K" },
    { name: "French Fries", desc: "Original / BBQ", price: "23–24K" },
    { name: "Sosis Bakar", desc: "+ French fries", price: "20 / 30K" },
    { name: "Mositang", desc: "Mozarela sosis kentang", price: "17K" },
    { name: "Churros", desc: "Cinnamon / cokelat", price: "22–24K" },
    { name: "Donat Kampung", desc: "Cinnamon, choco, meses, keju", price: "22–27K" },
    { name: "Siomay", desc: "+ Pangsit goreng / Telur", price: "25 / 28K" },
    { name: "Gyoza", desc: "Original / Saus mentai", price: "25–27K" },
  ]},
  { id: "noodles", name: "Noodles", nav: "Noodles", photo: noodlesPhoto, items: [
    { name: "Mie Brutal", desc: "Goreng / Godok", price: "38K" },
    { name: "Kwetiaw Brutal", desc: "Goreng / Godok", price: "38K" },
    { name: "Inkar", desc: "Indomie katsu kari", price: "33K" },
    { name: "Inlor", desc: "Indomie telor", price: "20K" },
    { name: "Imbas", desc: "Indomie telor bakso", price: "22K" },
    { name: "Internet", desc: "Indomie telor kornet keju", price: "25K" },
  ]},
  { id: "rice", name: "Rice & Nasi", nav: "Rice", photo: ricePhoto, items: [
    { name: "Chicken Salted Egg", desc: "Telur + iced sweet tea", price: "33K" },
    { name: "Ayam Goreng Kemangi", desc: "+ Nasi · tahu / tempe / tumis", price: "39 / 44K" },
    { name: "Ayam Serundeng", desc: "+ Nasi · tahu / tempe / tumis", price: "35 / 40K" },
    { name: "Bebek Sambal Matah", desc: "+ Nasi", price: "50K" },
    { name: "Soto Betawi", desc: "+ Nasi", price: "38 / 45K" },
    { name: "Rice Box Chicken Geprek", desc: "Sweet iced tea", price: "30 / 33K" },
    { name: "Rice Box Chicken Teriyaki", desc: "Sweet iced tea", price: "30 / 33K" },
    { name: "Chicken Karage", desc: "Nasi / French fries", price: "29 / 33K" },
    { name: "Chicken Katsu", desc: "Saus kari / teriaki / mozarella", price: "29–35K" },
    { name: "Sei Sapi", desc: "Ice sweet tea", price: "37K" },
  ]},
  { id: "burger", name: "Burger & Hotdog", nav: "Burger", items: [
    { name: "Cheese Burger", desc: "+ French fries", price: "25 / 35K" },
    { name: "Hotdog", desc: "+ French fries", price: "25 / 35K" },
  ]},
  { id: "extra", name: "Extra & Add-ons", nav: "Extra", items: [
    { name: "Shot Coffee / Syrup", price: "5K" },
    { name: "Simple Syrup, Aren, Pandan", price: "2–3K" },
    { name: "Ice", price: "2K" },
    { name: "Milk / Oatside", desc: "Hot / Cold", price: "10 / 15K" },
    { name: "Mozarella / Nasi / Telur", price: "5K" },
  ]},
];

export const categories: NumberedCategory[] = rawData.map((c, i) => ({
  ...c,
  num: String(i + 1).padStart(2, "0"),
}));

const drinkIds = ["coffee", "manualbrew", "coldbrew", "bottle", "tea", "noncoffee", "mocktail"];
const foodIds = ["hotsnack", "noodles", "rice", "burger", "extra"];

export const signature = categories.find((c) => c.id === "signature")!;
export const drinks = categories.filter((c) => drinkIds.includes(c.id));
export const food = categories.filter((c) => foodIds.includes(c.id));

export const marqueeText =
  [
    "Kopi Susu Gula Aren",
    "Kebun Pandan",
    "V60 Manual Brew",
    "Cold Brew Lychee",
    "Avocado Latte",
    "Pisang Goreng",
    "Dimsum Mentai",
    "Mie Brutal",
    "Soto Betawi",
    "Churros",
    "Green Tea Latte",
    "Sei Sapi",
  ].join("   ✦   ") + "   ✦   ";
