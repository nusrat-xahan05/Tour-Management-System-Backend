import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DivisionService } from "./division.service";
import httpStatus from "http-status-codes";


const createDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.createDivision(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Division Created Successfully",
        data: result
    })
})

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivisions();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Divisions Retrived Successfully",
        data: result.data,
        meta: result.meta
    })
})

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division Retrived Successfully",
        data: result.data,
    });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await DivisionService.updateDivision(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Division Updated Successfully",
        data: result,
    })
})

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Division Deleted Successfully",
        data: result,
    })
})


export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
}