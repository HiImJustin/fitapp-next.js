import { RateLimiter } from "limiter";

// 'second', 'minute', 'day', or a number of milliseconds
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 1000 });

export default async function sendRequest() {
    const remainingRequests = await limiter.removeTokens(0.5);
    console.log(remainingRequests + " request left please wait one second");
}
