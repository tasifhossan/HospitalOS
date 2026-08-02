'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { DoctorLayout } from '@/components/layout/RoleLayouts';
import { useSocket } from '@/hooks/useSocket';
import { fileService } from '@/services/fileService';
import { patientService } from '@/services/patientService';
import type { RegisteredPatient } from '@/types/patient';
import type { PatientFile } from '@/types/file';
import { FilePreview } from '@/components/files/FilePreview';
import {
  Stethoscope,
  Users,
  Activity,
  HeartPulse,
  FolderLock,
  Plus,
  ArrowRight,
  TrendingUp,
  Cpu,
  Bed,
  Bell,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function DoctorPage() {
  const { snapshot } = useSocket();
  const [patients, setPatients] = useState<RegisteredPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<RegisteredPatient | null>(null);
  const [files, setFiles] = useState<PatientFile[]>([]);
  const [activePreview, setActivePreview] = useState<PatientFile | null>(null);

  // Diagnosis states
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [diagnosisDetails, setDiagnosisDetails] = useState('');
  const [selectedResource, setSelectedResource] = useState('ICU_BED');
  const [message, setMessage] = useState('');

  // Load patients list
  useEffect(() => {
    patientService.list()
      .then((data) => {
        setPatients(data);
        if (data.length > 0) {
          setSelectedPatient(data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch selected patient's secure documents
  useEffect(() => {
    if (selectedPatient) {
      fileService.listForPatient(selectedPatient.id)
        .then((data) => setFiles(data))
        .catch(() => setFiles([]));
    }
  }, [selectedPatient]);

  const handleMedicalActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Prescription and diagnosis updated successfully. Logged to Patient File.');
    setPrescriptionNotes('');
    setDiagnosisDetails('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRequestResource = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Resource Allocation Request for ${selectedResource} submitted to System Dispatcher.`);
    setTimeout(() => setMessage(''), 3000);
  };

  // Maps priorities to user friendly states
  const getPriorityLabel = (priority: string) => {
    if (priority === 'HIGH') return 'Emergency';
    if (priority === 'MEDIUM') return 'Critical';
    return 'Normal';
  };

  return (
    <DoctorLayout>
      <PageShell
        title="Doctor Portal"
        subtitle="Process Execution: Patient diagnostic treatment, clinical state mutations & secure records preview"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: Patient selection and queues */}
          <div className="space-y-6 lg:col-span-1">
            {/* Queued Requests */}
            <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-primary animate-pulse" />
                  <span className="font-bold text-text-primary uppercase">ACTIVE TREATMENT QUEUE</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-elevated text-[9px] text-text-muted">
                  PROCESS LIST
                </span>
              </div>
              <div className="space-y-2 divide-y divide-border/20 max-h-[220px] overflow-y-auto pr-1">
                {patients.length === 0 ? (
                  <p className="text-[10px] text-text-muted text-center py-6">No patient processes registered.</p>
                ) : (
                  patients.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPatient(p)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors flex justify-between items-center ${
                        selectedPatient?.id === p.id ? 'bg-primary-muted border border-primary/30' : 'hover:bg-surface-elevated/40'
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-text-primary truncate">{p.name}</span>
                        <span className="text-[9px] text-text-muted mt-0.5">Condition: {p.condition}</span>
                      </div>
                      <span className={`text-[8px] font-bold border px-1.5 py-0.2 rounded ${
                        p.priority === 'HIGH' ? 'text-danger border-danger/20 bg-danger/5' : 'text-success border-success/20 bg-success/5'
                      }`}>
                        {getPriorityLabel(p.priority)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Live Notifications drawer */}
            <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-warning" />
                  <span className="font-bold text-text-primary uppercase">CLINICAL EVENT LOG</span>
                </div>
              </div>
              <div className="space-y-2 divide-y divide-border/20 max-h-[180px] overflow-y-auto pr-1">
                {snapshot ? (
                  <>
                    <div className="py-1.5 flex justify-between">
                      <span className="text-text-secondary font-medium">New Emergency alert dispatch</span>
                      <span className="text-warning text-[9px]">ACTIVE</span>
                    </div>
                    {snapshot.inTreatment.map((p) => (
                      <div key={p.id} className="py-1.5 flex justify-between">
                        <span className="text-text-muted">Doctor Assigned: {p.name}</span>
                        <span className="text-success text-[9px]">Treatment</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-[10px] text-text-muted text-center py-6">Waiting for updates...</p>
                )}
              </div>
            </div>
          </div>

          {/* Middle/Right panels: Diagnosis details & forms */}
          <div className="lg:col-span-2 space-y-6">
            {message && (
              <div className="p-3 border border-success/30 bg-success/10 text-success rounded-lg font-mono text-xs flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5" />
                <span>{message}</span>
              </div>
            )}

            {/* Selected Patient details */}
            {selectedPatient ? (
              <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 border-b border-border pb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">{selectedPatient.name}</h3>
                    <p className="text-[10px] text-text-muted mt-0.5">UID: {selectedPatient.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-text-muted block text-[9px]">DIAGNOSIS</span>
                    <span className="text-text-primary font-semibold block mt-0.5">{selectedPatient.condition}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[9px]">PRIORITY DISPATCH STATE</span>
                    <span className="text-text-primary font-semibold block mt-0.5">{getPriorityLabel(selectedPatient.priority)}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[9px]">CLINICAL ACCESS ROLE</span>
                    <span className="text-text-primary font-semibold block mt-0.5">DOCTOR | ADMIN</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[9px]">TEMPORAL POSITION</span>
                    <span className="text-text-primary font-semibold block mt-0.5">ACTIVE EXECUTION</span>
                  </div>
                </div>

                {/* Medical Actions */}
                <div className="border-t border-border/40 pt-4 space-y-4">
                  <h4 className="font-bold text-text-primary uppercase text-[10px]">Medical Actions & State Mutation</h4>
                  <form onSubmit={handleMedicalActionSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Prescription Details</label>
                        <input
                          type="text"
                          placeholder="e.g. Paracetamol 500mg, 1-0-1"
                          value={prescriptionNotes}
                          onChange={(e) => setPrescriptionNotes(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Clinical Diagnosis Notes</label>
                        <input
                          type="text"
                          placeholder="e.g. Severe chest congestion, request ICU check"
                          value={diagnosisDetails}
                          onChange={(e) => setDiagnosisDetails(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <span className="badge badge-warning text-[9px] flex items-center font-bold">
                        TODO: SIGNATURE CHECK
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded font-semibold"
                      >
                        Commit Diagnostics
                      </button>
                    </div>
                  </form>
                </div>

                {/* Resource requests */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <h4 className="font-bold text-text-primary uppercase text-[10px]">System Lock Allocation Requests</h4>
                  <form onSubmit={handleRequestResource} className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="flex-1 flex flex-col gap-1 w-full">
                      <label className="text-[9px] text-text-muted">Select Target Lock</label>
                      <select
                        value={selectedResource}
                        onChange={(e) => setSelectedResource(e.target.value)}
                        className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                      >
                        <option value="ICU_BED">ICU Bed (Clinical ICU)</option>
                        <option value="BED">Operation Theatre (General bed)</option>
                        <option value="DOCTOR">Consulting Doctor semaphore</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-warning hover:bg-warning-hover text-surface rounded font-semibold w-full sm:w-auto flex items-center justify-center gap-1.5"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>Request Lock</span>
                    </button>
                  </form>
                </div>

                {/* Secure Files previewer */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <h4 className="font-bold text-text-primary uppercase text-[10px]">Patient Encrypted Clinical Files</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[150px] overflow-y-auto">
                    {files.length === 0 ? (
                      <p className="text-[10px] text-text-muted col-span-2 py-4">No secure documents registered for patient.</p>
                    ) : (
                      files.map((file) => (
                        <div
                          key={file.id}
                          className="p-2 border border-border rounded-lg bg-surface-elevated/20 flex justify-between items-center"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-text-primary truncate">{file.fileName}</span>
                            <span className="text-[8px] text-text-muted uppercase mt-0.5">{file.fileType}</span>
                          </div>
                          <button
                            onClick={() => setActivePreview(file)}
                            className="p-1 border border-border rounded hover:bg-surface-elevated text-text-primary"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-os py-20 text-center border border-dashed border-border font-mono text-xs">
                Select a patient process from the left queue to begin diagnosis execution.
              </div>
            )}
          </div>
        </div>

        {/* Preview overlay */}
        {activePreview && (
          <FilePreview
            isOpen={!!activePreview}
            onClose={() => setActivePreview(null)}
            fileName={activePreview.fileName}
            fileType={activePreview.fileType}
          />
        )}
      </PageShell>
    </DoctorLayout>
  );
}
