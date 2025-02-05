import { Router } from "express";
import userRoute from "./api/userRoute";
import authRoute from "./api/authRoute";
import cadastroCnpjRoute from "./api/cadastroCnpjRoute";
import telefoneRoute from "./api/telefoneRoute";
import emailRoute from "./api/emailRoute";
import { isAuthenticated } from "../middlewares/authMiddlewares";

const router = Router();

router.get("/", (req, res) => res.send("Bem vindo ao CapitaC API"));
router.use("/user", isAuthenticated, userRoute);
router.use("/cnpj", isAuthenticated, cadastroCnpjRoute);
router.use("/telefone", isAuthenticated, telefoneRoute);
router.use("/email", isAuthenticated, emailRoute);
router.use("/auth", authRoute);

export default router;