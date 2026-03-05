import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw,
} from "lucide-react";

import { format } from "date-fns";

import {
  fetchKYCRequests,
} from "../../store/slices/usersSlice";

import KYCDetailModal from "./KYCDetailModal";

const columnHelper = createColumnHelper();

const KYC = () => {

  const dispatch = useDispatch();

  const {
    kycRequests,
    kycTotalCount,
    kycIsLoading,
  } = useSelector((state) => state.users);

  const [selectedKYC, setSelectedKYC] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ------------------ FETCH DATA ------------------

  useEffect(() => {
    loadKYCRequests();
  }, [pagination.pageIndex, pagination.pageSize]);

  const loadKYCRequests = () => {
    dispatch(
      fetchKYCRequests({
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
      })
    );
  };

  // ------------------ DATA MAPPING ------------------

  const tableData = useMemo(() => {
    if (!kycRequests) return [];

    return kycRequests.map((kyc) => ({
      id: kyc._id,
      userId: kyc.user_id,
      userName: kyc?.name?.value || "N/A",
      mobile: kyc.mobile_number,
      city: kyc?.city?.value,
      country: kyc?.country?.value,
      submissionDate: kyc.created_at,
      status: kyc.is_verified,
      video: kyc.video,
      raw: kyc,
    }));
  }, [kycRequests]);

  // ------------------ STATUS STYLE ------------------

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700 px-2 py-1 rounded";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
      case "Rejected":
        return "bg-red-100 text-red-700 px-2 py-1 rounded";
      default:
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded";
    }
  };

  // ------------------ TABLE COLUMNS ------------------

  const columns = useMemo(
    () => [
      columnHelper.accessor("userName", {
        header: "Name",
      }),

      columnHelper.accessor("mobile", {
        header: "Mobile",
      }),

      columnHelper.accessor("city", {
        header: "City",
      }),

      columnHelper.accessor("country", {
        header: "Country",
      }),

      columnHelper.accessor("submissionDate", {
        header: "Submission Date",
        cell: (info) =>
          info.getValue()
            ? format(new Date(info.getValue()), "dd MMM yyyy")
            : "N/A",
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span className={getStatusBadgeClass(info.getValue())}>
            {info.getValue()}
          </span>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <button
            onClick={() => {
              setSelectedKYC(info.row.original.raw);
              setShowDetailModal(true);
            }}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Eye size={18} />
          </button>
        ),
      }),
    ],
    []
  );

  // ------------------ TABLE ------------------

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      pagination,
    },

    pageCount: Math.ceil((kycTotalCount || 0) / pagination.pageSize),

    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    manualPagination: true,
  });

  // ------------------ UI ------------------

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">KYC Verification</h1>

        <button
          onClick={loadKYCRequests}
          className="flex items-center border px-4 py-2 rounded"
        >
          <RefreshCw
            size={18}
            className={`mr-2 ${kycIsLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      <div className="border rounded-lg">

        {kycIsLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left px-4 py-3"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>

                  {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-t">

                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-3"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center py-6"
                      >
                        No KYC Found
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>

            </div>

            {/* PAGINATION */}

            <div className="flex justify-between items-center p-4">

              <div>
                Showing{" "}
                {pagination.pageIndex * pagination.pageSize + 1}
                {" - "}
                {Math.min(
                  (pagination.pageIndex + 1) * pagination.pageSize,
                  kycTotalCount
                )}
                {" of "}
                {kycTotalCount}
              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="border p-2 rounded"
                >
                  <ChevronLeft size={18} />
                </button>

                <span>
                  Page {pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="border p-2 rounded"
                >
                  <ChevronRight size={18} />
                </button>

              </div>
            </div>
          </>
        )}
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