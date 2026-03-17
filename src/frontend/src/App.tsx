import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Quote,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useActor } from "./hooks/useActor";
import { Category, useAllProducts, useAllReviews } from "./hooks/useQueries";
import type { Product, Review } from "./hooks/useQueries";

const WHATSAPP_BASE = "https://wa.me/917977433269";

function whatsappOrderLink(productName: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(`Hi AF COLLECTION, I want to order: ${productName}`)}`;
}

const CATEGORY_IMAGES: Record<string, string> = {
  [Category.clothes]: "/assets/generated/product-clothes.dim_600x600.jpg",
  [Category.sunglasses]: "/assets/generated/product-sunglasses.dim_600x600.jpg",
  [Category.watches]: "/assets/uploads/69b5c07795d991-1-1.jpg",
  [Category.caps]: "/assets/generated/product-caps.dim_600x600.jpg",
};

const CATEGORY_LABELS: Record<string, string> = {
  [Category.clothes]: "Men's Clothes",
  [Category.sunglasses]: "Sunglasses",
  [Category.watches]: "Watches",
  [Category.caps]: "Caps",
};

const SAMPLE_REVIEWS: Review[] = [
  {
    customerName: "Rahul M.",
    reviewText:
      "Amazing quality! The watch I ordered is exactly as described. Fast delivery and great packaging.",
  },
  {
    customerName: "Arjun K.",
    reviewText:
      "AF Collection has the best style picks. Ordered sunglasses and got so many compliments!",
  },
  {
    customerName: "Vikas S.",
    reviewText:
      "Premium quality caps, worth every rupee. Will definitely order again!",
  },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    name: "Slim Fit Black Blazer",
    description: "Premium Italian wool blend",
    category: Category.clothes,
    price: "",
  },
  {
    name: "Classic White Dress Shirt",
    description: "Pure cotton, slim fit",
    category: Category.clothes,
    price: "",
  },
  {
    name: "Aviator Pro Shades",
    description: "UV400 gold frame",
    category: Category.sunglasses,
    price: "",
  },
  {
    name: "Wayfarer Elite",
    description: "Polarized matte finish",
    category: Category.sunglasses,
    price: "",
  },
  {
    name: "Rolex x Day Date Quartz",
    description: "Best Quality | Quartz Movement",
    category: Category.watches,
    price: "₹1,099",
  },
  {
    name: "Green Crown Snapback",
    description: "Premium embroidered logo",
    category: Category.caps,
    price: "",
  },
  {
    name: "Monogram Fitted Cap",
    description: "Structured cotton twill",
    category: Category.caps,
    price: "",
  },
];

const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "Categories", id: "categories" },
  { label: "Products", id: "products" },
  { label: "About", id: "about" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

const MOBILE_NAV_LINKS = NAV_LINKS.slice(0, 5);

const ABOUT_STATS = [
  { num: "500+", label: "Happy Customers" },
  { num: "100%", label: "Authentic Products" },
  { num: "4", label: "Premium Categories" },
  { num: "24/7", label: "WhatsApp Support" },
];

const WATCH_IMAGES = [
  "/assets/uploads/69b5c07795d991-1-1.jpg",
  "/assets/uploads/69b5c07795d991-1.jpg",
  "/assets/uploads/69b5c077961254-2.jpg",
  "/assets/uploads/69b5c07795bbd0-3.jpg",
  "/assets/uploads/69b5c077960113-4.jpg",
  "/assets/uploads/69b5c07795ebe2-5.jpg",
];

// Nav
function Navbar({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Backdrop: closes menu when tapping outside */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        />
      )}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#006039]/95 backdrop-blur-sm border-b border-white/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <button
            type="button"
            className="font-display text-xl sm:text-2xl font-bold tracking-widest text-white cursor-pointer bg-transparent border-0 p-0"
            onClick={() => onNav("hero")}
          >
            AF COLLECTION
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid="nav.link"
                onClick={() => onNav(link.id)}
                className="text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-200 font-semibold"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#006039]/98 border-t border-white/20"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {MOBILE_NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid="nav.link"
                    onClick={() => {
                      onNav(link.id);
                      setOpen(false);
                    }}
                    style={{ position: "relative", zIndex: 60 }}
                    className="text-left text-sm tracking-widest uppercase text-white font-bold hover:text-white/70 transition-colors py-2 border-b border-white/10"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

// Hero
function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/uploads/Screenshot_2026-03-17-08-19-55-39-1.jpg')",
          filter: "brightness(1.15) contrast(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#006039]/60 via-[#006039]/35 to-[#006039]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#006039]/20 via-transparent to-[#006039]/20" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-xs sm:text-sm tracking-[0.5em] uppercase text-white/70 mb-4 font-sans"
        >
          Premium Men's Fashion
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-white mb-4 leading-none"
        >
          AF
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.4em] text-white mb-8"
        >
          COLLECTION
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-24 h-px bg-white/40 mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-sm sm:text-base text-white/80 tracking-widest font-light mb-8 font-sans"
        >
          Dress Different. Lead the Style.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={onShopNow}
            className="bg-[#006039] text-white rounded-full px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-[#00875a] transition-colors duration-200"
          >
            Shop Now
          </button>
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
            className="border border-white text-white rounded-full inline-flex items-center gap-2 px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            <SiWhatsapp size={16} />
            Order on WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/40 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronDown size={20} className="text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Categories
const CATEGORIES = [
  { key: Category.clothes, label: "Men's Clothes", subtitle: "Curated Fits" },
  { key: Category.sunglasses, label: "Sunglasses", subtitle: "Bold Frames" },
  { key: Category.watches, label: "Watches", subtitle: "Precision Crafted" },
  { key: Category.caps, label: "Caps", subtitle: "Street Icons" },
];

function Categories({ onFilter }: { onFilter: (cat: string) => void }) {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#006039] mb-3 font-sans font-semibold">
            Browse By
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
            Collections
          </h2>
          <div className="w-16 h-px bg-[#006039] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              type="button"
              key={cat.key}
              data-ocid={`category.item.${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onFilter(cat.key)}
              className="relative group cursor-pointer overflow-hidden text-left"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={CATEGORY_IMAGES[cat.key]}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#004a2b]/90 via-[#006039]/30 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-[#006039]/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white/70 text-xs tracking-widest uppercase mb-1 font-sans">
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                  {cat.label}
                </h3>
                <span className="text-xs tracking-widest uppercase text-white border-b border-white/40 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                  View Collection →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Watch Collection Featured Section
