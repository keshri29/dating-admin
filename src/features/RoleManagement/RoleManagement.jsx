import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Plus,
  Edit,
  Trash2,
  Shield,
   Key,
  UserPlus,
  RefreshCw,
   X
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
  clearSuccess
} from '../../store/slices/rbacSlice';

const columnHelper = createColumnHelper();

const RoleManagement = () => {
  const dispatch = useDispatch();
  const { roles, modules, permissions, admins, totalAdmins, isLoading, isSubmitting, error, success } = useSelector((state) => state.rbac);
  
  const [activeTab, setActiveTab] = useState('roles');
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  
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

  useEffect(() => {
    loadData();
  }, [activeTab]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [success, dispatch]);

  const loadData = () => {
    if (activeTab === 'roles') {
      dispatch(fetchRoles());
      dispatch(fetchModules());
      dispatch(fetchPermissions());
    } else if (activeTab === 'admins') {
      dispatch(fetchAdmins({
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize
      }));
    }
  };

  const handleAddRole = async () => {
    if (!newRole.role_name) {
      alert('Role name is required');
      return;
    }
    await dispatch(addRole(newRole));
    setShowRoleModal(false);
    setNewRole({ role_name: '', description: '', is_active: true });
    dispatch(fetchRoles());
  };

  const handleAddModule = async () => {
    const validModules = newModules.filter(m => m.module_name && m.url);
    if (validModules.length === 0) {
      alert('At least one module with name and URL is required');
      return;
    }
    await dispatch(addModule(validModules));
    setShowModuleModal(false);
    setNewModules([{ module_name: '', description: '', url: '', icon: '', sort_order: 1 }]);
    dispatch(fetchModules());
  };

  const handleAddPermission = async (roleId) => {
    const permissionsToAdd = rolePermissions.map(perm => ({
      role_id: roleId,
      module_id: perm.module_id,
      can_read: perm.can_read || false,
      can_write: perm.can_write || false,
      can_download: perm.can_download || false
    }));
    
    await dispatch(addPermission(permissionsToAdd));
    setShowPermissionModal(false);
    setSelectedRole(null);
    setRolePermissions([]);
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password || !newAdmin.name || !newAdmin.role_id) {
      alert('All fields are required');
      return;
    }
    await dispatch(addAdmin(newAdmin));
    setShowAdminModal(false);
    setNewAdmin({ email: '', password: '', name: '', role_id: '' });
    dispatch(fetchAdmins({
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize
    }));
  };

  const addModuleField = () => {
    setNewModules([...newModules, { module_name: '', description: '', url: '', icon: '', sort_order: newModules.length + 1 }]);
  };

  const removeModuleField = (index) => {
    if (newModules.length > 1) {
      setNewModules(newModules.filter((_, i) => i !== index));
    }
  };

  const updateModuleField = (index, field, value) => {
    const updated = [...newModules];
    updated[index][field] = value;
    setNewModules(updated);
  };

  const initializePermissions = (role) => {
    setSelectedRole(role);
    const existingPermissions = permissions.filter(p => p.role_id === role.id);
    const permMap = {};
    existingPermissions.forEach(p => {
      permMap[p.module_id] = p;
    });
    
    const perms = modules.map(module => ({
      module_id: module.id,
      module_name: module.module_name,
      can_read: permMap[module.id]?.can_read || false,
      can_write: permMap[module.id]?.can_write || false,
      can_download: permMap[module.id]?.can_download || false
    }));
    setRolePermissions(perms);
    setShowPermissionModal(true);
  };

  const rolesColumns = useMemo(
    () => [
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
            <span className={isActive ? 'badge-success' : 'badge-danger'}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        },
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => initializePermissions(info.row.original)}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              title="Manage Permissions"
            >
              <Key size={18} className="text-blue-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Role"
            >
              <Edit size={18} className="text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete Role"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        ),
      }),
    ],
    [modules, permissions]
  );

  const adminsColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm font-medium">
              {info.getValue()?.charAt(0) || 'A'}
            </div>
            <span className="ml-2">{info.getValue()}</span>
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
          const status = info.getValue();
          return <span className={status === 'active' ? 'badge-success' : 'badge-danger'}>{status || 'active'}</span>;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Admin"
            >
              <Edit size={18} className="text-gray-600" />
            </button>
            <button
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Deactivate Admin"
            >
              <X size={18} className="text-red-600" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const modulesColumns = useMemo(
    () => [
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
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Module"
            >
              <Edit size={18} className="text-gray-600" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: activeTab === 'roles' ? roles : activeTab === 'admins' ? admins : modules,
    columns: activeTab === 'roles' ? rolesColumns : activeTab === 'admins' ? adminsColumns : modulesColumns,
    state: {
      globalFilter,
      sorting,
      pagination: activeTab === 'admins' ? pagination : undefined,
    },
    pageCount: activeTab === 'admins' ? Math.ceil((totalAdmins || 0) / pagination.pageSize) : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: activeTab === 'admins' ? setPagination : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: activeTab === 'admins',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Role & Access Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={loadData}
            className="btn-outline flex items-center"
            disabled={isLoading}
          >
            <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <div className="card">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'roles'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Roles
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'modules'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Modules
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'admins'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Administrators
            </button>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            {activeTab === 'roles' && (
              <button
                onClick={() => setShowRoleModal(true)}
                className="btn-primary flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Role
              </button>
            )}
            {activeTab === 'modules' && (
              <button
                onClick={() => setShowModuleModal(true)}
                className="btn-primary flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Module
              </button>
            )}
            {activeTab === 'admins' && (
              <>
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="btn-primary flex items-center"
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
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={`flex items-center ${
                                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() && (
                                <ArrowUpDown className="ml-1" size={14} />
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
                    <tr>
                      <td colSpan={activeTab === 'roles' ? 5 : 6} className="text-center py-8 text-gray-500">
                        No {activeTab} found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {activeTab === 'admins' && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
                  {Math.min(
                    (pagination.pageIndex + 1) * pagination.pageSize,
                    totalAdmins || 0
                  )}{' '}
                  of {totalAdmins || 0} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || isLoading}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg">
                    Page {pagination.pageIndex + 1} of {table.getPageCount()}
                  </span>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || isLoading}
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

      {/* Add Role Modal */}
      {showRoleModal && (
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
                  onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter role name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                  placeholder="Enter role description"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={newRole.is_active}
                  onChange={(e) => setNewRole({ ...newRole, is_active: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
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
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Role'}
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      {showModuleModal && (
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                        onChange={(e) => updateModuleField(index, 'sort_order', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Brief description of the module"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addModuleField}
                className="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
              >
                <Plus size={16} className="mr-1" />
                Add Another Module
              </button>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddModule}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Modules'}
              </button>
              <button
                onClick={() => setShowModuleModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {showPermissionModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-2">
              Manage Permissions for {selectedRole.role_name}
            </h2>
            <p className="text-gray-600 mb-4">Configure module access permissions</p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Module</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Read</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Write</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Download</th>
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
                            const updated = [...rolePermissions];
                            updated[index].can_read = e.target.checked;
                            setRolePermissions(updated);
                          }}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.can_write}
                          onChange={(e) => {
                            const updated = [...rolePermissions];
                            updated[index].can_write = e.target.checked;
                            setRolePermissions(updated);
                          }}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.can_download}
                          onChange={(e) => {
                            const updated = [...rolePermissions];
                            updated[index].can_download = e.target.checked;
                            setRolePermissions(updated);
                          }}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleAddPermission(selectedRole.id)}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Permissions'}
              </button>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  setSelectedRole(null);
                }}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAdminModal && (
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
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={newAdmin.role_id}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
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
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Admin'}
              </button>
              <button
                onClick={() => setShowAdminModal(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;