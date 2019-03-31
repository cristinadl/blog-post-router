const express = require('express')
const app = express()
const postsRouter = require('./blog-post-router')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.use('/', postsRouter)

app.listen(8080, () => {
    console.log(`Your app is running in port 8080`)
})