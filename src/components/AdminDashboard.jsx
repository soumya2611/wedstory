/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { API_BASE_URL } from '../utils/api';

const AdminDashboard = ({ initialConfig, onSaveConfig }) => {
  const [config, setConfig] = useState(JSON.parse(JSON.stringify(initialConfig)));
  const [activeTab, setActiveTab] = useState('couple');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  // Admin Route Protection
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [inputUser, setInputUser] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (inputUser === 'lucky' && inputPass === 'luxky123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Access Denied: Invalid admin credentials');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleTextChange = (path, value) => {
    const keys = path.split('.');
    const updated = { ...config };
    let current = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setConfig(updated);
  };

  const handleFileChange = async (e, path, type = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show loading progress
    setUploadProgress(prev => ({ ...prev, [path]: 'uploading' }));
    
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9_\.-]/g, '');
      const uniqueName = `${path.replace(/\./g, '_')}_${Date.now()}_${sanitizedName}`;

      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      const response = await fetch(`${API_BASE_URL}/api/upload-file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: uniqueName, base64Data })
      });

      const result = await response.json();
      if (result.success) {
        handleTextChange(path, result.url);
        showToast(`${file.name} uploaded successfully!`, 'success');
        setUploadProgress(prev => ({ ...prev, [path]: 'done' }));
      } else {
        throw new Error(result.error || 'Server upload failed');
      }
    } catch (error) {
      console.error(error);
      showToast(`Upload failed: ${error.message}`, 'error');
      setUploadProgress(prev => ({ ...prev, [path]: 'error' }));
    }
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...config.events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setConfig({ ...config, events: updatedEvents });
  };

  const addEvent = () => {
    const newEvent = {
      id: `event_${Date.now()}`,
      title: 'New Ceremony',
      time: '12:00 PM',
      date: 'July 04, 2026',
      desc: 'Short description of the ceremony.',
      venue: 'Venue Name, City',
      mapUrl: 'https://maps.google.com'
    };
    setConfig({ ...config, events: [...config.events, newEvent] });
    showToast('New event added!', 'success');
  };

  const deleteEvent = (index) => {
    const updatedEvents = config.events.filter((_, idx) => idx !== index);
    setConfig({ ...config, events: updatedEvents });
    showToast('Event removed!', 'warning');
  };

  const handleSaveToDisk = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/save-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const result = await response.json();
      if (result.success) {
        onSaveConfig(config); // Update parent state & LocalStorage
        showToast('Configuration saved successfully!', 'success');
      } else {
        throw new Error(result.error || 'Failed to save config');
      }
    } catch (error) {
      console.error(error);
      // Fallback: Save to LocalStorage only
      onSaveConfig(config);
      showToast(`Warning: Saved to browser storage only (Server API unavailable). Download JSON config to save permanently.`, 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'weddingConfig.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Configuration JSON downloaded successfully!', 'success');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all modifications to the initial code defaults?')) {
      setConfig(JSON.parse(JSON.stringify(initialConfig)));
      showToast('Reverted modifications to default settings.', 'info');
    }
  };

  const navigateToCard = () => {
    // Save current config to localStorage temporarily so they can preview it
    localStorage.setItem('wedding_invitation_config_preview', JSON.stringify(config));
    window.location.hash = ''; // Go back to wedding invitation main screen
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col justify-center items-center py-12 px-6 font-sans relative overflow-hidden select-none">
        {/* Blurry wedding background image layer */}
        <div className="absolute inset-0 bg-[url('/wedding_envelope_bg.png')] bg-cover bg-center bg-no-repeat blur-[4px] scale-102 opacity-25 -z-10" />
        <div className="absolute inset-0 bg-stone-950/80 -z-10" />

        {/* Dynamic decorative floating particles */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Login Container Box */}
        <div className="relative w-full max-w-md p-8 md:p-10 rounded-2xl border border-gold-800/20 bg-stone-900/60 backdrop-blur-md shadow-2xl shadow-black/80 text-center animate-scale-in">
          {/* Decorative Corner Brackets */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold-500/30" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold-500/30" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold-500/30" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold-500/30" />

          {/* Golden Key/Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 border rounded-full bg-stone-950 border-gold-600/30 text-gold-400 shadow-[0_0_15px_rgba(197,168,80,0.1)]">
              <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-serif tracking-[2px] gold-text-gradient font-bold uppercase mb-2">
            Admin Authentication
          </h2>
          <p className="text-[10px] uppercase tracking-[3px] text-stone-400 mb-8 font-medium">
            Protected Wedding Card Portal
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-500/80 font-bold">
                Username
              </label>
              <input
                type="text"
                required
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
                className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 placeholder-stone-750 focus:ring-1 focus:ring-gold-500"
                placeholder="Enter admin username"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-500/80 font-bold">
                Password
              </label>
              <input
                type="password"
                required
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 placeholder-stone-750 focus:ring-1 focus:ring-gold-500"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <div className="text-red-400 text-xs font-sans tracking-[0.5px] font-semibold text-center bg-red-950/20 border border-red-900/30 py-2 px-3 rounded-lg animate-shake">
                ❌ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-stone-950 font-bold py-3.5 px-6 rounded-lg text-xs font-sans tracking-[2px] uppercase shadow-[0_4px_15px_rgba(197,168,80,0.2)] hover:shadow-[0_4px_25px_rgba(197,168,80,0.4)] active:scale-98 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <button
            onClick={() => window.location.hash = ''}
            className="mt-6 text-[10px] font-sans text-stone-500 hover:text-gold-500 tracking-[1px] uppercase transition-colors"
          >
            ← Return to Invitation Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 py-10 px-4 md:px-8 font-sans selection:bg-gold-500 selection:text-stone-950 relative">
      {/* Decorative Traditional Borders on top */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gold-800/20 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif tracking-[2px] gold-text-gradient font-bold uppercase">
            Wedding Card Admin
          </h1>
          <p className="text-[10px] uppercase tracking-[3px] text-stone-400 mt-1">
            Customize Invitation Details & Asset Links
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={navigateToCard}
            className="px-4 py-2 text-xs font-sans tracking-[1px] border border-gold-500/30 rounded-lg hover:border-gold-500 hover:text-gold-200 transition bg-stone-900/60 cursor-pointer flex items-center space-x-1.5"
          >
            <span>👁️ Live Preview</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'couple', label: 'Bride & Groom Profile', icon: '💑' },
            { id: 'dates', label: 'Dates & Timer', icon: '📅' },
            { id: 'events', label: 'Events Schedule', icon: '🗺️' },
            { id: 'media', label: 'Media & Styling', icon: '🎵' },
            { id: 'text', label: 'Invitations & Credits', icon: '📜' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-3.5 rounded-xl border font-sans text-sm tracking-[0.5px] transition duration-300 flex items-center space-x-3 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-600/20 to-gold-500/10 border-gold-500 text-gold-200 shadow-[0_0_15px_rgba(197,168,80,0.1)]'
                  : 'bg-stone-900/40 border-stone-800/30 hover:border-gold-800/40 hover:bg-stone-900/60 text-stone-400'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}

          {/* Quick Info Block */}
          <div className="mt-8 border border-gold-900/20 rounded-xl p-4 bg-stone-950/40 text-[11px] leading-relaxed text-stone-500 font-medium">
            <span className="font-semibold text-gold-500 block mb-1">PRO-TIP:</span>
            In development, clicking "Save to Disk" overwrites <code className="text-stone-400">weddingConfig.json</code> on your machine automatically, making it ready to build & deploy immediately.
          </div>
        </div>

        {/* Form area */}
        <div className="lg:col-span-3">
          <div className="bg-stone-900/60 border border-gold-800/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
            
            {/* Form tab title */}
            <div className="mb-6 border-b border-stone-850 pb-4">
              <h2 className="text-xl font-serif tracking-[1px] text-gold-200 font-bold uppercase">
                {activeTab === 'couple' && 'Bride & Groom Profile'}
                {activeTab === 'dates' && 'Dates & Reveal Timer'}
                {activeTab === 'events' && 'Ceremony Timelines'}
                {activeTab === 'media' && 'Media & Custom Styling'}
                {activeTab === 'text' && 'Formal Invitation Letter'}
              </h2>
            </div>

            {/* TAB CONTENT: Couple Profile */}
            {activeTab === 'couple' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bride Section */}
                  <div className="space-y-4 border border-gold-900/10 p-5 rounded-xl bg-stone-950/20">
                    <span className="text-[10px] tracking-[2px] text-gold-500 uppercase font-bold block mb-1">Bride's Details</span>
                    <div className="space-y-3">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">First Name</label>
                      <input
                        type="text"
                        value={config.bride.firstName}
                        onChange={(e) => handleTextChange('bride.firstName', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="First Name (e.g. Lipsa)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Full Name</label>
                      <input
                        type="text"
                        value={config.bride.fullName}
                        onChange={(e) => handleTextChange('bride.fullName', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Full Name (e.g. Lipsa Mohanty)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Nickname / Pet Name</label>
                      <input
                        type="text"
                        value={config.bride.nickname}
                        onChange={(e) => handleTextChange('bride.nickname', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Nickname (e.g. Mama)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Parents' Names</label>
                      <input
                        type="text"
                        value={config.bride.parentNames}
                        onChange={(e) => handleTextChange('bride.parentNames', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Parents (e.g. Mrs. Shantilata & Mr. Abhimanyu Barik)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Relation Description (e.g. Only daughter)</label>
                      <input
                        type="text"
                        value={config.bride.relation || ''}
                        onChange={(e) => handleTextChange('bride.relation', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Relation (e.g. Only daughter / Elder daughter)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Place / Location of Bride's Party</label>
                      <input
                        type="text"
                        value={config.bride.location || config.bride.grandparentNames || ''}
                        onChange={(e) => {
                          handleTextChange('bride.location', e.target.value);
                          handleTextChange('bride.grandparentNames', '');
                        }}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Location (e.g. Pubusahi, Khordha)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Bride Portrait Image</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'bride.image')}
                          className="hidden"
                          id="bride-img-upload"
                        />
                        <label
                          htmlFor="bride-img-upload"
                          className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                        >
                          {uploadProgress['bride.image'] === 'uploading' ? 'Uploading...' : 'Choose Image'}
                        </label>
                        {config.bride.image ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded overflow-hidden border border-gold-800/20 bg-stone-950">
                              <img src={config.bride.image} className="w-full h-full object-cover" alt="bride preview" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleTextChange('bride.image', '')}
                              className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                              title="Remove custom image and use default"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Groom Section */}
                  <div className="space-y-4 border border-gold-900/10 p-5 rounded-xl bg-stone-950/20">
                    <span className="text-[10px] tracking-[2px] text-gold-500 uppercase font-bold block mb-1">Groom's Details</span>
                    <div className="space-y-3">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">First Name</label>
                      <input
                        type="text"
                        value={config.groom.firstName}
                        onChange={(e) => handleTextChange('groom.firstName', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="First Name (e.g. Aditya)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Full Name</label>
                      <input
                        type="text"
                        value={config.groom.fullName}
                        onChange={(e) => handleTextChange('groom.fullName', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Full Name (e.g. Aditya Narayan Sahoo)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Nickname / Pet Name</label>
                      <input
                        type="text"
                        value={config.groom.nickname}
                        onChange={(e) => handleTextChange('groom.nickname', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Nickname (e.g. Tiki)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Parents' Names</label>
                      <input
                        type="text"
                        value={config.groom.parentNames}
                        onChange={(e) => handleTextChange('groom.parentNames', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Parents (e.g. Mrs. Minati Bara Behera & Mr. Dhirendra Behera)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Relation Description (e.g. Middle son)</label>
                      <input
                        type="text"
                        value={config.groom.relation || ''}
                        onChange={(e) => handleTextChange('groom.relation', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Relation (e.g. Middle son / Only son / Younger son)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Place / Location of Groom's Party</label>
                      <input
                        type="text"
                        value={config.groom.location || config.groom.grandparentNames || ''}
                        onChange={(e) => {
                          handleTextChange('groom.location', e.target.value);
                          handleTextChange('groom.grandparentNames', '');
                        }}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Location (e.g. Pubusahi, Khordha)"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Groom Portrait Image</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'groom.image')}
                          className="hidden"
                          id="groom-img-upload"
                        />
                        <label
                          htmlFor="groom-img-upload"
                          className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                        >
                          {uploadProgress['groom.image'] === 'uploading' ? 'Uploading...' : 'Choose Image'}
                        </label>
                        {config.groom.image ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 rounded overflow-hidden border border-gold-800/20 bg-stone-950">
                              <img src={config.groom.image} className="w-full h-full object-cover" alt="groom preview" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleTextChange('groom.image', '')}
                              className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                              title="Remove custom image and use default"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Portrait Filter Toggle */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 mt-4 space-y-3">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Profile Images Style</label>
                    <select
                      value={config.coupleImageGrayscale === false ? 'color' : 'grayscale'}
                      onChange={(e) => handleTextChange('coupleImageGrayscale', e.target.value === 'grayscale')}
                      className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                    >
                      <option value="grayscale">Classic Black & White (Grayscale)</option>
                      <option value="color">Full Color (Colorful)</option>
                    </select>
                    <span className="text-[10px] text-stone-500 block leading-relaxed">
                      Choose whether the bride and groom profile portraits should be displayed in colorful or classic black & white (grayscale).
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Dates & Countdown */}
            {activeTab === 'dates' && (
              <div className="space-y-6 animate-fade-in max-w-2xl">
                <div className="space-y-4">
                  <h3 className="text-xs text-gold-500 font-bold uppercase tracking-[2px] mb-4">Wedding Target Timer & Reveal</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Wedding Target Date-Time (for countdown)</label>
                      <input
                        type="datetime-local"
                        value={config.weddingDate.substring(0, 16)}
                        onChange={(e) => handleTextChange('weddingDate', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                      />
                      <span className="text-[10px] text-stone-500 block">Must be ISO format, e.g. 2026-07-04T17:00:00</span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Tithi / Astrology Detail</label>
                      <input
                        type="text"
                        value={config.tithi}
                        onChange={(e) => handleTextChange('tithi', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Ashaadha Shukla Navami Tithi"
                      />
                    </div>
                  </div>

                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4 mt-6">
                    <span className="text-[10px] tracking-[2px] text-gold-500 uppercase font-bold block mb-1">Scratch Card Calendar Display</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs text-stone-400 font-semibold uppercase">Month Card Value</label>
                        <input
                          type="text"
                          value={config.formattedMonth}
                          onChange={(e) => handleTextChange('formattedMonth', e.target.value)}
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 font-serif"
                          placeholder="JULY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs text-stone-400 font-semibold uppercase">Day Card Value</label>
                        <input
                          type="text"
                          value={config.formattedDay}
                          onChange={(e) => handleTextChange('formattedDay', e.target.value)}
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 font-serif"
                          placeholder="04"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs text-stone-400 font-semibold uppercase">Year Card Value</label>
                        <input
                          type="text"
                          value={config.formattedYear}
                          onChange={(e) => handleTextChange('formattedYear', e.target.value)}
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 font-serif"
                          placeholder="2026"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Events Schedule */}
            {activeTab === 'events' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs text-gold-500 font-bold uppercase tracking-[2px]">Wedding Ceremonies List</h3>
                  <button
                    onClick={addEvent}
                    className="px-3 py-1.5 border border-gold-500/50 rounded-lg text-xs font-sans hover:bg-gold-500 hover:text-stone-950 hover:border-gold-500 transition cursor-pointer text-gold-400"
                  >
                    + Add Ceremony Event
                  </button>
                </div>

                <div className="space-y-6">
                  {config.events.map((event, idx) => (
                    <div 
                      key={event.id || idx} 
                      className="border border-gold-800/20 rounded-xl p-5 bg-stone-950/20 relative group transition-all duration-300 hover:border-gold-500/30"
                    >
                      <button
                        onClick={() => deleteEvent(idx)}
                        className="absolute top-4 right-4 text-stone-500 hover:text-red-400 hover:scale-110 transition p-1 cursor-pointer text-xs"
                        title="Delete Event"
                      >
                        🗑️ Remove
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <label className="block text-xs text-stone-400 font-semibold uppercase">Ceremony Title</label>
                          <input
                            type="text"
                            value={event.title}
                            onChange={(e) => handleEventChange(idx, 'title', e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                            placeholder="e.g. Haldi Ceremony"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-stone-400 font-semibold uppercase">Date Text</label>
                          <input
                            type="text"
                            value={event.date}
                            onChange={(e) => handleEventChange(idx, 'date', e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                            placeholder="e.g. July 03, 2026"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-stone-400 font-semibold uppercase">Time Text</label>
                          <input
                            type="text"
                            value={event.time}
                            onChange={(e) => handleEventChange(idx, 'time', e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                            placeholder="e.g. 10:00 AM"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs text-stone-400 font-semibold uppercase">Venue Address Description</label>
                          <input
                            type="text"
                            value={event.venue}
                            onChange={(e) => handleEventChange(idx, 'venue', e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                            placeholder="e.g. Grand Palace, Udaipur"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-stone-400 font-semibold uppercase">Google Maps URL</label>
                          <input
                            type="text"
                            value={event.mapUrl}
                            onChange={(e) => handleEventChange(idx, 'mapUrl', e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                            placeholder="https://maps.google.com/..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <label className="block text-xs text-stone-400 font-semibold uppercase">Brief Ceremony Description</label>
                        <textarea
                          value={event.desc}
                          onChange={(e) => handleEventChange(idx, 'desc', e.target.value)}
                          rows="2"
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 resize-none"
                          placeholder="Details about the ritual..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Media & Styling */}
            {activeTab === 'media' && (
              <div className="space-y-6 animate-fade-in max-w-2xl">
                <div className="space-y-4">
                  <h3 className="text-xs text-gold-500 font-bold uppercase tracking-[2px] mb-4">Backgrounds & Music</h3>
                  
                  {/* BG Image */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Global Wedding Background Image</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'bgImage')}
                        className="hidden"
                        id="bg-img-upload"
                      />
                      <label
                        htmlFor="bg-img-upload"
                        className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                      >
                        {uploadProgress['bgImage'] === 'uploading' ? 'Uploading...' : 'Choose Background'}
                      </label>
                      {config.bgImage ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 rounded overflow-hidden border border-gold-800/20 bg-stone-950">
                            <img src={config.bgImage} className="w-full h-full object-cover" alt="bg preview" />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleTextChange('bgImage', '')}
                            className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                            title="Remove custom image and use default"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                      )}
                    </div>
                  </div>

                  {/* Envelope Background Image */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Envelope Page Background Image</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'envelopeBg')}
                        className="hidden"
                        id="envelope-bg-img-upload"
                      />
                      <label
                        htmlFor="envelope-bg-img-upload"
                        className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                      >
                        {uploadProgress['envelopeBg'] === 'uploading' ? 'Uploading...' : 'Choose Envelope Background'}
                      </label>
                      {config.envelopeBg ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 rounded overflow-hidden border border-gold-800/20 bg-stone-950">
                            <img src={config.envelopeBg} className="w-full h-full object-cover" alt="envelope bg preview" />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleTextChange('envelopeBg', '')}
                            className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                            title="Remove custom image and use default"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                      )}
                    </div>
                  </div>

                  {/* Custom CSS Background Pattern & Color */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Custom CSS Background Pattern</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold uppercase mb-1">Background Color (Hex/RGB/HSL)</label>
                        <input
                          type="text"
                          value={config.customBgColor || ''}
                          onChange={(e) => handleTextChange('customBgColor', e.target.value)}
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                          placeholder="e.g. #0a0a0a or rgb(10, 10, 10)"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-stone-500 font-bold uppercase mb-1">Gradient Pattern CSS code (Value of background-image)</label>
                        <textarea
                          value={config.customBgCss || ''}
                          onChange={(e) => handleTextChange('customBgCss', e.target.value)}
                          rows="4"
                          className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 font-mono resize-none leading-relaxed"
                          placeholder="e.g. repeating-radial-gradient(circle at 50% 40%, rgba(168,85,247,0.18) 0 6px, rgba(168,85,247,0) 6px 22px), radial-gradient(circle at 50% 40%, rgba(59,130,246,0.18), transparent 55%)"
                        />
                        <span className="text-[10px] text-stone-500 block mt-1 leading-relaxed border-t border-stone-850 pt-2">
                          Paste the CSS code for the <code className="text-stone-400">background-image</code> value here. You can copy pattern backgrounds from websites like <a href="https://gradienty.codes" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">gradienty.codes</a>. Leave empty to fallback to the default blurred image background.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Themesong Music */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Wedding Theme Song (.mp3)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="music-themesongEnabled"
                        checked={config.music.themesongEnabled !== false}
                        onChange={(e) => handleTextChange('music.themesongEnabled', e.target.checked)}
                        className="accent-gold-500 rounded bg-stone-950 border-gold-800/30 text-gold-500 focus:ring-gold-500 h-4 w-4 cursor-pointer"
                      />
                      <label htmlFor="music-themesongEnabled" className="text-xs text-stone-300 select-none cursor-pointer">
                        Enable Background Music (Theme Song)
                      </label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="audio/mp3,audio/*"
                        onChange={(e) => handleFileChange(e, 'music.themesong')}
                        className="hidden"
                        id="themesong-audio-upload"
                      />
                      <label
                        htmlFor="themesong-audio-upload"
                        className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                      >
                        {uploadProgress['music.themesong'] === 'uploading' ? 'Uploading...' : 'Upload Music'}
                      </label>
                      {config.music.themesong ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-gold-400 font-mono max-w-[200px] truncate">{config.music.themesong}</span>
                          <button
                            type="button"
                            onClick={() => handleTextChange('music.themesong', '')}
                            className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                            title="Remove custom music and use default"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                      )}
                    </div>
                  </div>

                  {/* Lockscreen Music */}
                  <div className="border border-gold-900/10 p-5 rounded-xl bg-stone-950/20 space-y-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Lockscreen Opening Music (.mp3)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="music-lockscreenEnabled"
                        checked={config.music.lockscreenEnabled !== false}
                        onChange={(e) => handleTextChange('music.lockscreenEnabled', e.target.checked)}
                        className="accent-gold-500 rounded bg-stone-950 border-gold-800/30 text-gold-500 focus:ring-gold-500 h-4 w-4 cursor-pointer"
                      />
                      <label htmlFor="music-lockscreenEnabled" className="text-xs text-stone-300 select-none cursor-pointer">
                        Enable Lockscreen Opening Music
                      </label>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="audio/mp3,audio/*"
                        onChange={(e) => handleFileChange(e, 'music.lockscreen')}
                        className="hidden"
                        id="lockscreen-audio-upload"
                      />
                      <label
                        htmlFor="lockscreen-audio-upload"
                        className="px-4 py-2 border border-dashed rounded-lg text-xs font-sans hover:border-gold-500 hover:text-gold-200 transition bg-stone-950/60 cursor-pointer block border-gold-800/30 text-stone-400"
                      >
                        {uploadProgress['music.lockscreen'] === 'uploading' ? 'Uploading...' : 'Upload Music'}
                      </label>
                      {config.music.lockscreen ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-gold-400 font-mono max-w-[200px] truncate">{config.music.lockscreen}</span>
                          <button
                            type="button"
                            onClick={() => handleTextChange('music.lockscreen', '')}
                            className="px-2 py-1 text-[9px] font-sans tracking-[0.5px] uppercase font-bold text-red-400 hover:text-red-300 border border-red-900/30 rounded bg-red-950/20 hover:bg-red-900/20 transition cursor-pointer"
                            title="Remove custom music and use default"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-500 italic">Using default asset</span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB CONTENT: Formal Invitation Text */}
            {activeTab === 'text' && (
              <div className="space-y-6 animate-fade-in max-w-2xl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Main Invitation Statement</label>
                    <textarea
                      value={config.invitationDesc}
                      onChange={(e) => handleTextChange('invitationDesc', e.target.value)}
                      rows="4"
                      className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 resize-none leading-relaxed"
                      placeholder="Invitation text..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Inviter Name (Formal)</label>
                      <input
                        type="text"
                        value={config.inviter}
                        onChange={(e) => handleTextChange('inviter', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Mrs. Sarojini Dei & Mr. Purushottam Barik"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Main Wedding Date Label (Format)</label>
                      <input
                        type="text"
                        value={config.formattedDate}
                        onChange={(e) => handleTextChange('formattedDate', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Friday, July 4, 2026"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label className="block text-xs text-stone-400 font-semibold uppercase">Browser Page Title</label>
                    <input
                      type="text"
                      value={config.pageTitle}
                      onChange={(e) => handleTextChange('pageTitle', e.target.value)}
                      className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                      placeholder="Lipsa & Aditya - Wedding Invitation"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Footer Built-With Credit</label>
                      <input
                        type="text"
                        value={config.credit}
                        onChange={(e) => handleTextChange('credit', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="Built with Love • Lipsa & Aditya • 2026"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-400 font-semibold uppercase">Footer Copyright Signature</label>
                      <input
                        type="text"
                        value={config.footerCreditCopy}
                        onChange={(e) => handleTextChange('footerCreditCopy', e.target.value)}
                        className="w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100"
                        placeholder="© Soumya2611 X Antigravity •"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Save Actions Footer */}
            <div className="border-t border-stone-850 mt-10 pt-6 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={handleResetToDefault}
                  className="px-4 py-2.5 text-xs font-sans tracking-[0.5px] border border-red-900/30 text-red-400 rounded-lg hover:border-red-500 hover:bg-red-500/10 transition cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadConfig}
                  className="px-4 py-2.5 text-xs font-sans tracking-[0.5px] border border-gold-500/40 text-gold-400 rounded-lg hover:border-gold-500 hover:bg-stone-950 transition cursor-pointer"
                >
                  📥 Download Config JSON
                </button>
                <button
                  onClick={handleSaveToDisk}
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-stone-950 font-bold rounded-lg text-xs tracking-[1px] uppercase shadow-[0_4px_15px_rgba(197,168,80,0.15)] active:scale-98 transition flex items-center justify-center cursor-pointer"
                >
                  {loading ? 'Saving...' : '💾 Save Changes To Disk'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-6 z-55 max-w-sm p-4 rounded-xl border shadow-2xl transition duration-500 animate-slide-in ${
          toast.type === 'success' ? 'bg-stone-900 border-green-800 text-green-300' : 
          toast.type === 'warning' ? 'bg-stone-900 border-amber-800 text-amber-300' :
          toast.type === 'info' ? 'bg-stone-900 border-blue-800 text-blue-300' :
          'bg-stone-900 border-red-800 text-red-300'
        }`}>
          <div className="flex items-center space-x-2 text-xs font-sans tracking-[0.5px] uppercase font-bold">
            <span>{toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '❌'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
