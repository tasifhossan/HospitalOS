'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Clock, User, ShieldAlert } from 'lucide-react';
import { EncryptionBadge } from './EncryptionBadge';
import { PermissionBadge } from './PermissionBadge';
import { formatDistanceToNow } from 'date-fns';

interface FileCardProps {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  hasAccess: boolean;
  onPreview?: () => void;
  onDownload?: () => void;
  onViewHistory?: () => void;
}

export function FileCard({
  id,
  patientId,
  fileName,
  fileType,
  uploadedBy,
  uploadedAt,
  hasAccess,
  onPreview,
  onDownload,
  onViewHistory,
}: FileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card-os p-4 border border-border flex flex-col justify-between min-h-[160px] shadow-sm relative overflow-hidden"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-primary-muted border border-primary/20 flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">{fileType.replace(/_/g, ' ')}</span>
            <span className="text-xs font-bold text-text-primary font-mono truncate mt-0.5" title={fileName}>
              {fileName}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 text-[9px] font-mono text-text-muted">
        <div className="flex flex-col">
          <span>UPLOADED BY</span>
          <span className="text-text-primary truncate font-semibold mt-0.5">{uploadedBy}</span>
        </div>
        <div className="flex flex-col">
          <span>UPLOAD DATE</span>
          <span className="text-text-primary font-semibold mt-0.5">
            {formatDistanceToNow(new Date(uploadedAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 border-t border-border/40 pt-3">
        <EncryptionBadge isEncrypted={true} />
        <PermissionBadge role="Doctor" hasAccess={hasAccess} />
      </div>

      <div className="flex justify-end gap-2 mt-4 border-t border-border/40 pt-3">
        <button
          onClick={onPreview}
          disabled={!hasAccess}
          className="p-1.5 rounded-lg border border-border hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Preview File"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDownload}
          disabled={!hasAccess}
          className="p-1.5 rounded-lg border border-border hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Decrypt & Download"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onViewHistory}
          className="p-1.5 rounded-lg border border-border hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all"
          title="Audit Log History"
        >
          <Clock className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
export default FileCard;
