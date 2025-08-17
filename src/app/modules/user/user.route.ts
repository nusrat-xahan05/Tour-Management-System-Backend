import { Router } from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router()

router.get('/all-users', checkAuth(Role.ADMIN, Role.SUPERADMIN), UserControllers.getAllUsers);
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe);
router.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/:id", checkAuth(Role.ADMIN, Role.SUPERADMIN), UserControllers.getSingleUser)
router.patch('/:id', validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)

export const UserRoutes = router;