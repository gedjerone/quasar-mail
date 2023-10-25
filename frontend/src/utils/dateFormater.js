const addZeroAsFirst = (val) => {
    return val < 10 ? '0'.concat(val) : val;
}

export const dateFormater = (date) => {
    const year = date.getFullYear();
    const month = addZeroAsFirst(date.getMonth() + 1);
    const day = addZeroAsFirst(date.getDate());
    const hour = addZeroAsFirst(date.getHours());
    const minutes = addZeroAsFirst(date.getMinutes());
    const seconds = addZeroAsFirst(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}
