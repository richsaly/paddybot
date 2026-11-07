// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });



// const { setGlobalOptions } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// const axios = require("axios");
// require("dotenv").config({ path: ".secret.local" });

// setGlobalOptions({ maxInstances: 10 });

// exports.initializePaystackPayment = onRequest(
//   {
//     secrets: ["PAYSTACK_SECRET_KEY"],
//   },
//   async (req, res) => {


    // SECOND LOADED CODE
//     const { setGlobalOptions } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// const axios = require("axios");

// require("dotenv").config({ path: ".secret.local" });

// setGlobalOptions({ maxInstances: 10 });

// exports.initializePaystackPayment = onRequest(
//   async (req, res) => {
//     // Allow requests from the PaddyBot frontend
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
//     res.set("Access-Control-Allow-Headers", "Content-Type");

//     // Handle browser preflight request
//     if (req.method === "OPTIONS") {
//       res.status(204).send("");
//       return;
//     }

//     if (req.method !== "POST") {
//       res.status(405).json({
//         success: false,
//         message: "Method not allowed",
//       });
//       return;
//     }

//     try {
//       const { email, amount, bookingId, serviceType } = req.body;

//       if (!email || !amount || !bookingId || !serviceType) {
//         return res.status(400).json({
//           success: false,
//           message: "Missing required payment information",
//         });
//       }

//       const response = await axios.post(
//         "https://api.paystack.co/transaction/initialize",
//         {
//           email,
//           amount: amount * 100,
//           metadata: {
//             bookingId,
//             serviceType,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       logger.info("Paystack payment initialized", {
//         bookingId,
//         serviceType,
//       });

//       return res.status(200).json({
//         success: true,
//         data: response.data.data,
//       });
//     } catch (error) {
//       logger.error("Paystack initialization failed", {
//         error: error.response?.data || error.message,
//       });

//       return res.status(500).json({
//         success: false,
//         message: "Unable to initialize payment",
//       });
//     }
//   },
// );
// ENDS HERE

// TEMPORAL CODE
// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");

// setGlobalOptions({maxInstances: 10});

// exports.testFunction = onRequest((req, res) => {
//   res.status(200).send("PaddyBot Functions is working!");
// });

// MIGHT STILL BE UNLOCKED, COMENTED OUT FOR TESTING ISSUE
// THIS IS PAYSTACK

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");
// const axios = require("axios");
// const admin = require("firebase-admin");

// admin.initializeApp({
//   projectId: "paddybot-a3f6d",
// });

// setGlobalOptions({maxInstances: 10});

// exports.initializePaystackPayment = onRequest(
//   async (req, res) => {
//     // CORS
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
//     res.set("Access-Control-Allow-Headers", "Content-Type");

//     // Preflight request
//     if (req.method === "OPTIONS") {
//       res.status(204).send("");
//       return;
//     }

//     // Only allow POST
//     if (req.method !== "POST") {
//       res.status(405).json({
//         success: false,
//         message: "Method not allowed",
//       });
//       return;
//     }

//     try {
//       const {
//         email,
//         amount,
//         bookingId,
//         serviceType,
//       } = req.body;

//       if (!email || !amount || !bookingId || !serviceType) {
//         res.status(400).json({
//           success: false,
//           message: "Missing required payment information",
//         });
//         return;
//       }

//     //   recheck
//     let bookingCollection;

// if (serviceType === "Companion Call") {
//   bookingCollection = "companionCalls";
// } else if (serviceType === "Shout-Out Call") {
//   bookingCollection = "shoutOutCalls";
// } else if (serviceType === "Reminder Call") {
//   bookingCollection = "reminderCalls";
// } else {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid service type",
//   });
// }

//       const secretKey =
//         process.env.PAYSTACK_SECRET_KEY;

//       if (!secretKey) {
//         logger.error(
//           "PAYSTACK_SECRET_KEY is missing"
//         );

//         res.status(500).json({
//           success: false,
//           message: "Paystack configuration is missing",
//         });
//         return;
//       }

//       const response = await axios.post(
//         "https://api.paystack.co/transaction/initialize",
//         {
//           email: email,
//           amount: amount * 100,
//           metadata: {
//             bookingId: bookingId,
//             serviceType: serviceType,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${secretKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const paymentReference = response.data.data.reference;

// await admin
//   .firestore()
//   .collection(bookingCollection)
//   .doc(bookingId)
//   .update({
//     paymentStatus: "pending",
//     paymentReference: paymentReference,
//     paymentInitializedAt: admin.firestore.FieldValue.serverTimestamp(),
//   });

//       logger.info(
//         "Paystack payment initialized",
//         {
//           bookingId: bookingId,
//           serviceType: serviceType,
//         }
//       );

//       res.status(200).json({
//         success: true,
//         data: response.data.data,
//       });
//     } catch (error) {
//       logger.error(
//         "Paystack initialization failed",
//         {
//           error:
//             error.response?.data ||
//             error.message,
//         }
//       );

//       res.status(500).json({
//         success: false,
//         message: "Unable to initialize payment",
//       });
//     }
//   }
// );
// ENDS HERE,



// THIS MIGHT BE THE REAL SOLUTION CODE
const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");

setGlobalOptions({ maxInstances: 10 });

exports.initializePaystackPayment = onRequest(
  {
    secrets: ["PAYSTACK_SECRET_KEY"],
  },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
      return;
    }

    try {
      const { email, amount, bookingId, serviceType } = req.body;

      if (!email || !amount || !bookingId || !serviceType) {
        return res.status(400).json({
          success: false,
          message: "Missing required payment information",
        });
      }

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100,
          metadata: {
            bookingId,
            serviceType,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      logger.info("Paystack payment initialized", {
        bookingId,
        serviceType,
      });

      return res.status(200).json({
        success: true,
        data: response.data.data,
      });
    } catch (error) {
      logger.error("Paystack initialization failed", {
        error: error.response?.data || error.message,
      });

      return res.status(500).json({
        success: false,
        message: "Unable to initialize payment",
      });
    }
  },
);