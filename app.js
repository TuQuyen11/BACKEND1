const express = require("express");
const cors = require("cors");
//6
const ApiError = require("./app/api-error");
const app = express();
//5
const contactsRouter = require("./app/routes/contact.route");
app.use("/api/contacts", contactsRouter);
//6
// Chạy khi không có route định nghĩa nào
app.use((req, res, next) => {
	return next(new ApiError(404, "Resource not found"));	
});
app.use((err, req, res, next) => {
	return res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});
//6
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application."});
});
app.listen(3000, function(){
	console.log('Running!');
})
module.exports = app;

