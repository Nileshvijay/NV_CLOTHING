
const UserModel = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


const createUser= (req,res) =>{
  const {name, email, age, mobile, password} = req.body; 
  // console.log(req.body) 

  bcrypt.hash(password, 10)
  .then(hash => {
      UserModel.create({name, email, age, mobile, password:hash})
      .then(user => res.json(user))
      .catch(err => res.json(err))
  }).catch(err => console.log(err.message))
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).json('Unauthorized');
      }
      // Check if password matches
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            // Incorrect password
            return res.status(401).json('Unauthorized');
          }

          // Generate JWT token
          const token = jwt.sign({ userId: user._id, email: user.email, role:user.role}, 'yourSecretKey', { expiresIn: '1d' });
          return res.json({ token });
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json('Internal Server Error');
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json('Internal Server Error');
    });
};


const logoutUser = (req, res) => {
  
  res.json({ message: 'User logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.send({ status: "User not existed" });
    }

    const token = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: "1d" });

     const  transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nileshvijay2022@gmail.com',
        pass: 'atkz dqza lhqo sbej'
      }
    });

    const mailOptions = {
      from: 'nileshvijay2022@gmail.com',
      to: user.email,  // corrected the recipient email
      subject: 'Reset your password',
      text: `Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:5173/reset-password/${user._id}/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Recovery email sent', info });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "yourSecretKey");
    if (!decoded || decoded.id !== userId) {
      return res.status(400).json({ message: 'Invalid token or user ID' });
    }

    // Find the user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash newPassword using the generated salt
    
    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token expired' });
    }
    // Handle other errors
    return res.status(500).json({ message: error.message });
  }
};

const getAllvisitors = (req,res)=>{
     UserModel.find({})
    .then(visitors=>{
     res.json(visitors);
    })
    .catch(error=>{
      console.error('Error fetching users:',error);
      res.status(500).json({error: 'Internal server Error'});
    });
}
const deleteUserById = async(req,res)=>{
  try{
    const delUser=await UserModel.findByIdAndDelete(req.params.id);
    if(!delUser){
      return res.status(404).json({message:"User doesn't exist."})
    }
    res.json(delUser)
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
}
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the role and isAdmin status
    user.role = user.role === 'user' ? 'admin' : 'user';
    user.admin = user.admin === false ? true : false;

    await user.save();
    console.log(user); // Debugging line
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


module.exports={
  createUser, 
  loginUser,
  logoutUser,
  forgotPassword,
  getAllvisitors,
  deleteUserById,
  resetPassword,
  updateUserRole
}


// const createUser = (req,res)=>{
//   const {name, age, email, password,mobile} = req.body;
//       bcrypt.hash(password, 10)
//       .then(hash => {
//           UserModel.create({name, age, email,mobile, password:hash})
//           .then(user => res.json(user))
//           .catch(err => res.json(err))
//       }).catch(err => console.log(err.message))
// }




// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);

//   // Find user by email
//   UserModel.findOne({ email })
//     .then(user => {
//       if (!user) {
//         // User not found
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
       
//       // Check if password matches
//       bcrypt.compare(password, user.password)
//         .then(isPasswordValid => {
//           if (!isPasswordValid) {
//             // Incorrect password
//             return res.status(401).json({ message: 'Unauthorized' });
//           }

//           // Generate JWT token
//           const token = jwt.sign({ email: user.email, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
//           return res.json({ token });
//         })
//         .catch(err => {
//           console.error(err);
//           return res.status(500).json({ message: 'Internal Server Error' });
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     });
// };

// module.exports = {createUser , loginUser};

