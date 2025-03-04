'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  FaceSmileIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  GlobeAltIcon,
  FingerPrintIcon,
  CameraIcon,
  MicrophoneIcon,
  DocumentMagnifyingGlassIcon,
  ClockIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  status: 'pending' | 'active' | 'completed';
}

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    panCard: null as File | null,
    aadhaarCard: null as File | null,
  });
  const [processing, setProcessing] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    documents: false,
    face: false,
    video: false,
    risk: false
  });
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [verificationPhrase, setVerificationPhrase] = useState('');

  useEffect(() => {
    // Generate random verification phrase
    const phrases = ['Vyom Bank 123', 'Secure Check 456', 'Identity 789'];
    setVerificationPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  const steps: RegistrationStep[] = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Personal details verification',
      icon: UserIcon,
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending',
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'AI-powered KYC process',
      icon: DocumentTextIcon,
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending',
    },
    {
      id: 3,
      title: 'Video KYC',
      description: 'Liveness detection & verification',
      icon: VideoCameraIcon,
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending',
    },
    {
      id: 4,
      title: 'Risk Assessment',
      description: 'AI risk profiling',
      icon: ChartBarIcon,
      status: currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'pending',
    }
  ];

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: 'panCard' | 'aadhaarCard') => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, [type]: event.target.files[0] });
      await simulateDocumentVerification(type);
    }
  };

  const simulateDocumentVerification = async (type: string) => {
    setProcessing(true);
    // Simulate AI document processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setVerificationStatus(prev => ({ ...prev, documents: true }));
    setProcessing(false);
  };

  const simulateVideoKYC = async () => {
    setProcessing(true);
    // Simulate video KYC process
    await new Promise(resolve => setTimeout(resolve, 4000));
    setVerificationStatus(prev => ({ ...prev, video: true }));
    setProcessing(false);
  };

  const simulateRiskAssessment = async () => {
    setProcessing(true);
    // Simulate AI risk assessment
    await new Promise(resolve => setTimeout(resolve, 5000));
    setRiskScore(20); // Example low risk score
    setVerificationStatus(prev => ({ ...prev, risk: true }));
    setProcessing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      // Redirect to login page after completion
      router.push('/auth/login');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-[#E31B54]/5 border border-[#E31B54]/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 text-[#E31B54] mb-2">
                <BoltIcon className="w-5 h-5" />
                <span className="font-medium">AI-Powered Verification</span>
              </div>
              <p className="text-sm text-gray-600">
                Our AI system will verify your details in real-time against multiple databases
                for enhanced security.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (as per official documents)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-200 py-3 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E31B54] focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:ring-opacity-20"
                  placeholder="Enter your full name"
                />
                <UserIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number (for OTP verification)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-200 py-3 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E31B54] focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:ring-opacity-20"
                  placeholder="Enter your mobile number"
                />
                <DevicePhoneMobileIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-200 py-3 pl-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E31B54] focus:outline-none focus:ring-2 focus:ring-[#E31B54] focus:ring-opacity-20"
                  placeholder="Enter your email address"
                />
                <EnvelopeIcon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="bg-[#E31B54]/5 border border-[#E31B54]/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 text-[#E31B54] mb-2">
                <DocumentMagnifyingGlassIcon className="w-5 h-5" />
                <span className="font-medium">AI Document Analysis</span>
              </div>
              <p className="text-sm text-gray-600">
                Our AI will verify document authenticity, check for tampering, and
                cross-reference with government databases.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Card
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                  {processing ? (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31B54] mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">AI Verification in Progress...</p>
                        <p className="text-xs text-gray-500">Checking document authenticity</p>
                      </div>
                    </div>
                  ) : verificationStatus.documents ? (
                    <div className="flex flex-col items-center justify-center text-green-500">
                      <CheckCircleIcon className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">Document Verified</p>
                      <p className="text-xs text-gray-500">All security checks passed</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="w-12 h-12 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium text-[#E31B54]">Upload PAN Card</span>
                      </p>
                      <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, 'panCard')}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Card
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                  {processing ? (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31B54] mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">AI Verification in Progress...</p>
                        <p className="text-xs text-gray-500">Cross-referencing with UIDAI</p>
                      </div>
                    </div>
                  ) : verificationStatus.documents ? (
                    <div className="flex flex-col items-center justify-center text-green-500">
                      <CheckCircleIcon className="w-12 h-12 mb-2" />
                      <p className="text-sm font-medium">Document Verified</p>
                      <p className="text-xs text-gray-500">All security checks passed</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="w-12 h-12 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium text-[#E31B54]">Upload Aadhaar Card</span>
                      </p>
                      <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarCard')}
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="bg-[#E31B54]/5 border border-[#E31B54]/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 text-[#E31B54] mb-2">
                <VideoCameraIcon className="w-5 h-5" />
                <span className="font-medium">AI Video KYC</span>
              </div>
              <p className="text-sm text-gray-600">
                Please complete a quick video verification. Our AI will analyze facial features
                and verify liveness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-[#E31B54]/10 rounded-full flex items-center justify-center mb-6">
                <VideoCameraIcon className="w-16 h-16 text-[#E31B54]" />
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Video Verification</h3>
                <p className="text-gray-600 mb-4">
                  Please say the following phrase clearly:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-lg font-medium text-[#E31B54]">{verificationPhrase}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <CameraIcon className="w-5 h-5" />
                    <span className="font-medium">Camera Check</span>
                  </div>
                  <p className="text-sm text-gray-500">Ensure good lighting and face the camera directly</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <MicrophoneIcon className="w-5 h-5" />
                    <span className="font-medium">Audio Check</span>
                  </div>
                  <p className="text-sm text-gray-500">Speak clearly in a quiet environment</p>
                </div>
              </div>

              <button
                onClick={simulateVideoKYC}
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] text-white rounded-lg hover:from-[#FF6B8B] hover:to-[#E31B54] transition-colors"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Video KYC...</span>
                  </>
                ) : verificationStatus.video ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Video KYC Completed</span>
                  </>
                ) : (
                  <>
                    <VideoCameraIcon className="w-5 h-5" />
                    <span>Start Video KYC</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="bg-[#E31B54]/5 border border-[#E31B54]/10 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 text-[#E31B54] mb-2">
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-medium">AI Risk Assessment</span>
              </div>
              <p className="text-sm text-gray-600">
                Our AI is analyzing multiple data points to create your risk profile and
                ensure secure onboarding.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-[#E31B54]/10 rounded-full flex items-center justify-center mb-6">
                <ChartBarIcon className="w-16 h-16 text-[#E31B54]" />
              </div>

              {!verificationStatus.risk ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                  <p className="text-gray-600 mb-8">
                    Please wait while our AI analyzes your profile and generates a risk assessment.
                  </p>
                  <button
                    onClick={simulateRiskAssessment}
                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] text-white rounded-lg hover:from-[#FF6B8B] hover:to-[#E31B54] transition-colors"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Risk Assessment...</span>
                      </>
                    ) : (
                      <>
                        <ChartBarIcon className="w-5 h-5" />
                        <span>Start Risk Assessment</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Low Risk Profile</h3>
                    <p className="text-gray-600">
                      Risk Score: {riskScore}/100
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-gray-700 font-medium">Identity Verified</span>
                        <p className="text-sm text-gray-500">All documents authenticated</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-gray-700 font-medium">Clean Background</span>
                        <p className="text-sm text-gray-500">No suspicious activities detected</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <div className="text-left">
                        <span className="text-gray-700 font-medium">Device Verified</span>
                        <p className="text-sm text-gray-500">Secure connection established</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FFF5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Account Creation</h1>
          <p className="text-gray-600">Complete verification with AI-powered security</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-200"></div>
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                    ${step.status === 'completed' ? 'bg-[#E31B54] text-white' : 
                      step.status === 'active' ? 'bg-white border-2 border-[#E31B54] text-[#E31B54]' : 
                      'bg-white border-2 border-gray-200 text-gray-400'}`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="mt-2 text-xs font-medium text-gray-500">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentStep === 1}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#E31B54] to-[#FF6B8B] text-white font-medium hover:from-[#FF6B8B] hover:to-[#E31B54] transition-colors ${
              (currentStep === 2 && !verificationStatus.documents) ||
              (currentStep === 3 && !verificationStatus.video) ||
              (currentStep === 4 && !verificationStatus.risk)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={
              (currentStep === 2 && !verificationStatus.documents) ||
              (currentStep === 3 && !verificationStatus.video) ||
              (currentStep === 4 && !verificationStatus.risk)
            }
          >
            {currentStep === steps.length ? (
              'Complete'
            ) : (
              <>
                Next Step
                <ArrowRightIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 