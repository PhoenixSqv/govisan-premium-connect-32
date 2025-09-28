// Admin JavaScript Functions

// Authentication Functions
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('cms_token');
        window.location.href = 'login.html';
    }
}

// Data Collection Function
function collectFormData() {
    const sections = ['hospitality', 'real-estate', 'network', 'entertainment', 'business-intelligence', 'iot'];
    const data = {
        badge: "Industry Expertise",
        title: "Our Specialization", 
        description: "Focused expertise in hospitality and real estate technology solutions that drive operational excellence and enhance guest experiences.",
        specializations: []
    };
    
    sections.forEach(section => {
        const sectionData = {
            icon: getSectionIcon(section),
            title: document.querySelector(`#${section}-title`)?.value || '',
            description: document.querySelector(`#${section}-description`)?.value || '',
            features: [
                document.querySelector(`#${section}-service-1`)?.value || '',
                document.querySelector(`#${section}-service-2`)?.value || '',
                document.querySelector(`#${section}-service-3`)?.value || '',
                document.querySelector(`#${section}-service-4`)?.value || '',
                document.querySelector(`#${section}-service-5`)?.value || ''
            ].filter(service => service.trim() !== '') // Remove empty services
        };
        
        data.specializations.push(sectionData);
    });
    
    return data;
}

// Get section icon mapping
function getSectionIcon(section) {
    const iconMap = {
        'hospitality': 'Building2',
        'real-estate': 'Home', 
        'network': 'Wifi',
        'entertainment': 'Monitor',
        'business-intelligence': 'BarChart3',
        'iot': 'Cpu'
    };
    return iconMap[section] || 'Settings';
}

// Save Data Function
function saveData() {
    const data = collectFormData();
    const saveBtn = document.getElementById('saveBtn');
    
    // Validate data
    if (!validateData(data)) {
        showMessage('❌ Please fill in all required fields (titles, descriptions, and 5 services each)', 'error');
        return;
    }
    
    // Show loading state
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Saving...</span>';
    }
    
    // This will connect to PHP later
    fetch('/admin/api/save_specialization.php', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('cms_token')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showMessage('✅ Changes saved successfully!', 'success');
            // Update last modified time
            localStorage.setItem('last_update', new Date().toISOString());
        } else {
            showMessage('❌ Error: ' + (result.error || 'Failed to save changes'), 'error');
        }
    })
    .catch(error => {
        console.error('Save error:', error);
        // For demo purposes, simulate successful save
        showMessage('✅ Changes saved successfully! (Demo mode)', 'success');
        localStorage.setItem('cms_demo_data', JSON.stringify(data));
        localStorage.setItem('last_update', new Date().toISOString());
    })
    .finally(() => {
        // Reset button state
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<span class="btn-icon">💾</span><span class="btn-text">Save Changes</span>';
        }
    });
}

// Load Data Function
function loadData() {
    // This will connect to PHP later
    fetch('/admin/api/load_specialization.php', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cms_token')
        }
    })
    .then(response => response.json())
    .then(data => {
        populateForm(data);
    })
    .catch(error => {
        console.error('Load error:', error);
        // For demo purposes, load from localStorage or use defaults
        const demoData = localStorage.getItem('cms_demo_data');
        if (demoData) {
            populateForm(JSON.parse(demoData));
        } else {
            loadDefaultData();
        }
    });
}

// Populate Form with Data
function populateForm(data) {
    if (!data || !data.specializations) return;
    
    const sections = ['hospitality', 'real-estate', 'network', 'entertainment', 'business-intelligence', 'iot'];
    
    sections.forEach((section, index) => {
        const sectionData = data.specializations[index];
        if (!sectionData) return;
        
        // Populate title and description
        const titleInput = document.querySelector(`#${section}-title`);
        const descriptionInput = document.querySelector(`#${section}-description`);
        
        if (titleInput) titleInput.value = sectionData.title || '';
        if (descriptionInput) descriptionInput.value = sectionData.description || '';
        
        // Populate services
        if (sectionData.features) {
            sectionData.features.forEach((service, serviceIndex) => {
                const serviceInput = document.querySelector(`#${section}-service-${serviceIndex + 1}`);
                if (serviceInput) serviceInput.value = service || '';
            });
        }
    });
    
    // Trigger character count updates
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        textarea.dispatchEvent(new Event('input'));
    });
}

