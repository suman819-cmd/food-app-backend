
```
app-backend
├─ nodemon.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ config
│  │  ├─ database.ts
│  │  ├─ environment.ts
│  │  └─ jwt.ts
│  ├─ controllers
│  │  ├─ auth-controller
│  │  │  ├─ login-contoller.ts
│  │  │  ├─ logout-controller.ts
│  │  │  ├─ me-controller.ts
│  │  │  ├─ otp-controller.ts
│  │  │  ├─ password-reset-controller.ts
│  │  │  ├─ resend-otp-controller.ts
│  │  │  ├─ signup-controller.ts
│  │  │  └─ verifyOtp.controller.ts
│  │  ├─ order-controller
│  │  │  ├─ create-order.controller.ts
│  │  │  ├─ get-my-orders.controller.ts
│  │  │  └─ update-order-status.controller.ts
│  │  ├─ restaurant-controller
│  │  │  ├─ create-restaurant.controller.ts
│  │  │  ├─ get-restaurants.controller.ts
│  │  │  └─ update-restaurant.controller.ts
│  │  └─ user.controller.ts
│  ├─ error.ts
│  ├─ express.d.ts
│  ├─ main.ts
│  ├─ middleware
│  │  ├─ auth.middleware.ts
│  │  ├─ role.middleware.ts
│  │  └─ upload.middleware.ts
│  ├─ models
│  │  ├─ MenuItem.model.ts
│  │  ├─ Order.model.ts
│  │  ├─ otp.model.ts
│  │  ├─ Restaurant.model.ts
│  │  ├─ token.model.ts
│  │  └─ User.model.ts
│  ├─ routes
│  │  ├─ auth.routes.ts
│  │  ├─ order.routes.ts
│  │  └─ restaurant.routes.ts
│  ├─ services
│  │  ├─ authUser.service.ts
│  │  ├─ otp.service.ts
│  │  └─ token.service.ts
│  ├─ types
│  │  ├─ order.type.ts
│  │  ├─ payload.type.ts
│  │  └─ user.type.ts
│  └─ utils
│     ├─ apiResponse.ts
│     ├─ asyncHandler.ts
│     ├─ bcrypt.ts
│     ├─ constant.ts
│     └─ mail
│        ├─ brevoApi.ts
│        └─ templates
│           ├─ orderConfirmationMail.ts
│           ├─ otpMail.ts
│           ├─ passwordResetMail.ts
│           ├─ passwordResetOtpMail.ts
│           └─ WelcomeMail.ts
├─ tsconfig.json
├─ uploads
│  └─ image.png
└─ yarn.lock

```