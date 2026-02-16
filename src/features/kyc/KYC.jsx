import { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Eye, CheckCircle, XCircle } from 'lucide-react';
import { mockKYCRequests } from '../../utils/mockData';
import { format } from 'date-fns';
import KYCDetailModal from './KYCDetailModal';

const columnHelper = createColumnHelper();

const KYC = () => {
  const [data] = useState(mockKYCRequests);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [selectedKYC, setSelectedKYC] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor('userName', {
        header: 'User Name',
        cell: (info) => (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-sm font-medium">
              {info.getValue().charAt(0)}
            </div>
            <span className="ml-2">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor('documentType', {
        header: 'Document Type',
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor('submissionDate', {
        header: 'Submission Date',
        cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy'),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          const badgeClass = {
            approved: 'badge-success',
            pending: 'badge-warning',
            rejected: 'badge-danger',
          }[status];
          return <span className={badgeClass}>{status}</span>;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedKYC(info.row.original);
                setShowDetailModal(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye size={18} className="text-primary" />
            </button>
            {info.row.original.status === 'pending' && (
              <>
                <button
                  className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                  title="Approve"
                >
                  <CheckCircle size={18} className="text-green-600" />
                </button>
                <button
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Reject"
                >
                  <XCircle size={18} className="text-red-600" />
                </button>
              </>
            )}
          </div>
        ),
      }),
    ],
    []
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
        <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="btn-outline">Export</button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search KYC requests..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Pending: {data.filter(d => d.status === 'pending').length}
            </span>
          </div>
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

      {showDetailModal && selectedKYC && (
        <KYCDetailModal
          kyc={selectedKYC}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedKYC(null);
          }}
        />
      )}
    </div>
  );
};

export default KYC;