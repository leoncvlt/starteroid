# Astarteroid
🌠 A Meteor.js + React boilerplate to quickly get your SaaS application off the ground

## Features
- Meteor
- React and React-Router
- [Chakra UI](https://chakra-ui.com/)
- User accounts
- Basic CRUD flow + [simpl-schema](https://www.npmjs.com/package/simpl-schema) for validation
- Stripe integration for paid subscriptions, using Stripe Checkout

### Settings.json
The application expects a `settings.json` file in the root folder, which hasn't been committed to github as it stores most of the application secret keys. Running the app without it will cause a very straightforward `settings.json: file not found (settings file)` error. You must create this file yourself and fill the relevant secret information:
```json
{
  "public": {
    "stripe": {
      "key" : "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    } 
  },
  "private": {
    "stripe": {
      "key": "sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "subscription_price_id": "prod_xxxxxxxxxxxxxx"
      "webhook_secret": "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    }
  }
}
```
- `public.stripe.key` is your Stripe public key
- `private.stripe.key` is your Stripe public key
- `private.stripe.subscription_price_id` is the API ID of the subscription's product pricing
- `private.stripe.webhook_secret` is your Stripe webhooks signing secret

## Setting up Stripe Integration
- Access your Stripe dashboard, create a new account (or use an existing one)
- Under "Developer" > "API keys", note down the Publishable key and Secret key, and write them in your `settings.json`
- Under "Products", create a new product, set a recurring price, then note down its pricing API ID and write it in the `settings.json` file 
- Under "Developer" > "Webhooks", add a new endpoint to `{YOUR_APP_URL}/api/stripe/webhooks`, sending all events
  - During development, you can use ngrok to get a public URL tunneling to your localhost for testing
  - Note down the webhook signing secret, and write it in your `settings.json`
- In "Settings", navigate to "Customer Portal" under "Billing", customize the options as you see fit and click "Save" - this is needed in order to create portal sessions in test mode.