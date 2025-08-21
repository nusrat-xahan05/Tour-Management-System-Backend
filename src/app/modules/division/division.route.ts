import { Router } from "express";
import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./division.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router()

router.post('/create', checkAuth(Role.ADMIN, Role.SUPERADMIN), validateRequest(createDivisionZodSchema), DivisionController.createDivision);
router.get('/', DivisionController.getAllDivisions);
router.get("/:slug", DivisionController.getSingleDivision)
router.patch('/:id', checkAuth(Role.ADMIN, Role.SUPERADMIN), validateRequest(updateDivisionZodSchema), DivisionController.updateDivision);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPERADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router;