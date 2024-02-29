"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotification = exports.addTaskNotification = exports.addReminderNotification = void 0;
const class_1 = require("../models/classModel/class");
const user_1 = require("../models/user");
const notification_1 = require("../models/notification");
const __1 = require("..");
const addReminderNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
        const checkResult = yield class_1.Check.find({ dueDate: { $gte: Date.now(), $lte: oneHourLater } }).populate({ path: 'class', populate: { path: 'students' } });
        for (const classObj of checkResult) {
            const header = `Reminder: ${classObj.postTitle}`;
            const link = classObj._id.toString();
            const reminderExists = yield notification_1.NotificationHolder.exists({ header: header, link: link });
            if (!reminderExists) {
                const description = classObj.postDescription;
                const classID = classObj.class._id;
                const reminder = yield new notification_1.NotificationHolder({
                    header,
                    description,
                    link,
                    class: classID,
                }).save();
                for (const student of classObj === null || classObj === void 0 ? void 0 : classObj.class.students) {
                    const studentObj = yield user_1.UserCredentials.findOne({ studentInformation: student._id });
                    if (studentObj) {
                        __1.io.emit('reminder_notification', reminder);
                        studentObj.notification.push(reminder._id);
                        yield studentObj.save();
                    }
                }
            }
        }
        const connectResult = yield class_1.Connect.find({ dueDate: { $gte: Date.now(), $lte: oneHourLater } }).populate({ path: 'class', populate: { path: 'students' } });
        for (const classObj of connectResult) {
            const header = `Reminder: ${classObj.postTitle}`;
            const link = classObj._id.toString();
            const reminderExists = yield notification_1.NotificationHolder.exists({ header: header, link: link });
            if (!reminderExists) {
                const description = classObj.postDescription;
                const classID = classObj.class._id;
                const reminder = yield new notification_1.NotificationHolder({
                    header,
                    description,
                    link,
                    class: classID,
                }).save();
                for (const student of classObj === null || classObj === void 0 ? void 0 : classObj.class.students) {
                    const studentObj = yield user_1.UserCredentials.findOne({ studentInformation: student._id });
                    if (studentObj) {
                        __1.io.emit('reminder_notification', reminder);
                        studentObj.notification.push(reminder._id);
                        yield studentObj.save();
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addReminderNotification = addReminderNotification;
const addTaskNotification = (classType, classObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminderExists = yield notification_1.NotificationHolder.exists({ link: classObj._id });
        if (!reminderExists) {
            const reminder = yield new notification_1.NotificationHolder({
                header: `${classType}: ${classObj.postTitle}`,
                description: classObj.postDescription,
                link: classObj._id,
                class: classObj.class,
            }).save();
            const classResult = yield class_1.Class.findById(classObj.class);
            for (const student of classResult === null || classResult === void 0 ? void 0 : classResult.students) {
                const studentObj = yield user_1.UserCredentials.findOne({
                    studentInformation: student._id,
                });
                if (studentObj) {
                    __1.io.emit('reminder_notification', reminder);
                    studentObj.notification.push(reminder._id);
                    yield studentObj.save();
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTaskNotification = addTaskNotification;
const getUserNotification = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield user_1.Student.findById(userID, 'userCredentials')
            .populate({
            path: 'userCredentials',
            populate: {
                path: 'notification',
                options: { sort: { createdAt: -1 } },
            },
        })
            .exec();
        if (notifications) {
            return { message: notifications, httpCode: 200 };
        }
        return { 'message': 'No user found', 'httpCode': 500 };
    }
    catch (error) {
        return { 'message': 'No user found', 'httpCode': 500 };
    }
});
exports.getUserNotification = getUserNotification;
