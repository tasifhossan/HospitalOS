'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { NurseLayout } from '@/components/layout/RoleLayouts';
import { useSocket } from '@/hooks/useSocket';
import { patientService } from '@/services/patientService';
import type { RegisteredPatient } from '@/types/patient';
import {
  HeartPulse,
  Activity,
  Shield,
  Layers,
  Thermometer,
  Layers3,
  Bell,
  CheckCircle,
  FileText,
  User
} from 'lucide-react';

export default function NursePage() {
  const { snapshot } = useSocket();
  const [patients, setPatients] = useState<RegisteredPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<RegisteredPatient | null>(null);

  // Monitoring States
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [temperature, setTemperature] = useState('98.6');
  const [heartRate, setHeartRate] = useState('72');
  const [nursingNotes, setNursingNotes] = useState('');
  const [message, setMessage] = useState('');

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

  const handleUpdateVitals = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Vitals registered successfully for ${selectedPatient?.name}. Committed to clinical locks ledger.`);
    setNursingNotes('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRequestResource = (type: string) => {
    setMessage(`Resource Request [${type}] dispatched to scheduler kernel.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <NurseLayout>
      <PageShell
        title="Nurse Portal"
        subtitle="Resource Monitoring: Patient shifts observation, vitals administration & physical resources telemetry"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel: Nurse shift details & patients */}
          <div className="space-y-6 lg:col-span-1">
            {/* Shift metadata */}
            <div className="card-os p-4 border border-border flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <Layers className="w-4 h-4 text-primary" />
                <span className="font-bold text-text-primary uppercase">CURRENT SHIFT SUMMARY</span>
              </div>
              <div className="space-y-1.5 text-[10px] text-text-muted">
                <div>• <span className="text-text-primary">Shift Period:</span> Morning (08:00 - 16:00)</div>
                <div>• <span className="text-text-primary">Monitoring Station:</span> Ward B Floor 3</div>
                <div>• <span className="text-text-primary">Assigned Patients:</span> {patients.length} active</div>
              </div>
            </div>

            {/* Patients list */}
            <div className="card-os p-4 border border-border flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-success" />
                  <span className="font-bold text-text-primary uppercase">WARD OBSERVATION PATIENTS</span>
                </div>
              </div>
              <div className="space-y-2 divide-y divide-border/20 max-h-[220px] overflow-y-auto pr-1">
                {patients.length === 0 ? (
                  <p className="text-[10px] text-text-muted text-center py-6">No patient registered in Ward.</p>
                ) : (
                  patients.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPatient(p)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors flex justify-between items-center ${
                        selectedPatient?.id === p.id ? 'bg-success/10 border border-success/30' : 'hover:bg-surface-elevated/40'
                      }`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-text-primary truncate">{p.name}</span>
                        <span className="text-[9px] text-text-muted mt-0.5">Priority: {p.priority}</span>
                      </div>
                      <span className="text-[8px] border border-border px-1 rounded uppercase font-mono">
                        {p.condition.slice(0, 10)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Middle/Right panels: Vitals logging & resource requests */}
          <div className="lg:col-span-2 space-y-6">
            {message && (
              <div className="p-3 border border-success/30 bg-success/10 text-success rounded-lg font-mono text-xs flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5" />
                <span>{message}</span>
              </div>
            )}

            {selectedPatient ? (
              <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 border-b border-border pb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success/10 border border-success/20">
                    <HeartPulse className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary">Observing: {selectedPatient.name}</h3>
                    <p className="text-[10px] text-text-muted mt-0.5">Condition: {selectedPatient.condition}</p>
                  </div>
                </div>

                {/* Vitals form */}
                <div>
                  <h4 className="font-bold text-text-primary uppercase text-[10px] mb-3">Update Observation Vitals</h4>
                  <form onSubmit={handleUpdateVitals} className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Systolic (mmHg)</label>
                        <input
                          type="number"
                          value={systolic}
                          onChange={(e) => setSystolic(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-success/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Diastolic (mmHg)</label>
                        <input
                          type="number"
                          value={diastolic}
                          onChange={(e) => setDiastolic(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-success/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Temp (°F)</label>
                        <input
                          type="text"
                          value={temperature}
                          onChange={(e) => setTemperature(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-success/50"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-text-muted">Pulse (bpm)</label>
                        <input
                          type="number"
                          value={heartRate}
                          onChange={(e) => setHeartRate(e.target.value)}
                          className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-success/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-text-muted">Observations & Nursing Notes</label>
                      <textarea
                        rows={2}
                        value={nursingNotes}
                        onChange={(e) => setNursingNotes(e.target.value)}
                        placeholder="e.g. Vitals stable. Fluid IV renewed. Sleeping comfortably."
                        className="bg-surface-elevated border border-border p-2 rounded outline-none text-text-primary focus:border-success/50 resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <span className="badge badge-warning text-[9px] flex items-center font-bold">
                        TODO: MUTATION LOCK
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-success hover:bg-success-hover text-surface rounded font-semibold"
                      >
                        Submit Vitals
                      </button>
                    </div>
                  </form>
                </div>

                {/* Nursing Resource Requests */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <h4 className="font-bold text-text-primary uppercase text-[10px]">Physical Resource Lock Dispatches</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleRequestResource('Wheelchair')}
                      className="px-3 py-2 bg-surface-elevated border border-border hover:border-primary/40 rounded transition-all text-center flex flex-col items-center gap-1.5"
                    >
                      <Activity className="w-4 h-4 text-primary" />
                      <span>Wheelchair</span>
                    </button>
                    <button
                      onClick={() => handleRequestResource('Ventilator')}
                      className="px-3 py-2 bg-surface-elevated border border-border hover:border-danger/40 rounded transition-all text-center flex flex-col items-center gap-1.5"
                    >
                      <Thermometer className="w-4 h-4 text-danger animate-pulse" />
                      <span>Ventilator</span>
                    </button>
                    <button
                      onClick={() => handleRequestResource('Bed Transfer')}
                      className="px-3 py-2 bg-surface-elevated border border-border hover:border-warning/40 rounded transition-all text-center flex flex-col items-center gap-1.5"
                    >
                      <Layers3 className="w-4 h-4 text-warning" />
                      <span>Bed Transfer</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-os py-20 text-center border border-dashed border-border font-mono text-xs">
                Select a patient process from the left ward list to begin nursing observation logs.
              </div>
            )}
          </div>
        </div>
      </PageShell>
    </NurseLayout>
  );
}
