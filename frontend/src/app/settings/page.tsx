'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Shield, Database, Palette, Save, Sparkles, UserCheck, AlertTriangle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const TABS = [
  { id: 'general', name: 'General', icon: SettingsIcon },
  { id: 'ai', name: 'AI Engine', icon: Sparkles },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'appearance', name: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 pb-1">
          Platform Settings
        </h1>
        <p className="text-muted-foreground mt-2 font-medium flex items-center gap-2">
          <SettingsIcon className="h-4 w-4 text-primary" /> Configure your AI Recruiter workspace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <motion.div variants={itemVariants} className="md:col-span-1 space-y-2">
          {TABS.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass p-8 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                  
                  <h2 className="text-2xl font-bold mb-6 relative z-10 flex items-center gap-2">
                    <UserCheck className="h-6 w-6 text-primary" /> Company Profile
                  </h2>
                  
                  <div className="space-y-5 relative z-10">
                    <div>
                      <label className="block text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        defaultValue="Tech Corp" 
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@ai-recruiter.com" 
                        className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Timezone</label>
                      <select className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end relative z-10">
                    <motion.button 
                      onClick={handleSave}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        isSaved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30'
                      }`}
                    >
                      <Save className="h-4 w-4" /> {isSaved ? 'Saved!' : 'Save Changes'}
                    </motion.button>
                  </div>
                </div>

                <div className="glass p-8 rounded-2xl border border-red-500/20 shadow-xl relative overflow-hidden bg-red-500/5">
                  <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Danger Zone
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">Irreversible and destructive actions.</p>
                  <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl font-bold transition-colors">
                    Reset In-Memory Database
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-8 rounded-2xl border border-border/50 shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" /> AI Engine Configuration
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Matching Strictness</label>
                    <input type="range" min="1" max="100" defaultValue="75" className="w-full accent-primary" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Broad (High Recall)</span>
                      <span>Strict (High Precision)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider">Auto-Generate Outreach Emails</label>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
                      <span className="font-medium text-sm">Automatically generate personalized outreach emails for top candidates</span>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <motion.button 
                      onClick={handleSave}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                        isSaved ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30'
                      }`}
                    >
                      <Save className="h-4 w-4" /> {isSaved ? 'Saved!' : 'Save Settings'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div 
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-8 rounded-2xl border border-border/50 shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Palette className="h-6 w-6 text-blue-500" /> Appearance
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Theme Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-primary bg-background p-4 rounded-xl text-center font-bold cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                        System Default
                      </div>
                      <div className="border-2 border-border/50 bg-foreground text-background p-4 rounded-xl text-center font-bold cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                        Force Dark Mode
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 italic">Note: The extraordinary glassmorphism UI automatically adapts to your system preferences.</p>
                </div>
              </motion.div>
            )}

            {/* Fallback for other tabs */}
            {['notifications', 'security', 'integrations'].includes(activeTab) && (
              <motion.div 
                key="fallback"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-16 rounded-2xl border border-border/50 shadow-xl text-center"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SettingsIcon className="h-8 w-8 text-primary animate-spin-slow" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Module Under Construction</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  The {TABS.find(t => t.id === activeTab)?.name} settings module is currently being finalized for the production release.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
