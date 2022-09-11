const express = require("express");
const router = express.Router();

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
  const { headerContent, pageContent, footerContent } = res.locals;
  console.log(headerContent);
  console.log(pageContent.data);
  console.log(footerContent);
  res.render("index", { title: "Express" });
});

module.exports = router;
