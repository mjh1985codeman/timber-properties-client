import decode from 'jwt-decode';

class AuthService {
  getLoggedInUser() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }


  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  verifyToken(token) {
    try {
      const decoded = decode(token);
      const hasEmail = decoded.data.email || undefined;
      if (decoded.exp > Date.now() / 1000 && hasEmail) {
        return true;
      }
    } catch (err) {
      console.log('error with token: ' , err);
      return false;
    }
  }

  getEmailFromToken(token) {
    try {
      const decoded = decode(token);
      const hasEmail = decoded.data.email || undefined;
      if (decoded.exp > Date.now() / 1000 && hasEmail) {
        return decoded.data.email;
      }
    } catch (err) {
      return "Invalid Token. . ." + err;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  isAdmin() {
    const token = this.getToken();
    if(token) {
        const expired = this.isTokenExpired(token);
        const decodedToken = decode(token);
        const role = decodedToken.data.role;
        if(!expired && role === 'Admin') {
        return true
        }
    } else {
        return false;
    }
  };

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

const authService = new AuthService();
export default authService;