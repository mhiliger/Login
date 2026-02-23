import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for fetching pending registrations (admin).
 * @param {Object} secureAxios - Authenticated axios instance.
 * @param {string} [url='/admin/pending-registrations'] - Endpoint URL.
 * @returns {Object} TanStack Query query object.
 */
export const usePendingRegistrations = (secureAxios, url = "/admin/pending-registrations") => {
  return useQuery({
    queryKey: ["pendingRegistrations"],
    queryFn: async () => {
      const response = await secureAxios.get(url);
      return response.data;
    },
  });
};

/**
 * Hook for fetching a single registration (admin).
 * @param {Object} secureAxios - Authenticated axios instance.
 * @param {number} id - Registration/user ID.
 * @param {string} [baseUrl='/admin/registration'] - Endpoint base URL.
 * @returns {Object} TanStack Query query object.
 */
export const useRegistration = (secureAxios, id, baseUrl = "/admin/registration") => {
  return useQuery({
    queryKey: ["registration", id],
    queryFn: async () => {
      const response = await secureAxios.get(`${baseUrl}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook for approving a registration (admin).
 * @param {Object} secureAxios - Authenticated axios instance.
 * @param {string} [baseUrl='/admin/registration'] - Endpoint base URL.
 * @returns {Object} TanStack Query mutation object.
 */
export const useApproveRegistration = (secureAxios, baseUrl = "/admin/registration") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await secureAxios.post(`${baseUrl}/${id}/approve`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRegistrations"] });
    },
  });
};

/**
 * Hook for rejecting a registration (admin).
 * @param {Object} secureAxios - Authenticated axios instance.
 * @param {string} [baseUrl='/admin/registration'] - Endpoint base URL.
 * @returns {Object} TanStack Query mutation object.
 */
export const useRejectRegistration = (secureAxios, baseUrl = "/admin/registration") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reason }) => {
      const response = await secureAxios.post(`${baseUrl}/${id}/reject`, { reason });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingRegistrations"] });
    },
  });
};

/**
 * Combined hook for admin registration management.
 * @param {Object} secureAxios - Authenticated axios instance.
 * @returns {Object} Object with all admin registration hooks.
 */
const useAdminRegistrations = (secureAxios) => {
  const pendingQuery = usePendingRegistrations(secureAxios);
  const approveMutation = useApproveRegistration(secureAxios);
  const rejectMutation = useRejectRegistration(secureAxios);

  return {
    pendingRegistrations: pendingQuery.data || [],
    isLoading: pendingQuery.isLoading,
    error: pendingQuery.error,
    refetch: pendingQuery.refetch,
    approve: approveMutation.mutate,
    reject: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    approveError: approveMutation.error,
    rejectError: rejectMutation.error,
  };
};

export default useAdminRegistrations;
