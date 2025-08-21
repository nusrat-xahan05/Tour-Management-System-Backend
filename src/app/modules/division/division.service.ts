import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import httpStatus from "http-status-codes"


const createDivision = async (payload: Partial<IDivision>) => {
    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new AppError(httpStatus.BAD_REQUEST, "A Division With This Name Already Exists");
    }

    // HANDLED THIS OPERATION USING 'PRE' HOOK
    // const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    // let slug = `${baseSlug}-division`;

    // let counter = 0;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`
    // }

    // payload.slug = slug;
    const division = await Division.create(payload);
    return division;
}

const updateDivision = async (divisionId: string, payload: Partial<IDivision>) => {
    const existingDivision = await Division.findById(divisionId);
    if (!existingDivision) {
        throw new AppError(httpStatus.NOT_FOUND, "Division Does Not Exist");
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: divisionId }
    })

    if (duplicateDivision) {
        throw new AppError(httpStatus.BAD_REQUEST, "A Division With This Name Already Exists");
    }

    // HANDLED THIS OPERATION USING 'PRE' HOOK
    // if (payload.name) {
    //     const baseSlug = payload.name?.toLowerCase().split(" ").join("-");
    //     let slug = `${baseSlug}-division`;

    //     let counter = 0;
    //     while (await Division.exists({ slug })) {
    //         slug = `${slug}-${counter++}`
    //     }

    //     payload.slug = slug;
    // }

    const updateDivision = await Division.findByIdAndUpdate(divisionId, payload, { new: true, runValidators: true });
    return updateDivision;
}

const getAllDivisions = async () => {
    const divisions = await Division.find({});
    const totalDivisions = await Division.countDocuments();

    return {
        data: divisions,
        meta: {
            total: totalDivisions
        }
    };
}

const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    
    return {
        data: division,
    }
};

const deleteDivision = async (divisionId: string) => {
    await Division.findByIdAndDelete(divisionId);
    return null;
}

export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
}