// This file should include all of the front-end request methods to back-end.
//  Work in progress.
//
//  Following code from https://hptechblogs.com/using-json-web-token-react/
import decode from 'jwt-decode';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:8000' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch('api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            console.log(res.token)
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        let test = !!token && !this.isTokenExpired(token)
        if (test) {
          console.log("Logged In")
        } else {
          console.log("Not logged in")
        }
        return test // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
      // Send a POST request to backend logout route
      const token = this.getToken();
      if (token) {
        return this.fetch('api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({
                token
            })
        }).then(res => {
            // Clear user token and profile data from localStorage
            localStorage.removeItem('id_token');
            return Promise.resolve(res);
        })
      } else {
        console.log('already logged out')
      }

    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
            .catch(error => console.log(error) );
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
