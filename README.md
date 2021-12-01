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

