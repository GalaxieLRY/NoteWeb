---
title: localStorage
date: 2025-07-22
draft: false
---

localStorage 是浏览器提供的一种本地存储机制，可以在用户浏览器中以键值对的形式永久保存数据。主要特点如下：

- 持久性：数据不会随页面关闭或浏览器关闭而丢失，除非主动清除。
- 作用域：同源策略下（同协议、同域名、同端口），同一个网站下的所有页面都可以访问。
- 容量：一般支持 5MB 左右的存储空间。
- API 简单：常用方法有：
  - `localStorage.setItem(key, value)`：保存数据
  - `localStorage.getItem(key)`：读取数据   
  - `localStorage.removeItem(key)`：删除数据
  - `localStorage.clear()`：清空所有数据

示例：

```javascript
// 保存数据
localStorage.setItem('name', '张三');

// 读取数据
const name = localStorage.getItem('name');
console.log(name); // 张三

// 删除数据
localStorage.removeItem('name');

// 清空所有数据
localStorage.clear();
```