function WatchCollection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () =>
    setActiveIdx((i) => (i === 0 ? WATCH_IMAGES.length - 1 : i - 1));
  const next = () =>
    setActiveIdx((i) => (i === WATCH_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <section id="watch-collection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#006039] mb-3 font-sans font-semibold">
            Exclusive
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
            Watch Collection
          </h2>
          <p className="text-sm tracking-widest uppercase text-[#006039]/70 mt-3 font-sans">
            Precision Crafted Timepieces
          </p>
          <div className="w-16 h-px bg-[#006039] mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative overflow-hidden bg-[#f8faf9] aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={WATCH_IMAGES[activeIdx]}
                  alt={`Rolex x Day Date Quartz - view ${activeIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Discount badge */}
              <div className="absolute top-4 left-4 bg-[#006039] text-white text-xs font-bold px-3 py-1.5 tracking-widest uppercase font-sans">
                86% OFF
              </div>

              {/* Prev/Next arrows */}
              <button
                type="button"
                data-ocid="watch.secondary_button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft size={20} className="text-[#006039]" />
              </button>
              <button
                type="button"
                data-ocid="watch.primary_button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105"
              >
                <ChevronRight size={20} className="text-[#006039]" />
              </button>
            </div>

            {/* Thumbnail dots */}
            <div className="flex justify-center gap-2 mt-4">
              {WATCH_IMAGES.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  data-ocid={"watch.toggle"}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === activeIdx
                      ? "bg-[#006039] scale-125"
                      : "bg-[#006039]/25 hover:bg-[#006039]/60"
                  }`}
                />
              ))}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {WATCH_IMAGES.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Thumbnail ${i + 1}`}
                  className={`flex-shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-200 ${
                    i === activeIdx
                      ? "border-[#006039]"
                      : "border-transparent hover:border-[#006039]/40"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Watch thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[#006039] mb-2 font-sans font-semibold">
                Watch Collection
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-1">
                Rolex x Day Date Quartz
              </h3>
              <p className="text-sm tracking-widest uppercase text-[#006039]/70 font-sans">
                Best Quality
              </p>
            </div>

            <div className="w-12 h-px bg-[#006039]" />

            {/* Price block */}
            <div className="flex items-end gap-4">
              <span className="font-display text-4xl font-bold text-[#006039]">
                ₹1,099
              </span>
              <div className="flex flex-col pb-1">
                <span className="text-sm text-gray-400 line-through font-sans">
                  ₹7,399
                </span>
                <span className="text-xs font-bold text-white bg-[#006039] px-2 py-0.5 tracking-widest font-sans">
                  86% OFF
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2">
              {[
                "Premium Quartz Movement",
                "Stainless Steel Case",
                "Day-Date Display",
                "Best Quality Finish",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 text-sm text-[#1a1a1a]/80 font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006039] flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              data-ocid="watch.button"
              href={whatsappOrderLink("Rolex x Day Date Quartz - Best Quality")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 py-4 px-8 text-sm mt-2 bg-[#006039] text-white font-semibold tracking-widest uppercase hover:bg-[#00875a] transition-colors duration-200"
            >
              <SiWhatsapp size={18} />
              Order on WhatsApp
            </a>

            <p className="text-xs text-[#006039]/60 tracking-widest font-sans uppercase">
              Direct order via WhatsApp · Fast delivery
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Products
function ProductCard({ product, index }: { product: Product; index: number }) {
  const img =
    CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES[Category.clothes];
  const price = product.price || "Price on Request";

  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group bg-white border border-border hover:border-[#006039]/50 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="overflow-hidden aspect-square relative">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#006039]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className="text-xs bg-[#006039] text-white px-2 py-1 tracking-widest uppercase font-sans">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base sm:text-lg font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#006039] transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 font-sans">
          {product.description}
        </p>
        <p className="text-[#006039] font-semibold text-base mb-4 tracking-wide font-sans">
          {price}
        </p>
        <a
          data-ocid={`product.button.${index}`}
          href={whatsappOrderLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-green flex items-center justify-center gap-2 w-full py-3"
        >
          <SiWhatsapp size={16} />
          Order on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

function Products({
  activeFilter,
  onFilterChange,
}: { activeFilter: string; onFilterChange: (f: string) => void }) {
  const { data: products, isLoading } = useAllProducts();
  const displayProducts =
    products && products.length > 0 ? products : SAMPLE_PRODUCTS;

  const filtered =
    activeFilter === "all"
      ? displayProducts
      : displayProducts.filter((p) => p.category === activeFilter);

  const tabs = [
    { key: "all", label: "All" },
    { key: Category.clothes, label: "Clothes" },
    { key: Category.sunglasses, label: "Sunglasses" },
    { key: Category.watches, label: "Watches" },
    { key: Category.caps, label: "Caps" },
  ];

  return (
    <section id="products" className="py-24" style={{ background: "#f8faf9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#006039] mb-3 font-sans font-semibold">
            Handpicked For You
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a1a1a]">
            Our Products
          </h2>
          <div className="w-16 h-px bg-[#006039] mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              data-ocid="products.tab"
              onClick={() => onFilterChange(tab.key)}
              className={
                activeFilter === tab.key
                  ? "btn-green px-5 py-2 text-xs"
                  : "px-5 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-200 border border-[#006039]/30 text-[#006039] hover:border-[#006039] hover:bg-[#006039]/5"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders
              <div key={i} className="bg-white animate-pulse shadow-sm">
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-16 text-muted-foreground font-sans">
                  No products in this category yet.
                </div>
              ) : (
                filtered.map((product, i) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={i + 1}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

// About
function About() {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "#006039" }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[12vw] font-bold text-white/[0.04] tracking-widest whitespace-nowrap">
          AF COLLECTION
        </span>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-white/70 mb-3 font-sans">
              Our Story
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Crafted for the
              <span className="block text-white/80">Modern Gentleman</span>
            </h2>
            <div className="w-12 h-px bg-white/40 mb-8" />
            <p className="text-white/80 leading-relaxed text-base sm:text-lg font-sans mb-6">
              AF COLLECTION is a premium men's fashion brand crafted for the
              modern gentleman. We curate the finest clothes, accessories, and
              lifestyle products that blend style with confidence.
            </p>
            <p className="text-white/80 leading-relaxed text-base font-sans mb-8">
              Every piece is chosen to make you stand out — because true style
              is not followed, it's led.
            </p>
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#006039] font-semibold text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              <SiWhatsapp size={16} />
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/20 p-6 text-center hover:border-white/50 transition-colors duration-300"
              >
                <div className="font-display text-3xl font-bold text-white mb-2">
                  {stat.num}
                </div>
                <div className="text-xs tracking-widest uppercase text-white/60 font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reviews
const STAR_INDICES = [1, 2, 3, 4, 5];

function StarRating() {
  return (
    <div className="flex gap-1 mb-3">
      {STAR_INDICES.map((n) => (
        <Star key={n} size={14} style={{ color: "#006039", fill: "#006039" }} />
      ))}
    </div>
  );
}

function Reviews() {
  const { data: reviews } = useAllReviews();
  const displayReviews =
    reviews && reviews.length > 0 ? reviews : SAMPLE_REVIEWS;

  return (
    <section id="reviews" className="py-24" style={{ background: "#f0f7f4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#006039] mb-3 font-sans font-semibold">
            What They Say
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#004a2b]">
            Customer Reviews
          </h2>
          <div className="w-16 h-px bg-[#006039] mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.customerName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-border hover:border-[#006039]/40 transition-colors duration-300 p-6 sm:p-8 relative shadow-sm hover:shadow-md"
            >
              <Quote
                size={32}
                className="absolute top-4 right-4"
                style={{ color: "rgba(0,96,57,0.15)" }}
              />
              <StarRating />
              <p className="text-[#1a1a1a]/80 leading-relaxed text-sm sm:text-base mb-6 font-sans italic">
                "{review.reviewText}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006039] flex items-center justify-center text-white font-bold font-display text-sm">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] text-sm font-sans">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-[#006039]/70 tracking-widest font-sans">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact
function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "#006039" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/70 mb-3 font-sans">
            Reach Out
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mb-8" />
          <p className="text-white/80 text-lg mb-4 font-sans">
            Have a question or want to place a custom order?
          </p>
          <p className="text-white/80 mb-10 font-sans">
            Reach us directly on WhatsApp — we respond fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              data-ocid="contact.primary_button"
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#006039] font-semibold text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              <SiWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>
          <p className="text-white font-semibold text-xl tracking-widest font-sans">
            📱 +91 7977433269
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer({ onNav }: { onNav: (id: string) => void }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="border-t border-white/10 py-12 sm:py-16"
      style={{ background: "#004a2b" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-display text-2xl font-bold tracking-widest text-white mb-3">
              AF COLLECTION
            </div>
            <p className="text-white/60 text-sm font-sans">
              Dress Different. Lead the Style.
            </p>
            <div className="mt-4">
              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-sans"
              >
                <SiWhatsapp size={16} />
                +91 7977433269
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4 font-sans">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => onNav(link.id)}
                  className="text-left text-sm text-white/50 hover:text-white transition-colors font-sans"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4 font-sans">
              Collections
            </h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => onNav("products")}
                  className="text-left text-sm text-white/50 hover:text-white transition-colors font-sans"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40 font-sans">
          <p>© {year} AF COLLECTION. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp
function FloatingWhatsApp() {
  return (
    <motion.a
      data-ocid="whatsapp.button"
      href={WHATSAPP_BASE}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#006039] rounded-full flex items-center justify-center shadow-lg transition-colors"
      style={{
        boxShadow: "0 4px 20px rgba(0, 96, 57, 0.5)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} className="text-white" />
      <motion.span
        className="absolute inset-0 rounded-full bg-[#006039]"
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeOut",
        }}
      />
    </motion.a>
  );
}

// Main App
export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initializeStore().catch(() => {});
    }
  }, [actor]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryFilter = (cat: string) => {
    setActiveFilter(cat);
    scrollTo("products");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onNav={scrollTo} />
      <main>
        <Hero onShopNow={() => scrollTo("products")} />
        <Categories onFilter={handleCategoryFilter} />
        <WatchCollection />
        <Products
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
}
