'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { useAuth } from '@/hooks/useAuth';
import { patientService } from '@/services/patientService';
import { fileService } from '@/services/fileService';
import type { RegisteredPatient } from '@/types/patient';
import type { PatientFile, FileType } from '@/types/file';
import { FileCard } from '@/components/files/FileCard';
import { FileTable } from '@/components/files/FileTable';
import { UploadDialog } from '@/components/files/UploadDialog';
import { FilePreview } from '@/components/files/FilePreview';
import { AccessHistoryTable } from '@/components/files/AccessHistoryTable';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FolderLock, Upload, Search, Filter, ShieldCheck, KeyRound, Lock, Eye } from 'lucide-react';

export default function SecureFileManagerPage() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<RegisteredPatient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [files, setFiles] = useState<PatientFile[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals / Overlays triggers
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<PatientFile | null>(null);
  const [selectedHistoryFile, setSelectedHistoryFile] = useState<PatientFile | null>(null);

  // Load patient list on load
  useEffect(() => {
    patientService.list()
      .then((data) => {
        setPatients(data);
        if (data.length > 0) {
          setSelectedPatientId(data[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch patient files when active patient changes
  const fetchPatientFiles = () => {
    if (!selectedPatientId) return;
    fileService.listForPatient(selectedPatientId)
      .then((data) => setFiles(data))
      .catch((err) => {
        console.error(err);
        setFiles([]);
      });
  };

  useEffect(() => {
    fetchPatientFiles();
  }, [selectedPatientId]);

  // Decrypt and trigger browser download
  const handleDownloadFile = async (file: PatientFile) => {
    try {
      const blob = await fileService.download(file.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Failed to download file:', err);
    }
  };

  // Filtered files array
  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || f.fileType === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Recharts File distribution by category
  const getPieChartData = () => {
    const counts: Record<string, number> = {};
    files.forEach((f) => {
      counts[f.fileType] = (counts[f.fileType] || 0) + 1;
    });
    const data = Object.keys(counts).map((key) => ({
      name: key.replace(/_/g, ' '),
      value: counts[key],
    }));
    return data.length > 0 ? data : [{ name: 'No files', value: 1 }];
  };

  const COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--danger)', 'var(--info)', '#a855f7', '#ec4899'];

  // Access history audit logs representation
  const mockAudits = [
    { id: 'a1', accessorEmail: 'doctor@hospital.local', accessType: 'DOWNLOAD' as const, timestamp: new Date().toISOString(), success: true },
    { id: 'a2', accessorEmail: 'nurse@hospital.local', accessType: 'VIEW' as const, timestamp: new Date(Date.now() - 600000).toISOString(), success: true },
    { id: 'a3', accessorEmail: 'receptionist@hospital.local', accessType: 'VIEW' as const, timestamp: new Date(Date.now() - 1200000).toISOString(), success: false },
  ];

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Secure File Manager"
        subtitle="Cryptographically sealed medical files index with reader-writer locks"
      >
        {/* Secure File Telemetry Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 font-mono text-xs">
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">STORAGE USAGE</span>
            <span className="text-sm font-bold text-text-primary mt-1">124.5 MB</span>
          </div>
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">ENCRYPTED FILES</span>
            <span className="text-sm font-bold text-success mt-1">{files.length} active</span>
          </div>
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">LOCKED FILES</span>
            <span className="text-sm font-bold text-warning mt-1">1 file locked</span>
          </div>
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">TODAY'S UPLOADS</span>
            <span className="text-sm font-bold text-primary mt-1">1 file</span>
          </div>
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">RECENT DOWNLOADS</span>
            <span className="text-sm font-bold text-info mt-1">2 files</span>
          </div>
          <div className="card-os p-3 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">TOTAL FILES</span>
            <span className="text-sm font-bold text-text-primary mt-1">{files.length} total</span>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="flex flex-wrap gap-2.5 items-center w-full md:w-auto">
            {/* Patient dropdown selection */}
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-surface-elevated border border-border p-2 rounded text-text-primary outline-none focus:border-primary/50 font-mono text-xs"
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  Patient: {p.name}
                </option>
              ))}
            </select>

            {/* Category selection */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-surface-elevated border border-border p-2 rounded text-text-primary outline-none focus:border-primary/50 font-mono text-xs"
            >
              <option value="ALL">All Categories</option>
              <option value="MEDICAL_REPORT">Medical Reports</option>
              <option value="PRESCRIPTION">Prescriptions</option>
              <option value="LAB_REPORT">Lab Reports</option>
              <option value="MRI">MRI</option>
              <option value="CT_SCAN">CT Scan</option>
              <option value="X_RAY">X-Ray</option>
              <option value="INVOICE">Invoices</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-3" />
              <input
                type="text"
                placeholder="Search encrypted files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-surface-elevated border border-border pl-8 pr-3 py-2 rounded text-text-primary outline-none focus:border-primary/50 font-mono text-xs w-full sm:w-[200px]"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold font-mono text-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Categories Grid view */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* File Protection Status */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <FolderLock className="w-4 h-4 text-primary" />
              <span className="font-bold text-text-primary uppercase">File Protection Status</span>
            </div>
            <div className="space-y-2 mt-1">
              <div className="flex justify-between">
                <span className="text-text-muted">Encryption Cipher:</span>
                <span className="text-success font-bold">ENCRYPTED (Enabled)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Role Validation:</span>
                <span className="text-success font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Concurrent Protection:</span>
                <span className="text-primary font-bold">Reader-Writer Locks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Access History Log:</span>
                <span className="text-success font-bold">AUDIT ENABLED</span>
              </div>
            </div>
          </div>

          {/* File Lock Status */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Lock className="w-4 h-4 text-warning" />
              <span className="font-bold text-text-primary uppercase">File Lock</span>
            </div>
            <div className="space-y-2 mt-1">
              <div className="flex justify-between">
                <span className="text-text-muted">Active Locked Files:</span>
                <span className="text-text-primary font-bold">{files.length > 0 ? '1 file locked' : '0 locks'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Active Editing User:</span>
                <span className="text-text-primary font-semibold">{files.length > 0 ? 'doctor@hospital.local' : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Queue waiting lock:</span>
                <span className="text-text-primary">0 users</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Max Lock Duration:</span>
                <span className="text-text-primary">15 min lock limit</span>
              </div>
            </div>
          </div>

          {/* Role Based Access Policy */}
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="font-bold text-text-primary uppercase">RBAC Permission Matrix</span>
            </div>
            <div className="space-y-1.5 text-[10px] text-text-muted mt-1">
              <div>• <span className="font-semibold text-text-primary">Admin:</span> Full file access</div>
              <div>• <span className="font-semibold text-text-primary">Doctor:</span> Read/Write assigned patient sheets</div>
              <div>• <span className="font-semibold text-text-primary">Nurse:</span> View authorized observation sheets</div>
              <div>• <span className="font-semibold text-text-primary">Patient:</span> Read own files only</div>
            </div>
          </div>
        </div>

        {/* Tabular vs Grid Files List */}
        <h3 className="text-xs font-bold font-mono uppercase text-text-secondary tracking-wider mb-3">
          SECURE FILES DISK ARRAY
        </h3>
        {filteredFiles.length === 0 ? (
          <div className="card-os py-16 text-center border border-dashed border-border mb-6">
            <FolderLock className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-secondary font-mono text-xs">No encrypted files found for the selected patient.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {filteredFiles.map((f) => (
              <FileCard
                key={f.id}
                id={f.id}
                patientId={f.patientId}
                fileName={f.fileName}
                fileType={f.fileType}
                uploadedBy={f.uploadedBy}
                uploadedAt={f.uploadedAt}
                hasAccess={user?.accessRole === 'ADMIN' || user?.accessRole === 'DOCTOR'}
                onPreview={() => setSelectedPreviewFile(f)}
                onDownload={() => handleDownloadFile(f)}
                onViewHistory={() => setSelectedHistoryFile(f)}
              />
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <FileTable
              files={filteredFiles.map((f) => ({
                ...f,
                hasAccess: user?.accessRole === 'ADMIN' || user?.accessRole === 'DOCTOR',
              }))}
              onPreview={(row) => setSelectedPreviewFile(row as any)}
              onDownload={(row) => handleDownloadFile(row as any)}
              onViewHistory={(row) => setSelectedHistoryFile(row as any)}
            />
          </div>
        )}

        {/* Charts & Access Audits Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="File Category Distribution" subtitle="Proportional distribution of active patient files">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={getPieChartData()} cx="50%" cy="45%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {getPieChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold font-mono uppercase text-text-primary">File Access History Logs</h4>
            <AccessHistoryTable audits={mockAudits} />
          </div>
        </div>

        {/* Modals and Overlays */}
        <UploadDialog
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUploadSuccess={fetchPatientFiles}
        />

        <FilePreview
          isOpen={!!selectedPreviewFile}
          onClose={() => setSelectedPreviewFile(null)}
          fileName={selectedPreviewFile?.fileName ?? ''}
          fileType={selectedPreviewFile?.fileType ?? ''}
        />
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
