import { ChevronDown, Menu, Quote, Star, X } from "lucide-react";
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
  [Category.watches]: "/assets/generated/product-watches.dim_600x600.jpg",
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
    name: "Chronos Gold Watch",
    description: "Sapphire crystal, leather strap",
    category: Category.watches,
    price: "",
  },
  {
    name: "Obsidian Diver Watch",
    description: "Water resistant 200m",
    category: Category.watches,
    price: "",
  },
  {
    name: "Gold Crown Snapback",
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

const ABOUT_STATS = [
  { num: "500+", label: "Happy Customers" },
  { num: "100%", label: "Authentic Products" },
  { num: "4", label: "Premium Categories" },
  { num: "24/7", label: "WhatsApp Support" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-gold/20 shadow-gold"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <button
          type="button"
          className="font-display text-xl sm:text-2xl font-bold tracking-widest gold-gradient-text cursor-pointer bg-transparent border-0 p-0"
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
              className="text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 border-t border-gold/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid="nav.link"
                  onClick={() => {
                    onNav(link.id);
                    setOpen(false);
                  }}
                  className="text-left text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Hero
function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1200x700.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-xs sm:text-sm tracking-[0.5em] uppercase text-gold/80 mb-4 font-sans"
        >
          Premium Men's Fashion
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-widest gold-gradient-text mb-4 leading-none"
        >
          AF
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.4em] text-white mb-8"
        >
          COLLECTION
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-24 h-px gold-bg mx-auto mb-8"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-lg sm:text-xl text-white/80 tracking-widest font-light mb-12 font-sans"
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
            className="px-10 py-4 gold-bg text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-light transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:scale-105"
          >
            Shop Now
          </button>
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-gold/60 text-gold font-semibold tracking-widest uppercase text-sm hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
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
          <ChevronDown size={20} className="text-gold/60" />
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
    <section id="categories" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/70 mb-3 font-sans">
            Browse By
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Collections
          </h2>
          <div className="w-16 h-px gold-bg mx-auto mt-6" />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-gold/70 text-xs tracking-widest uppercase mb-1 font-sans">
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                  {cat.label}
                </h3>
                <span className="text-xs tracking-widest uppercase text-gold border-b border-gold/40 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
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
      className="group bg-card border border-border hover:border-gold/40 transition-all duration-300"
    >
      <div className="overflow-hidden aspect-square relative">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className="text-xs bg-black/80 border border-gold/30 text-gold px-2 py-1 tracking-widest uppercase font-sans">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-gold transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 font-sans">
          {product.description}
        </p>
        <p className="gold-text font-semibold text-base mb-4 tracking-wide font-sans">
          {price}
        </p>
        <a
          data-ocid={`product.button.${index}`}
          href={whatsappOrderLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-sm font-semibold tracking-wider uppercase hover:bg-[#1ebe5b] transition-colors duration-200"
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
    <section id="products" className="py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/70 mb-3 font-sans">
            Handpicked For You
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Our Products
          </h2>
          <div className="w-16 h-px gold-bg mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              data-ocid="products.tab"
              onClick={() => onFilterChange(tab.key)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-sans transition-all duration-200 ${
                activeFilter === tab.key
                  ? "gold-bg text-black font-semibold"
                  : "border border-border text-muted-foreground hover:border-gold/40 hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders
              <div key={i} className="bg-card animate-pulse">
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
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[12vw] font-bold text-white/[0.03] tracking-widest whitespace-nowrap">
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
            <p className="text-xs tracking-[0.4em] uppercase text-gold/70 mb-3 font-sans">
              Our Story
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Crafted for the
              <span className="block gold-gradient-text">Modern Gentleman</span>
            </h2>
            <div className="w-12 h-px gold-bg mb-8" />
            <p className="text-foreground/70 leading-relaxed text-base sm:text-lg font-sans mb-6">
              AF COLLECTION is a premium men's fashion brand crafted for the
              modern gentleman. We curate the finest clothes, accessories, and
              lifestyle products that blend style with confidence.
            </p>
            <p className="text-foreground/70 leading-relaxed text-base font-sans mb-8">
              Every piece is chosen to make you stand out — because true style
              is not followed, it’s led.
            </p>
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 gold-bg text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-light transition-all duration-300"
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
                className="border border-gold/20 p-6 text-center hover:border-gold/50 transition-colors duration-300"
              >
                <div className="font-display text-3xl font-bold gold-gradient-text mb-2">
                  {stat.num}
                </div>
                <div className="text-xs tracking-widest uppercase text-muted-foreground font-sans">
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
        <Star key={n} size={14} style={{ color: "#C9A84C", fill: "#C9A84C" }} />
      ))}
    </div>
  );
}

function Reviews() {
  const { data: reviews } = useAllReviews();
  const displayReviews =
    reviews && reviews.length > 0 ? reviews : SAMPLE_REVIEWS;

  return (
    <section id="reviews" className="py-24" style={{ background: "#060606" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/70 mb-3 font-sans">
            What They Say
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Customer Reviews
          </h2>
          <div className="w-16 h-px gold-bg mx-auto mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.customerName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border hover:border-gold/30 transition-colors duration-300 p-6 sm:p-8 relative"
            >
              <Quote
                size={32}
                className="absolute top-4 right-4"
                style={{ color: "rgba(201,168,76,0.2)" }}
              />
              <StarRating />
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base mb-6 font-sans italic">
                "{review.reviewText}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gold-bg flex items-center justify-center text-black font-bold font-display text-sm">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm font-sans">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-gold/60 tracking-widest font-sans">
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
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
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
          <p className="text-xs tracking-[0.4em] uppercase text-gold/70 mb-3 font-sans">
            Reach Out
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="w-16 h-px gold-bg mx-auto mb-8" />
          <p className="text-foreground/70 text-lg mb-4 font-sans">
            Have a question or want to place a custom order?
          </p>
          <p className="text-foreground/70 mb-10 font-sans">
            Reach us directly on WhatsApp — we respond fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              data-ocid="contact.primary_button"
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#25D366] text-white font-bold tracking-widest uppercase text-sm hover:bg-[#1ebe5b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <SiWhatsapp size={20} />
              Chat on WhatsApp
            </a>
          </div>
          <p className="text-gold font-semibold text-xl tracking-widest font-sans">
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
    <footer className="bg-black border-t border-gold/20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-display text-2xl font-bold tracking-widest gold-gradient-text mb-3">
              AF COLLECTION
            </div>
            <p className="text-muted-foreground text-sm font-sans">
              Dress Different. Lead the Style.
            </p>
            <div className="mt-4">
              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-[#1ebe5b] transition-colors font-sans"
              >
                <SiWhatsapp size={16} />
                +91 7977433269
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4 font-sans">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => onNav(link.id)}
                  className="text-left text-sm text-muted-foreground hover:text-gold transition-colors font-sans"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4 font-sans">
              Collections
            </h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => onNav("products")}
                  className="text-left text-sm text-muted-foreground hover:text-gold transition-colors font-sans"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-sans">
          <p>© {year} AF COLLECTION. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
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
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5b] transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} className="text-white" />
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
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
