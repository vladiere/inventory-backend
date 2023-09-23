const express = require('express');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4545;

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST, PUT');
        return res.status(200).json({});
    }

    next();
})

app.use('/api/product/', productRoute);
app.use('/api/user/', userRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json({
        message: error.message
    })
})

app.listen(PORT, () => {
    console.info(`Server listening on PORT: ${PORT}`);
});