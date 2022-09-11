const express = require("express");
const router = express.Router();
const md = require("markdown-it")();

const getHeaderContent = require("../api/getHeaderContent");
const getPageContent = require("../api/getPageContent");
const getFooterContent = require("../api/getFooterContent");

router.use(async (req, res, next) => {
  res.locals.headerContent = await getHeaderContent()
    .then((res) => res.json())
    .then((data) => data);

  res.locals.pageContent = await getPageContent()
    .then((res) => res.json())
    .then((data) => data);

  res.locals.footerContent = await getFooterContent()
    .then((res) => res.json())
    .then((data) => data);

  next();
});

router.get("/", function (req, res, next) {
  const { logo, links: headerLinks } = res.locals.headerContent.data.attributes;
  const { slug, sections } = res.locals.pageContent.data[0].attributes;
  const { copyright, links: footerLinks } =
    res.locals.footerContent.data.attributes;

  res.render("index", {
    logo: logo.data.attributes,
    slug,
    headerLinks,
    hero: {
      ...sections[0],
      image: sections[0].image.data.attributes,
    },
    multiColumn: {
      ...sections[1],
      cards: sections[1].cards.map((card) => ({
        ...card,
        description: md.render(card.description),
        image: card.image.data.attributes,
      })),
    },
    footerLinks,
    copyright,
  });
});

module.exports = router;
