import { Detail } from '../interfaces/oompaLoompas';

export const storeOompaLoompaDetail = (foundDetail: Detail | null, id: number) => {
    if (foundDetail) {
        const storedOompaDetails = JSON.parse(localStorage.getItem('oompaLoompasDetail') || '[]');
        const isOompaStored = storedOompaDetails.some((oompa: Detail) => oompa.id === id);

        if (!isOompaStored) {
            const updatedOompaDetails = [...storedOompaDetails, foundDetail];
            localStorage.setItem('oompaLoompasDetail', JSON.stringify(updatedOompaDetails));
        }
    }
};
