import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DirectSaver } from '@/lib/cms/directSaver';

interface ContactOffice {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
}

interface ContactForm {
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
  }>;
}

interface ContactContent {
  title: string;
  description: string;
  offices: ContactOffice[];
  form: ContactForm;
}

const ContactPage = () => {
  const [content, setContent] = useState<ContactContent>({
    title: '',
    description: '',
    offices: [],
    form: {
      title: '',
      fields: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/content/contact/main.json');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      toast.error('Failed to load contact content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const result = await DirectSaver.saveFile('/content/contact/main.json', content);
      if (result.success) {
        toast.success('Contact content saved successfully!');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save contact content');
    } finally {
      setSaving(false);
    }
  };

  const addOffice = () => {
    setContent(prev => ({
      ...prev,
      offices: [...prev.offices, {
        city: '',
        country: '',
        address: '',
        phone: '',
        email: ''
      }]
    }));
  };

  const updateOffice = (index: number, field: keyof ContactOffice, value: string) => {
    setContent(prev => ({
      ...prev,
      offices: prev.offices.map((office, i) => 
        i === index ? { ...office, [field]: value } : office
      )
    }));
  };

  const deleteOffice = (index: number) => {
    setContent(prev => ({
      ...prev,
      offices: prev.offices.filter((_, i) => i !== index)
    }));
  };

  const addFormField = () => {
    setContent(prev => ({
      ...prev,
      form: {
        ...prev.form,
        fields: [...prev.form.fields, {
          name: '',
          label: '',
          type: 'text',
          required: false
        }]
      }
    }));
  };

  const updateFormField = (index: number, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      form: {
        ...prev.form,
        fields: prev.form.fields.map((formField, i) => 
          i === index ? { ...formField, [field]: value } : formField
        )
      }
    }));
  };

  const deleteFormField = (index: number) => {
    setContent(prev => ({
      ...prev,
      form: {
        ...prev.form,
        fields: prev.form.fields.filter((_, i) => i !== index)
      }
    }));
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Contact Page</h1>
          <Button onClick={saveContent} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Header Content */}
        <Card>
          <CardHeader>
            <CardTitle>Page Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={content.title}
                onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Let's Build the Future of Hospitality Together"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={content.description}
                onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Contact page description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Offices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Office Locations</h2>
            <Button onClick={addOffice} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Office
            </Button>
          </div>

          {content.offices.map((office, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Office {index + 1}</CardTitle>
                  <Button
                    onClick={() => deleteOffice(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      value={office.city}
                      onChange={(e) => updateOffice(index, 'city', e.target.value)}
                      placeholder="Barcelona"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      value={office.country}
                      onChange={(e) => updateOffice(index, 'country', e.target.value)}
                      placeholder="Spain"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Textarea
                    value={office.address}
                    onChange={(e) => updateOffice(index, 'address', e.target.value)}
                    placeholder="Street address"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={office.phone}
                      onChange={(e) => updateOffice(index, 'phone', e.target.value)}
                      placeholder="+34 91 123 45 67"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={office.email}
                      onChange={(e) => updateOffice(index, 'email', e.target.value)}
                      placeholder="madrid@govisan.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Contact Form</CardTitle>
              <Button onClick={addFormField} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Form Title</label>
              <Input
                value={content.form.title}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  form: { ...prev.form, title: e.target.value }
                }))}
                placeholder="Send us a message"
              />
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Form Fields</h4>
              {content.form.fields.map((field, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">Field {index + 1}</h5>
                    <Button
                      onClick={() => deleteFormField(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium">Field Name</label>
                      <Input
                        value={field.name}
                        onChange={(e) => updateFormField(index, 'name', e.target.value)}
                        placeholder="name, email, message..."
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium">Label</label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateFormField(index, 'label', e.target.value)}
                        placeholder="Full Name, Email..."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium">Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateFormField(index, 'type', e.target.value)}
                        className="w-full h-8 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="textarea">Textarea</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateFormField(index, 'required', e.target.checked)}
                        className="rounded"
                      />
                      <label className="text-xs font-medium">Required</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ContactPage;