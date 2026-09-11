require('dotenv').config();
const express = require("express");
const cors = require("cors"); // Fix 1: Imported CORS package
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;

// Enable CORS globally for all routes & methods
app.use(cors());
app.use(express.json());

// MongoDB connection string
const uri = process.env.MONGODB_URI;

// Mongo variables
let client, db;

// Connect to MongoDB
async function connectToMongo() {
    try {
        client = new MongoClient(uri);

        await client.connect();

        console.log("Connected to MongoDB");

        db = client.db("Cluster10");

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

(async () => {
    try {
        await connectToMongo();

        app.listen(port, () => {
            console.log(
                `Server is alive on http://localhost:${port}`
            );
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

// Endpoint for Signup
app.post("/signup", async (req, res) => {
    try {

        const {
            fullName,
            email,
            password
        } = req.body;

        if (!fullName || !fullName.trim()) {
            return res.status(400).json({
                message: "Full name is required"
            });
        }

        // Basic Input Validation
        if (!email || !email.includes("@")) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const collection = db.collection("UsersInformation");

        // Check if user already exists
        const existingUser = await collection.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Simple Password Encoding (Base64)
        const encodedPassword = Buffer.from(password).toString("base64");

        // Save to MongoDB
        const result = await collection.insertOne({
            fullName,
            email: email.toLowerCase(),
            password: encodedPassword,
            createdAt: new Date(),
        });

        // Success Response
        res.status(201).json({
            message: "User created successfully",
            userId: result.insertedId,
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint for Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const collection = db.collection("UsersInformation");
        const user = await collection.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Decode stored Base64 password to check match
        const decodedPassword = Buffer.from(user.password, "base64").toString("utf-8");

        if (decodedPassword !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Users review
app.post("/usersreview", async (req, res) => {
    try {
        const collection = db.collection("UsersReview");

        const result = await collection.insertOne({
            ...req.body,
            createdAt: new Date(),
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/usersreview", async (req, res) => {
    const collection = db.collection("UsersReview");
    res.json(await collection.find().toArray());
});

app.put("/usersreview/:id", async (req, res) => {
    const collection = db.collection("UsersReview");

    const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json(result);
});

app.delete("/usersreview/:id", async (req, res) => {
    const collection = db.collection("UsersReview");

    const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(result);
});

// Users card
app.post("/userscard", async (req, res) => {
    const collection = db.collection("UsersCard");

    const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date(),
    });

    res.status(201).json(result);
});

app.get("/userscard", async (req, res) => {
    const collection = db.collection("UsersCard");
    res.json(await collection.find().toArray());
});

app.put("/userscard/:id", async (req, res) => {
    const collection = db.collection("UsersCard");

    const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json(result);
});

app.delete("/userscard/:id", async (req, res) => {
    const collection = db.collection("UsersCard");

    const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(result);
});

// Get user's cart
app.get("/userscarts", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        const collection = db.collection("UsersCarts");

        const cart = await collection.find({
            userId: userId
        }).toArray();

        res.json(cart);

    } catch (error) {
        console.error("Get cart error:", error);

        res.status(500).json({
            message: "Failed to get cart"
        });
    }
});


// Add item to cart
app.post("/userscarts", async (req, res) => {
    try {
        const {
            userId,
            productId,
            quantity
        } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                message:
                    "userId and productId are required"
            });
        }

        const collection =
            db.collection("UsersCarts");


        // Check whether product is already
        // in the user's cart
        const existingItem =
            await collection.findOne({
                userId: userId,
                productId: productId
            });


        if (existingItem) {

            const newQuantity =
                existingItem.quantity +
                (quantity || 1);


            await collection.updateOne(
                {
                    _id: existingItem._id
                },
                {
                    $set: {
                        quantity: newQuantity,
                        updatedAt: new Date()
                    }
                }
            );


            return res.json({
                message: "Cart updated"
            });
        }


        const result =
            await collection.insertOne({

                userId: userId,

                productId: productId,

                quantity: quantity || 1,

                createdAt: new Date(),

                updatedAt: new Date()

            });


        res.status(201).json({
            message: "Product added to cart",
            cartId: result.insertedId
        });

    } catch (error) {

        console.error(
            "Add cart error:",
            error
        );

        res.status(500).json({
            message: "Failed to add product"
        });
    }
});


// Update quantity
app.put("/userscarts/:id", async (req, res) => {

    try {

        const { quantity } = req.body;

        if (!quantity || quantity < 1) {

            return res.status(400).json({
                message:
                    "Quantity must be at least 1"
            });

        }

        const collection =
            db.collection("UsersCarts");


        const result =
            await collection.updateOne(

                {
                    _id:
                        new ObjectId(
                            req.params.id
                        )
                },

                {
                    $set: {
                        quantity: quantity,
                        updatedAt: new Date()
                    }
                }

            );


        res.json(result);

    } catch (error) {

        console.error(
            "Update cart error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to update cart"
        });
    }
});


// Remove item
app.delete(
    "/userscarts/:id",
    async (req, res) => {

        try {

            const collection =
                db.collection(
                    "UsersCarts"
                );


            const result =
                await collection.deleteOne({
                    _id:
                        new ObjectId(
                            req.params.id
                        )
                });


            res.json(result);

        } catch (error) {

            console.error(
                "Remove cart error:",
                error
            );

            res.status(500).json({
                message:
                    "Failed to remove item"
            });
        }
    }
);


// Clear user's cart
app.delete(
    "/userscarts/user/:userId",
    async (req, res) => {

        try {

            const collection =
                db.collection(
                    "UsersCarts"
                );


            const result =
                await collection.deleteMany({
                    userId:
                        req.params.userId
                });


            res.json(result);

        } catch (error) {

            console.error(
                "Clear cart error:",
                error
            );

            res.status(500).json({
                message:
                    "Failed to clear cart"
            });
        }
    }
);

// Users location
app.post("/userslocation", async (req, res) => {
    const collection = db.collection("UsersLocation");

    const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date(),
    });

    res.status(201).json(result);
});

app.get("/userslocation", async (req, res) => {
    const collection = db.collection("UsersLocation");
    res.json(await collection.find().toArray());
});

app.put("/userslocation/:id", async (req, res) => {
    const collection = db.collection("UsersLocation");

    const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json(result);
});

app.delete("/userslocation/:id", async (req, res) => {
    const collection = db.collection("UsersLocation");

    const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(result);
});

// Web products
app.post("/webproducts", async (req, res) => {
    const collection = db.collection("WebProducts");

    const result = await collection.insertOne({
        ...req.body,
        createdAt: new Date(),
    });

    res.status(201).json(result);
});

app.get("/webproducts", async (req, res) => {
    const collection = db.collection("WebProducts");
    res.json(await collection.find().toArray());
});

app.put("/webproducts/:id", async (req, res) => {
    const collection = db.collection("WebProducts");

    const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json(result);
});

app.delete("/webproducts/:id", async (req, res) => {
    const collection = db.collection("WebProducts");

    const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(result);
});

// Create a new order
app.post("/orders", async (req, res) => {
    try {
        const {
            customer,
            cart,
            delivery,
            payment,
            subtotal,
            shipping,
            discount,
            total,
        } = req.body;

        // Basic validation
        if (!customer) {
            return res.status(400).json({
                message: "Customer information is required",
            });
        }

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one product",
            });
        }

        if (total === undefined || total === null) {
            return res.status(400).json({
                message: "Order total is required",
            });
        }

        const collection = db.collection("Orders");

        // Generate a readable order number
        const orderNumber =
            "CS-" +
            Date.now().toString().slice(-8);

        const order = {
            orderNumber,

            customer,
            cart,

            delivery: delivery || null,
            payment: payment || null,

            subtotal: Number(subtotal) || 0,
            shipping: Number(shipping) || 0,
            discount: Number(discount) || 0,
            total: Number(total) || 0,

            status: "Pending",
            paymentStatus: "Pending",

            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(order);

        res.status(201).json({
            message: "Order created successfully",

            orderId: result.insertedId,

            orderNumber,

            order: {
                ...order,
                _id: result.insertedId,
            },
        });

    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create order",
            error: error.message,
        });
    }
});

app.get("/orders", async (req, res) => {
    try {
        const collection = db.collection("Orders");

        const orders = await collection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        res.json(orders);

    } catch (error) {
        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Failed to get orders",
            error: error.message,
        });
    }
});

