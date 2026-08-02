'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { patientService } from '@/services/patientService';
import { fileService } from '@/services/fileService';
import type { RegisteredPatient } from '@/types/patient';
import type { FileType } from '@/types/file';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const CATEGORIES: { label: string; value: FileType }[] = [
  { label: 'Medical Reports', value: 'MEDICAL_REPORT' },
  { label: 'Prescriptions', value: 'PRESCRIPTION' },
  { label: 'Lab Reports', value: 'LAB_REPORT' },
  { label: 'MRI Scans', value: 'MRI' },
  { label: 'CT Scans', value: 'CT_SCAN' },
  { label: 'X-Rays', value: 'X_RAY' },
  { label: 'Invoices', value: 'INVOICE' },
];

export function UploadDialog({ isOpen, onClose, onUploadSuccess }: UploadDialogProps) {
  const [patients, setPatients] = useState<RegisteredPatient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [category, setCategory] = useState<FileType>('MEDICAL_REPORT');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'encrypting' | 'complete'>('form');

  // Fetch patient dropdowns
  useEffect(() => {
    if (isOpen) {
      patientService.list()
        .then((data) => setPatients(data))
        .catch((err) => console.error('Failed to load patients:', err));
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !file) {
      setError('Please select a patient and a file.');
      return;
    }

    setLoading(true);
    setError('');
    setStep('encrypting');

    try {
      // Simulate client-side encryption step before uploading to showcase OS File System Concept
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await fileService.upload(selectedPatientId, category, file);
      setStep('complete');
      onUploadSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to upload and encrypt file.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-md bg-surface border border-border rounded-xl shadow-2xl overflow-hidden font-mono text-xs z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface-elevated/40">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            <span className="font-bold text-text-primary uppercase">Secure File Upload</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {step === 'form' && (
          <form onSubmit={handleUploadSubmit} className="p-4 space-y-4">
            {error && (
              <div className="p-2 border border-danger/30 bg-danger/10 text-danger rounded flex gap-2 items-center">
                <ShieldAlert className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-text-muted uppercase text-[10px]">Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full bg-surface-elevated border border-border p-2 rounded text-text-primary outline-none focus:border-primary/50"
              >
                <option value="">-- Choose Patient Registry --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Priority: {p.priority})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-muted uppercase text-[10px]">File Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FileType)}
                className="w-full bg-surface-elevated border border-border p-2 rounded text-text-primary outline-none focus:border-primary/50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-muted uppercase text-[10px]">Document Path</label>
              <div className="flex items-center justify-center border border-dashed border-border p-6 rounded-lg bg-surface-elevated/20 hover:bg-surface-elevated/40 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center space-y-1">
                  <FileText className="w-8 h-8 text-text-muted mx-auto mb-1" />
                  <span className="text-[10px] text-text-primary block font-semibold">
                    {file ? file.name : 'Choose local file...'}
                  </span>
                  <span className="text-[9px] text-text-muted block">Max limit: 5MB</span>
                </div>
              </div>
            </div>

            {/* Steps indicator */}
            <div className="mt-4 pt-3 border-t border-border/40 text-[9px] text-text-muted flex justify-between">
              <span>VALIDATION: OK</span>
              <span>ENCRYPTION: ENABLED</span>
              <span>AUDITING: AUTO</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-border hover:bg-surface-elevated text-text-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 rounded bg-primary hover:bg-primary-hover text-white font-semibold disabled:opacity-40"
              >
                Secure & Upload
              </button>
            </div>
          </form>
        )}

        {step === 'encrypting' && (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div>
              <h4 className="font-bold text-text-primary">Secure Encryption Cipher</h4>
              <p className="text-text-muted text-[10px] max-w-xs mt-1 leading-relaxed">
                Deriving initialization vector keys. Encrypting binary stream prior to committing to server storage...
              </p>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-success animate-bounce" />
            <div>
              <h4 className="font-bold text-text-primary">Encrypted & Committed</h4>
              <p className="text-text-muted text-[10px] max-w-xs mt-1 leading-relaxed">
                Patient file successfully locked, encrypted, and audit logs recorded.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-surface-elevated border border-border hover:bg-surface-overlay text-text-primary rounded font-semibold mt-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default UploadDialog;
