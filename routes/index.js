var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const eventLog = {
  events: [
    {
      atributes: {
        timestamp: "1",
        user: "Hugo",
      },
    },
    {
      atributes: {
        timestamp: "2",
        user: "Israel",
      },
    },
    {
      atributes: {
        timestamp: "3",
        user: "Anna",
      },
    },
  ],
  atributes: {
    string: "string",
    number: 10.34,
    integer: 5,
    date: new Date(),
  },
};

async function main(data) {
  return prisma.user.createMany({
    data,
  });
}

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    return res.send({ qtd: users.length, users });
  } catch(error) {
    return res.status(500).json({ message: 'Failed to get users', error });
  }
});

router.post("/", async (req, res, next) => {
  let j = 1;
  let arrayEventLog = [];
  while (j > 0) {
    arrayEventLog.push({ object: eventLog });
    j--;
  }
  let i = 1;
  while (i <= 10) {
    console.log(i);
    const response = await main(arrayEventLog);
    i++;
  }
  return res.send({ message: 'Success!' });
});

router.delete("/", async (req, res, next) => {
  const response = await prisma.user.deleteMany({});
  return res.send(response);
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  let data = { object: eventLog };
  data.object.atributes = {
    input: "5",
    type: "int",
    value: 5,
  };
  console.log(data);
  const response = await prisma.user.update({
    where: { id },
    data: data,
  });
  return res.send(response);
});

router.get("/boosted", async (req, res, next) => {
  try {
    const users = await prisma.user.getIndexes();
    return res.send({ qtd: users.length, users });
  } catch(error) {
    return res.status(500).json({ message: 'Failed to get users', error });
  }
});

module.exports = router;
