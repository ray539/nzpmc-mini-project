require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)
mongoose.connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch(e => {
    console.error(e)
  })

const schema = new mongoose.Schema({
  name: String,
  DOB: String
})

schema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id;
    delete retObj.__v;
  }
})

module.exports = mongoose.model('Person', schema)