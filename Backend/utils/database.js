import mongoose from 'mongoose';
import createItemModel from '../models/itemModel';

const mongoUri = 'mongodb+srv://iamsahan:sew123@inventory.axqereu.mongodb.net';

export const createDatabaseForUser = async (userId) => {
    const dbName = `user_${userId}`;
    const userDbUri = `${mongoUri}/${dbName}?retryWrites=true&w=majority`;
    const userDb = mongoose.createConnection(userDbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const Item = createItemModel(userDb);

    // Define schemas and models for the user's database
    // const userSchema = new mongoose.Schema({
    //     // Define user-specific schema
    // });
    // const UserModel = userDb.model('User', userSchema);

    return { userDb, Item };
}

