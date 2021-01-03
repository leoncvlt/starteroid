# 🌠 Astarteroid
A Meteor.js + React boilerplate to quickly get your SaaS application off the ground

## Features
- Meteor / React / React-Router
- Chakra UI
- Basic CRUD flow + simpl-schema for validation
- Stripe integration for premium subscriptions, using Stripe Checkout

## Stripe Integration
- In your Stripe dashboard, navigate to Developer -> Webhooks
- Add a new endpoint to {URL}/api/stripe/webhooks, sending all events
  - If testing on localhost, you can use ngrok to get a public endpoint
- Note down the Signing secret, and paste it in your settings.json

'You can’t create a portal session in test mode until you save your customer portal settings in test mode at https://dashboard.stripe.com/test/settings/billing/portal.'