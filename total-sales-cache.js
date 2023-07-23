import { totalSales as totalSalesRaw } from "./total-sales.js";

const cache = new Map();
const CACHE_TTL = 30 * 1000;

export function totalSales(product) {
    if(cache.has(product)) {
        return cache.get(product);
    }

    const promise = totalSalesRaw(product);
    cache.set(product, promise);
    promise.then(() => {
        setTimeout(() => {
            cache.delete(product);
        }, CACHE_TTL)
    }, err => {
        cache.delete(product);
        throw err;
    })

    return promise
}
