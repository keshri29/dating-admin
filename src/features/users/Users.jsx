/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Eye,
  RefreshCw,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { fetchUsers, updateUserStatus, setPageSize } from '../../store/slices/usersSlice';

const columnHelper = createColumnHelper();

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading, totalCount, pageSize, error } = useSelector((state) => state.users);
   const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize || 10,
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);
console.log("pagination",pagination)
  useEffect(() => {
    loadUsers();
  }, [pagination.pageIndex, pagination.pageSize]);

  const loadUsers = () => {
    dispatch(fetchUsers({
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize
    }));
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    setActionLoading(userId);
    await dispatch(updateUserStatus({ id: userId, status: newStatus }));
    setActionLoading(null);
  };

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
        return 'badge-success';
      case 'suspended':
        return 'badge-warning';
      case 'banned':
      case 'deleted':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('mobile_number', {
        header: 'Phone',
        cell: (info) => <span className="text-sm">{info.getValue() || 'N/A'}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          return <span className={getStatusBadgeClass(status)}>{status || 'unknown'}</span>;
        },
      }),
      columnHelper.accessor('kyc_status', {
        header: 'KYC Status',
        cell: (info) => {
          const status = info.getValue();
          const badgeClass = {
            verified: 'badge-success',
            pending: 'badge-warning',
            rejected: 'badge-danger',
          }[status?.toLowerCase()] || 'badge-info';
          return <span className={badgeClass}>{status || 'N/A'}</span>;
        },
      }),
      columnHelper.accessor('created_at', {
        header: 'Signup Date',
        cell: (info) => info.getValue() ? format(new Date(info.getValue()), 'MMM dd, yyyy') : 'N/A',
      }),
      columnHelper.accessor('last_login_at', {
        header: 'Last Active',
        cell: (info) => info.getValue() ? format(new Date(info.getValue()), 'MMM dd, yyyy') : 'Never',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(`/users/${info.row.original._id}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye size={18} className="text-primary" />
            </button>
            
            {info.row.original.status === 'active' && (
              <button
                onClick={() => handleStatusUpdate(info.row.original._id, 'suspended')}
                disabled={actionLoading === info.row.original._id}
                className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                title="Suspend User"
              >
                <AlertTriangle size={18} className="text-yellow-600" />
              </button>
            )}
            
            {info.row.original.status === 'suspended' && (
              <button
                onClick={() => handleStatusUpdate(info.row.original._id, 'active')}
                disabled={actionLoading === info.row.original._id}
                className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                title="Activate User"
              >
                <CheckCircle size={18} className="text-green-600" />
              </button>
            )}
            
            {info.row.original.status !== 'banned' && info.row.original.status !== 'deleted' && (
              <button
                onClick={() => handleStatusUpdate(info.row.original._id, 'banned')}
                disabled={actionLoading === info.row.original._id}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Ban User"
              >
                <XCircle size={18} className="text-red-600" />
              </button>
            )}
          </div>
        ),
      }),
    ],
    [actionLoading, navigate]
  );

  const table = useReactTable({
    data: users || [],
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    pageCount: Math.ceil((totalCount || 0) / pagination.pageSize),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const filteredUsers = useMemo(() => {
    if (statusFilter === 'all') return table.getRowModel().rows;
    return table.getRowModel().rows.filter(
      row => row.original.status?.toLowerCase() === statusFilter.toLowerCase()
    );
  }, [table.getRowModel().rows, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={loadUsers}
            className="btn-outline flex items-center"
            disabled={isLoading}
          >
            <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="btn-outline flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
              <option value="deleted">Deleted</option>
            </select>
            
            <select
              value={pagination.pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                dispatch(setPageSize(newSize));
                table.setPageSize(newSize);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((row) => (
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
                      <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  totalCount || 0
                )}{' '}
                of {totalCount || 0} results
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
          </>
        )}
      </div>
    </div>
  );
};

export default Users;