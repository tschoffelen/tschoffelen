---
title: Showing a Manage Subscriptions Button in React Native
description: If you implement in-app purchases in your app, you might want to
  show users a way to manage that subscription by showing links to the App…
date: 2023-12-29T12:46:45.730Z
taxonomies:
  category:
    - Reference
extra: {}
---

If you implement [in-app purchases](https://developer.apple.com/in-app-purchase/) in your app, you might want to show users a way to manage that subscription by showing links to the App Store or Google Play app. 

In native Swift, on the iOS side, there is [StoreKit](https://developer.apple.com/storekit/) to do this, and Android has similar APIs. If you're using [React Native](https://reactnative.dev), however, you might prefer to just [deep link](https://reactnative.dev/docs/linking) to the right URL.

## Code example
A very simple approach to doing this looks as follows:

```js
import React from "react";
import { Button, Linking, Platform } from "react-native";

const APP_ID = "com.example.myapp";
const IAP_PRODUCT_ID = "yearly-subscription";

const ManageSubscriptionButton = () => {
	const manageSubscriptionUrl = Platform.select({
		android: `https://play.google.com/store/account/subscriptions?sku=${IAP_PRODUCT_ID}&package=${APP_ID}`,
		ios: "https://apps.apple.com/account/subscriptions",
	});
	
	return (
		<Button
			title="Manage subscription"
			onPress={() => Linking.openURL(manageSubscriptionUrl)}
		/>
	);
}
```

## References
- [Android: Use deep links to allow users to manage a subscription](https://developer.android.com/google/play/billing/subscriptions#use-deep)
- [Apple: Enable users to manage subscriptions](https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/subscriptions_and_offers/handling_subscriptions_billing#3221913)

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>