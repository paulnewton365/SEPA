// robots.txt
//
// Deliberately NOT "Disallow: /".
//
// A blanket disallow tells crawlers not to fetch the page at all, which
// means they never see the noindex directive in the head. A URL that is
// disallowed but linked from elsewhere can still surface in results as a
// bare link with no description, which is the opposite of what we want.
// Allowing the crawl means the noindex is read and obeyed.
//
// The same logic protects link previews: Teams, Slack, Outlook and
// LinkedIn check robots.txt before unfurling, and a blanket disallow
// would strip the preview card we just built.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is worth crawling beyond the head, and the API
        // routes should never be requested by a bot.
        disallow: ["/api/"],
      },
    ],
    host: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };
}
