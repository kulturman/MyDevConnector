const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

app.use(cors());
app.use(express.json());

require('./startup/routes')(app);

if(process.env.NODE_ENV == 'production') {
    app.use(express.static('frontend/build'));
    app.get('*' , (req , res) => {
        res.sendFile(path.resolve(__dirname , 'frontend' , 'build' , 'index.html'));
    })
}

require('./startup/db')();
const PORT = 3001;
app.listen(PORT , () => console.log(`App listening on port ${PORT}`));