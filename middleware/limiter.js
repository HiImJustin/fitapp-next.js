import { RateLimiter } from "limiter";

const limiter = new RateLimiter({ tokensPerInterval: 15, interval: "hour"});

export async function sendRequest() {
    const remainingRequests = await limiter.removeTokens(1);
    console.log('request sent')
    console.log(remainingRequests)
}   

