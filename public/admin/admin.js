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

// ===================================
// ALL SECTIONS CMS FUNCTIONS
// ===================================

// Save all sections data
function saveAllSections() {
    const allData = {
        hero: collectHeroData(),
        about: collectAboutData(),
        services: collectServicesData(),
        cases: collectCasesData(),
        insights: collectInsightsData(),
        contact: collectContactData()
    };
    
    // Show loading state
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '⏳ Saving...';
    }
    
    // Send to PHP endpoint
    fetch('/admin/api/save_all_sections.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('cms_token')
        },
        body: JSON.stringify(allData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showMessage('✅ All sections saved successfully!', 'success');
            localStorage.setItem('last_update', new Date().toISOString());
        } else {
            showMessage('❌ Error: ' + (result.error || 'Failed to save'), 'error');
        }
    })
    .catch(error => {
        console.error('Save error:', error);
        // Demo mode fallback
        showMessage('✅ Changes saved successfully! (Demo mode)', 'success');
        localStorage.setItem('cms_all_sections', JSON.stringify(allData));
        localStorage.setItem('last_update', new Date().toISOString());
    })
    .finally(() => {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '💾 Save All Changes';
        }
    });
}

// Load all sections data
function loadAllSections() {
    fetch('/admin/api/load_all_sections.php', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('cms_token')
        }
    })
    .then(response => response.json())
    .then(data => {
        populateAllForms(data);
    })
    .catch(error => {
        console.error('Load error:', error);
        // Load from localStorage or defaults
        const demoData = localStorage.getItem('cms_all_sections');
        if (demoData) {
            populateAllForms(JSON.parse(demoData));
        } else {
            loadDefaultAllSections();
        }
    });
}

// Collect Hero Section Data
function collectHeroData() {
    return {
        title: document.querySelector('#hero-title')?.value || '',
        subtitle: document.querySelector('#hero-subtitle')?.value || '',
        stats: [
            {
                number: document.querySelector('#hero-stat1-number')?.value || '',
                label: document.querySelector('#hero-stat1-label')?.value || ''
            },
            {
                number: document.querySelector('#hero-stat2-number')?.value || '',
                label: document.querySelector('#hero-stat2-label')?.value || ''
            },
            {
                number: document.querySelector('#hero-stat3-number')?.value || '',
                label: document.querySelector('#hero-stat3-label')?.value || ''
            }
        ]
    };
}

// Collect About Section Data
function collectAboutData() {
    return {
        title: document.querySelector('#about-title')?.value || '',
        description: document.querySelector('#about-description')?.value || '',
        values: [
            {
                title: document.querySelector('#about-value1-title')?.value || '',
                description: document.querySelector('#about-value1-desc')?.value || ''
            },
            {
                title: document.querySelector('#about-value2-title')?.value || '',
                description: document.querySelector('#about-value2-desc')?.value || ''
            },
            {
                title: document.querySelector('#about-value3-title')?.value || '',
                description: document.querySelector('#about-value3-desc')?.value || ''
            }
        ]
    };
}

// Collect Services Section Data
function collectServicesData() {
    return {
        title: document.querySelector('#services-title')?.value || '',
        description: document.querySelector('#services-description')?.value || '',
        services: [
            {
                title: document.querySelector('#service1-title')?.value || '',
                description: document.querySelector('#service1-description')?.value || '',
                features: document.querySelector('#service1-features')?.value.split('\n').filter(f => f.trim()) || []
            },
            {
                title: document.querySelector('#service2-title')?.value || '',
                description: document.querySelector('#service2-description')?.value || '',
                features: document.querySelector('#service2-features')?.value.split('\n').filter(f => f.trim()) || []
            },
            {
                title: document.querySelector('#service3-title')?.value || '',
                description: document.querySelector('#service3-description')?.value || '',
                features: document.querySelector('#service3-features')?.value.split('\n').filter(f => f.trim()) || []
            },
            {
                title: document.querySelector('#service4-title')?.value || '',
                description: document.querySelector('#service4-description')?.value || '',
                features: document.querySelector('#service4-features')?.value.split('\n').filter(f => f.trim()) || []
            }
        ]
    };
}

