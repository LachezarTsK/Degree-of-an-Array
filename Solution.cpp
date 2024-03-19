
#include <span>
#include <array>
#include <limits>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {

    struct ValueRange {

        size_t startIndex;
        size_t endIndex;

        ValueRange() = default;
        ValueRange(size_t startIndex, size_t endIndex) :
                   startIndex { startIndex }, endIndex { endIndex } {}
    };

    static constexpr array<int, 2> VALUES_RANGE = { 0, 49999 };

public:
    int findShortestSubArray(const vector<int>& input) const {
        array<int, VALUES_RANGE[1] + 1 >frequency{};
        int maxFrequency = 0;

        for (const auto& value : input) {
            ++frequency[value];
            maxFrequency = max(maxFrequency, frequency[value]);
        }

        unordered_map<int, ValueRange> valueWithMaxFrequencyToRange
        { createMapValueWithMaxFrequencyToRange(input,frequency, maxFrequency) };

        return findLengthShortestSubarrayWithMaxFrequency(valueWithMaxFrequencyToRange);
    }

private:
    unordered_map<int, ValueRange> createMapValueWithMaxFrequencyToRange(span<const int> input, span<const int> frequency, int maxFrequency) const {
        unordered_map<int, ValueRange> valueWithMaxFrequencyToRange;

        for (size_t i = 0; i < input.size(); ++i) {
            if (frequency[input[i]] != maxFrequency) {
                continue;
            }
            if (!valueWithMaxFrequencyToRange.contains(input[i])) {
                valueWithMaxFrequencyToRange.emplace(input[i], ValueRange(i, i));
                continue;
            }
            valueWithMaxFrequencyToRange[input[i]].endIndex = i;
        }
        return valueWithMaxFrequencyToRange;
    }

    int findLengthShortestSubarrayWithMaxFrequency(const unordered_map<int, ValueRange>& valueWithMaxFrequencyToRange) const {
        int lengthShortestSubarrayWithMaxFrequency = numeric_limits<int>::max();

        for (const auto& [value, range] : valueWithMaxFrequencyToRange) {
            int currentRange = range.endIndex - range.startIndex + 1;
            if (lengthShortestSubarrayWithMaxFrequency > currentRange) {
                lengthShortestSubarrayWithMaxFrequency = currentRange;
            }
        }

        return lengthShortestSubarrayWithMaxFrequency;
    }
};
