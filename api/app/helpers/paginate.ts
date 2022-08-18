import { Document, Query } from 'mongoose';

export default async function paginate<T extends Document>(
    model: Query<T[], T>,
    page: number,
    perPage = 10,
): Promise<Record<string, unknown>> {
    //const perPage = 9;
    // const page: number = Number(req.params.page) || 1;
    try {
        const allPosts = await model
            .find()
            .skip(perPage * page - perPage)
            .limit(perPage);
        const numOfPosts = await model.count();
        const paginationDetails: {
            numOfPages: number;
            numOfResults: number;
        } = {
            numOfPages: Math.ceil(numOfPosts / perPage),
            numOfResults: numOfPosts,
        };
        const data = {
            data: allPosts,
            pagination: paginationDetails,
        };
        return data;
    } catch (err) {
        throw err;
    }
}
