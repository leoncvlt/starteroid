// import { BrowserPolicy } from 'meteor/browser-policy-common';

// BrowserPolicy.framing.disallow();
// // BrowserPolicy.content.disallowInlineScripts();
// BrowserPolicy.content.disallowEval();
// BrowserPolicy.content.allowInlineStyles();
// BrowserPolicy.content.allowFontDataUrl();
// BrowserPolicy.content.allowFontOrigin('data:');

// BrowserPolicy.content.allowOriginForAll('blob:');
// BrowserPolicy.content.allowOriginForAll("http://localhost:*");
// BrowserPolicy.content.allowOriginForAll("https://localhost:*");

// const trusted = [
//   '*.googletagmanager.com',
//   '*.google-analytics.com',
//   '*.googleapis.com',
//   '*.gstatic.com',
//   '*.stripe.com',
// ];

// trusted.forEach((origin) => {
//   return BrowserPolicy.content.allowOriginForAll(origin);
// });