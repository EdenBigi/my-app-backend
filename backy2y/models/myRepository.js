const itemModel = require('../models/item');
const userModel = require('../models/user');

const Item = itemModel.Item;
const User = userModel.User;


const addManyItems = async (ObjArray) => {
    let x = await (Item.insertMany(ObjArray));
    console.log(x);
    return x;
}

const getAllItems = async () => {
    const items = await Item.find();
    return items;
}

const getItem = async (theId) => {
    const item = await Item.findOne({ id: theId })
    return item;
}

const addNewItem = async (item) => {

    let x = await (new Item(item)).save();
    return x;
}
const addNewUser = async (user) => {
    console.log(user);
    let x = await (new User(user)).save();
    return x;
}


const updateItem = async (theId, item) => {
    const x = await Item.updateOne({ _id: theId }, item);
    return x;
}

const deleteItem = async (theId) => {
    const x = await Item.deleteOne({ _id: theId });
    return x;
}

const checkUser = async (email) => {
    console.log('checkUser running', email);
    let x = await (User.findOne({ email: email }));

    return x.password;
}

exports.getAllItems = getAllItems;
exports.addNewItem = addNewItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.addNewUser = addNewUser;
exports.checkUser = checkUser;
exports.addManyItems = addManyItems;
exports.getItem = getItem;