app.get("/orders/:id", async (req, res) => {
    try {
        const collection = db.collection("Orders");

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid order ID",
            });
        }

        const order = await collection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);

    } catch (error) {
        console.error("Get order error:", error);

        res.status(500).json({
            message: "Failed to get order",
            error: error.message,
        });
    }
});

app.get("/orders/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const collection = db.collection("Orders");

        const orders = await collection
            .find({
                "customer.userId": userId,
            })
            .sort({ createdAt: -1 })
            .toArray();

        res.json(orders);

    } catch (error) {
        console.error("Get user orders error:", error);

        res.status(500).json({
            message: "Failed to get user orders",
            error: error.message,
        });
    }
});

app.get("/orders/number/:orderNumber", async (req, res) => {
    try {
        const collection = db.collection("Orders");

        const order = await collection.findOne({
            orderNumber: req.params.orderNumber,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json(order);

    } catch (error) {
        console.error("Get order by number error:", error);

        res.status(500).json({
            message: "Failed to get order",
            error: error.message,
        });
    }
});

app.put("/orders/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
                allowedStatuses,
            });
        }

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid order ID",
            });
        }

        const collection = db.collection("Orders");

        const result = await collection.updateOne(
            {
                _id: new ObjectId(req.params.id),
            },
            {
                $set: {
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json({
            message: "Order status updated successfully",
            status,
        });

    } catch (error) {
        console.error("Update order status error:", error);

        res.status(500).json({
            message: "Failed to update order status",
            error: error.message,
        });
    }
});

app.put("/orders/:id/payment-status", async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        const allowedStatuses = [
            "Pending",
            "Paid",
            "Failed",
            "Refunded",
        ];

        if (
            !paymentStatus ||
            !allowedStatuses.includes(paymentStatus)
        ) {
            return res.status(400).json({
                message: "Invalid payment status",
                allowedStatuses,
            });
        }

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid order ID",
            });
        }

        const collection = db.collection("Orders");

        const result = await collection.updateOne(
            {
                _id: new ObjectId(req.params.id),
            },
            {
                $set: {
                    paymentStatus,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json({
            message: "Payment status updated successfully",
            paymentStatus,
        });

    } catch (error) {
        console.error(
            "Update payment status error:",
            error
        );

        res.status(500).json({
            message: "Failed to update payment status",
            error: error.message,
        });
    }
});

app.delete("/orders/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid order ID",
            });
        }

        const collection = db.collection("Orders");

        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id),
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.json({
            message: "Order deleted successfully",
        });

    } catch (error) {
        console.error("Delete order error:", error);

        res.status(500).json({
            message: "Failed to delete order",
            error: error.message,
        });
    }
});