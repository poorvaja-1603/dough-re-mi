import React from 'react';

export default function AboutUs() {
  return (
    <div className="about-page page">

      {/* ── Row 1: About Us text (left) + Image 1 (right) ── */}
      <div className="about-hero-row">
        <div className="about-text-block">
          <p className="about-label">Who We Are</p>
          <h2>About Us</h2>
          <p>
            At <strong>Dough Re Mi</strong>, we believe great desserts bring people together.
            We create fresh, handcrafted baked goods using quality ingredients and a passion
            for baking. From rich cakes to warm breads and crunchy cookies, every treat is
            made to bring sweetness to your day.
          </p>
          <p>
            Our kitchen is built on love, creativity, and an obsession with the perfect crumb.
            Whether it's a birthday cake or a morning croissant, we pour our heart into every
            single bake.
          </p>
        </div>
        <div className="about-hero-img-wrap">
          <img
            src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776595325/ChatGPT_Image_Apr_19_2026_04_08_49_PM_hrd5se.png"
            alt="Our bakery"
          />
        </div>
      </div>

      {/* ── Row 2: Image 2 (left) + Our Story text (right) ── */}
      <div className="about-story-row">
        <div className="about-story-img-wrap">
          <img
            src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776595321/ChatGPT_Image_Apr_19_2026_04_08_55_PM_ondh1z.png"
            alt="Our story"
          />
        </div>
        <div className="about-text-block">
          <p className="about-label">How It Started</p>
          <h2>Our Story</h2>
          <p>
            Dough Re Mi began with a simple love for baking and the joy of sharing homemade
            treats. What started as a small passion grew into a bakery focused on creating
            delicious desserts and baked goods that everyone can enjoy.
          </p>
          <p>
            Every recipe has been perfected over years of experimentation — sourcing the finest
            chocolate, the freshest berries, and the butteriest dough so that each bite feels
            like a warm hug.
          </p>
        </div>
      </div>

      {/* ── Row 3: Our Legacy text (left) + Image 3 (right) ── */}
      <div className="about-hero-row">
        <div className="about-text-block">
          <p className="about-label">A Tradition of Taste</p>
          <h2>Our Legacy</h2>
          <p>
            For years, Dough Re Mi has been a part of Mumbai's most cherished moments — from
            wedding dessert tables to quiet Sunday morning breakfasts. Our legacy is built on
            thousands of happy faces and the trust of families who come back, batch after batch.
          </p>
          <p>
            We take pride in keeping our recipes rooted in tradition while embracing modern
            flavours. Every loaf, every cookie, every slice tells the story of a craft passed
            down with love and perfected with passion.
          </p>
        </div>
        <div className="about-hero-img-wrap">
          <img
            src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776595318/ChatGPT_Image_Apr_19_2026_04_10_52_PM_j5slmx.png"
            alt="Our legacy"
          />
        </div>
      </div>

      {/* ── Full-width divider: Image 4 with text overlay ── */}
      <div className="about-full-img">
        <img
          src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776595318/ChatGPT_Image_Apr_19_2026_04_11_38_PM_kdoqqg.png"
          alt="Bakery atmosphere"
        />
        <div className="about-full-img-overlay">
          <p className="about-overlay-tag">Made just for you</p>
          <h3 className="about-overlay-heading">We make custom orders.</h3>
          <p className="about-overlay-sub">For your sweet tooth — you know where to find us.</p>
        </div>
      </div>

      {/* ── Row 4: Why Choose Us + Contact ── */}
      <div className="about-bottom-row">
        <div className="about-text-block about-text-block--dark">
          <p className="about-label">Our Promise</p>
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>Freshly baked products every single day</li>
            <li>Made with premium, high-quality ingredients</li>
            <li>Wide variety of cakes, breads, and cookies</li>
            <li>Prepared with care, creativity, and love 🧡</li>
          </ul>
        </div>

        <div className="about-text-block about-text-block--dark">
          <p className="about-label">Get In Touch</p>
          <h2>Contact Us</h2>
          <div className="about-contact-list">
            <div className="about-contact-item">
              <span className="about-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <span>897XXXXXX / 879XXXXXXX</span>
            </div>
            <div className="about-contact-item">
              <span className="about-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span>doughremi.cakes@gmail.com</span>
            </div>
            <div className="about-contact-item">
              <span className="about-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span>Shop No. 12, Maple Plaza, Link Road,<br/>Andheri West, Mumbai — 400053</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
