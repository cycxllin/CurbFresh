import Manager from '../models/manager.model.js';

export const getManagerByPhoneFromRepo = async (phone) => {
    try {
        const manager = await Manager.findOne({phone:phone});
        return manager;
    } catch (error) {
        throw Error(`Error while retrieving manager with phone: ${phone}`);
    }
};

export const addManagerToRepo = async (payload) => {
    try {
        const addedManager = new Manager(payload);
        const savedManager = await addedManager.save();
        return savedManager;
        } catch (error) {
        throw Error("Error while adding manager");
        }
};

export const countManagersInRepo = async function () {
    try {
        let count = await Manager.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting managers in database");
    }
}

/* Does not actually fully delete a manager from the database
 * The manager is simply set as inactive and not parsed over anywhere else
*/
export const deleteManagerFromRepo = async function (query) {
    try {
        const manager = await Manager.findOneAndUpdate(
            { ...query},
            { active: false},
            { new: true}
            ).lean();
        return manager;
    } catch (error) {
        throw Error("Error while deleting manager");
    }
}

export const updateManagerInRepo = async function (query, update) {
    try {
        const manager = await Manager.findOneAndUpdate(
                { ...query},
                { ...update},
                { new: true}
        ).lean();
        return manager;
    } catch (error) {
        throw Error("Error while updating manager");
    }
}

export const getManagersFromRepo = async function (query) {
    try{
         const managers = await Manager.find().sort({time: -1});
         return managers;
    } catch (error) {
        throw Error("Error while getting managers");
    }
}