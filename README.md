# Grin Web

This is the frontend for the Grin app. Grin app concept came from an idea of a blog, but that no one else will see. It was inspired after seeing someone that has a private twitter account with no followers, using it like a diary, but in the format of tweets. I found it an interesting application to create at the time.

The application is divided in two parts, the backend made in Go(lang) and the frontend made with Javascript and React (in particular, NextJS). It has a design resembling typewritters (somewhat like a typed diary). It was a great learning exercise, to create a reactive website with multiple pages and also learn a little bit about authorization and session management. The app is deployed on http://grin-web.vercel.app/, although it will not be functional since the API is needed and I didn't find somewhere to host it (the heroku server stops after some inactive time).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![image](https://user-images.githubusercontent.com/62779977/170541168-738d5d70-cc54-4bd8-b359-9ecab2fa098b.png)
(main page)

![image](https://user-images.githubusercontent.com/62779977/170541198-9a72dcc3-7359-49a0-8bde-8700a9db5b35.png)
(login page)

![image](https://user-images.githubusercontent.com/62779977/170541237-fb092932-c666-46d6-a455-156781b08458.png)
(user creation page)

## Running locally

It is possible to host the website locally. Running this way allows you to also run the API server and see the website's functioning. In order to run this you need npm and nodejs installed in your machine and to run the server you need the golang compiler. To run grin-web you just need to run ```npm run dev```. And to run the api you need to clone the grin project (https://github.com/SunkPlane29/grin) and type the commands: 
```
make cert
make run & make run-auth
``` 
(on linux)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
