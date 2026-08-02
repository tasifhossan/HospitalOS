'use client';

import React from 'react';
import type { PermissionEntry } from '@/types/userManagement';
import { Check, X } from 'lucide-react';

const MATRIX: PermissionEntry[] = [
  {
    role: 'ADMIN',
    description: 'Kernel Operations & Policy Administrator',
    capabilities: ['Full Access', 'System Control', 'User Management', 'Audit Logs', 'Resource Overrides']
  },
  {
    role: 'DOCTOR',
    description: 'Clinical Practitioner Execution Ring',
    capabilities: ['Assigned Patients', 'Medical Reports', 'Prescriptions']
  },
  {
    role: 'NURSE',
    description: 'Patient Monitoring & Telemetry Observer',
    capabilities: ['Patient Monitoring', 'Medicine Administration']
  },
  {
    role: 'RECEPTIONIST',
    description: 'Process Creation & Scheduler Entry Interface',
    capabilities: ['Registration', 'Appointments', 'Billing']
  },
  {
    role: 'PATIENT',
    description: 'Sandbox User Mode Level',
    capabilities: ['Own Profile', 'Own Reports']
  }
];

const ALL_CAPABILITIES = [
  'Full Access',
  'System Control',
  'User Management',
  'Audit Logs',
  'Assigned Patients',
  'Medical Reports',
  'Prescriptions',
  'Patient Monitoring',
  'Medicine Administration',
  'Registration',
  'Appointments',
  'Billing',
  'Own Profile',
  'Own Reports'
];

export function PermissionMatrix() {
  return (
    <div className="card-os p-5 border border-border space-y-4 font-mono text-xs">
      <div className="flex flex-col gap-1 border-b border-border/60 pb-3">
        <span className="font-bold text-text-primary uppercase tracking-wider">PROTECTION RING PERMISSIONS MATRIX</span>
        <span className="text-[10px] text-text-muted">Security Policy & Role-Based Access Control (RBAC) Verification</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60">
              <th className="py-2 pr-4 font-bold text-text-primary uppercase text-[9px] tracking-wider min-w-[120px]">Role / Privilege</th>
              {ALL_CAPABILITIES.map((cap) => (
                <th key={cap} className="py-2 px-3 font-semibold text-text-muted text-[8px] uppercase tracking-wider text-center rotate-0 whitespace-nowrap">
                  {cap}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {MATRIX.map((row) => (
              <tr key={row.role} className="hover:bg-surface-elevated/20 transition-colors">
                <td className="py-2.5 pr-4 font-semibold text-text-primary flex flex-col">
                  <span>{row.role}</span>
                  <span className="text-[8px] text-text-muted font-normal mt-0.5">{row.description}</span>
                </td>
                {ALL_CAPABILITIES.map((cap) => {
                  const hasCap = row.capabilities.includes(cap) || row.capabilities.includes('Full Access');
                  return (
                    <td key={cap} className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center">
                        {hasCap ? (
                          <Check className="w-4 h-4 text-success" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-text-muted/30" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
