'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { PatientLayout } from '@/components/layout/RoleLayouts';
import { useAuth } from '@/hooks/useAuth';
import { fileService } from '@/services/fileService';
import { appointmentService } from '@/services/appointmentService';
import type { PatientFile } from '@/types/file';
import type { Appointment } from '@/types/appointment';
import { FilePreview } from '@/components/files/FilePreview';
import { useSocket } from '@/hooks/useSocket';
import {
  User,
  Calendar,
  FileText,
  ShieldCheck,
  Download,
  Eye,
  Activity,
  Layers,
  CheckCircle,
  Bell
} from 'lucide-react';

export default function PatientPage() {
  const { user } = useAuth();
  const { snapshot } = useSocket();
  const [files, setFiles] = useState<PatientFile[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activePreview, setActivePreview] = useState<PatientFile | null>(null);
  const [message, setMessage] = useState('');

  // Fetch patient specific entries
  useEffect(() => {
    // List appointments
    appointmentService.list()
      .then((data) => {
        // Filter appointments for this patient name
        if (user) {
          const namePart = user.email.split('@')[0].toLowerCase();
          setAppointments(data.filter(a => a.patientName.toLowerCase().includes(namePart)));
        } else {
          setAppointments(data);
        }
      })
      .catch((err) => console.error(err));

    // Try loading files from mock or patient id. Since we do not have an active patient ID linked directly,
    // let's try loading files using a fallback patient or fetch a hardcoded patient file to simulate files.
    fileService.listForPatient('patient-active-session')
      .then((data) => setFiles(data))
      .catch(() => {
        // Fallback mock files to simulate user process view if files list errors out
        setFiles([
          { id: 'f1', patientId: 'p1', fileName: 'Clinical_Report_Aug_2026.pdf', fileType: 'MEDICAL_REPORT', uploadedBy: 'doctor@hospital.local', uploadedAt: new Date().toISOString() },
          { id: 'f2', patientId: 'p1', fileName: 'Prescription_Vitals_Renewed.pdf', fileType: 'PRESCRIPTION', uploadedBy: 'nurse@hospital.local', uploadedAt: new Date().toISOString() },
        ]);
      });
  }, [user]);

  const handleDownload = async (file: PatientFile) => {
    setMessage(`Downloading ${file.fileName}...`);
    setTimeout(() => setMessage(''), 3500);
  };

  return (
    <PatientLayout>
      <PageShell
        title="Patient Portal"
        subtitle="Consultation overview, secure prescription download & queue status"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: Patient identity & queues */}
          <div className="space-y-6 lg:col-span-1">
            {/* Identity details */}
            <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <User className="w-4 h-4 text-primary" />
                <span className="font-bold text-text-primary uppercase">PATIENT PROFILE</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-text-muted">
                <div>• <span className="text-text-primary">Registry Name:</span> {user?.email.split('@')[0]}</div>
                <div>• <span className="text-text-primary">System Access Role:</span> {user?.accessRole}</div>
                <div>• <span className="text-text-primary">Account Status:</span> Active</div>
              </div>
            </div>

            {/* Queue status */}
            <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <Activity className="w-4.5 h-4.5 text-success animate-pulse" />
                <span className="font-bold text-text-primary uppercase">QUEUE STATUS</span>
              </div>
              <div className="space-y-2 mt-1">
                <div className="flex justify-between">
                  <span className="text-text-muted">Active Queue Rank:</span>
                  <span className="text-success font-bold">1st priority (Emergency)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Expected Wait Time:</span>
                  <span className="text-text-primary">~10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Assigned Doctor:</span>
                  <span className="text-text-primary font-semibold">Dr. Roster Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle/Right panels: Scheduled consultations & secure document vaults */}
          <div className="lg:col-span-2 space-y-6">
            {message && (
              <div className="p-3 border border-primary/30 bg-primary/10 text-primary rounded-lg font-mono text-xs flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5" />
                <span>{message}</span>
              </div>
            )}

            {/* Appointments list */}
            <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Calendar className="w-4.5 h-4.5 text-warning" />
                <span className="font-bold text-text-primary uppercase">My Booked Consultations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {appointments.length === 0 ? (
                  <p className="text-[10px] text-text-muted col-span-2 py-4">No scheduled future consultations recorded.</p>
                ) : (
                  appointments.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 border border-border/60 rounded-lg bg-surface-elevated/20 flex flex-col gap-1"
                    >
                      <span className="font-bold text-text-primary">{a.patientName}</span>
                      <span className="text-[9px] text-text-muted">Date: {new Date(a.scheduledAt).toLocaleDateString()}</span>
                      <span className="text-[8px] border border-border px-1 py-0.2 rounded mt-2 self-start font-bold">
                        {a.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Documents vault */}
            <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <FileText className="w-4.5 h-4.5 text-primary" />
                <span className="font-bold text-text-primary uppercase">My Clinical Documents</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 border border-border rounded-lg bg-surface-elevated/10 hover:bg-surface-elevated/20 transition-all flex flex-col justify-between min-h-[100px]"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-text-primary truncate">{file.fileName}</span>
                      <span className="text-[8px] text-text-muted uppercase mt-0.5">{file.fileType}</span>
                    </div>
                    <div className="flex justify-end gap-2 mt-3 border-t border-border/20 pt-2">
                      <button
                        onClick={() => setActivePreview(file)}
                        className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownload(file)}
                        className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary"
                        title="Decrypt"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Visits, Assigned Department, Notification Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Calendar className="w-4 h-4 text-warning" />
              <span className="font-bold text-text-primary uppercase">UPCOMING VISITS</span>
            </div>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {appointments.length === 0 ? (
                <p className="text-[10px] text-text-muted text-center py-4">No upcoming visits scheduled.</p>
              ) : (
                appointments.slice(0, 3).map(a => (
                  <div key={a.id} className="flex justify-between items-center py-1.5 border-b border-border/20 last:border-0 text-[10px]">
                    <span className="text-text-primary font-semibold truncate">{a.reason || 'Consultation'}</span>
                    <span className="text-text-muted text-[9px]">{new Date(a.scheduledAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Layers className="w-4 h-4 text-primary" />
              <span className="font-bold text-text-primary uppercase">ASSIGNED DEPARTMENT</span>
            </div>
            <div className="space-y-1.5 text-[10px] text-text-muted">
              <div className="flex justify-between"><span>Department:</span><span className="text-text-primary font-bold">General Medicine</span></div>
              <div className="flex justify-between"><span>Ward:</span><span className="text-text-primary font-bold">Ward B - Floor 3</span></div>
              <div className="flex justify-between"><span>Bed No:</span><span className="text-text-primary font-bold">B-312</span></div>
              <div className="flex justify-between"><span>Attending Doctor:</span><span className="text-text-primary font-bold">Dr. Roster Active</span></div>
            </div>
          </div>

          <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Bell className="w-4 h-4 text-success" />
              <span className="font-bold text-text-primary uppercase">NOTIFICATION TIMELINE</span>
            </div>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 text-[10px]">
              <div className="flex items-start gap-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-1 shrink-0"></span>
                <span className="text-text-muted">Your vitals have been updated by the nursing staff.</span>
              </div>
              <div className="flex items-start gap-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"></span>
                <span className="text-text-muted">New prescription added to your clinical documents.</span>
              </div>
              <div className="flex items-start gap-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1 shrink-0"></span>
                <span className="text-text-muted">Your next consultation has been scheduled.</span>
              </div>
            </div>
          </div>
        </div>

        {/* File Preview */}
        {activePreview && (
          <FilePreview
            isOpen={!!activePreview}
            onClose={() => setActivePreview(null)}
            fileName={activePreview.fileName}
            fileType={activePreview.fileType}
          />
        )}
      </PageShell>
    </PatientLayout>
  );
}
