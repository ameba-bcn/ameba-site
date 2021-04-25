export function getIDValuesFromArrayObj(ObjectArray = []) {
    let resultArray = []
    ObjectArray.map((i) => resultArray.push(i.id))
    return resultArray
}

export function formatPrice(price = "") {
    var fields = price.split('.');
    if (fields && fields.length > 0 && fields[1] === "00") return fields[0]
    return price
}

export function getNFirstElementsOfArray(inArray = [], numberElements) {
    if (inArray.length > 2) return inArray.slice(numberElements - 1)
    return inArray
}

export function formatISODateToDate(sDate) {
    let date = new Date(sDate);
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

export function formatISODateToHour(sDate) {
    let date = new Date(sDate);
    return date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
}