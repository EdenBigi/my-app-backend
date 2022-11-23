// CONTROLLER

const express = require('express');
const router = express.Router();
const myrepository = require('../models/myRepository');


// const itemModel = require('../models/item');
// const Item = itemModel.Item;
// http://localhost:5051/api/items
router.get("/", async (req, res) => {
    const items = await myrepository.getAllItems();
    res.json(items);
});

router.get('/:id', async (req, res) => {
    const item = await myrepository.getItem(req.params.id);
    res.json(item);

});

router.post("/", async (req, res) => {
    // const newItem = new Item(req.body);
    // const item = await newItem.save();
    const item = await myrepository.addNewItem(req.body);
    console.log("---", req.body);
    return res.json(item);
});



router.put("/:id", async (req, res) => {
    // const item = await Item.updateOne({ _id: req.params.id }, req.body);
    const item = await myrepository.updateItem(req.params.id, req.body);
    res.send("updated");

});

router.delete("/:id", async (req, res) => {
    // const item = await Item.deleteOne({ _id: req.params.id });
    const item = await myrepository.deleteItem(req.params.id);
    res.json("deleted");
});





module.exports = router;