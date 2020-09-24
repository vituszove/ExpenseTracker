const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.connect(db);
const connectDatebase = async () => {
 try{
      await mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true});
      console.log('MongoDB connected')
 }
 catch(err){
     console.err(err.message);
    //Exit process with failure
    process.exit(1);
 }
}

module.exports = connectDatebase