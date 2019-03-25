var rateGenerator = {
    newRate: getRandomRate
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomRate() {
    return 2 + (Math.random());
}

module.exports = rateGenerator;
