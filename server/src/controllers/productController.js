import * as productService from '../services/productService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const listProducts = async (req, res) => sendSuccess(res, await productService.listProducts(req.query));
export const createProduct = async (req, res) => sendSuccess(res, await productService.createProduct(req.validated.body), 'created');
export const updateProduct = async (req, res) => sendSuccess(res, await productService.updateProduct(req.params.id, req.body), 'updated');
export const updateStock = async (req, res) => sendSuccess(res, await productService.updateVariantStock(req.params.id, req.validated.body.variantId, req.validated.body.stock), 'stock_updated');
