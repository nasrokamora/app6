import { Redis } from "@upstash/redis";
import { HandleErrors } from "./ErrorsHandler";




const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})



export async function handleRedisCache(cacheKey, ttl, fetchFunction){

    try {
        const response = await redis.get(cacheKey)
        if(response && response.data){
            return JSON.parse(response.data)
        }
    } catch (error) {
       return HandleErrors(error, "failed to get data from redis")
    }
    const data = await fetchFunction()

    try {
        await redis.setex(cacheKey, ttl, JSON.stringify(data))
    } catch (error) {
      return HandleErrors(error, "failed to set data in redis")
    }
    return data
}