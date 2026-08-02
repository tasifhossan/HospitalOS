'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { ReceptionistLayout } from '@/components/layout/RoleLayouts';
import { patientService } from '@/services/patientService';
import { appointmentService } from '@/services/appointmentService';
import { staffService } from '@/services/staffService';
import type { RegisteredPatient } from '@/types/patient';
import type { Appointment } from '@/types/appointment';
import type { StaffMember } from '@/types/staff';
import { useSocket } from '@/hooks/useSocket';
import {
  Calendar,
  UserPlus,
  Clock,
  Layers,
  Activity,
  CreditCard,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

export default function ReceptionistPage() {
  const { snapshot } = useSocket();
  const [patients, setPatients] = useState<RegisteredPatient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regCondition, setRegCondition] = useState('');
  const [regPriority, setRegPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('LOW');
  const [regResources, setRegResources] = useState<string[]>(['DOCTOR']);

  // Appointment Form State
  const [appPatientName, setAppPatientName] = useState('');
  const [appStaffId, setAppStaffId] = useState('');
  const [appScheduledAt, setAppScheduledAt] = useState('');
  const [appReason, setAppReason] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load lists
  const fetchAllData = () => {
    patientService.list().then((data) => setPatients(data)).catch((err) => console.error(err));
    appointmentService.list().then((data) => setAppointments(data)).catch((err) => console.error(err));
    staffService.list().then((data) => setStaffList(data)).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regAge || !regCondition) {
      setError('Please fill in all registration fields.');
      return;
    }
    setError('');
    try {
      await patientService.create({
        name: regName,
        condition: regCondition,
        priority: regPriority,
        requiredResources: regResources as any[],
      });
      setMessage(`Patient Process [${regName}] successfully initialized in Ready Queue.`);
      setRegName('');
      setRegAge('');
      setRegCondition('');
      fetchAllData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to initialize patient process.');
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appPatientName || !appStaffId || !appScheduledAt || !appReason) {
      setError('Please fill in all booking fields.');
      return;
    }
    setError('');
    try {
      await appointmentService.create({
        patientName: appPatientName,
        staffId: appStaffId,
        scheduledAt: appScheduledAt,
        reason: appReason,
      });
      setMessage(`Future Appointment booked successfully for ${appPatientName}.`);
      setAppPatientName('');
      setAppStaffId('');
      setAppScheduledAt('');
      setAppReason('');
      fetchAllData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to book future appointment.');
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await appointmentService.cancel(id);
      setMessage('Appointment marked as CANCELLED.');
      fetchAllData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError('Failed to cancel appointment.');
    }
  };

  return (
    <ReceptionistLayout>
      <PageShell
        title="Receptionist Portal"
        subtitle="Process Creation: Thread initialization, process state scheduling & appointment booking"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Middle panels: Action forms */}
          <div className="lg:col-span-2 space-y-6">
            {message && (
              <div className="p-3 border border-success/30 bg-success/10 text-success rounded-lg font-mono text-xs flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5" />
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="p-3 border border-danger/30 bg-danger/10 text-danger rounded-lg font-mono text-xs flex items-center gap-2">
                <XCircle className="w-4.5 h-4.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Patient Registration form (Process Creation) */}
            <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <UserPlus className="w-4.5 h-4.5 text-primary" />
                <span className="font-bold text-text-primary uppercase">
                  Patient Registration (Process Creation)
                </span>
              </div>
              <form onSubmit={handleRegisterPatient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Patient Name</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Age</label>
                  <input
                    type="number"
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                    placeholder="e.g. 45"
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Condition Description</label>
                  <input
                    type="text"
                    value={regCondition}
                    onChange={(e) => setRegCondition(e.target.value)}
                    placeholder="e.g. Chest pain observation"
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Ready Priority</label>
                  <select
                    value={regPriority}
                    onChange={(e) => setRegPriority(e.target.value as any)}
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  >
                    <option value="LOW">Normal (LOW)</option>
                    <option value="MEDIUM">Critical (MEDIUM)</option>
                    <option value="HIGH">Emergency (HIGH)</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-between items-center pt-2">
                  <span className="badge badge-warning text-[9px] flex items-center font-bold">
                    TODO: CAPTCHA CHECK
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded font-semibold"
                  >
                    Initialize Process
                  </button>
                </div>
              </form>
            </div>

            {/* Appointment booking form */}
            <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Calendar className="w-4.5 h-4.5 text-warning" />
                <span className="font-bold text-text-primary uppercase">
                  Schedule Future Consultation
                </span>
              </div>
              <form onSubmit={handleCreateAppointment} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Patient Name</label>
                  <input
                    type="text"
                    value={appPatientName}
                    onChange={(e) => setAppPatientName(e.target.value)}
                    placeholder="e.g. Alice Smith"
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Select Consultant</label>
                  <select
                    value={appStaffId}
                    onChange={(e) => setAppStaffId(e.target.value)}
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  >
                    <option value="">-- Choose Doctor --</option>
                    {staffList.filter(s => s.role === 'DOCTOR').map((d) => (
                      <option key={d.id} value={d.id}>
                        Dr. {d.name} ({d.status})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Schedule Date/Time</label>
                  <input
                    type="datetime-local"
                    value={appScheduledAt}
                    onChange={(e) => setAppScheduledAt(e.target.value)}
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] text-text-muted">Consultation Reason</label>
                  <input
                    type="text"
                    value={appReason}
                    onChange={(e) => setAppReason(e.target.value)}
                    placeholder="e.g. Annual physical exam"
                    className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-primary/50"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-warning text-surface hover:bg-warning-hover rounded font-semibold"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right panel: Live Queue State & Billing statuses */}
          <div className="space-y-6 lg:col-span-1">
            {/* Live Queue list */}
            <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-primary" />
                  <span className="font-bold text-text-primary uppercase">SCHEDULER RUNTIME STATE</span>
                </div>
              </div>
              <div className="space-y-2 divide-y divide-border/20 max-h-[220px] overflow-y-auto pr-1">
                {snapshot ? (
                  <>
                    <div className="py-1.5 flex justify-between text-[10px]">
                      <span className="text-text-muted">Ready Queue length:</span>
                      <span className="text-text-primary font-bold">{snapshot.readyQueue.length} patient processes</span>
                    </div>
                    <div className="py-1.5 flex justify-between text-[10px]">
                      <span className="text-text-muted">Active Treatment:</span>
                      <span className="text-text-primary font-bold">{snapshot.inTreatment.length} serving</span>
                    </div>
                  </>
                ) : (
                  <p className="text-[10px] text-text-muted text-center py-6">Connecting to dispatcher...</p>
                )}
              </div>
            </div>

            {/* Booked consultations list */}
            <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-warning" />
                  <span className="font-bold text-text-primary uppercase">BOOKED CONSULTATIONS</span>
                </div>
              </div>
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {appointments.length === 0 ? (
                  <p className="text-[10px] text-text-muted text-center py-6">No scheduled consultations.</p>
                ) : (
                  appointments.map((a) => (
                    <div key={a.id} className="p-2 border border-border/60 rounded-lg bg-surface-elevated/20 flex flex-col gap-1.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-text-primary truncate">{a.patientName}</span>
                        <span className="text-[9px] text-text-muted">
                          {new Date(a.scheduledAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-text-secondary">Dr: {a.staff?.name ?? 'Unassigned'}</p>
                      <div className="flex justify-between items-center mt-1 border-t border-border/20 pt-1.5">
                        <span className="text-[8px] border border-border px-1 py-0.2 rounded uppercase font-bold text-text-muted">
                          {a.status}
                        </span>
                        {a.status === 'SCHEDULED' && (
                          <button
                            onClick={() => handleCancelAppointment(a.id)}
                            className="text-[9px] text-danger hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </ReceptionistLayout>
  );
}
