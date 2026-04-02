import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {isRootPath ? (
          <span className="site-title">
            {title}<span className="title-dot">.</span>
          </span>
        ) : (
          <Link to="/" className="site-title">
            {title}<span className="title-dot">.</span>
          </Link>
        )}
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/" className="nav-link">Posts</Link>
          <Link to="/about/" className="nav-link">About</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="social-links">
          <a href="https://github.com/EtienneMunnich" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/etiennemunnich/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://topmate.io/etienne_munnich" target="_blank" rel="noreferrer" className="social-link" aria-label="Topmate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            Topmate
          </a>
          <a href="https://builder.aws.com/community/@etiennemunnich?tab=articles" target="_blank" rel="noreferrer" className="social-link" aria-label="AWS Builder">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.75 10.05A8.74 8.74 0 0 0 12 7a8.74 8.74 0 0 0-6.75 3.05L3 7.8A11.24 11.24 0 0 1 12 4a11.24 11.24 0 0 1 9 3.8l-2.25 2.25zM12 10a5.25 5.25 0 0 0-4.05 1.875L5.7 9.6A7.74 7.74 0 0 1 12 7a7.74 7.74 0 0 1 6.3 2.6l-2.25 2.275A5.25 5.25 0 0 0 12 10zm0 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z"/></svg>
            AWS Blog
          </a>
          <a href="https://x.com/etiennemunnich" target="_blank" rel="noreferrer" className="social-link" aria-label="X / Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X
          </a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Etienne Munnich</div>
      </footer>
    </div>
  )
}

export default Layout
