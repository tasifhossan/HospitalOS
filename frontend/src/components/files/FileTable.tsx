'use client';

import React from 'react';
import { FileText, Eye, Download, Clock } from 'lucide-react';
import { EncryptionBadge } from './EncryptionBadge';
import { PermissionBadge } from './PermissionBadge';
import { formatDistanceToNow } from 'date-fns';

interface FileRow {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  hasAccess: boolean;
}

interface FileTableProps {
  files: FileRow[];
  onPreview?: (row: FileRow) => void;
  onDownload?: (row: FileRow) => void;
  onViewHistory?: (row: FileRow) => void;
}

export function FileTable({ files, onPreview, onDownload, onViewHistory }: FileTableProps) {
  return (
    <div className="card-os border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border/80 text-[10px] text-text-muted bg-surface-elevated/50">
              <th className="p-3 uppercase">File Name</th>
              <th className="p-3 uppercase">Category</th>
              <th className="p-3 uppercase">Uploader</th>
              <th className="p-3 uppercase">Encryption</th>
              <th className="p-3 uppercase">Permission</th>
              <th className="p-3 uppercase">Uploaded At</th>
              <th className="p-3 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {files.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-text-muted">
                  No encrypted medical files registered.
                </td>
              </tr>
            ) : (
              files.map((f) => (
                <tr key={f.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="p-3 font-semibold text-text-primary">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="truncate max-w-[180px]" title={f.fileName}>{f.fileName}</span>
                    </div>
                  </td>
                  <td className="p-3 text-[10px] text-text-muted">{f.fileType.replace(/_/g, ' ')}</td>
                  <td className="p-3 text-text-secondary">{f.uploadedBy}</td>
                  <td className="p-3">
                    <EncryptionBadge isEncrypted={true} />
                  </td>
                  <td className="p-3">
                    <PermissionBadge role="User" hasAccess={f.hasAccess} />
                  </td>
                  <td className="p-3 text-[10px] text-text-muted">
                    {formatDistanceToNow(new Date(f.uploadedAt), { addSuffix: true })}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onPreview?.(f)}
                        disabled={!f.hasAccess}
                        className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Preview File"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDownload?.(f)}
                        disabled={!f.hasAccess}
                        className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Download Decrypted"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onViewHistory?.(f)}
                        className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary"
                        title="Access Audit Logs"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default FileTable;
