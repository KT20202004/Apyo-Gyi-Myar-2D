import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { format } from "date-fns";
import { Search, Clock, ArrowUpDown, Filter, ShieldAlert } from "lucide-react";
import { AuditLog } from "@/src/types";

export default function Logs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [filterAction, setFilterAction] = useState("");

  const actionTypes = ["Create Profile", "Log Bet", "Check Results", "Create Admin"];

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    const { data } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false });
    if (data) setLogs(data);
    setLoading(false);
  }

  const handleSort = () => setSortAsc(!sortAsc);

  const filtered = logs.filter(l => 
    (filterAction ? l.action === filterAction : true) &&
    (l.admin_id.includes(search) || JSON.stringify(l.details).includes(search))
  ).sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortAsc ? timeA - timeB : timeB - timeA;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Audit Logs</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 bg-gray-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search admin ID or details..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              className="pl-9 pr-8 py-2 border rounded-lg outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500"
              value={filterAction}
              onChange={e => setFilterAction(e.target.value)}
            >
              <option value="">All Actions</option>
              {actionTypes.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleSort}>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> Timestamp <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="p-4">Action</th>
                <th className="p-4">Admin ID</th>
                <th className="p-4 w-full">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading logs...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No logs found matching criteria.</td></tr>
              ) : (
                filtered.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-xs font-mono text-gray-500">
                      {format(new Date(log.created_at), "MMM d, yyyy HH:mm:ss")}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <ShieldAlert className="w-3 h-3" />
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-blue-600 font-medium">
                      {log.admin_id.substring(0, 8)}...
                    </td>
                    <td className="p-4 text-gray-600 scrollbar-hide max-w-[200px] truncate" title={JSON.stringify(log.details)}>
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
