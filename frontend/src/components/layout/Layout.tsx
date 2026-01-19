import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  // Page transition effect
  useEffect(() => {
    setIsPageLoading(true);

    // Small delay for exit animation
    const exitTimer = setTimeout(() => {
      setDisplayedChildren(children);
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 150);

    // Enter animation
    const enterTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, 200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimer);
    };
  }, [location.pathname, children]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main
        className={`flex-grow transition-all duration-300 ease-out ${
          isPageLoading
            ? 'opacity-0 translate-y-2'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {displayedChildren}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
