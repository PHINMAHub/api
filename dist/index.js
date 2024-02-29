"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const node_schedule_1 = __importDefault(require("node-schedule"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const entry_1 = __importDefault(require("./routes/entry"));
const user_1 = __importDefault(require("./routes/user"));
const registration_1 = __importDefault(require("./routes/registration"));
const professor_1 = __importDefault(require("./routes/professor"));
const student_1 = __importDefault(require("./routes/student"));
const feed_1 = __importDefault(require("./routes/feed"));
const notification_1 = require("./services/notification");
const user_2 = require("./services/user");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = 3000;
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
const ORIGIN_URL = process.env.ORIGIN_URL || 'http://127.0.0.1:5173';
mongoose_1.default
    .connect(MONGODB_CONNECTION)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.log('Internal Server Error');
});
app.use((0, cors_1.default)({
    origin: [ORIGIN_URL],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/entry/', entry_1.default);
app.use('/user/', user_1.default);
app.use('/feed/', feed_1.default);
app.use('/registration/', registration_1.default);
app.use('/professor/', professor_1.default);
app.use('/student/', student_1.default);
node_schedule_1.default.scheduleJob('*/1 * * * *', () => {
    (0, notification_1.addReminderNotification)();
});
app.get('/', (req, res) => {
    res.send('Hello from your Node.js Express server!');
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ORIGIN_URL,
    },
});
exports.io.on('connection', (socket) => {
    socket.on('join_classes', (token) => {
        if (token == null)
            socket.to(socket.id).emit('unauthorized', { message: 'Unauthorized' });
        (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err || !user)
                socket.to(socket.id).emit('unauthorized', { message: 'Unauthorized' });
            (0, user_2.joinClass)(user, socket);
        });
    });
});
