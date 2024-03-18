/*
    Given an enum object and string (value), checks if string is a valid value
    Returns: bool
*/
export const checkPropertyIsValidEnum = (enumObject, value) => {
    const values = Object.values(enumObject);
    
    try {
        if (values.includes(value)) {
            return true;
        }
    } catch (error) {
        throw Error(error);
    }

    return false;
};
 
/*
    Checks to see if the given manager object is allowed to act on the target object
    Manager and target must have restID field
    Returns bool
*/ 
export const checkValidManager = (manager, target) => {
    try {
        if (manager._id.includes('M') && manager.restID === target.restID) {
            return true;
        }
    } catch (error) {
        throw Error(error);
    }

    return false;
};

/*
    Checks to see if the given customer object is allowed to act on the target object
    Target must have custID field
    Returns bool
*/ 
export const checkValidCustomer = (customer, target) => {
    try {
        if (customer._id.includes('C') && customer._id === target.custID) {
            return true;
        }
    } catch (error) {
        throw Error(error);
    }

    return false;
};