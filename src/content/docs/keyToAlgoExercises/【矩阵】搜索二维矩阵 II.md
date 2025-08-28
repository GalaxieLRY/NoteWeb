---
title: 【矩阵】搜索二维矩阵 II
date: 2025-08-28
---


## 题目：

题目链接：[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/?envType=study-plan-v2&envId=top-100-liked)

题目描述：

> 编写一个高效的算法来搜索`m x n`矩阵`matrix`中的一个目标值`target`。该矩阵具有以下特性：
> 1. 每行的元素从左到右升序排列。
> 2. 每列的元素从上到下升序排列。

## 思路：

**需要充分利用矩阵的两个特性。**

最有效的做法是从矩阵的**右上角**开始搜索（也可以从**左下角**），这样每次比较都能排除一行或一列，将时间复杂度降至$O(m+n)$。

## 代码：

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {

        // // 超时
        // int m=matrix.size(), n=matrix[0].size();

        // int i=0, j=0, flag=false;
        // for(; i<m && i>=0; ++i){
        //     cout<<"i="<<i<<endl;
        //     if(flag==false){
        //        for(; j<n && j>=0; ++j){
        //             cout<<"j="<<j<<endl;
        //             if(matrix[i][j]==target){
        //                 return true;
        //             }
        //             if(matrix[i][j]>target){
        //                 j -=1;
        //                 flag=true;
        //                 break;
        //             }
        //         } 
        //     }else{
        //         if(matrix[i][j]==target){
        //             return true;
        //         }
        //         if(matrix[i][j]>target){
        //             break;
        //         }
        //     }
        // }
        // return false;

        int m=matrix.size(), n=matrix[0].size();

        // 从右上角开始搜索
        int i=0, j=n-1;
        while(i<m && j>=0){
            if(matrix[i][j] == target){
                // 找到目标值
                return true;
            }else if(matrix[i][j] > target){
                // 当前值大于目标值，向左移动一列
                --j;
            }else if(matrix[i][j] < target){
                // 当前值小于目标值，向下移动一行
                ++i;
            }
        }
        // 未找到目标值
        return false;
    }
};
```