import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { logActivity } from '../services/adminService';

export const RolesPage: React.FC = () => {
  const { roles, setRoles, user, setActivityLogs } = useApp();
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleTogglePermission = (permission: string) => {
    const isGranted = selectedRole.permissions.includes(permission);
    let updatedPerms = [];
    if (isGranted) {
      updatedPerms = selectedRole.permissions.filter(p => p !== permission);
    } else {
      updatedPerms = [...selectedRole.permissions, permission];
    }

    const updatedRole = { ...selectedRole, permissions: updatedPerms };
    setSelectedRole(updatedRole);
    setRoles(prev => prev.map(r => r.name === selectedRole.name ? updatedRole : r));
    logActivity(user.name, `Modified permissions for role: ${selectedRole.name}`, setActivityLogs);
  };

  const allAvailablePermissions = [
    'All Actions',
    'View Analytics',
    'Manage Products',
    'Manage Categories',
    'View Orders',
    'Update Order Status',
    'Manage Database',
    'User Logs'
  ];

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Roles & Permissions</h4>
        <p className="text-muted fs-8 m-0">Configure detailed functional permissions for administrative roles.</p>
      </div>

      <div className="row g-3">
        {/* Role list select */}
        <div className="col-12 col-md-4">
          <ul className="list-group p-0 fs-7 border rounded bg-white">
            {roles.map((r, i) => (
              <li 
                key={i} 
                onClick={() => setSelectedRole(r)}
                className={`list-group-item py-3 px-3 border-0 border-bottom cursor-pointer ${
                  selectedRole.name === r.name ? 'active bg-dark text-white' : 'theme-color fw-semibold'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {r.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Permissions checkbox list */}
        <div className="col-12 col-md-8">
          <div className="card p-3 border-0 shadow-sm rounded-3 bg-white text-start">
            <h6 className="fw-bold mb-3 theme-color">Granted Permissions for "{selectedRole.name}"</h6>
            <div className="row g-2">
              {allAvailablePermissions.map((perm, i) => {
                const checked = selectedRole.permissions.includes(perm);
                return (
                  <div key={i} className="col-12 col-sm-6 mb-2">
                    <div className="form-check form-switch">
                      <input 
                        type="checkbox" 
                        id={`perm-${i}`}
                        checked={checked} 
                        onChange={() => handleTogglePermission(perm)}
                        className="form-check-input"
                        disabled={selectedRole.name === 'Super Admin'} // Super admin has all permissions fixed
                      />
                      <label htmlFor={`perm-${i}`} className="form-check-label fs-7 fw-semibold theme-color ms-2">
                        {perm}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedRole.name === 'Super Admin' && (
              <p className="text-muted fs-8 mt-3 border-top pt-2">
                * Note: Super Admin permissions are hard-coded and cannot be modified for security reasons.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RolesPage;
