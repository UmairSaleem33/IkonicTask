const express = require('express');
require('./db/mongoose');
const unauthorizedRoutes = require("./routers/unauthorized/unauthorized.route");
const authorizedRoutes = require("./routers/authorized/authorized.route")

const port = process.env.PORT || 5000;
const app = express();


app.use(express.json());

app.use('/api',unauthorizedRoutes);
app.use('/api/auth',authorizedRoutes)

app.listen(port, process.env.APP_URL, () => {
	console.log(`Application backend is running on port ${port}`);
});
