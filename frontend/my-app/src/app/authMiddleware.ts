let currentAuthToken = ""; // This will hold the current auth token

export const setAuthToken = (token: string) => {
  currentAuthToken = token;
};

const authMiddleware = (api: any) => (next: any) => async (action: any) => {
  if (
    action.type === "tasksApi/executeQuery" ||
    action.type === "tasksApi/executeMutation"
  ) {
    action.meta.baseQueryMeta = {
      ...action.meta.baseQueryMeta,
      headers: {
        Authorization: `Bearer ${currentAuthToken}`,
      },
    };
  }

  return next(action);
};

export default authMiddleware;
