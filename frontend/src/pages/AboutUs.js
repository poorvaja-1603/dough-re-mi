import React from 'react';

export default function AboutUs() {
  return (
    <div className="about-page page">
      {/* About Us */}
      <div className="about-card">
        <div className="about-card-text">
          <h2>About Us</h2>
          <p>
            At Dough Re Mi, we believe great desserts bring people together. We create fresh,
            handcrafted baked goods using quality ingredients and a passion for baking. From rich
            cakes to warm breads and crunchy cookies, every treat is made to bring sweetness to
            your day.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=200"
          alt="bakery assortment"
        />
      </div>

      {/* Our Story */}
      <div className="about-card">
        <div className="about-card-text">
          <h2>Our Story</h2>
          <p>
            Dough Re Mi began with a simple love for baking and the joy of sharing homemade treats.
            What started as a small passion grew into a bakery focused on creating delicious desserts
            and baked goods that everyone can enjoy.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=200"
          alt="baking story"
        />
      </div>

      {/* Why Choose Us */}
      <div className="about-card">
        <div className="about-card-text">
          <h2>Why Choose us?</h2>
          <ul>
            <li>Freshly baked products every day</li>
            <li>Made with high-quality ingredients</li>
            <li>Wide variety of cakes, breads, and cookies</li>
            <li>Prepared with care, creativity, and love 🧡🧁</li>
          </ul>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200"
          alt="why choose us"
        />
      </div>

      {/* Contact Us */}
      <div className="about-card">
        <div className="about-card-text">
          <h2>Contact Us</h2>
          <p>
            <strong style={{ color: '#C9973A' }}>Phone No:</strong> 897XXXXXX / 879XXXXXXX
          </p>
          <p>
            <strong style={{ color: '#C9973A' }}>Email:</strong> doughremi.cakes@gmail.com
          </p>
          <p>
            <strong style={{ color: '#C9973A' }}>Address:</strong> Dough &amp; Crumb Bakery,
            Shop No. 12, Maple Plaza, Link Road, Andheri West, Mumbai, Maharashtra 400053
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200"
          alt="contact"
        />
      </div>
    </div>
  );
}