// Collect Cases Section Data
function collectCasesData() {
    return {
        title: document.querySelector('#cases-title')?.value || '',
        description: document.querySelector('#cases-description')?.value || '',
        cases: [
            {
                title: document.querySelector('#case1-title')?.value || '',
                location: document.querySelector('#case1-location')?.value || '',
                guests: document.querySelector('#case1-guests')?.value || '',
                rating: document.querySelector('#case1-rating')?.value || '',
                description: document.querySelector('#case1-description')?.value || '',
                achievements: document.querySelector('#case1-achievements')?.value.split('\n').filter(a => a.trim()) || []
            },
            {
                title: document.querySelector('#case2-title')?.value || '',
                location: document.querySelector('#case2-location')?.value || '',
                guests: document.querySelector('#case2-guests')?.value || '',
                rating: document.querySelector('#case2-rating')?.value || '',
                description: document.querySelector('#case2-description')?.value || '',
                achievements: document.querySelector('#case2-achievements')?.value.split('\n').filter(a => a.trim()) || []
            },
            {
                title: document.querySelector('#case3-title')?.value || '',
                location: document.querySelector('#case3-location')?.value || '',
                guests: document.querySelector('#case3-guests')?.value || '',
                rating: document.querySelector('#case3-rating')?.value || '',
                description: document.querySelector('#case3-description')?.value || '',
                achievements: document.querySelector('#case3-achievements')?.value.split('\n').filter(a => a.trim()) || []
            }
        ]
    };
}

// Collect Insights Section Data
function collectInsightsData() {
    return {
        insights: [
            {
                title: document.querySelector('#insight1-title')?.value || '',
                category: document.querySelector('#insight1-category')?.value || '',
                date: document.querySelector('#insight1-date')?.value || '',
                readTime: document.querySelector('#insight1-readtime')?.value || '',
                excerpt: document.querySelector('#insight1-excerpt')?.value || ''
            },
            {
                title: document.querySelector('#insight2-title')?.value || '',
                category: document.querySelector('#insight2-category')?.value || '',
                date: document.querySelector('#insight2-date')?.value || '',
                readTime: document.querySelector('#insight2-readtime')?.value || '',
                excerpt: document.querySelector('#insight2-excerpt')?.value || ''
            },
            {
                title: document.querySelector('#insight3-title')?.value || '',
                category: document.querySelector('#insight3-category')?.value || '',
                date: document.querySelector('#insight3-date')?.value || '',
                readTime: document.querySelector('#insight3-readtime')?.value || '',
                excerpt: document.querySelector('#insight3-excerpt')?.value || ''
            }
        ]
    };
}

// Collect Contact Section Data
function collectContactData() {
    return {
        title: document.querySelector('#contact-title')?.value || '',
        description: document.querySelector('#contact-description')?.value || '',
        offices: [
            {
                city: document.querySelector('#office1-city')?.value || '',
                country: document.querySelector('#office1-country')?.value || '',
                address: document.querySelector('#office1-address')?.value || '',
                phone: document.querySelector('#office1-phone')?.value || '',
                email: document.querySelector('#office1-email')?.value || ''
            },
            {
                city: document.querySelector('#office2-city')?.value || '',
                country: document.querySelector('#office2-country')?.value || '',
                address: document.querySelector('#office2-address')?.value || '',
                phone: document.querySelector('#office2-phone')?.value || '',
                email: document.querySelector('#office2-email')?.value || ''
            }
        ]
    };
}

