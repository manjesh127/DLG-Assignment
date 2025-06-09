import { Policy, Product } from '../models/policy';
import policies from './policies.json';
import product from './products.json';

export const policiesData = (): Policy[] => policies as Policy[];
export const productData = (): Product[] => product as Product[];