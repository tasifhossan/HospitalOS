'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { UnifiedDashboardLayout } from '@/components/layout/RoleLayouts';
import { useSocket } from '@/hooks/useSocket';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { ResourceTable } from '@/components/resource/ResourceTable';
import { ResourceDrawer } from '@/components/resource/ResourceDrawer';
import { AllocationCard } from '@/components/resource/AllocationCard';
import { BlockedRequestCard } from '@/components/resource/BlockedRequestCard';
import { DeadlockStatusCard } from '@/components/resource/DeadlockStatusCard';
import { ResourceHistoryCard } from '@/components/resource/ResourceHistoryCard';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Cpu, LayoutGrid, List } from 'lucide-react';

export default function ResourceManagerPage() {
  const { snapshot } = useSocket();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Compute resource metrics based on the live Socket.io snapshot
  const getResourceStatus = (type: string, capacity: number, available: number): 'Available' | 'Busy' | 'Critical' | 'Offline' => {
    if (capacity === 0) return 'Offline';
    const utilization = ((capacity - available) / capacity) * 100;
    if (utilization >= 90) return 'Critical';
    if (utilization > 50) return 'Busy';
    return 'Available';
  };

  const getCapacity = (backendType: string, defaultVal = 5) => {
    if (!snapshot || !snapshot.resourceStatus) return defaultVal;
    const r = snapshot.resourceStatus[backendType];
    return r ? r.capacity : defaultVal;
  };

  const getAvailable = (backendType: string, defaultVal = 5) => {
    if (!snapshot || !snapshot.resourceStatus) return defaultVal;
    const r = snapshot.resourceStatus[backendType];
    return r ? r.available : defaultVal;
  };

  // Define details of the required OS resources
  const resourcesList = [
    { id: '1', name: 'Doctors', type: 'DOCTOR', backendType: 'doctor', capacity: getCapacity('doctor', 20), available: getAvailable('doctor', 20) },
    { id: '2', name: 'Nurses', type: 'NURSE', backendType: 'nurse', capacity: getCapacity('nurse', 15), available: getAvailable('nurse', 15) },
    { id: '3', name: 'ICU Beds', type: 'ICU_BED', backendType: 'icuBed', capacity: getCapacity('icuBed', 10), available: getAvailable('icuBed', 10) },
    { id: '4', name: 'Operation Theatres', type: 'BED', backendType: 'operationTheatre', capacity: getCapacity('operationTheatre', 5), available: getAvailable('operationTheatre', 5) },
    { id: '5', name: 'Cabins', type: 'CABIN', backendType: 'cabin', capacity: 15, available: 11 },
    { id: '6', name: 'MRI Machines', type: 'MRI', backendType: 'mriMachine', capacity: getCapacity('mriMachine', 6), available: getAvailable('mriMachine', 6) },
    { id: '7', name: 'CT Scan Machines', type: 'CT_SCAN', backendType: 'ctScan', capacity: 3, available: 1 },
    { id: '8', name: 'Ventilators', type: 'VENTILATOR', backendType: 'ventilator', capacity: getCapacity('ventilator', 8), available: getAvailable('ventilator', 8) },
    { id: '9', name: 'Ambulances', type: 'AMBULANCE', backendType: 'ambulance', capacity: getCapacity('ambulance', 4), available: getAvailable('ambulance', 4) },
  ];

  // Map resources to layout variables
  const resourcesData = resourcesList.map((r) => {
    const allocated = r.capacity - r.available;
    const utilization = Math.round((allocated / r.capacity) * 100);
    const waiting = snapshot ? (snapshot.readyQueue || []).filter((p) => (p.requiredResources || []).includes(r.type as any) || (p.requiredResources || []).includes(r.backendType as any)).length : 0;
    const status = getResourceStatus(r.type, r.capacity, r.available);
    return {
      ...r,
      allocated,
      available: r.available,
      waiting,
      utilization,
      status,
    };
  });

  const handleSelectResource = (resource: any) => {
    setSelectedRow(resource);
    setIsDrawerOpen(true);
  };

  // Live Allocation logs from active treatment snapshots
  const currentAllocations = (snapshot?.inTreatment ?? []).map((p, idx) => ({
    id: p.id,
    resourceName: p.requiredResources[0] ?? 'General Bed',
    patientName: p.name,
    queueLength: (snapshot?.readyQueue || []).length,
    durationMs: p.treatmentDurationMs,
    priority: p.priority,
  }));

  // Blocked Request wait states
  const blockedRequests = (snapshot?.readyQueue ?? []).slice(0, 3).map((p) => ({
    id: p.id,
    patientName: p.name,
    requiredResource: p.requiredResources[0] ?? 'DOCTOR',
    priority: p.priority,
    waitingTicks: 3,
    reason: 'Waiting for counting resource lock',
  }));

  // History operations logs
  const resourceHistory = [
    { id: 'h1', resourceName: 'DOCTOR', action: 'Allocated' as const, timestamp: '10s ago', userEmail: 'operator@hospital.local' },
    { id: 'h2', resourceName: 'ICU_BED', action: 'Released' as const, timestamp: '1m ago', userEmail: 'operator@hospital.local' },
    { id: 'h3', resourceName: 'BED', action: 'Allocated' as const, timestamp: '2m ago', userEmail: 'doctor@hospital.local' },
  ];

  // Recharts Available vs Allocated data representation
  const chartData = resourcesData.slice(0, 5).map((r) => ({
    name: r.name,
    Available: r.available,
    Allocated: r.allocated,
  }));

  return (
    <UnifiedDashboardLayout>
      <PageShell
        title="Resource Manager"
        subtitle="Clinical resource lock allocation registers and locks telemetry"
      >
        {/* Telemetry Metrics Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6 font-mono text-xs">
          <div className="card-os p-3.5 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">RESOURCE UTILIZATION TODAY</span>
            <span className="text-base font-bold text-success mt-1">74.2%</span>
          </div>
          <div className="card-os p-3.5 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">AVERAGE ALLOCATION TIME</span>
            <span className="text-base font-bold text-primary mt-1">4.8 ticks</span>
          </div>
          <div className="card-os p-3.5 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">PEAK USAGE INDEX</span>
            <span className="text-base font-bold text-warning mt-1">92.0%</span>
          </div>
          <div className="card-os p-3.5 border border-border flex flex-col justify-between">
            <span className="text-[9px] text-text-muted">WAITING DURATION</span>
            <span className="text-base font-bold text-danger mt-1">1.2 ticks</span>
          </div>
          <div className="card-os p-3.5 border border-border flex flex-col justify-between col-span-2 lg:col-span-1">
            <span className="text-[9px] text-text-muted">ALLOCATION TIMELINE</span>
            <span className="text-[10px] text-text-primary mt-1 leading-none font-semibold">T-0: VERIFIED ORDER</span>
          </div>
        </div>

        {/* Navigation Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-text-secondary">SYSTEM LOCKS INDEX</span>
          </div>
          <div className="flex bg-surface-elevated/40 border border-border p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-all ${viewMode === 'table' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* List representation */}
        {viewMode === 'grid' ? (
          <DashboardGrid className="mb-6">
            {resourcesData.map((r) => (
              <ResourceCard
                key={r.id}
                name={r.name}
                available={r.available}
                allocated={r.allocated}
                waiting={r.waiting}
                utilization={r.utilization}
                status={r.status}
                onClick={() => handleSelectResource(r)}
              />
            ))}
          </DashboardGrid>
        ) : (
          <div className="mb-6">
            <ResourceTable resources={resourcesData} onSelectResource={handleSelectResource} />
          </div>
        )}

        {/* Charts and prevention details split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ChartCard
            title="Resource Allocation Chart"
            subtitle="Available vs. Allocated semaphore locks distribution"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '10px' }} />
                <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <Bar dataKey="Available" fill="var(--success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Allocated" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <DeadlockStatusCard
            isSafe={snapshot ? !snapshot.deadlockDetected : true}
            cycle={snapshot?.deadlockCycle}
            preventedAllocationCount={2}
          />

          <AllocationCard allocations={currentAllocations} />
        </div>

        {/* Blocked request and history panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlockedRequestCard blockedRequests={blockedRequests} />
          <ResourceHistoryCard history={resourceHistory} />
        </div>

        {/* Detailed Drawer */}
        <ResourceDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          resource={selectedRow}
          waitingQueue={(snapshot?.readyQueue || []).filter((p) => selectedRow && (p.requiredResources || []).includes(selectedRow.type)) || []}
        />
      </PageShell>
    </UnifiedDashboardLayout>
  );
}
