---
title: VSCode远程开发
date: 2025-07-22
---

本篇文章主要介绍如何使用VSCode进行远程开发。

## 什么是远程开发？

远程开发（Remote Development）是一种软件开发方法，它允许开发者在本地计算机上编写代码，然后将其部署到远程服务器上，从而实现开发工作的分布式处理。远程开发可以提高开发效率，缩短开发时间，并提高软件质量。

## 使用VSCode远程开发

1. 安装remote-ssh插件
2. ctrl+shift+p
3. 输入：remote
4. 选择：Rmote-SSH: Add New SSH HOST...
5. 输入：ssh 用户名@服务器地址 -A
6. 输入密码
7. 点击Enter键
8. 点击Connect
9. 等待连接成功
10. 打开终端，输入：code.
11. 等待VSCode启动
12.  点击Open Folder，打开项目文件夹
13.  开始远程开发

## 使用docker容器隔离开发环境

如果远程服务器没有安装VSCode，可以使用docker容器隔离开发环境。

1. 安装docker
2. 下载docker镜像：docker pull 基础镜像名称
3. 启动docker容器：docker run -it -p 10025:22 --name 容器名称 基础镜像名称
4. 打开浏览器，输入：http://localhost:22
5. 访问容器中的Web应用

docker run -d -p 10025:22 -w /home 基础镜像名称 /usr/sbin/sshd -D

1. -d：后台运行容器，容器启动后不会占用当前终端，而是在后台运行。
2. -p 10025:22：将容器的22端口映射到主机的10025端口，格式为 宿主机端口:容器内端口
3. -w /home：指定容器的工作目录为/home，容器启动后默认进入 /home 目录，后续在容器内执行命令时，若不指定路径则基于此目录。
4. 基础镜像名称：指定容器的基础镜像
5. /usr/sbin/sshd -D：启动SSH服务

docker run -it -p 10025:22 --name 容器名称 基础镜像名称 /bin/bash

1. -it：以交互模式运行容器
2. -p 10025:22：将容器的22端口映射到主机的10025端口
3. --name 容器名称：指定容器名称
4. 基础镜像名称：指定容器的基础镜像
5. /bin/bash：启动bash shell