import {typeList} from "../../constants/contacts.js";

const parseNumberValue = (value) => {
    if (typeof value !== 'string') return;

    const parsedNumberValue = parseInt(value);

    if (Number.isNaN(parsedNumberValue)) return;

    return parsedNumberValue;
}

export const parseContactsFilterParams = ({minYearsOld, maxYearsOld, isFavourite, type}) => {
    const parsedMinYearsOld = parseNumberValue(minYearsOld);
    const parsedMaxYearsOld = parseNumberValue(maxYearsOld);
    const contactType = typeList.includes(type) ? type : undefined;
    return {
        minYearsOld: parsedMinYearsOld,
        maxYearsOld: parsedMaxYearsOld,
        isFavourite,
        contactType,
    }

}