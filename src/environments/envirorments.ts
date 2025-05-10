export const environment = {
    production: true,
    firebase: {      
      apiKey: (window as any)['env']['FIREBASE_API_KEY'],
      authDomain: (window as any)['env']['FIREBASE_AUTH_DOMAIN'],
      projectId: (window as any)['env']['FIREBASE_PROJECT_ID'],
      storageBucket: (window as any)['env']['FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: (window as any)['env']['FIREBASE_MESSAGING_SENDER_ID'],
      appId: (window as any)['env']['FIREBASE_APP_ID'],
      measurementId: (window as any)['env']['MEASUREMENT_ID'],
    },
    apiBaseUrl: (window as any)['env']['API_BASE_URL'],
    ecomerce:
    {
      discount: (window as any)['env']['DISCOUNT'] | 7,
      shippingCost: (window as any)['env']['SHIPPING_COST'] | 3500,
      categories: (window as any)['env']['CATEGORIES'],
      brands: (window as any)['env']['BRANDS']
    }
  };