import moment from 'moment';
import * as yup from 'yup';

export const CastData = (objData) => {
    // Create Yup Schema
    let schemaObject = {}
    Object.keys(objData).forEach(item => {
        const itemTypeIndicator = item.slice(0, 3)
        if (["int", "dbl"].includes(itemTypeIndicator)) {
            if (typeof (objData[item]) === "boolean") {
                schemaObject[item] = yup.number().transform((curr, orig) => orig === true ? 1 : 0)
            }
            else {
                schemaObject[item] = yup.number().nullable().transform((curr, orig) => orig === '' ? null : curr)
            }
        }
        else if (itemTypeIndicator === "dtm") {
            schemaObject[item] = yup.string().nullable().transform(curr => moment(curr).isValid() ? moment.utc(curr).format("YYYY-MM-DDTHH:mm:ss") : curr)
        }
        else if (itemTypeIndicator === "str") {
            schemaObject[item] = yup.string().nullable()
        }
    })
    //Cast data using created schema
    return yup.object().shape(schemaObject).cast(objData)
}