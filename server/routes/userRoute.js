import express from 'express';
import { register,login,saveUserAddress,getUserAddress , getAllUsers} from '../controlers/authControlers.js';

const router =express.Router();



router.post('/register',register); 
router.get('/getAllUsers',getAllUsers);
router.post('/login',login); 
router.get('/profileData/:id',getUserAddress);
router.post('/profile',saveUserAddress )
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});


export default router;