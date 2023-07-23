import { totalSales as totalSalesRaw } from "./total-sales.js";

const cache = new Map();
export const totalSales = async (product) => {
    if(cache.has(product)) {
        return cache.get(product);
    }

    const promise = totalSalesRaw(product);
    cache.set(product, promise);
    promise.finally(() => {
        cache.delete(product);
    })

    return promise;
}
