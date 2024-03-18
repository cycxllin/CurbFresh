/*
    Checks to see if the given manager object is allowed to act on the target object
    Manager and target must have restID field
*/ 
export const checkValidManager = (req, res, next) => {
    try {
        const manager = req.body.user;
        const target = req.body.query;

        if (manager._id.includes('M') && manager.restID === target.restID) {
            next();
        } else {
            return res
            .status(404)
            .json({
              status: 404,
              message: "You are not authorized to perform this action",
            });
        }
    } catch (error) {
        throw Error(error);
    }
};

/*
    Checks to see if the given customer object is allowed to act on the target object
    Target must have custID field
*/ 
export const checkValidCustomer = (req, res, next) => {
    try {
        const customer = req.body.user;
        const target = req.body.query;

        if (customer._id.includes('C') && customer._id === target.custID) {
            next();
        } else {
            return res
            .status(404)
            .json({
              status: 404,
              message: "You are not authorized to perform this action",
            });
        }
    } catch (error) {
        throw Error(error);
    }
};