const router = require("express").Router();
const prisma= require("../prisma");
const auth= require("../middleware/auth");
const authorize= require("../middleware/authorize");

router.post("/", auth, authorize(["ADMIN"]), async( req, res) => {
    const record= await Prisma.financialRecord.create ({
        data: {...req.body, userId: req.user.id }
    });
res.json(record);
});

router.get("/", auth, async (req, res) => {
    const { type, category }= req.query;

    const records = await prisma.financialRecord.findMany({
        where: {
            type, category
        }
    });
    res.json(records);
});

router.put("/:id", auth , authorize(["ADMIN"]) , async (req, res ) => {
    const record = await prisma.financialRecord.update({
        where: {id: Number(req.params.id)},
        data: req.body
    });
    res.json(record);
});

router.delete("/:id", auth, authorize(["ADMIN"]), async(req, res) => {
    await prisma.financialRecord.delete({
        where: {id: Number(req.params.id)}
    });
    res.send("Deleted");
});

module.exports= router;
