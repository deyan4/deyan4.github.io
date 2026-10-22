---
title: "Still Running on Shopify Scripts? Your Checkout Logic Needs a New Home"
description: "Shopify Scripts stopped running on June 30, 2026. Here is what that means for your discounts, shipping rules and payment customizations, and how they are rebuilt as Shopify Functions."
date: 2026-10-19
tag_label: Functions & checkout
---
<p>Shopify Scripts stopped running on June 30, 2026. If your store still has leftover Scripts logic, those custom discounts, shipping rules and payment customizations are no longer applying at checkout.</p>

<h2>What stopped working</h2>
<p>Scripts were small pieces of Ruby that changed how checkout behaved. Typical examples are tiered or customer-specific discounts, hiding or renaming shipping rates, and showing or hiding payment methods. With Scripts switched off, checkout falls back to its default behavior, so rules your team relied on may be silently missing.</p>

<h2>How the migration works</h2>
<p>Each rule is rebuilt as a Shopify Function, the current way to customize discounts, shipping and payments. I handle it in four steps:</p>
<ul>
  <li>Review of your old Scripts and the rules they enforced</li>
  <li>Each rule rebuilt as a Shopify Function, tested before it goes live</li>
  <li>Discounts, shipping and payment logic behaving as you expect again</li>
  <li>Clean, documented code you can rely on going forward</li>
</ul>

<h2>Where to start</h2>
<p>If you are not sure what your old Scripts did, that is fine. Send me access to the store or an export of the Script code and I will list the rules it enforced, so you can decide which ones are still needed.</p>

<a class="btn primary" href="https://dash.shopexperts.com/get-free-quote?expert=deyan-chernogorski&amp;cta_source=expert_profile_hero" target="_blank" rel="noopener"><span>Get a quote →</span></a>
