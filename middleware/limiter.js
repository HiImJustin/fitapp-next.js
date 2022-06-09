import { RateLimiter } from "limiter";

// 'second', 'minute', 'day', or a number of milliseconds
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 });

export default async function sendRequest() {
    const remainingRequests = await limiter.removeTokens(1);
    console.log(remainingRequests + " request left please wait half a second");
}
