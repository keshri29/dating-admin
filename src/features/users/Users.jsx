import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Eye } from 'lucide-react';
import { mockUsers } from '../../utils/mockData';
import { format } from 'date-fns';

const columnHelper = createColumnHelper();

const Users = () => {
  const navigate = useNavigate();
  const [data] = useState(mockUsers);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'User ID',
        cell: (info) => <span className="text-sm font-mono">{info.getValue()}</span>,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm font-medium">
              {info.getValue().charAt(0)}
            </div>
            <span className="ml-2">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          const badgeClass = {
            active: 'badge-success',
            suspended: 'badge-warning',
            deleted: 'badge-danger',
          }[status];
          return <span className={badgeClass}>{status}</span>;
        },
      }),
      columnHelper.accessor('kycStatus', {
        header: 'KYC Status',
        cell: (info) => {
          const status = info.getValue();
          const badgeClass = {
            verified: 'badge-success',
            pending: 'badge-warning',
            rejected: 'badge-danger',
          }[status];
          return <span className={badgeClass}>{status}</span>;
        },
      }),
      columnHelper.accessor('signupDate', {
        header: 'Signup Date',
        cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
      }),
      columnHelper.accessor('lastActive', {
        header: 'Last Active',
        cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy HH:mm'),
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => (
          <button
            onClick={() => navigate(`/users/${info.row.original.id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye size={18} className="text-primary" />
          </button>
        ),
      }),
    ],
    [navigate]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="flex space-x-3">
          <button className="btn-outline">Export</button>
          <button className="btn-primary">Add User</button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-4 py-2 border border-gray-300 rounded-lg">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;