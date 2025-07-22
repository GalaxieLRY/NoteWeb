---
title: Docker的使用
date: 2025-07-22
---

## 什么是Docker？

Docker是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux或Windows机器上，也可以实现虚拟化。

## Docker的常用命令

1. 查看版本：docker version
2. 登录Docker Hub：docker login
3. 查看镜像：docker images
4. 查看正在运行容器列表：docker ps
5. 查看所有容器：docker ps -a
6. 重启容器：docker restart 容器ID/容器名
7. 启动容器：docker start 容器ID/容器名
8. 停止容器：docker stop 容器名/容器ID
9. 删除容器：docker rm -f 容器名/容器ID
10. 删除全部容器：docker rm -f $(docker ps -aq)
11. 进入容器：docker exec -it 容器名/容器ID /bin/bash
12. 构建镜像：docker build -t 镜像名:标签名 .
13. 运行镜像：docker run -d -p 端口:端口 -v 目录:目录 镜像名:标签名
14. 导出镜像：docker save -o 镜像名.tar 镜像名:标签名
15. 导入镜像：docker load -i 镜像名.tar
16. 推送镜像到Docker Hub：docker push 镜像名:标签名
17. 拉取镜像：docker pull 镜像名:标签名

## Docker容器迁移

将Docker容器从一台服务器迁移到另一台服务器

### 基本方法

1. **导出和导入容器**
   1. 首先，使用docker export命令将容器导出为tar文件。例如：docker export container-name > container.tar。
   2. 然后，将导出的tar文件复制到新服务器上。在新服务器上，使用docker import命令将tar文件导入为一个新的镜像。
   3. 最后，使用docker run命令基于新的镜像创建一个容器。

2. **迁移容器镜像**
   1. 对于需要迁移的容器，使用docker commit命令将其状态保存为一个新的镜像。例如：docker commit container-id new-image-name。
   2. 使用docker push命令将新镜像推送到一个仓库（如Docker Hub或私有仓库）。
   3. 在新服务器上，使用docker pull命令从仓库拉取镜像。
   4. 使用docker run命令基于拉取的镜像创建容器。

3. **使用Docker Save和Load**
   1. 在源服务器上，使用docker save命令将镜像保存为一个tar文件。例如：docker save -o image.tar image-name。
   2. 将tar文件复制到新服务器。
   3. 在新服务器上，使用docker load命令加载镜像。例如：docker load -i image.tar。
   4. 使用docker run命令基于加载的镜像创建容器。

### 简要介绍

1. **docker export 和 docker import**
   1. docker export：将一个运行中的容器导出为一个压缩文件（ .tar 文件），该文件包含容器的文件系统和元数据，但不包含容器的镜像、标签等信息。
   2. docker import：从一个导出的容器文件（通常是由 docker export 命令生成的 .tar 文件）创建一个新的镜像。

    这个镜像没有历史记录，只包含容器的文件系统。docker export 和 docker import 主要用于容器级别的导入导出, 这种方式特别适合**制作基础镜像**。

    例如，从一个基础镜像启动容器，进行必要的配置和安装后，使用docker export保存为一个新的基础镜像，然后分发给其他人使用。

2. **docker save 和 docker load**
   1. docker save：将一个或多个镜像打包成一个或多个压缩文件（通常是 .tar 文件），包含了镜像的完整历史记录、元数据、标签等信息。
   2. docker load：从一个由 docker save 命令生成的压缩文件中加载镜像及其相关信息到 Docker 守护程序中。

    docker save 和 docker load 则用于镜像级别的导入导出, 这种方式特别适合**离线环境, 私有网络中迁移和共享镜像**。 

    比如公司有一台机器, 上面有很多docker镜像, 由于网络限制, 不能直接从docker注册中心拉取这些镜像到家里的电脑上, 那么就可以使用docker save命令将这些镜像保存成tar文件, 复制到U盘上, 到家之后, 用docker load把这些文件加载成镜像