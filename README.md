# Strapi Demo

This Lerna monorepo contains an instance of Strapi inside `cms` and a NodeJS web application inside `gomo`.

To fire up both the CMS and web application in development mode run:

```
yarn develop
```

### CMS

- Strapi 4.3.6
- SQLite

Run the CMS only with:

```
yarn cms
```

### GOMO

- Express 4.16.1
- EJS view engine

If the CMS is already running, you can start the web app with:

```
yarn gomo
```
