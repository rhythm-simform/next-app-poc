import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies using js-cookie
    setIsLoggedIn(!!token); // Set login state based on token existence
  }, []);

  return { isLoggedIn };
};

export default useAuth;
