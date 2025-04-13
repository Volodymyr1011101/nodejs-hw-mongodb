const parseNumberValue = (value) => {
    if (typeof value !== 'string') return;

    const parsedNumberValue = parseInt(value);

    if (Number.isNaN(parsedNumberValue)) return;

    return parsedNumberValue;
}

export const parseContactsFilterParams = ({minYearsOld, maxYearsOld}) => {
    const parsedMinYearsOld = parseNumberValue(minYearsOld);
    const parsedMaxYearsOld = parseNumberValue(maxYearsOld);

    return {
        minYearsOld: parsedMinYearsOld,
        maxYearsOld: parsedMaxYearsOld,
    }

}