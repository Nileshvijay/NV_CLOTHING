const router = require('../index');
const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Create User
const createUser = (req, res) => {
  const { name, email, age, mobile, password, role } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name, email, age, mobile, password: hash, role })
        .then(user => res.json(user))
        .catch(err => res.json(err));
    })
    .catch(err => console.log(err.message));
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json('Unauthorized');
      }

      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(401).json('Unauthorized');
          }

          const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, 'yourSecretKey', { expiresIn: '1d' });
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

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'User logged out successfully' });
}; 

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });

    const mailOptions = {
      from: 'youremail@gmail.com',
      to: user.email,
      subject: 'Reset your password',
      text: `Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:5173/reset-password/${user._id}/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ message: 'Recovery email sent', info });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Visitors
const getAllVisitors = (req, res) => {
  UserModel.find({})
    .then(visitors => {
      res.json(visitors);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server Error' });
    });
};

// Delete User By ID
const deleteUserById = async (req, res) => {
  try {
    const delUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!delUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    res.json(delUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User Role
const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = user.role === 'user' ? 'admin' : 'user';
    user.admin = user.admin === false ? true : false;

    await user.save();
    console.log(user);
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getAllVisitors,
  deleteUserById,
  updateUserRole
};
