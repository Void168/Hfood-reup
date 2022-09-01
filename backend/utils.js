import jwt from 'jsonwebtoken';
//import { OAuth2Client } from 'google-auth-library';
//import User from './models/userModel.js'

//const client = new OAuth2Client("322563161038-qfon10kuf5gvjjq8em43vc1urm5rtfnv.apps.googleusercontent.com");

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
}; 

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

// export const googleLogin = (req, res) =>{
//   const {tokenId} = req.body;
//   client.verifyIdToken({idToken: tokenId, audience: "322563161038-qfon10kuf5gvjjq8em43vc1urm5rtfnv.apps.googleusercontent.com"}).then(response => {
//     const {email_verified, name, email} = response.payload;
//     if(email_verified){
//       User.findOne({email}).exec((err, user) =>{
//         if(err){
//           return res.status(400).json({
//             error: "Co gi do sai..."
//           })
//         }else{
//           if(user){
//             const token = jwt.sign({
//               _id: user._id,
//               // eslint-disable-next-line no-undef
//             }, process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'})
//             const {_id, name, email} = user;

//             res.json({
//               token,
//               user: {_id, name, email}
//             })
//           } else {
//             // eslint-disable-next-line no-undef
//             let password = email+process.env.JWT_SIGNIN_KEY;
//             let newUser = new User({name, email, password});
//             newUser.save((err, data) =>{
//               if(err){
//                 return res.status(400).json({
//                   error: "Co gi do sai..."
//                 })
//               }
//               const token = jwt.sign({
//                 _id: data._id,
//                 // eslint-disable-next-line no-undef
//               }, process.env.JWT_SIGNIN_KEY, {expiresIn: '30d'})
//               const {_id, name, email} = newUser;
  
//               res.json({
//                 token,
//                 user: {_id, name, email}
//               })
//             })
//           }
//         }
//       })
//     }
//   })
// }
