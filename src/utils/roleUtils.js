export const roleUtils = {
  canManageShips: (role) => role === 'Admin',
  canManageComponents: (role) => ['Admin', 'Inspector'].includes(role),
  canManageJobs: (role) => ['Admin', 'Inspector'].includes(role),
  canViewJobs: (role) => ['Admin', 'Inspector', 'Engineer'].includes(role),
};