const User =  require("../models/users.models")
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');


async function login({ username, password }, callback) {
    const user = await User.findOne({ username });
  
    if (user != null) {
      if (bcrypt.compareSync(password, user.password)) {
        // Tính thời gian hết hạn (ví dụ: 1 giờ sau)
        const expiresIn = 300; // Độ dài của token trong giây (ví dụ: 1 giờ)
        const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
  
        // Tạo token với thông tin thời gian hết hạn
        const tokenData = {
          data: user, // Dữ liệu muốn chứa trong token
          exp: expirationTime // Thời gian hết hạn của token
        };
  
        const token = jwt.sign(tokenData, "Snippet_SceretKey");
  
        return callback(null, { ...user.toJSON(), token, expiresIn: expirationTime });
      } else {
        return callback({
          message: "Invalid username or password",
        });
      }
    } else {
      return callback({
        message: "Invalid username or password",
      });
    }
  }
  

async function register(params, callback) {
    if (params.username === undefined) {
        return callback({ message: "Yêu cầu tên người dùng" });
    }
    try {
        const user = new User(params);
        const response = await user.save();
        return callback(null, response);
    } catch (error) {
        return callback(error);
    }
}


module.exports = {
    login, register
}