const express = require('express')
const app = express()
const port = 3000
const db=require('./models/db')
const path=require('path')
const bodyParser=require('body-parser')
const mainRoutes=require('./routes/main')
const cookieParser=require('cookie-parser')
const { authenticationCookie } = require('./middleware/auth')

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(authenticationCookie('token'))
app.use(express.static(path.join(__dirname,'public')))

app.use('/',mainRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))