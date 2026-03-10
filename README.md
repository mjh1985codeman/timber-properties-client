# Timber Properties - Client

The frontend for **Timber Properties**, a full-stack MERN rental property platform. Property owners and staff can manage listings and upload images, while renters can browse, reserve, and pay down payments online.

**Live:** [timber-properties.netlify.app](https://timber-properties.netlify.app/)
**Backend Repo:** [timber-ranch](https://github.com/mjh1985codeman/timber-ridge)

## Features

- **Property browsing** - View all available rental properties with photos and details
- **Reservation flow** - Select dates with validation, then secure the booking with a Stripe down payment (50% of total)
- **Role-based access** - Admin users can add properties and upload images to S3; customers can browse and reserve
- **User accounts** - Registration, login, and password reset via email
- **Responsive UI** - Built with React, Bootstrap, and Tailwind CSS

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 18, React Router 6 |
| **State / API** | Apollo Client 3, GraphQL |
| **UI** | Bootstrap 5, React Bootstrap, Tailwind CSS |
| **Payments** | Stripe (React Stripe.js) |
| **Auth** | JWT (jwt-decode) |
| **Build** | Create React App |
| **Deployment** | Netlify |

## Getting Started

### Prerequisites

- Node.js 18+
- The [Timber Ranch backend](https://github.com/mjh1985codeman/timber-ridge) running locally or deployed

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   The app runs on `http://localhost:3000` and expects the GraphQL API at `http://localhost:3001`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## Project Structure

```
timber-properties-client/
├── src/
│   ├── pages/          # Home, Properties, PropertyDetails, Login, Register, AddProperty, UserReservations
│   ├── components/     # CheckoutFormForDp, ReserveProperty, DatePickerComp, PropPics, CoverPic
│   ├── controllers/    # GraphQL queries and mutations
│   ├── helpers/        # Auth, formatters, validators, base64 utils
│   ├── assets/         # Images and icons
│   ├── App.js
│   └── index.js
└── package.json
```

## Related

- **Backend:** [timber-ranch](https://github.com/mjh1985codeman/timber-ridge) | [API Endpoint](https://gql-api-timber-properties.onrender.com/graphql)
