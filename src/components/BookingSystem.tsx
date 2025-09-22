import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

interface BookingType {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export const BookingSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<BookingType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'type' | 'datetime' | 'details' | 'confirmation'>('type');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const bookingTypes: BookingType[] = [
    {
      id: 'consultation',
      title: 'Consulta Técnica Inicial',
      duration: '30 minutos',
      description: 'Evaluación gratuita de tu proyecto hotelero. Análisis de necesidades y recomendaciones iniciales.',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 'audit',
      title: 'Auditoría Técnica Completa',
      duration: '60 minutos',
      description: 'Revisión exhaustiva de infraestructura actual. Diagnóstico detallado y roadmap de mejoras.',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'project-review',
      title: 'Revisión de Proyecto',
      duration: '45 minutos',
      description: 'Análisis de planos y especificaciones técnicas. Optimización de diseño y costos.',
      icon: <MapPin className="w-5 h-5" />,
      color: 'bg-purple-500'
    }
  ];

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      ['00', '30'].forEach(minute => {
        const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        // Simular disponibilidad (en realidad vendría de API)
        const available = Math.random() > 0.3;
        slots.push({ time, available });
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Saltar fines de semana
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      }
    }
    return dates.slice(0, 10);
  };

  const availableDates = getNextAvailableDates();

  const handleBooking = async () => {
    // Aquí se enviaría la información al backend
    console.log('Booking details:', {
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      details: bookingDetails
    });

    // Simular envío exitoso
    setStep('confirmation');

    // Integración con calendario (Google Calendar, Outlook, etc.)
    const calendarEvent = {
      title: `${selectedType?.title} - ${bookingDetails.company}`,
      start: new Date(`${selectedDate}T${selectedTime}`),
      duration: selectedType?.duration,
      attendee: bookingDetails.email
    };

    // Enviar confirmación por email
    // await sendConfirmationEmail(calendarEvent, bookingDetails);
  };

  const resetBooking = () => {
    setStep('type');
    setSelectedType(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingDetails({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: '',
      message: ''
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold px-8 py-4 rounded-lg shadow-lg"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Agendar Consulta Gratuita
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-govisan-gold" />
              Agendar Consulta Técnica
            </DialogTitle>
          </DialogHeader>

          {step === 'type' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Selecciona el tipo de consulta</h3>
              <div className="grid gap-4">
                {bookingTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer border-2 transition-all hover:shadow-lg ${
                      selectedType?.id === type.id
                        ? 'border-govisan-gold bg-govisan-gold/5'
                        : 'border-gray-200 hover:border-govisan-gold/50'
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${type.color} text-white p-2 rounded-lg`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{type.title}</h4>
                        <Badge variant="secondary" className="mb-2">
                          {type.duration}
                        </Badge>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button
                onClick={() => setStep('datetime')}
                disabled={!selectedType}
                className="w-full bg-govisan-gold hover:bg-govisan-gold/90"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 'datetime' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Selecciona fecha y hora</h3>

                {/* Selección de fecha */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Fecha disponible:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((date) => (
                      <Button
                        key={date.value}
                        variant={selectedDate === date.value ? 'default' : 'outline'}
                        onClick={() => setSelectedDate(date.value)}
                        className="text-left h-auto p-3"
                      >
                        <div>
                          <div className="font-medium capitalize">
                            {date.label.split(',')[0]}
                          </div>
                          <div className="text-sm opacity-70">
                            {date.label.split(',')[1]}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selección de hora */}
                {selectedDate && (
                  <div>
                    <h4 className="font-medium mb-3">Hora disponible:</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? 'default' : 'outline'}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          size="sm"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('type')}>
                  Atrás
                </Button>
                <Button
                  onClick={() => setStep('details')}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-govisan-gold hover:bg-govisan-gold/90"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Información de contacto</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails(prev => ({...prev, name: e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails(prev => ({...prev, email: e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa/Hotel</label>
                  <input
                    type="text"
                    value={bookingDetails.company}
                    onChange={(e) => setBookingDetails(prev => ({...prev, company: e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails(prev => ({...prev, phone: e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo de proyecto</label>
                <select
                  value={bookingDetails.projectType}
                  onChange={(e) => setBookingDetails(prev => ({...prev, projectType: e.target.value}))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                >
                  <option value="">Selecciona...</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="apartamentos">Apartamentos</option>
                  <option value="oficinas">Oficinas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mensaje (opcional)</label>
                <textarea
                  value={bookingDetails.message}
                  onChange={(e) => setBookingDetails(prev => ({...prev, message: e.target.value}))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-govisan-gold"
                  placeholder="Cuéntanos más sobre tu proyecto..."
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('datetime')}>
                  Atrás
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={!bookingDetails.name || !bookingDetails.email}
                  className="flex-1 bg-govisan-gold hover:bg-govisan-gold/90"
                >
                  Confirmar Cita
                </Button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-green-600">¡Cita Confirmada!</h3>

              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tipo de consulta:</span>
                  <span>{selectedType?.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fecha:</span>
                  <span>{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Hora:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Duración:</span>
                  <span>{selectedType?.duration}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p>✅ Confirmación enviada a: {bookingDetails.email}</p>
                <p>📅 Invitación de calendario incluida</p>
                <p>⏰ Recordatorio 24h antes de la cita</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetBooking();
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  Cerrar
                </Button>
                <Button
                  onClick={() => window.open('https://calendar.google.com', '_blank')}
                  className="flex-1 bg-govisan-gold hover:bg-govisan-gold/90"
                >
                  Añadir a Calendario
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingSystem;