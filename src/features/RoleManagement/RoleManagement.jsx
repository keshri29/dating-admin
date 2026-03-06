/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Shield,
  Key,
  UserPlus,
  RefreshCw,
  X,
  Check,
  Eye,
  PenTool,
  Download,
  Save
} from 'lucide-react';
import { 
  fetchRoles, 
  fetchModules, 
  fetchPermissions,
  addRole,
  addModule,
  addPermission,
  fetchAdmins,
  addAdmin, 
  clearSuccess,
  clearError
} from '../../store/slices/rbacSlice';

const columnHelper = createColumnHelper();

 const Toast = ({ message, type = 'success', onClose }) => (
  <div className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
  }`}>
    <div className="flex-1 mr-3">{message}</div>
    <button onClick={onClose} className="p-1 hover:bg-opacity-20 hover:bg-gray-600 rounded">
      <X size={16} />
    </button>
  </div>
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Empty state component
const EmptyState = ({ message }) => (
  <tr>
    <td colSpan={6} className="text-center py-8 text-gray-500">
      {message}
    </td>
  </tr>
);

const RoleManagement = () => {
  const dispatch = useDispatch();
  const { roles, modules, permissions, admins, totalAdmins, isLoading, isSubmitting, error, success } = useSelector((state) => state.rbac);
  
  // Extract data arrays from API response with proper fallbacks
  const rolesData = roles?.data || [];
  const modulesData = modules?.data || [];
  const permissionsData = permissions?.data || [];
  const adminsData = admins?.data || [];
  
  // Local state
  const [activeTab, setActiveTab] = useState('roles');
  const [globalFilter, setGlobalFilter] = useState('');
  const [toast, setToast] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  // Modal states
  const [modals, setModals] = useState({
    role: false,
    module: false,
    permission: false,
    admin: false,
    viewPermissions: false
  });
  
  // Form states
  const [newRole, setNewRole] = useState({
    role_name: '',
    description: '',
    is_active: true
  });
  
  const [newModules, setNewModules] = useState([
    {
      module_name: '',
      description: '',
      url: '',
      icon: '',
      sort_order: 1
    }
  ]);
  
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    name: '',
    role_id: ''
  });
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [viewingPermissions, setViewingPermissions] = useState(null);

  // Load data based on active tab
  useEffect(() => {
    loadData();
  }, [activeTab, pagination.pageIndex, pagination.pageSize]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      setToast({ message: success, type: 'success' });
      const timer = setTimeout(() => {
        setToast(null);
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
      const timer = setTimeout(() => {
        setToast(null);
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const loadData = useCallback(() => {
    switch(activeTab) {
      case 'roles':
        dispatch(fetchRoles());
        dispatch(fetchModules());
        dispatch(fetchPermissions());
        break;
      case 'modules':
        dispatch(fetchModules());
        break;
      case 'admins':
        dispatch(fetchAdmins({
          limit: pagination.pageSize,
          offset: pagination.pageIndex * pagination.pageSize
        }));
        break;
      default:
        break;
    }
  }, [activeTab, pagination.pageSize, pagination.pageIndex, dispatch]);

  const handleAddRole = async () => {
    if (!newRole.role_name?.trim()) {
      setToast({ message: 'Role name is required', type: 'error' });
      return;
    }
    
    try {
      await dispatch(addRole(newRole)).unwrap();
      setModals(prev => ({ ...prev, role: false }));
      setNewRole({ role_name: '', description: '', is_active: true });
      dispatch(fetchRoles());
    } catch (err) {
      // Error handled by redux
    }
  };

  const handleAddModule = async () => {
    const validModules = newModules.filter(m => m.module_name?.trim() && m.url?.trim());
    
    if (validModules.length === 0) {
      setToast({ message: 'At least one module with name and URL is required', type: 'error' });
      return;
    }
    
    try {
      await dispatch(addModule(validModules)).unwrap();
      setModals(prev => ({ ...prev, module: false }));
      setNewModules([{ module_name: '', description: '', url: '', icon: '', sort_order: 1 }]);
      dispatch(fetchModules());
    } catch (err) {
      // Error handled by redux
    }
  };

  const handleAddPermission = async (roleId) => {
    const permissionsToAdd = rolePermissions
      .filter(perm => perm.can_read || perm.can_write || perm.can_download)
      .map(perm => ({
        role_id: roleId,
        module_id: perm.module_id,
        can_read: perm.can_read || false,
        can_write: perm.can_write || false,
        can_download: perm.can_download || false
      }));
    
    if (permissionsToAdd.length === 0) {
      setToast({ message: 'Select at least one permission', type: 'error' });
      return;
    }
    
    try {
      await dispatch(addPermission({ permissions: permissionsToAdd })).unwrap();
      setModals(prev => ({ ...prev, permission: false }));
      setSelectedRole(null);
      setRolePermissions([]);
      dispatch(fetchPermissions());
    } catch (err) {
      // Error handled by redux
    }
  };

  const handleAddAdmin = async () => {
    const { email, password, name, role_id } = newAdmin;
    
    if (!email?.trim() || !password?.trim() || !name?.trim() || !role_id) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }
    
    try {
      await dispatch(addAdmin(newAdmin)).unwrap();
      setModals(prev => ({ ...prev, admin: false }));
      setNewAdmin({ email: '', password: '', name: '', role_id: '' });
      dispatch(fetchAdmins({
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize
      }));
    } catch (err) {
      // Error handled by redux
    }
  };

  const addModuleField = () => {
    setNewModules(prev => [...prev, { 
      module_name: '', 
      description: '', 
      url: '', 
      icon: '', 
      sort_order: prev.length + 1 
    }]);
  };

  const removeModuleField = (index) => {
    if (newModules.length > 1) {
      setNewModules(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateModuleField = (index, field, value) => {
    setNewModules(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const initializePermissions = (role) => {
    setSelectedRole(role);
    
    // Filter permissions for the selected role
    const existingPermissions = permissionsData.filter(p => p.role_id?._id === role._id);
    
    // Create a map of existing permissions
    const permMap = {};
    existingPermissions.forEach(p => {
      permMap[p.module_id?._id] = p;
    });
    
    // Initialize permissions for all modules
    const perms = modulesData.map(module => ({
      module_id: module._id,
      module_name: module.module_name,
      can_read: permMap[module._id]?.can_read || false,
      can_write: permMap[module._id]?.can_write || false,
      can_download: permMap[module._id]?.can_download || false
    }));
    
    setRolePermissions(perms);
    setModals(prev => ({ ...prev, permission: true }));
  };

  const viewRolePermissions = (role) => {
    const rolePerms = permissionsData.filter(p => p.role_id?._id === role._id);
    setViewingPermissions({
      role,
      permissions: rolePerms.map(p => ({
        module_name: p.module_id?.module_name || 'Unknown',
        can_read: p.can_read,
        can_write: p.can_write,
        can_download: p.can_download
      }))
    });
    setModals(prev => ({ ...prev, viewPermissions: true }));
  };

  // Table columns definitions
  const rolesColumns = useMemo(() => [
    columnHelper.accessor('role_name', {
      header: 'Role Name',
      cell: (info) => (
        <div className="flex items-center">
          <Shield size={18} className="text-primary mr-2" />
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => <span className="text-sm">{info.getValue() || 'N/A'}</span>,
    }),
    columnHelper.accessor('is_active', {
      header: 'Status',
      cell: (info) => {
        const isActive = info.getValue();
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    }),
    columnHelper.accessor('created_at', {
      header: 'Created',
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => viewRolePermissions(info.row.original)}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            title="View Permissions"
          >
            <Eye size={18} className="text-green-600" />
          </button>
          <button
            onClick={() => initializePermissions(info.row.original)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            title="Manage Permissions"
          >
            <Key size={18} className="text-blue-600" />
          </button>
        </div>
      ),
    }),
  ], [modulesData, permissionsData]);

  const adminsColumns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <div className="flex items-center">
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('role_name', {
      header: 'Role',
      cell: (info) => <span className="text-sm">{info.getValue() || 'N/A'}</span>,
    }),
    columnHelper.accessor('lastActive', {
      header: 'Last Active',
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'Never',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() || 'active';
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        );
      },
    })
  ], []);

  const modulesColumns = useMemo(() => [
    columnHelper.accessor('module_name', {
      header: 'Module Name',
      cell: (info) => (
        <div className="flex items-center">
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => <span className="text-sm">{info.getValue() || 'N/A'}</span>,
    }),
    columnHelper.accessor('url', {
      header: 'URL',
      cell: (info) => <span className="text-sm font-mono">{info.getValue()}</span>,
    }),
    columnHelper.accessor('sort_order', {
      header: 'Sort Order',
      cell: (info) => <span className="text-sm">{info.getValue()}</span>,
    }),
    columnHelper.accessor('is_active', {
      header: 'Status',
      cell: (info) => {
        const isActive = info.getValue();
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    }),
  ], []);

  // Get current data based on active tab
  const getCurrentData = useCallback(() => {
    switch(activeTab) {
      case 'roles':
        return rolesData;
      case 'modules':
        return modulesData;
      case 'admins':
        return adminsData;
      default:
        return [];
    }
  }, [activeTab, rolesData, modulesData, adminsData]);

  // Get total count for pagination
  const getTotalCount = useCallback(() => {
    switch(activeTab) {
      case 'roles':
        return roles?.meta?.total || rolesData.length;
      case 'modules':
        return modules?.meta?.total || modulesData.length;
      case 'admins':
        return totalAdmins || adminsData.length;
      default:
        return 0;
    }
  }, [activeTab, roles, modules, totalAdmins, rolesData.length, modulesData.length, adminsData.length]);

  const currentData = getCurrentData();
  const totalCount = getTotalCount();

  const table = useReactTable({
    data: currentData,
    columns: activeTab === 'roles' ? rolesColumns : activeTab === 'admins' ? adminsColumns : modulesColumns,
    state: {
      globalFilter,
      pagination,
    },
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    enableSorting: false,
  });

  // Modal render functions
  const renderRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name *
            </label>
            <input
              type="text"
              value={newRole.role_name}
              onChange={(e) => setNewRole(prev => ({ ...prev, role_name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role name"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter role description"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={newRole.is_active}
              onChange={(e) => setNewRole(prev => ({ ...prev, is_active: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
              Active
            </label>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleAddRole}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Role'}
          </button>
          <button
            onClick={() => setModals(prev => ({ ...prev, role: false }))}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderModuleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Add Modules</h2>
        
        <div className="space-y-4">
          {newModules.map((module, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Module {index + 1}</h3>
                {newModules.length > 1 && (
                  <button
                    onClick={() => removeModuleField(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Module Name *
                  </label>
                  <input
                    type="text"
                    value={module.module_name}
                    onChange={(e) => updateModuleField(index, 'module_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Users"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL *
                  </label>
                  <input
                    type="text"
                    value={module.url}
                    onChange={(e) => updateModuleField(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="/admin/users"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={module.icon}
                    onChange={(e) => updateModuleField(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="users"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={module.sort_order}
                    onChange={(e) => updateModuleField(index, 'sort_order', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    min="1"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={module.description}
                    onChange={(e) => updateModuleField(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Brief description of the module"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={addModuleField}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            <Plus size={16} className="mr-1" />
            Add Another Module
          </button>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleAddModule}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Modules'}
          </button>
          <button
            onClick={() => setModals(prev => ({ ...prev, module: false }))}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderPermissionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-2">
          Manage Permissions for {selectedRole?.role_name}
        </h2>
        <p className="text-gray-600 mb-4">Configure module access permissions</p>
        
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Module</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                  <div className="flex items-center justify-center">
                    <Eye size={16} className="mr-1" />
                    Read
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                  <div className="flex items-center justify-center">
                    <PenTool size={16} className="mr-1" />
                    Write
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
                  <div className="flex items-center justify-center">
                    <Download size={16} className="mr-1" />
                    Download
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rolePermissions.map((perm, index) => (
                <tr key={perm.module_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{perm.module_name}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.can_read}
                      onChange={(e) => {
                        setRolePermissions(prev => {
                          const updated = [...prev];
                          updated[index].can_read = e.target.checked;
                          return updated;
                        });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.can_write}
                      onChange={(e) => {
                        setRolePermissions(prev => {
                          const updated = [...prev];
                          updated[index].can_write = e.target.checked;
                          return updated;
                        });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={perm.can_download}
                      onChange={(e) => {
                        setRolePermissions(prev => {
                          const updated = [...prev];
                          updated[index].can_download = e.target.checked;
                          return updated;
                        });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => {
              // Select all permissions
              setRolePermissions(prev => prev.map(p => ({
                ...p,
                can_read: true,
                can_write: true,
                can_download: true
              })));
            }}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            Select All
          </button>
          <button
            onClick={() => {
              // Deselect all permissions
              setRolePermissions(prev => prev.map(p => ({
                ...p,
                can_read: false,
                can_write: false,
                can_download: false
              })));
            }}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
          >
            Clear All
          </button>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => handleAddPermission(selectedRole._id)}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={18} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Permissions
              </>
            )}
          </button>
          <button
            onClick={() => {
              setModals(prev => ({ ...prev, permission: false }));
              setSelectedRole(null);
            }}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderViewPermissionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Permissions for {viewingPermissions?.role?.role_name}
          </h2>
          <button
            onClick={() => setModals(prev => ({ ...prev, viewPermissions: false }))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Module</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">Read</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">Write</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {viewingPermissions?.permissions.map((perm, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{perm.module_name}</td>
                  <td className="px-4 py-3 text-center">
                    {perm.can_read ? (
                      <Check size={18} className="text-green-600 mx-auto" />
                    ) : (
                      <X size={18} className="text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.can_write ? (
                      <Check size={18} className="text-green-600 mx-auto" />
                    ) : (
                      <X size={18} className="text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.can_download ? (
                      <Check size={18} className="text-green-600 mx-auto" />
                    ) : (
                      <X size={18} className="text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setModals(prev => ({ ...prev, viewPermissions: false }))}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdminModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Administrator</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              value={newAdmin.role_id}
              onChange={(e) => setNewAdmin(prev => ({ ...prev, role_id: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              {rolesData.map(role => (
                <option key={role._id} value={role._id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleAddAdmin}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Admin'}
          </button>
          <button
            onClick={() => setModals(prev => ({ ...prev, admin: false }))}
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Role & Access Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={loadData}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            disabled={isLoading}
          >
            <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div> 
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Roles ({roles?.meta?.total || rolesData.length})
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'modules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Modules ({modules?.meta?.total || modulesData.length})
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`py-4 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'admins'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Administrators ({totalAdmins || adminsData.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              {activeTab === 'roles' && (
                <button
                  onClick={() => setModals(prev => ({ ...prev, role: true }))}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Role
                </button>
              )}
              {activeTab === 'modules' && (
                <button
                  onClick={() => setModals(prev => ({ ...prev, module: true }))}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Module
                </button>
              )}
              {activeTab === 'admins' && (
                <>
                  <button
                    onClick={() => setModals(prev => ({ ...prev, admin: true }))}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center"
                  >
                    <UserPlus size={18} className="mr-2" />
                    Add Admin
                  </button>
                  <select
                    value={pagination.pageSize}
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      setPagination(prev => ({ ...prev, pageSize: newSize, pageIndex: 0 }));
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b"
                          >
                            {header.isPlaceholder ? null : (
                              <div className="flex items-center">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-3 text-sm">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <EmptyState message={`No ${activeTab} found`} />
                    )}
                  </tbody>
                </table>
              </div>

              {currentData.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
                    {Math.min(
                      (pagination.pageIndex + 1) * pagination.pageSize,
                      totalCount
                    )}{' '}
                    of {totalCount} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
                      disabled={pagination.pageIndex === 0 || isLoading}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-lg">
                      Page {pagination.pageIndex + 1} of {Math.ceil(totalCount / pagination.pageSize)}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
                      disabled={pagination.pageIndex >= Math.ceil(totalCount / pagination.pageSize) - 1 || isLoading}
                      className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {modals.role && renderRoleModal()}
      {modals.module && renderModuleModal()}
      {modals.permission && renderPermissionModal()}
      {modals.viewPermissions && renderViewPermissionsModal()}
      {modals.admin && renderAdminModal()}
    </div>
  );
};

export default RoleManagement;