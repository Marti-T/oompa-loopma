export const checkDateExpired = (key: string) => {
    const storedTimestamp = localStorage.getItem(`${key}Timestamp`);

    if (storedTimestamp) {
        const timeDifference = Date.now() - JSON.parse(storedTimestamp);
        //const timeLimit = 24 * 60 * 60 * 1000;
        const timeLimit = 10 * 1000;
        const isExpired = timeDifference > timeLimit;

        if (isExpired) {
            localStorage.removeItem('oompaLoompasList');
            localStorage.removeItem('oompaLoompasDetail');
            localStorage.removeItem('oompaLoompasPage');
            localStorage.removeItem('oompaLoompasTotalPages');
            localStorage.removeItem(`${key}Timestamp`);
        }

        return isExpired;
    }

    return false;
}
