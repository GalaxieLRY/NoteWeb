---
title: 【子串】和为 K 的子数组
date: 2025-08-22
---



## 题目：

题目链接：[560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked)

题目描述：

> 给你一个整数数组`nums`和一个整数`k`，请你统计并返回 该数组中和为`k`的子数组的个数。
> 子数组是数组中元素的连续非空序列。

## 思路：

设`prefixSum[i]`为前`i`个元素的和，则子数组`nums[j..i]`的和为`prefixSum[i] - prefixSum[j-1]`。若该差值等于`k`，则`prefixSum[j-1] = prefixSum[i] - k`，因此只需统计`prefixSum[i] - k`出现的次数即可。

## 代码：

```c++
class Solution {
public:

    /*
    逻辑漏洞
        代码试图通过 “发现和为k的子数组后，检查后续连续 0 并计数” 来优化，但这种逻辑不完整：
        仅处理了 “当前子数组后接 0” 的情况，漏掉了其他可能的子数组（例如 [0,0,0] 中，left=1, right=1 和 left=1, right=2 等子数组）。
        滑动窗口的推进方式混乱（right 无规律增减），导致部分子数组被重复计算或遗漏。
    效率低下
        每次通过 tmp 向量存储子数组并调用 getSum 计算和，时间复杂度高达 O(n³)（外层循环n + 中层循环n + 求和n），在大数据量下会超时。
    */
    // int getSum(vector<int>& nums){
    //     long long int sum = 0;
    //     for(int i=0; i<nums.size(); ++i){
    //         sum += nums[i];
    //     }
    //     return sum;
    // }

    // int subarraySum(vector<int>& nums, int k) {
    //     int res = 0;
    //     int left=0, right=0;

    //     while(left<nums.size()){
    //         bool flag = false;
    //         vector<int>tmp;
    //         for(int i=left; i<=right; ++i){
    //             tmp.push_back(nums[i]);
    //         }
    //         long long int sum = getSum(tmp);
    //         if(sum == k){
    //             ++res;
    //             // 判断right后的数字是否为0
    //             while(right+1<nums.size() && nums[right+1] == 0 ){
    //                 ++res;
    //                 ++right;
    //             }
    //             ++left;
    //         }
    //         if(right >= nums.size()){
    //             ++left;
    //             right=left;
    //         }
    //         ++right;
    //     }

    //     return res;
    // }

    // 最优解：前缀和+哈希表
    /*
    前缀和原理
        设 prefixSum[i] 为前 i 个元素的和，则子数组 nums[j..i] 的和为 prefixSum[i] - prefixSum[j-1]。若该差值等于 k，则 prefixSum[j-1] = prefixSum[i] - k，因此只需统计 prefixSum[i] - k 出现的次数即可。
    哈希表作用
        用哈希表记录每个前缀和出现的次数，避免重复计算，将时间复杂度从 O (n²) 降至 O (n)。
    初始化处理
        prefixCount[0] = 1 是为了处理 “子数组从索引 0 开始” 的情况（此时 prefixSum[i] = k 直接满足条件）。
    */

    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount; // 记录前缀和出现的次数
        prefixCount[0] = 1; // 初始化：前缀和为0的情况出现1次（用于匹配从起点开始的子数组）
        
        int prefixSum = 0; // 当前前缀和（前i个元素的和）
        int result = 0;
        
        for (int num : nums) {
            prefixSum += num; // 更新前缀和
            
            // 若存在前缀和为 (prefixSum - k)，说明中间子数组的和为k
            if (prefixCount.find(prefixSum - k) != prefixCount.end()) {
                result += prefixCount[prefixSum - k];
            }
            
            // 记录当前前缀和出现的次数
            prefixCount[prefixSum]++;
        }
        
        return result;
    }
};
```