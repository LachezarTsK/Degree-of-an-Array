
import java.util.HashMap;
import java.util.Map;

public class Solution {

    private final class ValueRange {

        int startIndex;
        int endIndex;

        ValueRange(int startIndex, int endIndex) {
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }
    }

    private static final int[] VALUES_RANGE = {0, 49999};

    public int findShortestSubArray(int[] input) {
        int[] frequency = new int[VALUES_RANGE[1] + 1];
        int maxFrequency = 0;

        for (int value : input) {
            ++frequency[value];
            maxFrequency = Math.max(maxFrequency, frequency[value]);
        }

        Map<Integer, ValueRange> valueWithMaxFrequencyToRange
                = createMapValueWithMaxFrequencyToRange(input, frequency, maxFrequency);

        return findLengthShortestSubarrayWithMaxFrequency(valueWithMaxFrequencyToRange);
    }

    private Map<Integer, ValueRange> createMapValueWithMaxFrequencyToRange(int[] input, int[] frequency, int maxFrequency) {
        Map<Integer, ValueRange> valueWithMaxFrequencyToRange = new HashMap<>();

        for (int i = 0; i < input.length; ++i) {
            if (frequency[input[i]] != maxFrequency) {
                continue;
            }
            if (!valueWithMaxFrequencyToRange.containsKey(input[i])) {
                valueWithMaxFrequencyToRange.put(input[i], new ValueRange(i, i));
                continue;
            }
            valueWithMaxFrequencyToRange.get(input[i]).endIndex = i;
        }
        return valueWithMaxFrequencyToRange;
    }

    private int findLengthShortestSubarrayWithMaxFrequency(Map<Integer, ValueRange> valueWithMaxFrequencyToRange) {
        int lengthShortestSubarrayWithMaxFrequency = Integer.MAX_VALUE;

        for (ValueRange range : valueWithMaxFrequencyToRange.values()) {
            int currentRange = range.endIndex - range.startIndex + 1;
            if (lengthShortestSubarrayWithMaxFrequency > currentRange) {
                lengthShortestSubarrayWithMaxFrequency = currentRange;
            }
        }
        return lengthShortestSubarrayWithMaxFrequency;
    }
}
