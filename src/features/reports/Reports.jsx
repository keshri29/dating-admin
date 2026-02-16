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
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { mockReports } from '../../utils/mockData';
import { format } from 'date-fns';
import ReportDetailModal from './ReportDetailModal';

const columnHelper = createColumnHelper();

const Reports = () => {
  const [data] = useState(mockReports);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor('contentType', {
        header: 'Content Type',
        cell: (info) => (
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('reporterName', {
        header: 'Reported By',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('reason', {
        header: 'Reason',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('timestamp', {
        header: 'Date',
        cell: (info) => format(new Date(info.getValue()), 'MMM dd, yyyy HH:mm'),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          const badgeClass = {
            pending: 'badge-warning',
            reviewed: 'badge-info',
            dismissed: 'badge-success',
            actioned: 'badge-danger',
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
                setSelectedReport(info.row.original);
                setShowDetailModal(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye size={18} className="text-primary" />
            </button>
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
        <h1 className="text-2xl font-bold text-gray-900">Reported Content</h1>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="dismissed">Dismissed</option>
            <option value="actioned">Actioned</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">
            {data.filter(d => d.status === 'pending').length}
          </p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-800">Reviewed</p>
          <p className="text-2xl font-bold text-blue-900">
            {data.filter(d => d.status === 'reviewed').length}
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <p className="text-sm text-green-800">Dismissed</p>
          <p className="text-2xl font-bold text-green-900">
            {data.filter(d => d.status === 'dismissed').length}
          </p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-800">Actioned</p>
          <p className="text-2xl font-bold text-red-900">
            {data.filter(d => d.status === 'actioned').length}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search reports..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
            />
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

      {showDetailModal && selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedReport(null);
          }}
        />
      )}
    </div>
  );
};

export default Reports;