'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Clock, Globe, RefreshCcw, ArrowRight } from 'lucide-react';

interface VisitorSummary {
  _id: string;
  count: number;
  lastVisit: string;
}

export default function HiddenDashboard() {
  const [summary, setSummary] = useState<VisitorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/track');
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setError('Failed to load summary');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalHits = summary.reduce((acc, curr) => acc + curr.count, 0);
  const lastActivity = summary.length > 0 
    ? new Date(Math.max(...summary.map(s => new Date(s.lastVisit).getTime())))
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-sky-500/10 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-sky-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter uppercase text-white">RK Architect Console</h1>
            </div>
            <p className="text-slate-400 font-medium">Revision 1 - Anonymous Visitor Analytics</p>
          </div>
          
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Hits</span>
            </div>
            <div className="text-5xl font-black text-white">{totalHits.toLocaleString()}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-sky-500/10 rounded-2xl">
                <Globe className="w-6 h-6 text-sky-400" />
              </div>
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Unique Pages</span>
            </div>
            <div className="text-5xl font-black text-white">{summary.length}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-500/10 rounded-2xl">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Activity</span>
            </div>
            <div className="text-lg font-bold text-white">
              {lastActivity ? lastActivity.toLocaleTimeString() : 'No data'}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Page Traffic Summary</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 text-slate-400 text-xs font-black uppercase tracking-widest">
                  <th className="px-6 py-4">Page Path</th>
                  <th className="px-6 py-4 text-center">Hits</th>
                  <th className="px-6 py-4">Last Visit</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {summary.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <code className="text-sky-400 font-bold bg-sky-400/10 px-2 py-1 rounded">{item._id}</code>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white font-black">{item.count}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(item.lastVisit).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={item._id} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-500 hover:text-white transition-colors"
                      >
                        Visit <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
                {summary.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-bold">
                      No visitor data recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-bold text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
