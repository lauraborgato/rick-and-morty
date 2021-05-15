const jwt = require('jsonwebtoken');
import { Response, NextFunction } from 'express';
import { secretString } from '../helpers/utils/config';
import CustomRequest from '../model/ApiModels/customRequest';

export default function CheckAuth(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodeToken = jwt.verify(token, secretString);
    req.userData = { id: decodeToken.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
}