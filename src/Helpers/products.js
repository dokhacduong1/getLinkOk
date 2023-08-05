import { percentageToDecimal } from "./convertNumber";

export function priceOutProduct(profit,voucherProducts,packageProducts,initialPriceProducts) {
    let left = 0.9-percentageToDecimal(profit);
    let right = (voucherProducts+packageProducts+initialPriceProducts)
    const sum  = right/left
    return sum;
}