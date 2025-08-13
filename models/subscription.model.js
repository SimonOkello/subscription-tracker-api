import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minLength: 2,
            maxLength: 100,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be greater than or equal to 0"],
        },
        currency: {
            type: String,
            required: [true, "Currency is required"],
            enum: ["KES", "USD"],
            default: "KES",
        },
        frequency: {
            type: String,
            required: [true, "Frequency is required"],
            enum: ["daily", "weekly", "monthly", "yearly"],
            default: "monthly",
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "sports",
                "entertainment",
                "transport",
                "education",
                "health",
                "other",
            ],
            default: "other",
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            enum: ["card", "bank", "cash", "mno"],
            default: "card",
            trim: true,
            lowercase: true,
        },
        status: {
            type: String,
            enum: ["active", "expired", "cancelled"],
            default: "active",
            trim: true,
            lowercase: true,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },

                message: "Start date must be in the past",
            },
        },
        renewalDate: {
            type: Date,
            validate: {
                validator: function (value) {
                    return value >= this.startDate;
                },

                message: "Renewal date must be after start date",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
            index: true,
        },
    },
    {
        timestamps: true,
    },
);

// Auto-calculate renewal date if not provided
SubscriptionSchema.pre("save", async function (next) {
    if (this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(
            this.renewalDate.getDate() + renewalPeriods[this.frequency],
        );
    }
    // Auto-update status if renewal data has passed
    if (!this.status && this.renewalDate <= new Date()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
