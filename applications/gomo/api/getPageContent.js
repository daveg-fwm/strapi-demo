const qs = require("qs");
const fetch = require("isomorphic-fetch");

function getPagecontent() {
  const query = qs.stringify(
    {
      populate: [
        `
        slug,
        sections,
        sections.ctaButton,
        sections.image,
        sections.cards,
        sections.cards.image
      `,
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  return fetch(`${process.env.STRAPI_ENDPOINT}/api/pages?${query}`, {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

module.exports = getPagecontent;
