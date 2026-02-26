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
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  Plus, 
  Edit, 
  Trash2, 
   Download,
  Filter,
  RefreshCw,
  Package,
   Zap,
  Star,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import SubscriptionModal from './SubscriptionModal';
import BundleModal from './BundleModal';
import ExportModal from './ExportModal';

// Mock data for subscription plans
const mockPlans = [
  {
    id: 'plan_001',
    name: 'Basic Monthly',
    type: 'recurring',
    duration: 30,
    durationUnit: 'days',
    price: 9.99,
    currency: 'USD',
    autoRenewal: true,
    platforms: ['android', 'ios', 'web'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-01T14:20:00Z',
  },
  {
    id: 'plan_002',
    name: 'Premium Monthly',
    type: 'recurring',
    duration: 30,
    durationUnit: 'days',
    price: 19.99,
    currency: 'USD',
    autoRenewal: true,
    platforms: ['android', 'ios', 'web'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-01T14:20:00Z',
  },
  {
    id: 'plan_003',
    name: 'Premium Yearly',
    type: 'recurring',
    duration: 365,
    durationUnit: 'days',
    price: 199.99,
    currency: 'USD',
    autoRenewal: true,
    platforms: ['android', 'ios', 'web'],
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-01T14:20:00Z',
  },
];

// Mock data for bundles by type
const mockBundles = {
  likes: [
    {
      id: 'bundle_likes_001',
      type: 'likes',
      quantity: 100,
      price: 4.99,
      currency: 'USD',
      validity: 30,
      validityUnit: 'days',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
    {
      id: 'bundle_likes_002',
      type: 'likes',
      quantity: 500,
      price: 19.99,
      currency: 'USD',
      validity: 30,
      validityUnit: 'days',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
    {
      id: 'bundle_likes_003',
      type: 'likes',
      quantity: 1000,
      price: 34.99,
      currency: 'USD',
      validity: 30,
      validityUnit: 'days',
      status: 'inactive',
      createdAt: '2024-02-10T09:15:00Z',
    },
  ],
  superLikes: [
    {
      id: 'bundle_superlikes_001',
      type: 'superLikes',
      quantity: 10,
      price: 9.99,
      currency: 'USD',
      validity: null,
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
    {
      id: 'bundle_superlikes_002',
      type: 'superLikes',
      quantity: 50,
      price: 39.99,
      currency: 'USD',
      validity: null,
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
  ],
  boosts: [
    {
      id: 'bundle_boost_001',
      type: 'boost',
      quantity: 1,
      boostDuration: 24,
      boostDurationUnit: 'hours',
      price: 5.99,
      currency: 'USD',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
    {
      id: 'bundle_boost_002',
      type: 'boost',
      quantity: 5,
      boostDuration: 24,
      boostDurationUnit: 'hours',
      price: 24.99,
      currency: 'USD',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
  ],
  comments: [
    {
      id: 'bundle_comments_001',
      type: 'comments',
      quantity: 50,
      price: 3.99,
      currency: 'USD',
      validity: 30,
      validityUnit: 'days',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
    {
      id: 'bundle_comments_002',
      type: 'comments',
      quantity: 200,
      price: 12.99,
      currency: 'USD',
      validity: 30,
      validityUnit: 'days',
      status: 'active',
      createdAt: '2024-02-10T09:15:00Z',
    },
  ],
};

const columnHelper = createColumnHelper();

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [bundleType, setBundleType] = useState('likes');
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const tabs = [
    { id: 'plans', label: 'Subscription Plans', icon: Package },
    { id: 'likes', label: 'Likes Bundles', icon: Zap },
    { id: 'superLikes', label: 'Super Likes', icon: Star },
    { id: 'boosts', label: 'Profile Boosts', icon: TrendingUp },
    { id: 'comments', label: 'Comments Bundles', icon: MessageSquare },
  ];

  // Columns for subscription plans
  const planColumns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Plan Name',
        cell: (info) => (
          <div className="font-medium">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => (
          <span>{info.row.original.currency} {info.getValue().toFixed(2)}</span>
        ),
      }),
      columnHelper.accessor('duration', {
        header: 'Duration',
        cell: (info) => (
          <span>{info.getValue()} {info.row.original.durationUnit}</span>
        ),
      }),
      columnHelper.accessor('autoRenewal', {
        header: 'Auto-Renewal',
        cell: (info) => (
          <span className={info.getValue() ? 'badge-success' : 'badge-warning'}>
            {info.getValue() ? 'Yes' : 'No'}
          </span>
        ),
      }),
      columnHelper.accessor('platforms', {
        header: 'Platforms',
        cell: (info) => (
          <div className="flex space-x-1">
            {info.getValue().map((platform) => (
              <span key={platform} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {platform}
              </span>
            ))}
          </div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          return (
            <span className={status === 'active' ? 'badge-success' : 'badge-danger'}>
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedItem(info.row.original);
                setShowPlanModal(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit size={18} className="text-blue-600" />
            </button>
            <button
              onClick={() => handleDelete(info.row.original.id, 'plan')}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  // Columns for bundles
  const bundleColumns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Bundle ID',
        cell: (info) => <span className="text-sm font-mono">{info.getValue()}</span>,
      }),
      columnHelper.accessor('quantity', {
        header: 'Quantity',
        cell: (info) => info.getValue(),
      }),
      ...(bundleType === 'boosts' ? [columnHelper.accessor('boostDuration', {
        header: 'Boost Duration',
        cell: (info) => `${info.getValue()} ${info.row.original.boostDurationUnit}`,
      })] : []),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => (
          <span>{info.row.original.currency} {info.getValue().toFixed(2)}</span>
        ),
      }),
      ...(bundleType !== 'boosts' ? [columnHelper.accessor('validity', {
        header: 'Validity',
        cell: (info) => info.getValue() ? `${info.getValue()} ${info.row.original.validityUnit}` : 'No expiry',
      })] : []),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          return (
            <span className={status === 'active' ? 'badge-success' : 'badge-danger'}>
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedItem(info.row.original);
                setShowBundleModal(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit size={18} className="text-blue-600" />
            </button>
            <button
              onClick={() => handleDelete(info.row.original.id, 'bundle')}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        ),
      }),
    ],
    [bundleType]
  );

  const table = useReactTable({
    data: activeTab === 'plans' ? mockPlans : mockBundles[activeTab] || [],
    columns: activeTab === 'plans' ? planColumns : bundleColumns,
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

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}? This action can be reversed.`)) {
      console.log(`Deleting ${type}:`, id);
      // Implement delete logic here
    }
  };

  const handleExport = (format, dateRange, types) => {
    console.log('Exporting:', { format, dateRange, types });
    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="btn-outline flex items-center"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => {
              setSelectedItem(null);
              if (activeTab === 'plans') {
                setShowPlanModal(true);
              } else {
                setShowBundleModal(true);
              }
            }}
            className="btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Role-based access notice (for demo) */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-sm text-blue-700">
          <strong>Super Admin Access:</strong> Full CRUD operations enabled. Finance Admin view-only, Support Admin status-only, Moderator no access.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setBundleType(tab.id);
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={18} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'plans' ? 'plans' : 'bundles'}...`}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button className="btn-outline flex items-center">
          <Filter size={18} className="mr-2" />
          More Filters
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Active Plans</p>
          <p className="text-2xl font-bold text-gray-900">
            {activeTab === 'plans' 
              ? mockPlans.filter(p => p.status === 'active').length
              : mockBundles[activeTab]?.filter(b => b.status === 'active').length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Inactive</p>
          <p className="text-2xl font-bold text-gray-900">
            {activeTab === 'plans' 
              ? mockPlans.filter(p => p.status === 'inactive').length
              : mockBundles[activeTab]?.filter(b => b.status === 'inactive').length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Price Range</p>
          <p className="text-2xl font-bold text-gray-900">
            {activeTab === 'plans'
              ? `$${Math.min(...mockPlans.map(p => p.price))} - $${Math.max(...mockPlans.map(p => p.price))}`
              : mockBundles[activeTab]?.length 
                ? `$${Math.min(...mockBundles[activeTab].map(b => b.price))} - $${Math.max(...mockBundles[activeTab].map(b => b.price))}`
                : '$0'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-2xl font-bold text-gray-900">
            {format(new Date(), 'MMM dd')}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
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

        {/* Pagination */}
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
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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

      {/* Modals */}
      {showPlanModal && (
        <SubscriptionModal
          plan={selectedItem}
          onClose={() => {
            setShowPlanModal(false);
            setSelectedItem(null);
          }}
          onSave={(data) => {
            console.log('Saving plan:', data);
            setShowPlanModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {showBundleModal && (
        <BundleModal
          bundle={selectedItem}
          type={activeTab}
          onClose={() => {
            setShowBundleModal(false);
            setSelectedItem(null);
          }}
          onSave={(data) => {
            console.log('Saving bundle:', data);
            setShowBundleModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          types={['plans', 'likes', 'superLikes', 'boosts', 'comments']}
        />
      )}
    </div>
  );
};

export default Subscriptions;