const ratelimit=require('express-rate-limit');

const limiter=ratelimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 7, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports={limiter};