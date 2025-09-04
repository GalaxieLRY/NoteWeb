---
title: 【图论】乘法表中第k小的数
date: 2025-09-04
---


## 题目：

题目链接：[668. 乘法表中第k小的数](https://leetcode.cn/problems/kth-smallest-number-in-multiplication-table/description/)

题目描述：

> 几乎每一个人都用 乘法表。但是你能在乘法表中快速找到第 `k` 小的数字吗？
> 乘法表是大小为 `m x n` 的一个整数矩阵，其中 `mat[i][j] == i * j`（下标从 `1` 开始）。
> 给你三个整数 `m`、`n` 和 `k`，请你在大小为 `m x n` 的乘法表中，找出并返回第 `k` 小的数字。
>
> 华科网安2024夏令营真题：
> 数学老师张老师的学生已经提前在操场上集合准备接下来的升旗仪式。`n∗m` 个同学排成 `n` 排 `m` 列，其中，第 `i` 排 `j` 列上同学的身高刚好是 `i∗j`。
> 张老师需要选出 `q` 个同学作为国旗仪仗队的成员。但张老师有选择困难症，于是在随机选人的时候，他会在心中默念一个数字 `k`，那么他会选出班上身高第 `k` 小的同学入队，一共选 `q` 次。张老师数学不太好，如果每次都一个个数的话，太耽误时间了，仪仗队还需要排练呢。请你帮他想办法，如何快点确定他想要找到的同学。为了方便排队，对于每次选择，输出被选出同学的身高。

## 思路：

(图论】乘法表中第k小的数-思路)[./图片/图论】乘法表中第k小的数-思路.png]

## 代码：

```c++
class Solution {
public:
    int findKthNumber(int m, int n, int k) {
        int left = 1, right = m * n;
        while (left < right) {
            int x = left + (right - left) / 2;
            int count = x / n * n;
            for (int i = x / n + 1; i <= m; ++i) {
                count += x / i;
            }
            if (count >= k) {
                right = x;
            } else {
                left = x + 1;
            }
        }
        return left;
    }
};
```