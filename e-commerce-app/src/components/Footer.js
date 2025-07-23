import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h4>About</h4>
          <p>
            Videoteka is a modern platform where users can browse, rent, or sell movies, musics & audios online with ease. 
            We aim to bring the classic movie, music and audio rental experience to the digital age.
          </p>
        </div>

        <div className="footer-right">
          <h4>QUICK LINKS</h4>
          <ul className="footer-links">
            <li><Link to="/home">Browse</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Videoteka. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
