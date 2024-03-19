
function findShortestSubArray(input: number[]): number {
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

class ValueRange {
    constructor(public startIndex: number, public endIndex: number) { }
}

function createMapValueWithMaxFrequencyToRange
    (input: number[], frequency: number[], maxFrequency: number): Map<number, ValueRange> {

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

function findLengthShortestSubarrayWithMaxFrequency
    (valueWithMaxFrequencyToRange: Map<number, ValueRange>): number {

    let lengthShortestSubarrayWithMaxFrequency = Number.MAX_SAFE_INTEGER;

    for (let range of valueWithMaxFrequencyToRange.values()) {
        let currentRange = range.endIndex - range.startIndex + 1;
        if (lengthShortestSubarrayWithMaxFrequency > currentRange) {
            lengthShortestSubarrayWithMaxFrequency = currentRange;
        }
    }
    return lengthShortestSubarrayWithMaxFrequency;
}
