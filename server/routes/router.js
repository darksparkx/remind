const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const { Router } = require("express");

dotenv.config();
const router = Router();
const url = process.env.MONGOURL;
const client = new MongoClient(url);

const login = async (req, res, next) => {
    let { email } = req.body;
    const database = client.db("remind");

    const users = database.collection("users");
    await users
        .findOne({ email })
        .then((user) => {
            if (user) {
                console.log(`user ${user} found.`);
                return res.status(200).json({ user });
            } else {
                console.log(`user ${email} not found`);
                return res.status(404).json(`user ${email} not found`);
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
        });
};

const create = async (req, res, next) => {
    let { email } = req.body;
    const database = client.db("remind");

    const users = database.collection("users");
    await users
        .insertOne({
            email: email,
            notes: [],
        })
        .then((result) => {
            if (result) {
                console.log(`user ${email} created.`);
                return res.status(201).json({ result });
            } else {
                console.log(`user ${email} couldnt be created.`);
                return res.status(404).json(`user ${email} not created`);
            }
        })
        .catch((error) => {
            if (error.code === 11000) {
                return res.status(200).json(`user ${email} already exists.`);
            } else {
                console.log(error);
                return res.status(500).json(error);
            }
        });
};

const update = async (req, res, next) => {
    let { email, notes } = req.body;
    const database = client.db("remind");

    const users = database.collection("users");
    await users
        .updateOne(
            {
                email: email,
            },
            {
                $set: {
                    notes: notes,
                },
            }
        )
        .then((result) => {
            if (result) {
                console.log(`user ${email} updated.`);
                return res.status(200).json({ result });
            } else {
                console.log(`user ${email} couldnt be updated.`);
                return res.status(404).json(`user ${email} not updated`);
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
        });
};

router.post("/create", create);
router.post("/login", login);
router.post("/update", update);

module.exports = router;
