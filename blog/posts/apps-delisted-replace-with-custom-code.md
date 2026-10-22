---
title: "Apps Are Being Delisted Overnight: Is It Time to Replace Yours With Custom Code?"
description: "A wave of Shopify App Store delistings hit apps used by tens of thousands of stores. Which of your apps should still be apps?"
date: 2026-10-21
tag_label: Shopify · Security
---
<p>This month, a wave of Shopify App Store delistings hit apps used by tens of thousands of stores. If an app on your storefront disappeared from the App Store, or you are worried one will next, it is worth asking: which of your apps should still be apps?</p>

<h2>What actually happened</h2>
<p>In early October, security researcher Roman Zipp documented a checkout-hijack campaign. Shoppers on affected stores were redirected to fake checkout pages. The malicious code did not come from Shopify itself. It was delivered through third-party app infrastructure, mainly the theme extensions that apps inject into storefronts.</p>
<p>The first app identified was HulkApps’ Product Options. Later reports added Selleasy, whose developer confirmed injected scripts on October 13 and which claims more than 49,000 active stores, and Swym Wishlist Plus, among others. Shopify temporarily switched off some affected theme extensions, and several listings became unavailable. By October 21, Zipp’s write-up says all affected apps had been fixed or delisted.</p>
<p>Shopify’s public line, given to iTnews, is that it acts when an app falls short, which can include delisting, and that it asks the developer to contact affected merchants directly. The full scope is still unclear, and some app names circulating in forums are unverified merchant reports, so treat any single name with care.</p>
<p>Security is not the only reason apps vanish. In recent weeks, developers have described:</p>
<ul>
  <li>A company whose entire portfolio of ten apps was delisted because one of them was flagged for overstating its capabilities.</li>
  <li>Apps delisted instantly for a policy issue, with no earlier warning and days of silence afterwards.</li>
</ul>
<p>Shopify’s partner policy says merchants usually get at least 30 days’ notice before a removal, but that the notice can be shorter depending on severity. If the app is still installed on the removal date, Shopify uninstalls it for you.</p>
<h2>Why this is a merchant problem, not just a developer problem</h2>
<p>Every storefront app is code running on your domain, in front of your customers, maintained by a team you do not control and subject to a compliance process you cannot influence. That creates three kinds of exposure:</p>
<ul>
  <li><b>Security.</b> One compromised vendor can put your checkout in front of an attacker, as this campaign showed.</li>
  <li><b>Continuity.</b> A delisting can end in removal, and the feature you relied on disappears on someone else’s timeline.</li>
  <li><b>Performance.</b> Shopify itself says it audits how apps affect store speed, and each app typically adds its own scripts, requests and configuration fetches to every page.</li>
</ul>
<h2>When custom is the better call</h2>
<p>The best candidates share three traits: a small surface area, stable behavior, and needs specific to your store. If you pay monthly for a large app and use only a small part of it, you are carrying its risk and weight for very little.</p>
<div class="tw"><table>
  <thead><tr><th>Feature</th><th>What the app usually does</th><th>Custom option</th><th>Verdict</th></tr></thead>
  <tbody>
    <tr><td>Announcement bar</td><td>Loads a script and remote config</td><td>A theme section with a few settings</td><td>Usually custom</td></tr>
    <tr><td>Free-shipping progress bar</td><td>Script plus cart hooks</td><td>Small cart snippet using the Cart API</td><td>Usually custom</td></tr>
    <tr><td>Wishlist</td><td>Hosted widget on every product card</td><td>Theme feature with customer metafields or local storage</td><td>Often custom</td></tr>
    <tr><td>Product options and variants</td><td>Heavy script rewriting the product form</td><td>Native variants, metafields, or a theme block</td><td>Often custom</td></tr>
    <tr><td>Mega menu</td><td>Injected navigation and styles</td><td>Theme-native navigation</td><td>Usually custom</td></tr>
    <tr><td>Sticky add to cart</td><td>Third-party script</td><td>A few lines of theme code</td><td>Usually custom</td></tr>
  </tbody>
</table></div>
<p>Some things are still best left to specialists: subscriptions, reviews with syndication, large-scale search, ERP or 3PL integrations, and anything with a legal duty attached, such as tax or consent management. For those, keep the app, but vet the vendor, review its permissions, and have a fallback plan.</p>
<h2>Custom is not automatically safe</h2>
<p>Custom code removes the vendor, and it also removes the vendor’s team. You own updates, accessibility, browser testing and bug fixes. Done well, custom code is safer for small features: the code lives in your repository, ships through review, and does not fetch behavior from someone else’s server at runtime. A compromise at a third party can no longer rewrite what your shoppers see.</p>
<h2>The bottom line</h2>
<p>Delistings are now a normal part of the platform’s risk profile, and the apps that disappear are not always the ones you would expect. You do not need to rip out your stack. But for the small, stable features that make up much of the average app list, owning the code is increasingly the cheaper, faster and safer choice. If you want help deciding what to replace first, I can audit your installed apps, check what each one injects into your storefront, and sort them into replace, keep and monitor, or remove. Start with a short review through my ShopExperts profile.</p>

<a class="btn primary" href="https://shopexperts.com/freelancers/deyan-chernogorski" target="_blank" rel="noopener"><span>Book an app audit →</span></a>
