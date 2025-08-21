import express from "express";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { TourController } from "./tour.controller";
import {
    createTourTypeZodSchema,
    createTourZodSchema,
    updateTourZodSchema,
} from "./tour.validation";

const router = express.Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", TourController.getAllTourTypes);

router.post(
    "/create-tour-type",
    checkAuth(Role.ADMIN, Role.SUPERADMIN),
    validateRequest(createTourTypeZodSchema),
    TourController.createTourType
);

router.get(
    "/tour-types/:id",
    TourController.getSingleTourType
);
router.patch(
    "/tour-types/:id",
    checkAuth(Role.ADMIN, Role.SUPERADMIN),
    validateRequest(createTourTypeZodSchema),
    TourController.updateTourType
);

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPERADMIN), TourController.deleteTourType);

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours);

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPERADMIN),
    multerUpload.array("files"),
    validateRequest(createTourZodSchema),
    TourController.createTour
);

router.get(
    "/:slug",
    TourController.getSingleTour
);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPERADMIN),
    multerUpload.array("files"),
    validateRequest(updateTourZodSchema),
    TourController.updateTour
);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPERADMIN), TourController.deleteTour);




export const TourRoutes = router