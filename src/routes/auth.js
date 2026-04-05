const router = require("express").Router();
const prisma = require ("../prisma");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

router.post("/register",async(req , res) => {
    const {name,email,password, role} = req.body;

    const hashed= await bcrypt.hash(password , 10);
    const user= await prisma.user.create({
        data: {name, email, password: hashed, role}
    });

    res.json(user);
});

router.post("/login", async (req , res) => {
    const {email, password} = req.body;

    const user= await prisma.user.findUnique({ where: {email}});
    if(!user) return res.status(404).send("User not found");

    const vaild= await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).send("Invalid Credentials");

    const token = jwt.sign(user, "secret");
    res.json({ token });
});

module.exports= router;