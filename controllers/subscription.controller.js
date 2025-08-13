import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getUserSubscriptions = async (req, res) => {
    try {
        if (req.user.id !== req.params.id)
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized" });
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription)
            return res
                .status(404)
                .json({ success: false, message: "Subscription not found" });
        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const existingSubscription = await Subscription.findOne({
            name: req.body.name,
            user: user._id,
        });
        if (existingSubscription)
            return res.status(400).json({
                success: false,
                message: "Subscription with this name already exists",
            });
        const subscription = new Subscription({
            name: req.body.name,
            price: req.body.price,
            currency: req.body.currency,
            frequency: req.body.frequency,
            category: req.body.category,
            paymentMethod: req.body.paymentMethod,
            startDate: req.body.startDate,
            user: user._id,
        });
        await subscription.save();
        res.status(201).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription)
            return res.status(404).json({ message: "Subscription not found" });
        if (subscription.user.toString() !== user._id.toString())
            return res.status(403).json({ message: "Unauthorized" });
        subscription.name = req.body.name;
        subscription.price = req.body.price;
        subscription.frequency = req.body.frequency;
        subscription.category = req.body.category;
        subscription.paymentMethod = req.body.paymentMethod;
        subscription.startDate = req.body.startDate;
        await subscription.save();
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const cancelUserSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription)
            return res
                .status(404)
                .json({ success: false, message: "Subscription not found" });
        if (subscription.user.toString() !== user._id.toString())
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized" });
        subscription.status = "cancelled";
        await subscription.save();
        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const userUpcomingRenewals = async (req, res) => {
    try {
        console.log("USER:", req.user);
        const user = await User.findById(req.user.id);
        const subscriptions = await Subscription.find({
            user: user._id,
            status: "active",
        });
        const upcomingRenewals = subscriptions.filter((subscription) => {
            const now = new Date();
            const renewalDate = new Date(subscription.renewalDate);
            return renewalDate > now;
        });
        res.status(200).json({
            success: true,
            data: upcomingRenewals,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUserSubscription = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription)
            return res
                .status(404)
                .json({ success: false, message: "Subscription not found" });
        if (subscription.user.toString() !== user._id.toString())
            return res.status(403).json({ message: "Unauthorized" });
        await subscription.deleteOne();
        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
