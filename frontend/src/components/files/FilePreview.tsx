'use client';

import React from 'react';
import { X, FileText, Lock, ShieldCheck } from 'lucide-react';

interface FilePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileType: string;
}

export function FilePreview({ isOpen, onClose, fileName, fileType }: FilePreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden font-mono text-xs z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface-elevated/40">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-bold text-text-primary uppercase">Secure File Preview</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 bg-surface-elevated/40 p-4 rounded-lg border border-border">
            <FileText className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-text-primary">{fileName}</h4>
              <p className="text-[10px] text-text-muted uppercase mt-0.5">{fileType.replace(/_/g, ' ')}</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-text-muted">Cipher Stream:</span>
              <span className="text-success font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                DECRYPTED (ENCRYPTED)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Integrity Tag:</span>
              <span className="text-text-primary font-bold">INTEGRITY VERIFIED</span>
            </div>
          </div>

          <div className="border border-border/80 bg-surface-elevated/30 p-4 rounded-lg text-[10px] text-text-muted leading-relaxed font-mono max-h-[150px] overflow-y-auto mt-2">
            {/* Decrypted plaintext preview representation */}
            [DECRYPTED CONTENT STREAM]
            <br />
            Patient ID: 360-hospital-registry-active
            <br />
            Clinical Notes: Patient registered under high priority emergency scheduler queues. Mutex allocations completed for General Bed locks. Observation vitals recorded.
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-border/40 bg-surface-elevated/20">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded font-semibold"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
export default FilePreview;
