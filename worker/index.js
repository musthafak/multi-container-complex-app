const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function feb(index){
    if (index < 2) return 1;
    return feb(index - 1) + feb(index - 2);
};

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, feb(parseInt(message)));
});

sub.subscribe('insert');