## University
SJSU
## Course
 Enterprise Software - CMPE172/ Fall 2021
## Team Members
Allan, Jonahthan, Kenneth
## Project Introduction
VidCharm is an online video streaming platform that revolves around video sharing and online socializing. Users are allowed to publish short videos online to express their creativity. Audiences are able to interact by loggining in, sharing, and expressing their opinion in the comment section of the video. At the home page users are able to browse videos published by the public and the user also has the ability to search for a specific video through the search bar. On the video page, there is a like button, dislike button, share button and comment section. User will also have a creator dashboard to view and upload videos with titles, description, and thumbnail.
## Sample Screenshots
![image](https://user-images.githubusercontent.com/59120947/144174681-b6ace397-0885-471f-aad6-e1c93dd2d87c.png)
![image](https://user-images.githubusercontent.com/59120947/144174692-ac144efd-51b1-4bca-ae89-dbf6815509ca.png)
 ## Running the Application
 initialize prisma
```bash
npm i -d prisma
npm i @prisma/client
npx prisma init

```
Allow usage of deprecated npm functionality:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

development server can now start


```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Dockerfile
create docker container:
```bash
docker builld -t vidcharm:1.0 .
```
running the container:
```bash
docker run -p 3000:3000 vidcharm:1.0
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## System Diagram
![image](https://user-images.githubusercontent.com/59120947/144177571-328bfad2-50d5-40c7-9d7d-cd336d21aa81.png)

## Class Diagram
![image](https://user-images.githubusercontent.com/59120947/144177554-c61845e4-1555-4ce4-be86-b8271ddd6058.png)
## Sequence Diagram
![image](https://user-images.githubusercontent.com/59120947/144177625-04d58d3f-7dea-4193-ac9a-da411c9409d2.png)

## Interaction Diagram
![image](https://user-images.githubusercontent.com/59120947/144177649-36cff335-c3d8-4ce2-9fb2-97fa4a08d3d6.png)

## Database Schema
![image](https://user-images.githubusercontent.com/59120947/144177667-e94e5a20-405f-4863-9cbd-7c6f89207036.png)


