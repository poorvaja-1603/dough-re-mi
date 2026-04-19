import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// Gallery images — 8 items shown 2 at a time
const GALLERY_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600', label: 'Black Forest Cake',     path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600', label: 'Strawberry Cheesecake', path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600', label: 'Choco Chip Cookies',    path: '/cookies' },
  { img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=600', label: 'Fresh Baguette',          path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', label: 'Buttery Croissant',       path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600', label: 'ChocoChip Muffin',     path: '/bakery' },
  { img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600', label: 'Biscoff Cheesecake',   path: '/cakes' },
  { img: 'https://images.unsplash.com/photo-1590080876034-1f6fac70e09d?w=600', label: 'Peanut Butter Cookie', path: '/cookies' },
];

export default function Home() {
  const navigate = useNavigate();
  const [bestsellers, setBestsellers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoRef = useRef(null);
  const totalSlides = Math.ceil(GALLERY_ITEMS.length / 2); // 4 slides of 2 images each

  useEffect(() => {
    API.get('/products/bestsellers')
      .then((res) => setBestsellers(res.data))
      .catch(() => {});
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-scroll every 3 seconds, resets if user manually navigates
  useEffect(() => {
    autoRef.current = setInterval(goNext, 3000);
    return () => clearInterval(autoRef.current);
  }, [goNext]);

  const handleDotClick = (i) => {
    clearInterval(autoRef.current);
    setCurrentSlide(i);
    autoRef.current = setInterval(goNext, 3000);
  };

  const handleArrow = (fn) => {
    clearInterval(autoRef.current);
    fn();
    autoRef.current = setInterval(goNext, 3000);
  };

  // The two items for the current slide
  const visibleItems = GALLERY_ITEMS.slice(currentSlide * 2, currentSlide * 2 + 2);

  return (
    <div className="page">
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-text">
          <h1>Bake the<br />Cookies</h1>
          <p>We are obsessed with the crumb</p>
          <button className="btn-primary" onClick={() => navigate('/cookies')}>
            Order Now
          </button>
        </div>
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400"
          alt="cookies"
        />
      </div>

      {/* ── Gallery Carousel — 2 images at a time ── */}
      <div className="gallery-section">
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
                <img src={item.img} alt={item.label} />
                <div className="gallery-label">{item.label}</div>
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
      <div style={{ marginTop: 20 }}>
        <svg
          viewBox="0 0 480 50"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L0,30 Q60,0 120,25 Q180,50 240,25 Q300,0 360,25 Q420,50 480,30 L480,50 Z"
            fill="#3B1F0A"
          />
        </svg>

        <div className="bestsellers-inner">
          <h2>Our BestSellers</h2>
          <div className="bestsellers-grid">
            {bestsellers.length === 0
              ? [1, 2, 3].map((n) => (
                  <div key={n} className="bestseller-card" style={{ height: 130, background: '#5C2D0A' }} />
                ))
              : bestsellers.map((product, i) => (
                  <div
                    key={product._id}
                    className="bestseller-card"
                    onClick={() => navigate(`/${product.category}`)}
                  >
                    <span className="bestseller-rank">{product.bestSellerRank || i + 1}</span>
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
