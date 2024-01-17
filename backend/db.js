const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://Foody:foody123@cluster1.3zkgdab.mongodb.net/foody?retryWrites=true&w=majority"

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log("Connected to MongoDB");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetchedData;
        global.foodCategory = foodCategoryData;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

module.exports = MongoDB;
