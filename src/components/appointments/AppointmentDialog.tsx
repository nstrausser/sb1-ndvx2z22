import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { installers } from './AppointmentsView';
import type { Appointment } from '@/types';

type AppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: Appointment | null;
  onSave: (appointment: Appointment) => void;
};

export default function AppointmentDialog({
  open,
  onOpenChange,
  appointment,
  onSave,
}: AppointmentDialogProps) {
  const [formData, setFormData] = useState({
    customerName: appointment?.customerName || '',
    customerPhone: appointment?.customerPhone || '',
    customerEmail: appointment?.customerEmail || '',
    vehicleInfo: appointment?.vehicleInfo || '',
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || '09:00',
    estimatedDuration: appointment?.estimatedDuration?.toString() || '480',
    installerId: appointment?.installerId || '',
    serviceType: appointment?.serviceType || '',
    estimatedSquareFeet: appointment?.estimatedSquareFeet?.toString() || '',
    quotedPrice: appointment?.quotedPrice?.toString() || '',
    deposit: appointment?.deposit?.toString() || '',
    notes: appointment?.notes || '',
    status: appointment?.status || 'scheduled' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: appointment?.id || Date.now().toString(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail || null,
      vehicleInfo: formData.vehicleInfo,
      date: formData.date,
      time: formData.time,
      estimatedDuration: parseInt(formData.estimatedDuration),
      installerId: formData.installerId,
      serviceType: formData.serviceType as Appointment['serviceType'],
      estimatedSquareFeet: parseFloat(formData.estimatedSquareFeet),
      quotedPrice: parseFloat(formData.quotedPrice),
      deposit: formData.deposit ? parseFloat(formData.deposit) : undefined,
      notes: formData.notes,
      status: formData.status as Appointment['status'],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          <DialogFooter>
            <Button type="submit">
              {appointment ? 'Update Appointment' : 'Schedule Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}