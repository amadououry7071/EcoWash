import axios from 'axios';

const API_URL = '/api';

// Créer une instance axios avec le token
const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// =============== RESERVATIONS ===============

export const createReservation = async (reservationData, token) => {
  const response = await axios.post(`${API_URL}/reservations`, reservationData, getAuthConfig(token));
  return response.data;
};

export const getMyReservations = async (token) => {
  const response = await axios.get(`${API_URL}/reservations/my`, getAuthConfig(token));
  return response.data;
};

// =============== CONTACT ===============

export const sendContactMessage = async (contactData) => {
  const response = await axios.post(`${API_URL}/contact`, contactData);
  return response.data;
};

// =============== ADMIN ===============

export const getAdminReservations = async (token, status = 'all') => {
  const response = await axios.get(`${API_URL}/admin/reservations?status=${status}`, getAuthConfig(token));
  return response.data;
};

export const updateReservationStatus = async (id, status, token, rejectReason = null) => {
  const data = { status };
  if (rejectReason) {
    data.rejectReason = rejectReason;
  }
  const response = await axios.put(`${API_URL}/admin/reservations/${id}`, data, getAuthConfig(token));
  return response.data;
};

export const deleteReservation = async (id, token) => {
  const response = await axios.delete(`${API_URL}/admin/reservations/${id}`, getAuthConfig(token));
  return response.data;
};

export const getAdminContacts = async (token) => {
  const response = await axios.get(`${API_URL}/admin/contacts`, getAuthConfig(token));
  return response.data;
};

export const markContactAsRead = async (id, token) => {
  const response = await axios.put(`${API_URL}/admin/contacts/${id}/read`, {}, getAuthConfig(token));
  return response.data;
};

export const deleteContact = async (id, token) => {
  const response = await axios.delete(`${API_URL}/admin/contacts/${id}`, getAuthConfig(token));
  return response.data;
};

export const getAdminStats = async (token) => {
  const response = await axios.get(`${API_URL}/admin/stats`, getAuthConfig(token));
  return response.data;
};

// =============== REVIEWS (AVIS) ===============

export const getReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data;
};

export const getMyReview = async (token) => {
  const response = await axios.get(`${API_URL}/reviews/my`, getAuthConfig(token));
  return response.data;
};

export const createReview = async (reviewData, token) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData, getAuthConfig(token));
  return response.data;
};

export const updateReview = async (reviewData, token) => {
  const response = await axios.put(`${API_URL}/reviews`, reviewData, getAuthConfig(token));
  return response.data;
};

export const deleteReview = async (token) => {
  const response = await axios.delete(`${API_URL}/reviews`, getAuthConfig(token));
  return response.data;
};
