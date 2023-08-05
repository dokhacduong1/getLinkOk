import { Post, Get, Del, Patch } from "../Utils/request"

export const getDataShoppe = async ()=>{
    const result = await Get(`items`);
    return result;
}