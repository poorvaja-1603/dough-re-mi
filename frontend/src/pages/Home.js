import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// Gallery images — 8 items shown 2 at a time
// Gallery images — 16 items shown 8 at a time (4x2 grid)
const GALLERY_ITEMS = [
  // Slide 1
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/red_velvet_n9t2o7.avif', label: 'Red Velvet Cake', price: 399, category: 'Cakes', path: '/cakes' },
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/oatmeal_raisin_qvth4h.webp', label: 'Oatmeal Raisin', price: 99, category: 'Cookies', path: '/cookies' },
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/sugar_cookie_s2lywz.webp', label: 'Sugar Cookies', price: 99, category: 'Cookies', path: '/cookies' },
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594033/double_chocolate_cookies_tkiv9b.webp', label: 'Double Chocolate', price: 110, category: 'Cookies', path: '/cookies' },
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/pretzel_lwsjrh.webp', label: 'Pretzel', price: 120, category: 'Bakery', path: '/bakery' },
  { img: 'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/peanut_butter_cookies_jyg3wv.webp', label: 'Peanut Butter Cookie', price: 99, category: 'Cookies', path: '/cookies' },
  { img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600', label: 'Chocolate Brownie', price: 150, category: 'Bakery', path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=600', label: 'Macarons Box', price: 450, category: 'Cookies', path: '/cookies' },
  // Slide 2
  { img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600', label: 'Strawberry CheeseCake', price: 299, category: 'Cakes', path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600', label: 'Biscoff CheeseCake', price: 349, category: 'Cakes', path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', label: 'Black Forest Cake', price: 399, category: 'Cakes', path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600', label: 'Chocolate Truffle', price: 349, category: 'Cakes', path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600', label: 'French Baguette', price: 100, category: 'Bakery', path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', label: 'Buttery Croissant', price: 199, category: 'Bakery', path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600', label: 'Garlic Bread', price: 150, category: 'Bakery', path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600', label: 'ChocoChip Muffin', price: 100, category: 'Bakery', path: '/bakery' },
];

// Filler images for Hero
const HERO_IMAGES = [
  'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_1_dp5193.webp',
  'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_2_msufmz.webp',
  'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_3_cz2pou.webp',
  'https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_image_4_r6bkbc.webp'
];

