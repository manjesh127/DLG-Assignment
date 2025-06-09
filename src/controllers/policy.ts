import { Request, Response } from "express";
import { policiesData, productData } from "../data";
import { Policy, Product } from "../models/policy";
import { v4 as uuid4 } from "uuid";

let policies = policiesData()
let products = productData()

type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export const getPolicyById: ExpressHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const policy = policies.find(pol => pol.id == id)
        if (!policy) {
            res.status(404).send({ success: false, message: "policy not found" });
        } else {
            res.status(200).send({ success: true, data: policiesWithProduct(policy) });
        }
    } catch (error) {
        console.error("get policy by id error", error)
        res.status(500).send({ success: false, message: 'Internal server error', error: error })
    }
}

export const getPolicyByCustomerName: ExpressHandler = async (req: Request, res: Response) => {
    try {
        const { customerName } = req.query;
        const policyList = policies.filter(pol => pol.customerName == customerName);
        res.status(200).send({ success: true, data: policyList.map(policiesWithProduct) })
    } catch (error) {
        console.error("get policy by customername error", error)
        res.status(500).send({ success: false, message: 'Internal server error', error: error })
    }
}

export const createPolicy: ExpressHandler = async (req: Request, res: Response) => {
    try {
        const { productId, customerName, premium, status, startDate, endDate } = req.body;
        const validationResult = validateInput(productId, customerName, premium, status, startDate, endDate);

        if (!validationResult.success) {
            res.status(400).send(validationResult);
        } else {
            const policy: Policy = { id: uuid4(), createdAt: new Date().toISOString(), ...req.body };
            policies.push(policy);
            res.status(200).send({ success: true, data: policy })
        }
    } catch (error) {
        console.error("create policy error", error)
        res.status(500).send({ success: false, message: 'Internal server error', error: error })
    }

}

export const updatePolicy: ExpressHandler = async (req: Request, res: Response) => {
    try {
        const { productId, customerName, premium, status, startDate, endDate } = req.body;

        const validationResult = validateInput(productId, customerName, premium, status, startDate, endDate);

        if (!validationResult.success) {
            res.status(400).send(validationResult);
        } else {
            const policyIndex = policies.findIndex(pol => pol.id === req.params.id)
            if (policyIndex === -1) {
                res.status(404).send({ success: false, message: 'Policy not found' })
            } else {
                policies[policyIndex] = { ...policies[policyIndex], ...req.body }
                res.status(200).send({ success: true, data: policies[policyIndex] })
            }
        }
    } catch (error) {
        console.error("update policy error", error)
        res.status(500).send({ success: false, message: 'Internal server error', error: error })
    }

}

export const deletePolicy = async (req: Request, res: Response) => {
    try {
        const policyIndex = policies.findIndex(pol => pol.id === req.params.id)
        if (policyIndex === -1) {
            res.status(404).send({ success: false, message: 'Policy not found' })
        } else {
            const deletePolicy = policies.splice(policyIndex, 1)
            res.status(200).send({ success: true, data: deletePolicy })
        }
    } catch (error) {
        console.error("policy delete error", error)
        res.status(500).send({ success: false, message: 'Internal server error', error: error })
    }

}

function validateInput(productId: string, customerName: string, premium: number, status: string, startDate: string, endDate: string) {
    if (!productId || !customerName || customerName.trim() === "" || !premium
        || !status || status.trim() === "" || !startDate || !endDate) {
        return { success: false, message: "Missing or invalid required fields. Please ensure all required fields are filled correctly" };
    }

    const product = products.find(prod => prod.id == productId);
    if (!product) {
        return { success: false, message: "Product not found" };
    }

    if (typeof premium !== "number") {
        return { success: false, message: "Premium should be a number" };
    }

    return { success: true };
}


function policiesWithProduct(policy: Policy): Policy & { product?: Product } {
    const product = products.find(prod => prod.id === policy.productId);
    return { ...policy, product };
}

