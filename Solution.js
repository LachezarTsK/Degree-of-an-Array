
/**
 * @param {number[]} input
 * @return {number}
 */
var findShortestSubArray = function (input) {
    const VALUES_RANGE = [0, 49999];
    const frequency = new Array(VALUES_RANGE[1] + 1).fill(0);
    let maxFrequency = 0;

    for (let value of input) {
        ++frequency[value];
        maxFrequency = Math.max(maxFrequency, frequency[value]);
    }

    const valueWithMaxFrequencyToRange
            = createMapValueWithMaxFrequencyToRange(input, frequency, maxFrequency);

    return findLengthShortestSubarrayWithMaxFrequency(valueWithMaxFrequencyToRange);
};

/**
 * @param {number} startIndex
 * @param {number} endIndex
 */
function ValueRange(startIndex, endIndex) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
}

/**
 * @param {number[]} input
 * @param {number[]} frequency
 * @param {number} maxFrequency
 * @return {Map<Integer, Range>}
 */
function createMapValueWithMaxFrequencyToRange(input, frequency, maxFrequency) {
    const valueWithMaxFrequencyToRange = new Map();

    for (let i = 0; i < input.length; ++i) {
        if (frequency[input[i]] !== maxFrequency) {
            continue;
        }
        if (!valueWithMaxFrequencyToRange.has(input[i])) {
            valueWithMaxFrequencyToRange.set(input[i], new ValueRange(i, i));
            continue;
        }
        valueWithMaxFrequencyToRange.get(input[i]).endIndex = i;
    }
    return valueWithMaxFrequencyToRange;
}

/**
 * @param {Map<Integer, Range>} valueWithMaxFrequencyToRange
 * @return {number}
 */
function findLengthShortestSubarrayWithMaxFrequency(valueWithMaxFrequencyToRange) {
    let lengthShortestSubarrayWithMaxFrequency = Number.MAX_SAFE_INTEGER;

    for (let range of valueWithMaxFrequencyToRange.values()) {
        let currentRange = range.endIndex - range.startIndex + 1;
        if (lengthShortestSubarrayWithMaxFrequency > currentRange) {
            lengthShortestSubarrayWithMaxFrequency = currentRange;
        }
    }
    return lengthShortestSubarrayWithMaxFrequency;
}
