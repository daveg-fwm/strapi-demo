const qs = require("qs");
const fetch = require("isomorphic-fetch");

function getHeaderContent() {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  return fetch(`${process.env.STRAPI_ENDPOINT}/api/header?${query}`, {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

module.exports = getHeaderContent;