export default function Home() {
  const navigate = useNavigate();
  const [bestsellers, setBestsellers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoRef = useRef(null);
  const totalSlides = Math.ceil(GALLERY_ITEMS.length / 8); // 2 slides of 8 images each

  useEffect(() => {
    API.get('/products/bestsellers')
      .then((res) => setBestsellers(res.data))
      .catch(() => {});
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Gallery interval
  useEffect(() => {
    autoRef.current = setInterval(goNext, 5000);
    return () => clearInterval(autoRef.current);
  }, [goNext]);

  const handleDotClick = (i) => {
    clearInterval(autoRef.current);
    setCurrentSlide(i);
    autoRef.current = setInterval(goNext, 5000);
  };

  const handleArrow = (fn) => {
    clearInterval(autoRef.current);
    fn();
    autoRef.current = setInterval(goNext, 5000);
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleItems = GALLERY_ITEMS.slice(currentSlide * 8, currentSlide * 8 + 8);

  return (
    <div className="page">
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-text">
          <h1>Handcrafted<br />Happiness</h1>
          <p>
            From buttery croissants to artisanal cakes, we bring the warmth of a 
            traditional bakery straight to your doorstep. Experience the art 
            of the perfect crumb.
          </p>
          <button className="btn-primary" onClick={() => navigate('/bakery')}>
            Explore Our Bakery
          </button>
        </div>
        <div className="hero-img-container">
          <img
            className="hero-img"
            src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_1_dp5193.webp"
            alt="bakery atmosphere"
          />
        </div>
      </div>

      {/* ── Category Showcase ── */}
      <div className="section-header">
        <h2 className="section-title">What are we good at?</h2>
        <div className="section-line"></div>
      </div>
      
      <div className="category-showcase">
        <div className="category-item" onClick={() => navigate('/cakes')}>
          <div className="cat-img-wrap">
            <img src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_image_4_r6bkbc.webp" alt="Cakes" />
          </div>
          <div className="cat-info">
            <span className="cat-subtitle">Sweet Indulgence</span>
            <h3>Artisan Cakes</h3>
            <p>Decadent, moist, and handcrafted for your special moments.</p>
            <span className="cat-link">Explore Collection &rarr;</span>
          </div>
        </div>

        <div className="category-item" onClick={() => navigate('/bakery')}>
          <div className="cat-img-wrap">
            <img src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_2_msufmz.webp" alt="Bakery" />
          </div>
          <div className="cat-info">
            <span className="cat-subtitle">Freshly Kneaded</span>
            <h3>Rustic Bakery</h3>
            <p>Traditional artisan breads and flaky pastries made with love.</p>
            <span className="cat-link">View Bakery &rarr;</span>
          </div>
        </div>

        <div className="category-item" onClick={() => navigate('/cookies')}>
          <div className="cat-img-wrap">
            <img src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776594032/filler_photo_3_cz2pou.webp" alt="Cookies" />
          </div>
          <div className="cat-info">
            <span className="cat-subtitle">Crunchy Delights</span>
            <h3>Gourmet Cookies</h3>
            <p>Classic favorites and bold new flavors, baked to perfection.</p>
            <span className="cat-link">Shop All Cookies &rarr;</span>
          </div>
        </div>
      </div>

      {/* ── Gallery Carousel ── */}
      <div className="gallery-section">
        <h2 className="gallery-title">Explore our varied range</h2>
        <div className="gallery-carousel">
          {/* Left arrow */}
          <button className="gallery-arrow gallery-arrow-left" onClick={() => handleArrow(goPrev)}>
            &#8249;
          </button>

          {/* 2 visible cards */}
          <div className="gallery-track">
            {visibleItems.map((item, i) => (
              <div
                key={currentSlide + '-' + i}
                className="gallery-card"
                onClick={() => navigate(item.path)}
              >
                <div className="gallery-category-tag">{item.category}</div>
                <img src={item.img} alt={item.label} />
                <div className="gallery-details">
                  <div className="gallery-name">{item.label}</div>
                  <div className="gallery-price">₹{item.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="gallery-arrow gallery-arrow-right" onClick={() => handleArrow(goNext)}>
            &#8250;
          </button>
        </div>

        {/* Dot indicators */}
        <div className="gallery-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className={`gallery-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Wavy divider + Bestsellers ── */}
      <div className="bestsellers-section-wrap">
        <svg
          viewBox="0 0 480 50"
          xmlns="http://www.w3.org/2000/svg"
          className="bestsellers-wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L0,25 Q20,5 40,25 Q60,45 80,25 Q100,5 120,25 Q140,45 160,25 Q180,5 200,25 Q220,45 240,25 Q260,5 280,25 Q300,45 320,25 Q340,5 360,25 Q380,45 400,25 Q420,5 440,25 Q460,45 480,25 L480,50 Z"
            fill="var(--brown-dark)"
          />
        </svg>

        <div className="bestsellers-inner">
          <div className="bestsellers-header">
            <span className="bestsellers-subtitle">Popular Choice</span>
            <h2>Our Bestsellers</h2>
          </div>

          <div className="bestsellers-grid">
            {bestsellers.length === 0
              ? [1, 2, 3].map((n) => (
                  <div key={n} className="bestseller-card-skeleton" />
                ))
              : bestsellers.slice(0, 4).map((product, i) => (
                  <div
                    key={product._id}
                    className="bestseller-card"
                    onClick={() => navigate(`/${product.category}`)}
                  >
                    <div className="bestseller-rank-badge">#{product.bestSellerRank || i + 1}</div>
                    <div className="bestseller-img-wrap">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="bestseller-info">
                      <h4>{product.name}</h4>
                      <p>₹{product.price}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