// Load Default Data
function loadDefaultData() {
    const defaultData = {
        specializations: [
            {
                title: "Hospitality Technology",
                description: "Comprehensive technology solutions for luxury hotels, resorts, and hospitality brands worldwide.",
                features: [
                    "Property Management Systems",
                    "Guest Experience Platforms", 
                    "Revenue Management Systems",
                    "Mobile Applications",
                    "Digital Concierge Services"
                ]
            },
            {
                title: "Real Estate Technology",
                description: "Smart building solutions and property management systems for modern real estate developments.",
                features: [
                    "Smart Building Systems",
                    "Property Management Platforms",
                    "Tenant Experience Apps", 
                    "Energy Management",
                    "Security & Access Control"
                ]
            },
            {
                title: "Network Infrastructure",
                description: "Robust networking solutions for hospitality and real estate environments.",
                features: [
                    "Enterprise WiFi Solutions",
                    "Network Security",
                    "Fiber Optic Infrastructure",
                    "Cloud Integration", 
                    "24/7 Monitoring"
                ]
            },
            {
                title: "Smart Entertainment Solutions", 
                description: "Cutting-edge entertainment systems for hospitality venues and residential spaces.",
                features: [
                    "Digital Signage",
                    "Interactive Displays",
                    "Streaming Solutions",
                    "Event Technology",
                    "Premium Audio & Sound Systems"
                ]
            },
            {
                title: "Business Intelligence",
                description: "Data-driven insights and analytics for informed business decisions.",
                features: [
                    "Data Analytics",
                    "Performance Dashboards", 
                    "Revenue Optimization",
                    "Market Intelligence",
                    "Predictive Analytics"
                ]
            },
            {
                title: "IoT & Automation",
                description: "Internet of Things solutions for smart automation and operational efficiency.",
                features: [
                    "Smart Room Controls",
                    "Environmental Monitoring",
                    "Automated Workflows",
                    "Sensor Networks",
                    "Connected Appliances & Smart Devices"
                ]
            }
        ]
    };
    
    populateForm(defaultData);
}

// Validate Data Function
function validateData(data) {
    if (!data || !data.specializations) return false;
    
    for (let i = 0; i < data.specializations.length; i++) {
        const spec = data.specializations[i];
        
        // Check required fields
        if (!spec.title || spec.title.trim() === '') return false;
        if (!spec.description || spec.description.trim() === '') return false;
        if (!spec.features || spec.features.length !== 5) return false;
        
        // Check that all services are filled
        for (let feature of spec.features) {
            if (!feature || feature.trim() === '') return false;
        }
    }
    
    return true;
}

// Reset Form Function
function resetForm() {
    if (confirm('Are you sure you want to reset all changes? This will reload the last saved data.')) {
        loadData();
        showMessage('🔄 Form reset to last saved data', 'success');
    }
}

// Show Message Function
function showMessage(message, type) {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close">×</button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Utility Functions
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (error) {
        return 'Never';
    }
}

// Auto-save draft functionality (optional)
let autoSaveTimer;
function enableAutoSave() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                const data = collectFormData();
                localStorage.setItem('cms_draft', JSON.stringify(data));
            }, 2000); // Save draft after 2 seconds of inactivity
        });
    });
}

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem('cms_draft');
    if (draft && confirm('A draft was found. Would you like to restore it?')) {
        populateForm(JSON.parse(draft));
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enable auto-save for specialization page
    if (window.location.pathname.includes('specialization.html')) {
        enableAutoSave();
        loadDraft();
    }
});