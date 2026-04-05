const router = require("express").Router();
const prisma= require("../prisma");
const auth= require("../middleware/auth");
const authorize= require("../middleware/authorize");
const recordSchema = require("../validation/record");

router.post("/", auth, authorize(["ADMIN"]), async (req, res) => {
  const result = recordSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error.errors
    });
  }

  const record = await prisma.financialRecord.create({
    data: { ...result.data, userId: req.user.id }
  });

  res.json({ success: true, data: record });
});

//Analyst + Admin can view
router.get("/", auth, authorize(["ANALYST","ADMIN"]) ,async (req, res) => {
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
