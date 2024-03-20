import { getManagerByPhoneFromRepo, addManagerToRepo, updateManagerInRepo, 
    deleteManagerFromRepo, getManagersFromRepo, countManagersInRepo } from "../repositories/manager.repository.js";

export const getManagerByPhone = async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const manager = await getManagerByPhoneFromRepo(phone);

        if (manager) {
            return res.status(200).json({
                status: 200,
                message: 'retrieved Manager sucessfully',
                data: manager
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No manager with phone ${phone} found`,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

//checks if manager was previously deleted, updates if manager exists
export const addManager = async (req, res, next) => {
    try {
        const { body } = req;

        let manager = await getManagerByPhoneFromRepo(body.phone);
        let addedManager = {};

        if (manager) {
            // manager exists and was previously deleted
            if (manager.active === false) {
                            // set active and update info
            manager = {
                ...body,
                active: true
            };

            addedManager = await updateManagerInRepo({phone: body.phone}, manager);

            } else {
                // manager exists but is still active so reject adding
                return res.status(400).json({
                    status: 400,
                    message: `Manager with phone ${body.phone} already exists`
                });
            }

        } else {
            // manager not in db
            const managerCount = await countManagersInRepo();

            if (req.body.email) {
                manager = {
                    _id: `M${managerCount}`,
                    ...body,
                    active: true
                };
            } else {
                manager = {
                    _id: `M${managerCount}`,
                    ...body,
                    email: '',
                    active: true
                };
            }
    
         addedManager = await addManagerToRepo(manager);
        }

        if (addedManager) {
            return res.status(200).json({
                status: 200,
                message: 'added manager sucessfully',
                data: addedManager
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error adding manager`,
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

/* Delete a manager 
 * Only sets active: false rather than fully deleting
*/
export const deleteManager = async function (req, res) {
    const { phone } = req.params;
    try {
        const manager = await deleteManagerFromRepo({phone: phone});

        if (manager){
            return res.status(200).json({
                status: 200,
                message: `deleted manager successfully`,
                data: manager
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error deleting manager`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to delete manager ${phone}`);
    }
}

/* Edit Manager Information */
export const updateManager = async function (req, res) {
    const { phone } = req.params;
    const { body } = req;
    try {
        const manager = await updateManagerInRepo({phone: phone}, body);
        if (manager){
            return res.status(200).json({
                status: 200,
                message: `updated manager successfully`,
                data: manager
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating manager`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to update manager`);
    }
}

/* Get a LIST of active Manages */
export const getManagers = async function (req, res) {
    try {
        const managers = await getManagersFromRepo({active: true});
        if (managers) {
            return res.status(200).json({
                status: 200,
                message: 'found managers sucessfully',
                data: managers
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding managers`,
            });
        }
    }catch (error) {
        res.status(500).send(`failed to get managers`);
    }
}