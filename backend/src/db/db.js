import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URL}/${process.env.DBname}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error while connecting DB:", error.message);
    process.exit(1); 
  }
};

export default ConnectDB;
