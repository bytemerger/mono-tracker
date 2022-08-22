import { Document, Query } from 'mongoose';

interface PaginateResponse<T> {
    data: T[];
    pagination: {
        numOfPages: number;
        numOfResults: number;
    };
}
export default async function paginate<T extends Document>(
    model: Query<T[], T>,
    totalDocs: number,
    page: number,
    perPage = 10,
): Promise<PaginateResponse<T>> {
    //const perPage = 9;
    // const page: number = Number(req.params.page) || 1;
    try {
        const collections = await model.skip(perPage * page - perPage).limit(perPage);
        const paginationDetails: {
            numOfPages: number;
            numOfResults: number;
        } = {
            numOfPages: Math.ceil(totalDocs / perPage),
            numOfResults: totalDocs,
        };
        const data = {
            data: collections,
            pagination: paginationDetails,
        };
        return data;
    } catch (err) {
        throw err;
    }
}
