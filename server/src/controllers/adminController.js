import { sendSuccess } from '../utils/apiResponse.js';
import * as adminService from '../services/adminService.js';
import { getTrafficPerfSummary } from '../services/analyticsService.js';

export const commandCenter = async (_req, res) => sendSuccess(res, await adminService.metrics());
export const traffic = async (_req, res) => sendSuccess(res, await getTrafficPerfSummary());
export const maintenance = async (req, res) => sendSuccess(res, adminService.setMaintenanceMode(req.validated.body.enabled));

export const createApiKey = async (req, res) => sendSuccess(res, await adminService.createApiKey(req.validated.body.name), 'api_key_created');
export const listApiKeys = async (_req, res) => sendSuccess(res, await adminService.listApiKeys());
export const revokeApiKey = async (req, res) => sendSuccess(res, await adminService.revokeApiKey(req.params.id), 'api_key_revoked');
export const rotateApiKey = async (req, res) => sendSuccess(res, await adminService.rotateApiKey(req.params.id), 'api_key_rotated');

export const createWebhook = async (req, res) => sendSuccess(res, await adminService.createWebhook(req.validated.body), 'webhook_created');
export const listWebhooks = async (_req, res) => sendSuccess(res, await adminService.listWebhooks());
export const updateWebhook = async (req, res) => sendSuccess(res, await adminService.updateWebhook(req.params.id, req.validated.body), 'webhook_updated');
export const deleteWebhook = async (req, res) => sendSuccess(res, await adminService.deleteWebhook(req.params.id), 'webhook_deleted');
export const retryWebhook = async (req, res) => sendSuccess(res, await adminService.enqueueWebhookRetry(req.params.id), 'webhook_retry_enqueued');
