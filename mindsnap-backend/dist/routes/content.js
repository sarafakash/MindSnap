"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContentRouter = express_1.default.Router();
ContentRouter.post("/", (req, res) => {
});
ContentRouter.get("/", (req, res) => {
});
ContentRouter.delete("/", (req, res) => {
});
exports.default = ContentRouter;
