const mongoose = require('mongoose')

const connectDatabase = ()=>{
mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).
then(con => {
    console.log(`MongoDB databse connected with Host: ${con.connection.host}`)
})

}

module.exports = connectDatabase