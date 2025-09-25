import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

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

const ContactSection = () => {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    // Try loading from PHP API first, fallback to static JSON
    const loadContent = async () => {
      try {
        // First try the CMS API endpoint
        let response = await fetch('/api/cms/get-block.php?slug=contact-info');
        if (!response.ok) {
          // Fallback to static JSON
          response = await fetch('/content/contact/main.json');
        }
        
        const data = await response.json();
        setContent(data);
        
        // Initialize form data
        const initialFormData: Record<string, string> = {};
        data.form.fields.forEach((field: any) => {
          initialFormData[field.name] = '';
        });
        setFormData(initialFormData);
      } catch (err) {
        console.error('Failed to load contact content:', err);
      }
    };
    
    loadContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: formDataObj
      });

      const result = await response.json();
      
      if (result.ok) {
        // Success - clear form and show success message
        const initialFormData: Record<string, string> = {};
        content?.form.fields.forEach((field: any) => {
          initialFormData[field.name] = '';
        });
        setFormData(initialFormData);
        alert('Message sent successfully! We\'ll get back to you soon.');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!content) return <div>Loading...</div>;

  return (
    <section id="contact" className="section--wm wm--contact py-20 bg-background">
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
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">Get in Touch</h3>
            
            <div className="space-y-8">
              {content.offices.map((office, index) => (
                <div key={index} className="glass p-6 rounded-2xl shadow-teal hover:shadow-gold transition-all duration-300">
                  <h4 className="text-xl font-semibold text-govisan-navy mb-4">
                    {office.city}, {office.country}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-govisan-teal mt-1 flex-shrink-0" />
                      <div className="text-muted-foreground whitespace-pre-line">
                        {office.address}
                      </div>
                    </div>
                    
                    {office.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-govisan-teal flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-govisan-teal transition-colors">
                          {office.phone}
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-govisan-teal flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-govisan-teal transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="glass p-8 rounded-2xl shadow-glass">
              <h3 className="text-2xl font-semibold text-govisan-navy mb-6">{content.form.title}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {content.form.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-govisan-navy mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <Textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required}
                        rows={4}
                        className="w-full bg-white/50 backdrop-blur-sm"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required}
                        className="w-full bg-white/50 backdrop-blur-sm"
                      />
                    )}
                  </div>
                ))}
                
                <Button 
                  type="submit"
                  className="w-full gradient-accent hover:shadow-teal text-white font-semibold py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;