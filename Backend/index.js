const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT || 3000;
const express=require('express');
const mainRouter=require("./routes/index");
const cors=require('cors');

const App=express();
App.use(cors());
App.use(express.json());

App.use("/api/v1",mainRouter);

App.listen(PORT,()=>{
    console.log(`Backend is running at PORT ${PORT}`);
});
