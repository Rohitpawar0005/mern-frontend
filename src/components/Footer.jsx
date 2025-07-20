import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <h3 className="footer-title">&copy; {new Date().getFullYear()} MERN Shop. All rights reserved.</h3>
      </div>
    </footer>
  )
}