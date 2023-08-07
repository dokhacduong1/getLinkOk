

export const getIpLocal = async ()=>{
    const response = await fetch("https://api.ipify.org?format=json");
    const result = await response.json();
    return result;
}