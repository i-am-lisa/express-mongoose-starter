const express = require('express')
const router = express.Router()

// grab your model
const TodoModel = require('../models/Todo.model.js')

router.get('/', (req, res) => {
    res.render('landing.hbs')
})

//handling the /todos url request from the browser

router.get('/todos', (req, res) => {
// fetch all the todos from my database
// find data

    TodoModel.find()
        .then((todos) => {
    // please create this page in your views folder
            res.render('todos.hbs', {todos})
        })
        .catch(() => {
            console.log('Something went wrong while finding')
        })
})


router.get('/todos/create', (req, res) =>{
    res.render('create-form.hbs')
})

// POST request
// body-parser libary will give you a req.body object
router.post('/todos/create', (req, res) =>{
const {myToDo, myDescription} = req.body
let myNewTodo ={
    name: myToDo,
    description: myDescription
}

    // create a new todo in your database

    TodoModel.create(myNewTodo)
        .then(()=>{
              //sends a page hbs to the user
            // res.render()

            //redirect the user to the /todos page
            // changes the url in the browser
            // like your <a> links
            //res.redirect('/todos')
                res.redirect('/todos')
              
        })
        .catch(()=>{
            console.log('something went wrong')
        })

    console.log(req.body)
})

// dynamic route

router.get('/todo/:id', (req, res)=> {
    // grab the todo id from the url
    let id = req.params.id
   
    TodoModel.findById(id)
        .then((todo) => {
            res.render('todo-detail.hbs', {todo})
        })
        .catch(() => {
            console.log('Something went wrong while getting a todo')
        })

})

//handle delete requests 
router.get('/todo/:id/delete', (req, res) => {
    let id = req.params.id

    TodoModel.findByIdAndDelete(id)
        .then(() => {
            // when deleted successfully
            // redirect the user to the /todos page

            res.redirect('/todos')
        })
        .catch(() => {
            console.log('Delete failed!')
        })


})

// handle /todos/:id/edit => show an edit form
// handle edit requests
router.get('/todo/:id/edit', (req, res) => {
    let id = req.params.id

    // get all the todo info to show on the edit form
    TodoModel.findById(id)
        .then((todo) => {
            res.render('edit-form.hbs', {todo})
        })
        .catch(() => {
            console.log('Edit fetch failed')

        })

})


// handle edit POST request
// body-parser libary will give you a req.body object
router.post('/todos/:id/edit', (req, res) =>{
    let id = req.params.id
    const {myToDo, myDescription} = req.body

    let editToDo = {
        name: myToDo,
        description: myDescription
    }
        // update todo in your database
    
        TodoModel.findByIdAndUpdate(id, editToDo)
            .then(()=>{
                //res.redirect('/todos')
                    res.redirect('/todos')
                  
            })
            .catch(()=>{
                console.log('Edit failed')
            })
    
        console.log(req.body)
    })
    


module.exports = router
