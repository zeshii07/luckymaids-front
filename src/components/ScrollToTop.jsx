import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0) instantly jumps to the top of the page
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything on the screen
}