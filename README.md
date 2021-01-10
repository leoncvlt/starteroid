# Starteroid
🌠 A Meteor.js + React boilerplate to quickly get your SaaS application off the ground

## Features
- Meteor
- React and React-Router
- [Chakra UI](https://chakra-ui.com/)
- User accounts
- Basic CRUD flow with client / server side validation using [simpl-schema](https://www.npmjs.com/package/simpl-schema)
- Paid subscriptions with different plans, using [Stripe](https://stripe.com/gb) + [Checkout](https://stripe.com/docs/payments/checkout)
- ~~Boring~~ Basic terms & conditions / privacy policy pages, cookies consent popup

# To Do
- Alternative sign-in providers (E.g. Google, Twitter, Facebook, etc)
- Deployement via [Meteor Up](http://meteor-up.com/). 

## Creating `settings.json`
The application expects a `settings.json` file in the root folder, which hasn't been committed to github (and it shouldn't be) as it stores most of the application secret keys. Running the app without it will cause a very straightforward `settings.json: file not found (settings file)` error. You must create this file yourself and fill the relevant secret information:
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
      "webhook_secret": "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "product": "prod_xxxxxxxxxxxxxx",
    }
  }
}
```
- `public.stripe.key` is your public Stripe API key
- `private.stripe.key` is your private Stripe API  key
- `private.stripe.webhook_secret` is your Stripe webhooks signing secret
- `private.stripe.product` is the API ID of the product 

## Setting up Stripe
- Access your Stripe dashboard, create a new account (or use an existing one)
- Under "Developer" > "API keys", note down the Publishable key and Secret key, and write them in your `settings.json`
- Under "Products", create a new product, then note down its product API ID and write it in the `settings.json` file 
  - Create one or more recurring price schemes for the product
- Under "Developer" > "Webhooks", add a new endpoint to `{YOUR_APP_URL}/api/stripe/webhooks`, sending all events
  - During development, you can use ngrok to get a public URL tunneling to your localhost for testing
  - Note down the webhook signing secret, and write it in your `settings.json`
- In "Settings", navigate to "Customer Portal" under "Billing", customize the options as you see fit and click "Save" - this is needed in order to create portal sessions in test mode.