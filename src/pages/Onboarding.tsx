import { motion, AnimatePresence } from 'motion/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Shield, Users, Globe, ChevronRight, CheckCircle2, ArrowLeft, User, CreditCard, Phone, Mail, MapPin, Send, Loader2, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from '../contexts/FirebaseContext';
import { auth, googleProvider, signInWithPopup, db, storage, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect } from 'react';

type UserRole = 'miner' | 'buyer' | 'partner' | null;
type OnboardingStep = 'role-selection' | 'kyc-form' | 'business-form' | 'success';

export default function Onboarding() {
  const { user, loading: authLoading, isMiner, isBuyer } = useFirebase();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    if (!authLoading && (isMiner || isBuyer)) {
      navigate('/dashboard');
    }
  }, [authLoading, isMiner, isBuyer, navigate]);
  const [step, setStep] = useState<OnboardingStep>('role-selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFileError, setShowFileError] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    address: '',
    miningLicense: '',
    cooperativeName: '',
    mineralType: 'Copper',
    idFile: null as File | null
  });

  const roles = [
    {
      id: 'miner',
      title: 'Artisanal Miner / Cooperative',
      icon: <Users size={32} />,
      desc: 'Get verified, access fair pricing, and settle trades safely through our digital escrow system.',
      benefits: ['Safe cash-free payments', 'Verified grade testing', 'Bankable trade records'],
      externalLink: 'https://forms.gle/xuQxwZbXimSHjGmr8'
    },
    {
      id: 'buyer',
      title: 'Mineral Buyer / Exporter',
      icon: <Globe size={32} />,
      desc: 'Source ethically from verified miners with full chain-of-custody and ESG compliance.',
      benefits: ['Verified supply chain', 'Reduced trade disputes', 'ESG-ready documentation'],
      externalLink: 'https://forms.office.com/r/UzADHfQqA7'
    },
    {
      id: 'partner',
      title: 'Institution / Partner',
      icon: <Shield size={32} />,
      desc: 'Collaborate with us to provide logistics, testing, or financial services to the ASM sector.',
      benefits: ['Structured production data', 'Traceability for compliance', 'Access to verified ASM network'],
      externalLink: null
    }
  ];

  const handleRoleSelect = (selectedRole: UserRole) => {
    const roleData = roles.find(r => r.id === selectedRole);
    if (roleData?.externalLink) {
      window.open(roleData.externalLink, '_blank');
    }
    setRole(selectedRole);
    setStep('kyc-form');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, idFile: e.target.files![0] }));
      setShowFileError(false);
      setSubmissionError(null);
    }
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 'kyc-form') {
      if (!formData.idFile) {
        setShowFileError(true);
        return;
      }
      setStep('business-form');
    }
    else handleSubmit();
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      let kycDocumentUrl = '';
      
      // 1. Upload KYC Document if exists
      if (formData.idFile) {
        try {
          const storageRef = ref(storage, `kyc/${user.uid}/${Date.now()}_${formData.idFile.name}`);
          const uploadResult = await uploadBytes(storageRef, formData.idFile);
          kycDocumentUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr: any) {
          console.error('Storage Error:', storageErr);
          setSubmissionError(`Failed to upload document: ${storageErr.message || 'Unknown storage error'}`);
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Save Submission to Firestore
      const path = 'submissions';
      try {
        await addDoc(collection(db, path), {
          uid: user.uid,
          role,
          fullName: formData.fullName,
          idNumber: formData.idNumber,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          miningLicense: formData.miningLicense,
          cooperativeName: formData.cooperativeName,
          mineralType: formData.mineralType,
          kycDocumentUrl,
          status: 'pending',
          createdAt: serverTimestamp(),
        });

        // Update user's KYC status in users collection
        await updateDoc(doc(db, 'users', user.uid), {
          kycStatus: 'pending'
        });

        setStep('success');
      } catch (firestoreErr: any) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, 'submissions');
      }
    } catch (error: any) {
      console.error('Submission Error:', error);
      setSubmissionError(`Submission failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center section-padding">
      <div className="max-w-5xl w-full">
        <AnimatePresence mode="wait">
          {step === 'role-selection' && (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-black mb-6">Welcome to <span className="text-gold">AfriTradeX</span></h1>
              <p className="text-soft-grey text-xl mb-12 max-w-2xl mx-auto">
                Choose your path to start formalising your mineral trade and accessing Africa's hidden mineral economy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id as UserRole)}
                    className="glass-card p-8 text-left hover:border-gold transition-all group flex flex-col h-full"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                      {r.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{r.title}</h3>
                    <p className="text-soft-grey text-sm mb-8 flex-grow">{r.desc}</p>
                    <div className="flex items-center text-gold font-bold text-sm">
                      Select Role <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'kyc-form' && (
            <motion.div 
              key="kyc-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 md:p-12 relative max-w-3xl mx-auto w-full"
            >
              <button 
                onClick={() => setStep('role-selection')}
                className="absolute top-8 left-8 text-soft-grey hover:text-gold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="flex items-center justify-between mb-10 pt-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Step 1: Registration</h2>
                  <p className="text-soft-grey">Identity verification for <span className="text-gold font-bold">{roles.find(r => r.id === role)?.title}</span>.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-soft-grey uppercase tracking-widest font-bold">Progress</p>
                  <p className="text-gold font-black">33%</p>
                </div>
              </div>

              {roles.find(r => r.id === role)?.externalLink && (
                <div className="mb-10 p-8 bg-gold/5 border border-gold/20 rounded-2xl text-center">
                  <h3 className="text-xl font-bold mb-4">Official Onboarding Form</h3>
                  <p className="text-soft-grey mb-6">For faster processing, please use our official form to submit your details.</p>
                  <a 
                    href={roles.find(r => r.id === role)?.externalLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 px-8 py-4"
                  >
                    Open Official Form
                    <ChevronRight size={20} />
                  </a>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <span className="text-xs text-soft-grey uppercase tracking-widest">Or use our quick form below</span>
                    <div className="h-px bg-white/10 flex-grow"></div>
                  </div>
                </div>
              )}

              {!user ? (
                <div className="mb-10 p-8 bg-charcoal border border-white/10 rounded-2xl text-center">
                  <h3 className="text-xl font-bold mb-4">Authentication Required</h3>
                  <p className="text-soft-grey mb-6">Please log in to submit your onboarding application securely.</p>
                  <button 
                    onClick={handleGoogleLogin}
                    className="btn-primary inline-flex items-center gap-3 px-8 py-4"
                  >
                    <LogIn size={20} />
                    Sign in with Google
                  </button>
                </div>
              ) : (
                <form onSubmit={nextStep} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">National ID / Passport</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                        <input 
                          type="text" 
                          name="idNumber"
                          value={formData.idNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                          placeholder="ID-123456789"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                          placeholder="+260 9XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                          placeholder="miner@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">Upload ID Document (PDF/JPG)</label>
                    <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer group ${showFileError ? 'border-red-500 bg-red-500/5' : 'border-white/10 hover:border-gold/50'}`}>
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center transition-colors ${showFileError ? 'text-red-500' : 'text-soft-grey group-hover:text-gold'}`}>
                          <Send className="rotate-[-45deg]" size={24} />
                        </div>
                        <p className={`text-sm font-bold ${showFileError ? 'text-red-500' : 'text-white'}`}>
                          {formData.idFile ? formData.idFile.name : 'Click or drag to upload ID'}
                        </p>
                        <p className="text-xs text-soft-grey">Maximum file size: 5MB</p>
                      </div>
                    </div>
                    {showFileError && (
                      <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                        <Shield size={12} /> Please upload a valid ID document to continue.
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3"
                  >
                    Continue to Business Details
                    <ChevronRight size={20} />
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {step === 'business-form' && (
            <motion.div 
              key="business-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 md:p-12 relative max-w-3xl mx-auto w-full"
            >
              <button 
                onClick={() => setStep('kyc-form')}
                className="absolute top-8 left-8 text-soft-grey hover:text-gold flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="flex items-center justify-between mb-10 pt-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Step 2: Business Details</h2>
                  <p className="text-soft-grey">{role === 'miner' ? 'Mining license and site information.' : 'Trading license and business information.'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-soft-grey uppercase tracking-widest font-bold">Progress</p>
                  <p className="text-gold font-black">66%</p>
                </div>
              </div>

              <form onSubmit={nextStep} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">{role === 'miner' ? 'Cooperative / Company Name' : 'Company Name'}</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                      <input 
                        type="text" 
                        name="cooperativeName"
                        value={formData.cooperativeName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                        placeholder={role === 'miner' ? "Ndola Artisans Coop" : "Global Minerals Ltd"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">{role === 'miner' ? 'Mining License Number' : 'Trading / Export License Number'}</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-grey" size={18} />
                      <input 
                        type="text" 
                        name="miningLicense"
                        value={formData.miningLicense}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors" 
                        placeholder={role === 'miner' ? "ML-2026-XXXX" : "TL-2026-XXXX"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">Primary Mineral Type</label>
                    <select 
                      name="mineralType"
                      value={formData.mineralType}
                      onChange={handleInputChange}
                      className="w-full bg-jet-black border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors appearance-none"
                    >
                      <option value="Copper">Copper</option>
                      <option value="Gold">Gold</option>
                      <option value="Cobalt">Cobalt</option>
                      <option value="Manganese">Manganese</option>
                      <option value="Emeralds">Emeralds</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-soft-grey uppercase tracking-widest font-bold">{role === 'miner' ? 'Mining Site Location / Coordinates' : 'Business Address / Headquarters'}</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-soft-grey" size={18} />
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full bg-jet-black border border-white/10 rounded-lg p-4 pl-12 focus:border-gold outline-none transition-colors resize-none" 
                      placeholder={role === 'miner' ? "Enter GPS coordinates or detailed site description..." : "Enter your registered business address..."}
                    />
                  </div>
                </div>

                <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                  <p className="text-xs text-gold font-bold flex items-center gap-2 mb-2">
                    <Shield size={14} /> Regulatory Compliance
                  </p>
                  <p className="text-xs text-soft-grey leading-relaxed">
                    {role === 'miner' 
                      ? 'By submitting, you confirm that your mining activities comply with the Zambia Environmental Management Agency (ZEMA) guidelines and the Mines and Minerals Development Act.'
                      : 'By submitting, you confirm that your trading activities comply with the Ministry of Mines and Minerals Development guidelines and the Mines and Minerals Development Act.'}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-jet-black text-gold focus:ring-gold accent-gold cursor-pointer"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-soft-grey cursor-pointer select-none">
                    I agree to the <Link to="/terms" target="_blank" className="text-gold hover:underline">Terms and Conditions</Link> and consent to the processing of my data for verification purposes.
                  </label>
                </div>

                {submissionError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-500">
                    <Shield className="shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-medium">{submissionError}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting || !agreedToTerms}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Finalising Application...
                    </>
                  ) : (
                    <>
                      Submit for Final Verification
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 md:p-20 text-center max-w-2xl mx-auto w-full"
            >
              <div className="w-24 h-24 bg-trust-green/10 rounded-full flex items-center justify-center text-trust-green mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black mb-6">Application Submitted!</h2>
              <p className="text-soft-grey text-lg mb-10 leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your KYC/AML documents are now being reviewed by our compliance team.
              </p>
              
              <div className="space-y-6 text-left bg-jet-black/50 p-8 rounded-2xl border border-white/5 mb-10">
                <h3 className="text-xl font-bold mb-4">What happens next?</h3>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 font-bold">1</div>
                  <p className="text-soft-grey text-sm">Our team verifies your ID and site location (usually within 24-48 hours).</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 font-bold">2</div>
                  <p className="text-soft-grey text-sm">You will receive an email with your platform login credentials.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 font-bold">3</div>
                  <p className="text-soft-grey text-sm">A dedicated account manager will reach out to schedule your first demo.</p>
                </div>
              </div>

              <Link to="/" className="btn-secondary px-12 py-4">
                Return to Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
