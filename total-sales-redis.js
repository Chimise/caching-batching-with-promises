import {totalSales as totalSalesRaw} from './total-sales.js';
import redisClient from './redis-client.js';

const localCache = new Map();
const CACHE_TTL = 30;


export const totalSales = async (product) => {
    if(localCache.has(product)) {
        return localCache.get(product);
    }

    const data = await redisClient.get(product);
    if(data) {
        return JSON.parse(data);
    }

    
    const resultPromise = totalSalesRaw(product);

    localCache.set(product, resultPromise);

    resultPromise.then(data => {
        return redisClient.set(product, JSON.stringify(data), {
            EX: CACHE_TTL,
            NX: true
        })
    }).then(() => {
        console.log('product cached')
    }).finally(() => {
        localCache.delete(product);
    })

    return resultPromise;
}