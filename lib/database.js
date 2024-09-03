import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async()=>{
    mongoose.set('strictQuery',true);
    if(!isConnected){
        console.log("MongoDB is already Connected");
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        // await mongoose.connect(process.env.DATABASE_URL,{
        //     dbName:"Health-Core",
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // })
        isConnected = true;
        console.log("DB CONNECTION SUCCESSFULL");
    } catch (error) {
        console.log("ERROR DURING DB CONNECTION.......",error);
    }
}