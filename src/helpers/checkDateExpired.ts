export const checkDateExpired = (key: string) => {
    
    const storedTimestamp = localStorage.getItem(`${key}Timestamp`);
    
    if (storedTimestamp) {
        const timeDifference = Date.now() - JSON.parse(storedTimestamp);
        const timeLimit = 24 * 60 * 60 * 1000;
        const isExpired = timeDifference > timeLimit;

        if (isExpired) {
            localStorage.removeItem(key);
            localStorage.removeItem(`${key}Timestamp`);
            localStorage.setItem('oompaLoompasPage', '0');
        }

        return isExpired;
    }
    
    return false; 
}