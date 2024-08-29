const express = require("express");
const bcrypt = require("bcryptjs"); // Eksik
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const generateRandomAvatar = () => {
  
  return `https://www.example.com/avatar/${Math.floor(Math.random() * 1000)}`;
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu email ile daha önce kayıt yaptınız" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcıyı username ile bulma
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Kullanıcı adı ve parola yanlış" });
    }

    // Parolanın doğruluğunu kontrol etme
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Kullanıcı adı ve parola yanlış" });
    }
   
    const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role, avatar: user.avatar },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      if (user.role === "admin") {
        return res.status(200).json({ message: "Admin girişi başarılı", token });
      } else if (user.role === "user") {
        return res.status(200).json({ message: "Kullanıcı girişi başarılı", token });
      }
     
    
    // Kullanıcı bilgilerini geri döndürme
    res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
   
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
