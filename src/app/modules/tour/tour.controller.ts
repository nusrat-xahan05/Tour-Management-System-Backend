import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { TourService } from './tour.service';

const createTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour Created Successfully',
        data: result,
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await TourService.getAllTours(query as Record<string, string>);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours Retrieved Successfully',
        data: result.data,
        meta: result.meta,
    });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.updateTour(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour Updated Successfully',
        data: result,
    });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour Deleted Successfully',
        data: result,
    });
});

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
    const result = await TourService.getAllTourTypes();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour Types Retrieved Successfully',
        data: result,
    });
});

const createTourType = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await TourService.createTourType(name);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour Type Created Successfully',
        data: result,
    });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await TourService.updateTourType(id, name);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour Type Updated Successfully',
        data: result,
    });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTourType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour Type Deleted Successfully',
        data: result,
    });
});

export const TourController = {
    createTour,
    createTourType,
    getAllTourTypes,
    deleteTourType,
    updateTourType,
    getAllTours,
    updateTour,
    deleteTour,
};