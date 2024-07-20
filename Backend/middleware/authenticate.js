import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const jwtSecret = 'your_jwt_secret';

const authenticate = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication token is missing or invalid.' });
        }

        const token = authorizationHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error();
        }

        req.user = user;  // Attach the user object to the req object
        next();  // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};

export default authenticate;
