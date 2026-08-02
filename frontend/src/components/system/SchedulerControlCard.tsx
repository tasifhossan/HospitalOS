'use client';

import React, { useState } from 'react';
import { Play, Square, RotateCcw, Cpu, CheckCircle } from 'lucide-react';
import { simulationService } from '@/services/simulationService';
import type { SchedulerType } from '@/types/simulation';

interface SchedulerControlCardProps {
  currentAlgorithm: SchedulerType;
  isRunning: boolean;
  onRefresh: () => void;
}

export function SchedulerControlCard({
  currentAlgorithm,
  isRunning,
  onRefresh,
}: SchedulerControlCardProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const algorithms: { label: string; value: SchedulerType }[] = [
    { label: 'First Come First Served', value: 'FCFS' },
    { label: 'Adaptive Resource Scheduling', value: 'PRIORITY_AGING' },
    { label: 'Multi-Level Queue', value: 'MULTILEVEL' },
    { label: 'Doctor Consultation (SJF)', value: 'SJF' },
    { label: 'Round Robin', value: 'ROUND_ROBIN' },
  ];

  const [activeModal, setActiveModal] = useState<'NONE' | 'PAUSE' | 'RESET'>('NONE');

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await simulationService.start();
      setMessage(res.message);
      onRefresh();
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleStop = async () => {
    setActiveModal('NONE');
    setLoading(true);
    try {
      const res = await simulationService.stop();
      setMessage(res.message);
      onRefresh();
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReset = async () => {
    setActiveModal('NONE');
    setLoading(true);
    try {
      const res = await simulationService.reset();
      setMessage(res.message);
      onRefresh();
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAlgoChange = async (algo: SchedulerType) => {
    setLoading(true);
    try {
      const res = await simulationService.switchAlgorithm(algo);
      setMessage(res.message);
      onRefresh();
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Cannot switch algorithm while running.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <Cpu className="w-4.5 h-4.5 text-warning" />
        <span className="font-bold text-text-primary uppercase tracking-wider">SCHEDULER ENGINE POLICY DESK</span>
      </div>

      {message && (
        <div className="p-3 border border-success/30 bg-success/10 text-success rounded flex items-center gap-2 text-[10px]">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Scheduler State indicators */}
      <div className="grid grid-cols-2 gap-4 bg-surface-elevated/10 p-4 border border-border/80 rounded-lg">
        <div>
          <span className="block text-[8px] text-text-muted">SCHEDULER STATUS</span>
          <span className={`text-xs font-bold ${isRunning ? 'text-success animate-pulse' : 'text-danger'}`}>
            {isRunning ? 'RUNNING' : 'STOPPED'}
          </span>
        </div>
        <div>
          <span className="block text-[8px] text-text-muted">ACTIVE ALGORITHM POLICY</span>
          <span className="text-xs font-bold text-text-primary uppercase">
            {currentAlgorithm.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Policy switcher */}
      <div className="space-y-2">
        <span className="block text-[9px] text-text-muted font-bold">MUTATE ALGORITHM POLICY (Stopped state only)</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {algorithms.map((algo) => (
            <button
              key={algo.value}
              disabled={loading || isRunning}
              onClick={() => handleAlgoChange(algo.value)}
              className={`p-2.5 text-left border rounded transition-all flex flex-col justify-between min-h-[50px] ${
                currentAlgorithm === algo.value
                  ? 'bg-primary-muted border-primary/50 text-text-primary'
                  : 'bg-surface hover:bg-surface-elevated border-border text-text-muted hover:text-text-primary disabled:opacity-40'
              }`}
            >
              <span className="font-bold text-[10px]">{algo.label}</span>
              <span className="text-[7.5px] uppercase text-text-muted/60 mt-1">{algo.value} ENGINE</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kernel control actions */}
      <div className="border-t border-border/40 pt-4 flex flex-wrap gap-2">
        <button
          disabled={loading || isRunning}
          onClick={handleStart}
          className="px-4 py-2 bg-success hover:bg-success-hover text-surface rounded font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Start Scheduler</span>
        </button>
        <button
          disabled={loading || !isRunning}
          onClick={() => setActiveModal('PAUSE')}
          className="px-4 py-2 bg-danger hover:bg-danger-hover text-white rounded font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-all"
        >
          <Square className="w-3.5 h-3.5" />
          <span>Stop Scheduler</span>
        </button>
        <button
          disabled={loading}
          onClick={() => setActiveModal('RESET')}
          className="px-4 py-2 bg-surface-elevated hover:bg-surface border border-border text-text-primary rounded font-semibold flex items-center gap-1.5 disabled:opacity-40 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Kernel Queues</span>
        </button>
      </div>

      {/* Confirmation Dialog System */}
      {activeModal !== 'NONE' && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface/85 backdrop-blur-md" onClick={() => setActiveModal('NONE')} />
          <div className="relative w-full max-w-sm bg-surface border border-border p-6 rounded-lg shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wide">
              {activeModal === 'PAUSE' ? 'Pause Scheduler?' : 'Reset Scheduler?'}
            </h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {activeModal === 'PAUSE'
                ? 'Running requests will continue, but no new requests will be scheduled.'
                : 'Warning: This will flush all waiting queue patients and restore standard resource lock capacities.'}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="px-4 py-1.5 bg-surface-elevated hover:bg-surface border border-border rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={activeModal === 'PAUSE' ? handleStop : handleReset}
                className="px-4 py-1.5 bg-danger hover:bg-danger-hover text-white rounded font-semibold"
              >
                {activeModal === 'PAUSE' ? 'Pause' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
