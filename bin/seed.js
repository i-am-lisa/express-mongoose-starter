// first check if our db is connected

require('../config/db.config.js')

const { Mongoose } = require('mongoose')
// require the model

let TodoModel = require('../models/Todo.model.js')

// insert into the model

TodoModel.insertMany( [ 
    {name: 'Groceries', description: 'Get Groceries for today'}, 
    {name: 'Module2', description: 'Teach Express, Handlebars'} 
])
    .then(() => {
        console.log('Data seeded')
        // always clode connection after seeding.
        // ,ake sure you require mongoose at the top of your file
        mongoose.connection.close()
    })
    .catch((error) =>{
        console.log('Data seeding went wrong', error)
    })
