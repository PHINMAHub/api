"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const entry_1 = __importDefault(require("./routes/entry"));
const user_1 = __importDefault(require("./routes/user"));
const registration_1 = __importDefault(require("./routes/registration"));
const professor_1 = __importDefault(require("./routes/professor"));
const student_1 = __importDefault(require("./routes/student"));
const app = (0, express_1.default)();
const port = 3000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
mongoose_1.default
    .connect(MONGODB_CONNECTION)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.log(error);
});
app.use((0, cors_1.default)({
    origin: 'localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/entry/', entry_1.default);
app.use('/user/', user_1.default);
app.use('/registration/', registration_1.default);
app.use('/professor/', professor_1.default);
app.use('/student/', student_1.default);
app.get('/', (req, res) => {
    res.send('Hello from your Node.js Express server!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
