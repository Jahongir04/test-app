const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/test-app', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb connection is success");
}).catch((error) => {
    console.log('mongodb connection has error like ' + error);
})
app.use(cors({origin: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/auth',require('./routes/authApi'));
const PORT=process.env.PORT||3399;
app.listen(PORT, () => console.log("Server running on port= " + PORT));