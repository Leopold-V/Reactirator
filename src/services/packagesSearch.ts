const API_URL = 'https://api.npms.io/v2/search?q=';

export const getPackages = async (packageName: string, size = 30): Promise<any> => {
    try {
        const rep = await fetch(`${API_URL}${packageName}&size=${size}`);
        const res = await rep.json();
        return res;
    } catch (error) {
        throw error;
    }
}