import { HandleErrors } from "./ErrorsHandler";
import redis from "./radis";


export async function handleRedisCache(cacheKey, ttl, fetchFunction){

    try {
        const cacheData = await redis.get(cacheKey)
        if(cacheData){
            return JSON.parse(cacheData)
        }
    } catch (error) {
        console.error(error, "failed to fetch data from redis")
    }
    const data = await fetchFunction()

    try {
        await redis.setex(cacheKey, ttl, JSON.stringify(data))
    } catch (error) {
        HandleErrors(error, "failed to set data in redis")
    }
    return data
}