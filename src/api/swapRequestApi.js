
import api from "./axios";

// Send a swap request
export const sendSwapRequest = (data) =>
  api.post("/swap-requests", data);

// Get received requests
export const getReceivedRequests = () =>
  api.get("/swap-requests/received");

// Get sent requests
export const getSentRequests = () =>
  api.get("/swap-requests/sent");

// Accept or reject a request
export const updateRequestStatus = (id, status) =>
  api.patch(`/swap-requests/${id}/status`, { status });

// Cancel a sent request
export const cancelSwapRequest = (id) =>
  api.delete(`/swap-requests/${id}`);
