import {loginService , registerService} from './auth.service.js';



const login = (req, res) => {
  const { email, password } = req.body;
  // Call the login service with the email and password
  loginService(email, password)
    .then((result) => {
      // Handle successful login, e.g., send a token or user data
    
    res.cookie('token', result.refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    

      res.status(200).json({ message: 'Login successful', accessToken: result.token });
    })
    .catch((error) => {
      // Handle login errors, e.g., invalid credentials
      res.status(401).json({ message: 'Login failed', error: error.message });
    });
};

const register = (req, res) => {
  const { name, email, password } = req.body;
  // Call the register service with the user details
  registerService(name, email, password)
    .then((user) => {
      // Handle successful registration
      res.status(201).json({ message: 'User registered successfully', user });
    })
    .catch((error) => {
      // Handle registration errors
      res.status(400).json({ message: 'Registration failed', error: error.message });
    });
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.token;   
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    // Verify the refresh token and generate a new access token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
          console.error('Refresh token verification failed:', err);
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: newAccessToken });
    });
};


const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

const me = (req, res) => {
  console.log('Current user:', req.user);
    res.status(200).json({ message: 'Current user details', user: req.user });
};

export {login, register, refreshToken, logout, me};