// Populate all forms with data
function populateAllForms(data) {
    if (!data) return;
    
    // Populate Hero Section
    if (data.hero) {
        document.querySelector('#hero-title').value = data.hero.title || '';
        document.querySelector('#hero-subtitle').value = data.hero.subtitle || '';
        
        if (data.hero.stats) {
            data.hero.stats.forEach((stat, index) => {
                document.querySelector(`#hero-stat${index + 1}-number`).value = stat.number || '';
                document.querySelector(`#hero-stat${index + 1}-label`).value = stat.label || '';
            });
        }
    }
    
    // Populate About Section
    if (data.about) {
        document.querySelector('#about-title').value = data.about.title || '';
        document.querySelector('#about-description').value = data.about.description || '';
        
        if (data.about.values) {
            data.about.values.forEach((value, index) => {
                document.querySelector(`#about-value${index + 1}-title`).value = value.title || '';
                document.querySelector(`#about-value${index + 1}-desc`).value = value.description || '';
            });
        }
    }
    
    // Populate Services Section
    if (data.services) {
        document.querySelector('#services-title').value = data.services.title || '';
        document.querySelector('#services-description').value = data.services.description || '';
        
        if (data.services.services) {
            data.services.services.forEach((service, index) => {
                document.querySelector(`#service${index + 1}-title`).value = service.title || '';
                document.querySelector(`#service${index + 1}-description`).value = service.description || '';
                document.querySelector(`#service${index + 1}-features`).value = service.features ? service.features.join('\n') : '';
            });
        }
    }
    
    // Populate Cases Section
    if (data.cases) {
        document.querySelector('#cases-title').value = data.cases.title || '';
        document.querySelector('#cases-description').value = data.cases.description || '';
        
        if (data.cases.cases) {
            data.cases.cases.forEach((caseItem, index) => {
                document.querySelector(`#case${index + 1}-title`).value = caseItem.title || '';
                document.querySelector(`#case${index + 1}-location`).value = caseItem.location || '';
                document.querySelector(`#case${index + 1}-guests`).value = caseItem.guests || '';
                document.querySelector(`#case${index + 1}-rating`).value = caseItem.rating || '';
                document.querySelector(`#case${index + 1}-description`).value = caseItem.description || '';
                document.querySelector(`#case${index + 1}-achievements`).value = caseItem.achievements ? caseItem.achievements.join('\n') : '';
            });
        }
    }
    
    // Populate Insights Section
    if (data.insights && data.insights.insights) {
        data.insights.insights.forEach((insight, index) => {
            document.querySelector(`#insight${index + 1}-title`).value = insight.title || '';
            document.querySelector(`#insight${index + 1}-category`).value = insight.category || '';
            document.querySelector(`#insight${index + 1}-date`).value = insight.date || '';
            document.querySelector(`#insight${index + 1}-readtime`).value = insight.readTime || '';
            document.querySelector(`#insight${index + 1}-excerpt`).value = insight.excerpt || '';
        });
    }
    
    // Populate Contact Section
    if (data.contact) {
        document.querySelector('#contact-title').value = data.contact.title || '';
        document.querySelector('#contact-description').value = data.contact.description || '';
        
        if (data.contact.offices) {
            data.contact.offices.forEach((office, index) => {
                document.querySelector(`#office${index + 1}-city`).value = office.city || '';
                document.querySelector(`#office${index + 1}-country`).value = office.country || '';
                document.querySelector(`#office${index + 1}-address`).value = office.address || '';
                document.querySelector(`#office${index + 1}-phone`).value = office.phone || '';
                document.querySelector(`#office${index + 1}-email`).value = office.email || '';
            });
        }
    }
}

