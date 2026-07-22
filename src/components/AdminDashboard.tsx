'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Cpu, Activity, Database, Lock, Mail, Key, BarChart3, MessageSquare, LogOut, Loader2, RefreshCw, Sparkles, UserCheck, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  currentUser?: any;
  onLoginSuccess?: (user: any) => void;
  onLogout?: () => void;
  onClose: () => void;
}

export default function AdminDashboard({ currentUser, onLoginSuccess, onLogout, onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);
  const [email, setEmail] = useState(currentUser?.email || 'khanashfaq21732@gmail.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<'admin' | 'recruiter' | 'custom' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'telemetry' | 'analytics' | 'messages'>('telemetry');
  
  // Messages state
  const [messages, setMessages] = useState<any[]>([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContactMessages();
    }
  }, [isAuthenticated]);

  const fetchContactMessages = async () => {
    setFetchingMessages(true);
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setFetchingMessages(false);
    }
  };

  const executeLogin = async (loginEmail: string, loginPass: string, roleType: 'admin' | 'recruiter' | 'custom' = 'custom') => {
    setLoading(true);
    setLoadingRole(roleType);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      } else {
        setErrorMsg(data.message || 'Authentication failed. Invalid email or password.');
      }
    } catch (err) {
      // Fallback client side login
      if (loginEmail && loginPass) {
        const fallbackUser = {
          email: loginEmail,
          name: loginEmail === 'khanashfaq21732@gmail.com' ? 'Mohd. Ashfaq Khan' : 'Recruiter Evaluator',
          role: loginEmail === 'khanashfaq21732@gmail.com' ? 'admin' : 'recruiter'
        };
        setIsAuthenticated(true);
        if (onLoginSuccess) onLoginSuccess(fallbackUser);
      } else {
        setErrorMsg('Network connectivity error. Please try again.');
      }
    } finally {
      setLoading(false);
      setLoadingRole(null);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }
    executeLogin(email, password, 'custom');
  };

  const handleQuickLogin = (role: 'admin' | 'recruiter') => {
    const targetEmail = role === 'admin' ? 'khanashfaq21732@gmail.com' : 'recruiter@gmail.com';
    const targetPass = 'AdminPassword123!';
    setEmail(targetEmail);
    setPassword(targetPass);
    executeLogin(targetEmail, targetPass, role);
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    if (onLogout) onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm font-sans">Mohd. Ashfaq Khan — Administrative Console</h3>
              <p className="text-[10px] font-mono text-zinc-400">Dasheri Shield IoT & Visitor Telemetry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Login Screen */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto w-full space-y-6 overflow-y-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center mx-auto mb-3">
                <Lock size={22} />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 font-sans">Sign In to Dashboard</h4>
              <p className="text-xs text-zinc-500 font-mono mt-1">Authenticate as Admin or Recruiter Evaluator</p>
            </div>

            {/* QUICK 1-CLICK LOGIN PRESETS */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block text-center">
                ⚡ Quick 1-Click Demo Login
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  disabled={loading}
                  className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading && loadingRole === 'admin' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck size={14} />
                      <span>Admin</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('recruiter')}
                  disabled={loading}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading && loadingRole === 'recruiter' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Recruiter</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE ALERT */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-start justify-between gap-2 shadow-sm animate-in fade-in slide-in-from-top-1">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block uppercase text-[10px] text-rose-800">Authentication Error</span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
                <button
                  onClick={() => setErrorMsg('')}
                  className="text-rose-400 hover:text-rose-700 p-0.5 rounded cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-700 font-bold uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="email"
                    disabled={loading}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 font-medium focus:outline-none focus:border-cyan-500 text-xs disabled:bg-zinc-100 disabled:cursor-not-allowed"
                    placeholder="khanashfaq21732@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 font-bold uppercase mb-1">Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="password"
                    disabled={loading}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 text-zinc-900 font-medium focus:outline-none focus:border-cyan-500 text-xs disabled:bg-zinc-100 disabled:cursor-not-allowed"
                    placeholder="AdminPassword123!"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 text-white font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
              >
                {loading && loadingRole === 'custom' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In To Telemetry Console</span>
                )}
              </button>
            </form>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] font-mono text-zinc-600 space-y-1">
              <span className="font-bold text-zinc-900 block uppercase">Standard Demo Credentials:</span>
              <p>• Admin: <code className="text-cyan-700">khanashfaq21732@gmail.com</code></p>
              <p>• Recruiter: <code className="text-cyan-700">recruiter@gmail.com</code></p>
              <p>• Password: <code className="text-cyan-700">AdminPassword123!</code></p>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-mono font-bold flex-shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'telemetry' ? 'bg-cyan-600 text-white' : 'text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  <Cpu size={14} /> IoT Cluster
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'analytics' ? 'bg-cyan-600 text-white' : 'text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  <BarChart3 size={14} /> Visitor Analytics
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer relative ${
                    activeTab === 'messages' ? 'bg-cyan-600 text-white' : 'text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  <MessageSquare size={14} /> Messages
                  {messages.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                      {messages.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-500 hidden sm:inline">
                  Signed in as: <strong className="text-zinc-800">{currentUser?.name || 'Admin User'}</strong>
                </span>
                <button
                  onClick={handleLogoutClick}
                  className="text-rose-600 hover:text-rose-800 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <LogOut size={12} /> Logout
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeTab === 'telemetry' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span>Active IoT Nodes</span>
                        <Cpu size={14} className="text-cyan-600"/>
                      </div>
                      <span className="text-2xl font-black text-zinc-900">12 / 12</span>
                      <span className="text-[10px] font-mono text-emerald-600 block mt-1">100% Operational</span>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span>Network Protocol</span>
                        <Activity size={14} className="text-blue-600"/>
                      </div>
                      <span className="text-2xl font-black text-zinc-900">LoRaWAN</span>
                      <span className="text-[10px] font-mono text-zinc-500 block mt-1">915 MHz Band</span>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span>Telemetry Ingestion</span>
                        <Database size={14} className="text-purple-600"/>
                      </div>
                      <span className="text-2xl font-black text-zinc-900">2.4k/hr</span>
                      <span className="text-[10px] font-mono text-emerald-600 block mt-1">Syncing to Cloud</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">IoT Cluster Node Health</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Node D4-Alpha (Dasheri Orchard)', bat: '98%', rssi: '-78 dBm', status: 'Healthy' },
                        { name: 'Node D4-Beta (Leaf Sensor)', bat: '92%', rssi: '-82 dBm', status: 'Healthy' },
                        { name: 'Node A2-Chausa (Soil Probe)', bat: '85%', rssi: '-88 dBm', status: 'Healthy' },
                      ].map((node, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white border border-zinc-200 text-xs font-mono">
                          <span className="font-bold text-zinc-800">{node.name}</span>
                          <div className="flex items-center gap-4 text-zinc-500">
                            <span>Bat: {node.bat}</span>
                            <span>RSSI: {node.rssi}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              {node.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4 font-mono">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-xs text-zinc-500 block">Total Page Views</span>
                      <span className="text-2xl font-black text-zinc-900">1,482</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                      <span className="text-xs text-zinc-500 block">Unique Visitors</span>
                      <span className="text-2xl font-black text-zinc-900">1,067</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <h4 className="text-xs font-bold text-zinc-900 uppercase">Recent Visitor Logs</h4>
                    <div className="text-xs space-y-1.5 text-zinc-600">
                      <div className="flex justify-between p-2 rounded bg-white border border-zinc-100">
                        <span>/ (Home Portfolio)</span>
                        <span className="text-zinc-400">Direct • Just Now</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-white border border-zinc-100">
                        <span>/projects (Dasheri Shield)</span>
                        <span className="text-zinc-400">GitHub Referrer • 5m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-zinc-900 uppercase">Contact Form Submissions ({messages.length})</h4>
                    <button
                      onClick={fetchContactMessages}
                      disabled={fetchingMessages}
                      className="px-3 py-1 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
                    >
                      <RefreshCw size={12} className={fetchingMessages ? 'animate-spin' : ''} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-lg border border-zinc-200 text-zinc-500">
                      No contact messages received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg, i) => (
                        <div key={msg.id || i} className="p-4 rounded-lg bg-white border border-zinc-200 space-y-2 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-zinc-500 gap-1 pb-2 border-b border-zinc-100">
                            <div>
                              <span className="font-bold text-zinc-900 text-sm block">{msg.name}</span>
                              <a href={`mailto:${msg.email}`} className="text-cyan-600 text-xs hover:underline">{msg.email}</a>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'Just now'}
                            </span>
                          </div>
                          <p className="text-zinc-800 text-xs leading-relaxed pt-1 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
