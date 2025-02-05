import { Redis } from "@upstash/redis";
import { HandleErrors } from "./ErrorsHandler";




const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

if(!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN){
    console.error("missing redis env variables")
}


export async function handleRedisCache(cacheKey, ttl, fetchFunction){

    try {
        const response = await redis.get(cacheKey)
        if(response && response.data){
            return JSON.parse(response.data)
        }
    } catch (error) {
        console.error("failed to fetch data from redis",error)
    }
    const data = await fetchFunction()

    try {
        await redis.setex(cacheKey, ttl, JSON.stringify(data), { ex:ttl})
    } catch (error) {
        HandleErrors(error, "failed to set data in redis")
    }
    return data
}