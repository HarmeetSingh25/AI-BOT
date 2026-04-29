import {Router} from 'express';
const Authroutes = Router();

Authroutes.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
Authroutes.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send the token to the client
    res.json({ token });
  }
);

export default Authroutes;