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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const content_1 = __importDefault(require("./routes/content"));
const share_1 = __importDefault(require("./routes/share"));
const DB_URL = "mongodb+srv://akashsrf123:G4Lx6RwRF9P7O6ip@akashsrf.dkvkh.mongodb.net/brainly";
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(DB_URL);
        console.log('Connected to the DB.');
    }
    catch (error) {
        console.error('Error connecting to the DB.');
        process.exit(1);
    }
});
startDB();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    try {
        console.log("Sever connected on port 3000.");
    }
    catch (error) {
        console.log("Error connecting to port.");
    }
});
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/content', content_1.default);
app.use('/api/v1/brain', share_1.default);