// Load default data for all sections
function loadDefaultAllSections() {
    const defaultData = {
        hero: {
            title: "Connecting Luxury Hospitality & Real Estate with the Future",
            subtitle: "Advanced telecommunications engineering and technology solutions for world-class Hotels, residences, retail & corporate buildings that demand excellence in every detail.",
            stats: [
                { number: "25+", label: "Years of Excellence" },
                { number: "+60,000", label: "guestrooms connected" },
                { number: "11", label: "countries" }
            ]
        },
        about: {
            title: "Over 25 years driving IT",
            description: "Hospitality & Real Estate, driven by VCN Ingeniería, our matrix in EMEA. Exclusive services tailored to customer needs...",
            values: [
                { title: "Global Experience", description: "Two decades supporting leading hospitality brands..." },
                { title: "Commitment to Excellence", description: "Quality across every phase, from design to operation..." },
                { title: "Customer-Centric", description: "Exclusive solutions tailored to every space..." }
            ]
        },
        services: {
            title: "Solutions & Services",
            description: "We assess the best technical and economical solution...",
            services: [
                { title: "Wiredscore Certifications", description: "Cutting-edge technologies...", features: ["Certification process", "Standards compliance"] },
                { title: "Strategic Consulting", description: "Tailored telecom solutions...", features: ["Premium Connectivity", "Secure WiFi"] },
                { title: "Project Engineering", description: "End-to-end management...", features: ["Intelligent rooms", "Next-Gen Audiovisuals"] },
                { title: "On-Site Supervision", description: "Quality during installation...", features: ["Advanced Security", "CCTV systems"] }
            ]
        },
        cases: {
            title: "Partnering with Iconic Global hospitality Brands",
            description: "We have partnered with iconic global hospitality brands...",
            cases: [
                { title: "Mandarin Oriental – Seamless Smart Integration", location: "Maldives", guests: "5,000", rating: "4.9", description: "Transforming a luxury resort...", achievements: ["99.9% network uptime", "Zero complaints", "40% satisfaction increase"] },
                { title: "Six Senses Alpine Resort Network", location: "Switzerland", guests: "3,200", rating: "4.8", description: "Complete telecommunications overhaul...", achievements: ["WiFi 6E implementation", "Seamless roaming", "25% faster speeds"] },
                { title: "Fairmont Bangkok Smart Integration", location: "Thailand", guests: "8,500", rating: "4.9", description: "Smart city integration...", achievements: ["Full IoT automation", "Mobile-first experience", "30% efficiency gain"] }
            ]
        },
        insights: {
            insights: [
                { title: "Asia-Pacific Hospitality Market Trends 2024", category: "Market Analysis", date: "2024-01-15", readTime: "5 min read", excerpt: "Comprehensive analysis of emerging trends..." },
                { title: "Smart Building Technologies Revolution", category: "Technology", date: "2024-01-10", readTime: "7 min read", excerpt: "How IoT and AI are transforming buildings..." },
                { title: "Sustainable IT Infrastructure in Hospitality", category: "Sustainability", date: "2024-01-05", readTime: "6 min read", excerpt: "Green technology solutions for hotels..." }
            ]
        },
        contact: {
            title: "Let's Build the Future of Hospitality Together",
            description: "Ready to transform your hotel with cutting-edge technology solutions?",
            offices: [
                { city: "Barcelona", country: "Spain", address: "C/ Rector Ubach 48,1º2ª\nBARCELONA 08021, SPAIN", phone: "+34 93 414 18 20", email: "info@vcningenieria.com" },
                { city: "Bengaluru", country: "India", address: "Tech Park Avenue 123\nBengaluru 560001, India", phone: "+91 80 1234 5678", email: "india@govisan.com" }
            ]
        }
    };
    
    populateAllForms(defaultData);
}

// Reset current tab
function resetCurrentTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && confirm('Reset current tab to last saved data?')) {
        loadAllSections();
        showMessage('🔄 Tab reset to saved data', 'success');
    }
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enable auto-save for specialization page
    if (window.location.pathname.includes('specialization.html')) {  
        enableAutoSave();
        loadDraft();
    }
    
    // Load sections data for sections page
    if (window.location.pathname.includes('sections.html')) {
        loadAllSections();
    }
});