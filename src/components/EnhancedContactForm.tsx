import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Calendar, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ContactOffice {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
}

interface ContactContent {
  title: string;
  description: string;
  offices: ContactOffice[];
  form: {
    title: string;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
    }>;
  };
}

const EnhancedContactForm = () => {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: officesRef, isVisible: officesVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    fetch('/content/contact/main.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        const initialFormData: Record<string, string> = {};
        data.form.fields.forEach((field: any) => {
          initialFormData[field.name] = '';
        });
        setFormData(initialFormData);
      })
      .catch(err => console.error('Failed to load contact content:', err));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    if (name === 'name' && value && value.length < 2) {
      error = 'Name must be at least 2 characters long';
    }
    
    return error;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    content?.form.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else {
        const error = validateField(field.name, formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData(prev => {
        const reset: Record<string, string> = {};
        Object.keys(prev).forEach(key => reset[key] = '');
        return reset;
      });
    }, 3000);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about Govisan's hospitality technology solutions.");
    window.open(`https://wa.me/34911234567?text=${message}`, '_blank');
  };

  const handleCalendarClick = () => {
    // Open calendar booking system (replace with actual booking URL)
    window.open('https://calendly.com/govisan', '_blank');
  };

  if (!content) return <div>Loading...</div>;

  return (
    <section id="contact" className="section--wm wm--contact py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {content.title}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div 
            ref={officesRef}
            className={`transition-all duration-700 ${
              officesVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">Get in Touch</h3>
            
            <div className="space-y-8">
              {content.offices.map((office, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h4 className="text-xl font-semibold text-govisan-navy mb-4">
                    {office.city}, {office.country}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-govisan-gold mt-1 flex-shrink-0" />
                      <div className="text-muted-foreground whitespace-pre-line">
                        {office.address}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-govisan-gold flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-govisan-gold transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-govisan-gold flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-govisan-gold transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 group"
                >
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  WhatsApp Chat
                </Button>
                
                <Button
                  onClick={handleCalendarClick}
                  variant="outline"
                  className="border-govisan-gold text-govisan-gold hover:bg-govisan-gold hover:text-white font-semibold py-3 group"
                >
                  <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  15-min Call
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div 
            ref={formRef}
            className={`transition-all duration-700 delay-200 ${
              formVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              {/* Success Overlay */}
              {isSubmitted && (
                <div className="absolute inset-0 bg-green-50 flex items-center justify-center z-10 rounded-2xl">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-600">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-govisan-navy mb-6">{content.form.title}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {content.form.fields.map((field, index) => (
                  <div key={index} className="relative">
                    {field.type === 'textarea' ? (
                      <div className="relative">
                        <Textarea
                          id={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField('')}
                          required={field.required}
                          rows={4}
                          className={`w-full pt-6 transition-all duration-200 ${
                            errors[field.name] ? 'border-red-500 focus:border-red-500' : 'focus:border-govisan-gold'
                          }`}
                          placeholder=" "
                        />
                        <label
                          htmlFor={field.name}
                          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                            formData[field.name] || focusedField === field.name
                              ? 'top-2 text-xs text-govisan-gold'
                              : 'top-4 text-base text-muted-foreground'
                          }`}
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField('')}
                          required={field.required}
                          className={`w-full pt-6 transition-all duration-200 ${
                            errors[field.name] ? 'border-red-500 focus:border-red-500' : 'focus:border-govisan-gold'
                          }`}
                          placeholder=" "
                        />
                        <label
                          htmlFor={field.name}
                          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                            formData[field.name] || focusedField === field.name
                              ? 'top-2 text-xs text-govisan-gold'
                              : 'top-4 text-base text-muted-foreground'
                          }`}
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      </div>
                    )}
                    
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1 animate-fade-in">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-govisan-gold hover:bg-govisan-gold/90 text-white font-semibold py-3 transition-all duration-200 hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;