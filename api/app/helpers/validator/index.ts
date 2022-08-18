import Validator from 'validatorjs';
import mongoose from 'mongoose';

Validator.register(
    'objectId',
    function (value) {
        // requirement parameter defaults to null
        return mongoose.Types.ObjectId.isValid(value as string);
    },
    'The :attribute ID is not an object ID',
);
export default Validator;
