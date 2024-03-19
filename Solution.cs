
using System;
using System.Collections.Generic;

public class Solution
{
    private class ValueRange
    {
        public int startIndex;
        public int endIndex;

        public ValueRange(int startIndex, int endIndex)
        {
            this.startIndex = startIndex;
            this.endIndex = endIndex;
        }
    }

    static readonly int[] VALUES_RANGE = { 0, 49999 };

    public int FindShortestSubArray(int[] input)
    {
        int[] frequency = new int[VALUES_RANGE[1] + 1];
        int maxFrequency = 0;

        foreach (int value in input)
        {
            ++frequency[value];
            maxFrequency = Math.Max(maxFrequency, frequency[value]);
        }

        Dictionary<int, ValueRange> valueWithMaxFrequencyToRange
                = createMapValueWithMaxFrequencyToRange(input, frequency, maxFrequency);

        return findLengthShortestSubarrayWithMaxFrequency(valueWithMaxFrequencyToRange);
    }

    private Dictionary<int, ValueRange> createMapValueWithMaxFrequencyToRange(int[] input, int[] frequency, int maxFrequency)
    {
        Dictionary<int, ValueRange> valueWithMaxFrequencyToRange = new Dictionary<int, ValueRange>();

        for (int i = 0; i < input.Length; ++i)
        {
            if (frequency[input[i]] != maxFrequency)
            {
                continue;
            }
            if (!valueWithMaxFrequencyToRange.ContainsKey(input[i]))
            {
                valueWithMaxFrequencyToRange.Add(input[i], new ValueRange(i, i));
                continue;
            }
            valueWithMaxFrequencyToRange[input[i]].endIndex = i;
        }
        return valueWithMaxFrequencyToRange;
    }

    private int findLengthShortestSubarrayWithMaxFrequency(Dictionary<int, ValueRange> valueWithMaxFrequencyToRange)
    {
        int lengthShortestSubarrayWithMaxFrequency = int.MaxValue;

        foreach (ValueRange range in valueWithMaxFrequencyToRange.Values)
        {
            int currentRange = range.endIndex - range.startIndex + 1;
            if (lengthShortestSubarrayWithMaxFrequency > currentRange)
            {
                lengthShortestSubarrayWithMaxFrequency = currentRange;
            }
        }
        return lengthShortestSubarrayWithMaxFrequency;
    }
}
