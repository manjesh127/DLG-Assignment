import { Router } from "express";
import { getPolicyById, getPolicyByCustomerName, createPolicy, updatePolicy, deletePolicy } from "../controllers/policy";
import { authenticate } from "../middlewares/auth";
const router = Router();

router.get('/policies/:id', getPolicyById)
router.get('/policies', getPolicyByCustomerName)

router.use(authenticate)

router.post('/policies', createPolicy)
router.put('/policies/:id', updatePolicy)
router.delete('/policies/:id', deletePolicy)



export default router;