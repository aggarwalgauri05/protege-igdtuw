import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, ChevronLeft, Target, Award, Rocket, Lightbulb } from 'lucide-react';

const FindMyMentorForm = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '',
    linkedin: '',
    // Section 2
    dsaLevel: '',
    programmingLanguage: '',
    problemsSolved: '',
    platform: [],
    otherPlatform: '',
    // Section 3
    goals: [],
    otherGoal: '',
    mentorReason: '',
    commitments: {
      attendSessions: false,
      completeTasks: false,
      communicate: false,
      noGhost: false,
      bestEffort: false
    },
    finalCommitment: false
  });

  const [errors, setErrors] = useState({});
  const [fieldsFocused, setFieldsFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [floatingPromptIndex, setFloatingPromptIndex] = useState(0);

  const problemRanges = [
    { label: '0-50', value: '0-50' },
    { label: '50-150', value: '50-150' },
    { label: '150-300', value: '150-300' },
    { label: '300+', value: '300+' }
  ];

  const floatingPrompts = [
    "💭 What specific skills do you want to develop?",
    "💭 What's blocking your progress right now?",
    "💭 Where do you see yourself in 6 months?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingPromptIndex(prev => (prev + 1) % floatingPrompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const branches = [
    { icon: '💻', label: 'Computer Science', value: 'CSE' },
    { icon: '🤖', label: 'Computer Science with AI', value: 'CSE-AI' },
    { icon: '📡', label: 'Electronics and Communication', value: 'ECE' },
    { icon: '⚡', label: 'Electronics and Communication with AI', value: 'ECE-AI' },
    { icon: '🧠', label: 'AI & ML', value: 'AI-ML' },
    { icon: '⚙️', label: 'Mechanical and Automation Engineering', value: 'MAE' },
    { icon: '👾', label: 'Mathematics and Computing', value: 'MC' }
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const dsaLevels = [
    { 
      icon: '🌱', 
      level: 'Beginner', 
      desc: 'Just starting with arrays & basic patterns',
      value: 'beginner'
    },
    { 
      icon: '🌿', 
      level: 'Intermediate', 
      desc: 'Comfortable with trees, graphs, basic DP',
      value: 'intermediate'
    },
    { 
      icon: '🌳', 
      level: 'Advanced', 
      desc: 'Solving hard problems, competitive programming',
      value: 'advanced'
    }
  ];

  const programmingLanguages = [
    { label: 'Python', value: 'python', icon: '🐍' },
    { label: 'Java', value: 'java', icon: '☕' },
    { label: 'C++', value: 'cpp', icon: '⚡' }
  ];

  const goals = [
    { icon: Target, label: 'Crack Internship Coding Rounds', value: 'internship-rounds' },
    { icon: Award, label: 'Crack Placement Coding Rounds', value: 'placement-rounds' },
    { icon: Lightbulb, label: 'Improve Problem-Solving Fundamentals', value: 'fundamentals' },
    { icon: Rocket, label: 'Competitive Programming', value: 'competitive' }
  ];

  const platforms = [
    { label: 'LeetCode', value: 'leetcode' },
    { label: 'Codeforces', value: 'codeforces' },
    { label: 'CodeChef', value: 'codechef' },
    { label: 'GFG', value: 'gfg' },
    { label: 'None yet', value: 'none' },
    { label: 'Other', value: 'other' }
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateSection = (section) => {
    const newErrors = {};

    if (section === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.college.trim()) newErrors.college = 'College is required';
      if (!formData.branch) newErrors.branch = 'Branch is required';
      if (!formData.year) newErrors.year = 'Year is required';
    }

    if (section === 2) {
      if (!formData.dsaLevel) newErrors.dsaLevel = 'Please select your DSA level';
      if (!formData.programmingLanguage) newErrors.programmingLanguage = 'Please select a programming language';
      if (formData.platform.length === 0) newErrors.platform = 'Select at least one platform';
      if (formData.platform.includes('other') && !formData.otherPlatform.trim()) {
        newErrors.otherPlatform = 'Please specify the platform';
      }
    }

    if (section === 3) {
      if (formData.goals.length === 0) newErrors.goals = 'Select at least one goal';
      if (formData.goals.includes('other') && !formData.otherGoal.trim()) {
        newErrors.otherGoal = 'Please specify your goal';
      }
      if (formData.mentorReason.length < 50) {
        newErrors.mentorReason = `Need at least ${50 - formData.mentorReason.length} more characters`;
      }
      const allCommitmentsChecked = Object.values(formData.commitments).every(val => val === true);
      if (!allCommitmentsChecked) newErrors.commitments = 'Please check all commitments';
      if (!formData.finalCommitment) newErrors.finalCommitment = 'Please agree to the commitment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleBack = () => {
    setCurrentSection(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSubmit = async () => {
    if (!validateSection(3)) return;

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleGoalToggle = (goalValue) => {
    setFormData(prev => {
      const goals = prev.goals.includes(goalValue)
        ? prev.goals.filter(g => g !== goalValue)
        : [...prev.goals, goalValue];
      return { ...prev, goals };
    });
  };

  const handlePlatformToggle = (platformValue) => {
    setFormData(prev => {
      const platform = prev.platform.includes(platformValue)
        ? prev.platform.filter(p => p !== platformValue)
        : [...prev.platform, platformValue];
      return { ...prev, platform };
    });
  };

  const handleCommitmentToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      commitments: {
        ...prev.commitments,
        [key]: !prev.commitments[key]
      }
    }));
  };

  if (submitSuccess) {
    return (
      <div className="form-overlay">
        <div className="success-container">
          <div className="success-content">
            <div className="success-checkmark">✓</div>
            <h2 className="success-title">Application Submitted!</h2>
            <p className="success-message">
              We'll review your profile and match you with 2-3 mentors within 24-48 hours.
            </p>
            <p className="success-email">Check your email: <span>{formData.email}</span></p>
            <div className="success-buttons">
              <button className="success-btn primary" onClick={onClose}>Back to Home</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .success-container {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            z-index: 10000;
          }
          .success-content {
            text-align: center;
            animation: successFadeIn 0.8s ease;
          }
          .success-checkmark {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #20B2AA, #16a89e);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: white;
            margin: 0 auto 2rem;
            animation: successPulse 0.6s ease;
            box-shadow: 0 0 40px rgba(32, 178, 170, 0.6);
          }
          .success-title {
            font-size: 2.5rem;
            color: #20B2AA;
            margin-bottom: 1rem;
          }
          .success-message {
            font-size: 1.2rem;
            color: #cbd5e1;
            margin-bottom: 1rem;
            max-width: 500px;
          }
          .success-email {
            color: #94a3b8;
            margin-bottom: 2rem;
          }
          .success-email span {
            color: #20B2AA;
            font-weight: 600;
          }
          .success-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
          }
          .success-btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
          }
          .success-btn.primary {
            background: #20B2AA;
            color: #000;
          }
          .success-btn.primary:hover {
            background: #1a9b94;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(32, 178, 170, 0.4);
          }
          @keyframes successFadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes successPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="form-overlay">
        <div className="submitting-container">
          <div className="submitting-content">
            <div className="loader"></div>
            <p className="submitting-text">Analyzing your profile...</p>
            <p className="submitting-text">Preparing your application...</p>
            <p className="submitting-text">Almost there...</p>
          </div>
        </div>
        <style jsx>{`
          .submitting-container {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            z-index: 10000;
          }
          .submitting-content {
            text-align: center;
          }
          .loader {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(32, 178, 170, 0.1);
            border-top: 4px solid #20B2AA;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 2rem;
          }
          .submitting-text {
            color: #20B2AA;
            font-size: 1.2rem;
            margin: 0.5rem 0;
            animation: pulse 2s ease-in-out infinite;
          }
          .submitting-text:nth-child(2) { animation-delay: 0.3s; }
          .submitting-text:nth-child(3) { animation-delay: 0.6s; }
          .submitting-text:nth-child(4) { animation-delay: 0.9s; }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="form-overlay">
      {/* Animated Background */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}></div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-top">
        <div className="progress-fill" style={{ width: `${(currentSection / 3) * 100}%` }}></div>
      </div>

      {/* Progress Indicators */}
      <div className="progress-indicators">
        <div className={`progress-step ${currentSection >= 1 ? 'active' : ''} ${currentSection > 1 ? 'completed' : ''}`}>
          <div className="step-circle">
            {currentSection > 1 ? <Check size={16} /> : '1'}
          </div>
          <span className="step-label">Personal</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentSection >= 2 ? 'active' : ''} ${currentSection > 2 ? 'completed' : ''}`}>
          <div className="step-circle">
            {currentSection > 2 ? <Check size={16} /> : '2'}
          </div>
          <span className="step-label">DSA Level</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentSection >= 3 ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <span className="step-label">Goals</span>
        </div>
      </div>

      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        <X size={24} />
      </button>

      {/* Form Container */}
      <div className="form-container">
        <div className="form-card">
          
          {/* SECTION 1: Personal Details */}
          {currentSection === 1 && (
            <div className="section" key="section-1">
              <div className="section-header">
                <h2 className="section-title">Tell us about yourself</h2>
                <p className="section-subtitle">Let's start with the basics</p>
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onFocus={() => setFieldsFocused(prev => ({ ...prev, fullName: true }))}
                    className={errors.fullName ? 'error' : formData.fullName ? 'success' : ''}
                  />
                  <label className={formData.fullName || fieldsFocused.fullName ? 'active' : ''}>
                    Full Name *
                  </label>
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  {formData.fullName && !errors.fullName && <Check className="success-icon" size={20} />}
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFieldsFocused(prev => ({ ...prev, email: true }))}
                    className={errors.email ? 'error' : (formData.email && validateEmail(formData.email)) ? 'success' : ''}
                  />
                  <label className={formData.email || fieldsFocused.email ? 'active' : ''}>
                    Email Address *
                  </label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                  {formData.email && validateEmail(formData.email) && <Check className="success-icon" size={20} />}
                </div>

                <div className="form-field">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => setFieldsFocused(prev => ({ ...prev, phone: true }))}
                    className={errors.phone ? 'error' : formData.phone ? 'success' : ''}
                  />
                  <label className={formData.phone || fieldsFocused.phone ? 'active' : ''}>
                    Phone Number *
                  </label>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                  {formData.phone && !errors.phone && <Check className="success-icon" size={20} />}
                </div>

                <div className="form-field">
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    onFocus={() => setFieldsFocused(prev => ({ ...prev, college: true }))}
                    className={errors.college ? 'error' : formData.college ? 'success' : ''}
                  />
                  <label className={formData.college || fieldsFocused.college ? 'active' : ''}>
                    College/University *
                  </label>
                  {errors.college && <span className="error-message">{errors.college}</span>}
                  {formData.college && !errors.college && <Check className="success-icon" size={20} />}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Branch *</label>
                  <div className="branch-grid">
                    {branches.map((branch) => (
                      <div
                        key={branch.value}
                        className={`branch-card ${formData.branch === branch.value ? 'selected' : ''}`}
                        onClick={() => handleInputChange('branch', branch.value)}
                      >
                        <span className="branch-icon">{branch.icon}</span>
                        <span className="branch-label">{branch.label}</span>
                      </div>
                    ))}
                  </div>
                  {errors.branch && <span className="error-message">{errors.branch}</span>}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Current Year *</label>
                  <div className="year-cards">
                    {years.map((year) => (
                      <div
                        key={year}
                        className={`year-card ${formData.year === year ? 'selected' : ''}`}
                        onClick={() => handleInputChange('year', year)}
                      >
                        {year}
                        {formData.year === year && <Check className="check-icon" size={16} />}
                      </div>
                    ))}
                  </div>
                  {errors.year && <span className="error-message">{errors.year}</span>}
                </div>

                <div className="form-field">
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    onFocus={() => setFieldsFocused(prev => ({ ...prev, linkedin: true }))}
                  />
                  <label className={formData.linkedin || fieldsFocused.linkedin ? 'active' : ''}>
                    LinkedIn Profile (Optional)
                  </label>
                  <span className="optional-badge">Optional</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: DSA Standing */}
          {currentSection === 2 && (
            <div className="section" key="section-2">
              <div className="section-header">
                <h2 className="section-title">Where are you right now?</h2>
                <p className="section-subtitle">Help us understand your current DSA journey</p>
              </div>

              <div className="form-fields">
                <div className="form-field-group">
                  <label className="field-label">DSA Proficiency Level *</label>
                  <div className="dsa-level-cards">
                    {dsaLevels.map((level) => (
                      <div
                        key={level.value}
                        className={`dsa-card ${formData.dsaLevel === level.value ? 'selected' : ''}`}
                        onClick={() => handleInputChange('dsaLevel', level.value)}
                      >
                        <div className="dsa-icon">{level.icon}</div>
                        <h3 className="dsa-level">{level.level}</h3>
                        <p className="dsa-desc">{level.desc}</p>
                        {formData.dsaLevel === level.value && (
                          <div className="dsa-checkmark">
                            <Check size={20} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.dsaLevel && <span className="error-message">{errors.dsaLevel}</span>}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Preferred Programming Language *</label>
                  <div className="platform-selector">
                    {programmingLanguages.map((lang) => (
                      <button
                        key={lang.value}
                        className={`platform-btn ${formData.programmingLanguage === lang.value ? 'active' : ''}`}
                        onClick={() => handleInputChange('programmingLanguage', lang.value)}
                      >
                        <span>{lang.icon}</span> {lang.label}
                      </button>
                    ))}
                  </div>
                  {errors.programmingLanguage && <span className="error-message">{errors.programmingLanguage}</span>}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Total Problems Solved</label>
                  <div className="problem-range-cards">
                    {problemRanges.map((range) => (
                      <div
                        key={range.value}
                        className={`range-card ${formData.problemsSolved === range.value ? 'selected' : ''}`}
                        onClick={() => handleInputChange('problemsSolved', range.value)}
                      >
                        {range.label}
                        {formData.problemsSolved === range.value && <Check className="check-icon" size={16} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Platforms Used (select all that apply) *</label>
                  <div className="platform-selector">
                    {platforms.map((platform) => (
                      <button
                        key={platform.value}
                        className={`platform-btn ${formData.platform.includes(platform.value) ? 'active' : ''}`}
                        onClick={() => handlePlatformToggle(platform.value)}
                      >
                        {platform.label}
                        {formData.platform.includes(platform.value) && <Check size={16} style={{ marginLeft: '0.25rem' }} />}
                      </button>
                    ))}
                  </div>
                  {formData.platform.length > 0 && (
                    <div className="goals-count">{formData.platform.length} platform{formData.platform.length > 1 ? 's' : ''} selected</div>
                  )}
                  {errors.platform && <span className="error-message">{errors.platform}</span>}
                  
                  {formData.platform.includes('other') && (
                    <div className="form-field" style={{ marginTop: '1rem' }}>
                      <input
                        type="text"
                        value={formData.otherPlatform}
                        onChange={(e) => handleInputChange('otherPlatform', e.target.value)}
                        onFocus={() => setFieldsFocused(prev => ({ ...prev, otherPlatform: true }))}
                        placeholder="Specify the platform..."
                      />
                      <label className={formData.otherPlatform || fieldsFocused.otherPlatform ? 'active' : ''}>
                        Other Platform Name
                      </label>
                      {errors.otherPlatform && <span className="error-message">{errors.otherPlatform}</span>}
                    </div>
                  )}
                  <p className="helper-text">Select the platforms you actively use for practice</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: Goals & Commitment */}
          {currentSection === 3 && (
            <div className="section section-3" key="section-3">
              <div className="section-header">
                <h2 className="section-title">What are you aiming for?</h2>
                <p className="section-subtitle">Share your goals and commitment</p>
              </div>

              <div className="form-fields">
                <div className="form-field-group">
                  <label className="field-label">What do you want to achieve? (Select all that apply) *</label>
                  <div className="goals-grid">
                    {goals.map((goal) => {
                      const IconComponent = goal.icon;
                      return (
                        <div
                          key={goal.value}
                          className={`goal-card ${formData.goals.includes(goal.value) ? 'selected' : ''}`}
                          onClick={() => handleGoalToggle(goal.value)}
                        >
                          <IconComponent className="goal-icon" size={28} />
                          <span className="goal-label">{goal.label}</span>
                          {formData.goals.includes(goal.value) && (
                            <Check className="goal-check" size={18} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {formData.goals.includes('other') && (
                    <div className="form-field" style={{ marginTop: '1rem' }}>
                      <input
                        type="text"
                        value={formData.otherGoal}
                        onChange={(e) => handleInputChange('otherGoal', e.target.value)}
                        placeholder="Specify your goal..."
                      />
                      {errors.otherGoal && <span className="error-message">{errors.otherGoal}</span>}
                    </div>
                  )}
                  {errors.goals && <span className="error-message">{errors.goals}</span>}
                  {formData.goals.length > 0 && (
                    <div className="goals-count">{formData.goals.length} goal{formData.goals.length > 1 ? 's' : ''} selected</div>
                  )}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Why do you need a mentor? *</label>
                  <div className="floating-prompt">
                    {floatingPrompts[floatingPromptIndex]}
                  </div>
                  <textarea
                    className={`mentor-reason-textarea ${errors.mentorReason ? 'error' : ''}`}
                    value={formData.mentorReason}
                    onChange={(e) => handleInputChange('mentorReason', e.target.value)}
                    placeholder="Tell us your story..."
                    rows={6}
                  />
                  <div className="character-count" style={{
                    color: formData.mentorReason.length < 50 ? '#ef4444' : 
                           formData.mentorReason.length < 100 ? '#f59e0b' : '#22c55e'
                  }}>
                    {formData.mentorReason.length}/500 {formData.mentorReason.length < 50 && `(minimum 50)`}
                  </div>
                  {errors.mentorReason && <span className="error-message">{errors.mentorReason}</span>}
                </div>

                <div className="commitment-contract">
                  <div className="contract-header">
                    <h3 className="contract-title">📜 Your Mentorship Commitment</h3>
                  </div>
                  <div className="contract-body">
                    <p className="contract-intro">By joining XSEED Mentorship, I pledge to:</p>
                    
                    <div className="commitment-items">
                      <label className="commitment-item">
                        <input
                          type="checkbox"
                          checked={formData.commitments.attendSessions}
                          onChange={() => handleCommitmentToggle('attendSessions')}
                        />
                        <span className="commitment-text">Attend scheduled sessions regularly</span>
                      </label>

                      <label className="commitment-item">
                        <input
                          type="checkbox"
                          checked={formData.commitments.completeTasks}
                          onChange={() => handleCommitmentToggle('completeTasks')}
                        />
                        <span className="commitment-text">Complete assigned tasks/projects</span>
                      </label>

                      <label className="commitment-item">
                        <input
                          type="checkbox"
                          checked={formData.commitments.communicate}
                          onChange={() => handleCommitmentToggle('communicate')}
                        />
                        <span className="commitment-text">Communicate proactively with my mentor</span>
                      </label>

                      <label className="commitment-item">
                        <input
                          type="checkbox"
                          checked={formData.commitments.noGhost}
                          onChange={() => handleCommitmentToggle('noGhost')}
                        />
                        <span className="commitment-text">Not ghost or disappear without notice</span>
                      </label>

                      <label className="commitment-item">
                        <input
                          type="checkbox"
                          checked={formData.commitments.bestEffort}
                          onChange={() => handleCommitmentToggle('bestEffort')}
                        />
                        <span className="commitment-text">Give my best effort throughout</span>
                      </label>
                    </div>

                    <div className="contract-divider"></div>

                    <p className="contract-duration">
                      This is a <strong>6-week commitment</strong> starting from match date.
                    </p>

                    <div className="final-commitment-wrapper">
                      <label className="final-commitment">
                        <input
                          type="checkbox"
                          checked={formData.finalCommitment}
                          onChange={(e) => handleInputChange('finalCommitment', e.target.checked)}
                        />
                        <span className="commitment-text large">I understand and agree to this commitment</span>
                      </label>
                      {errors.commitments && <span className="error-message">{errors.commitments}</span>}
                      {errors.finalCommitment && <span className="error-message">{errors.finalCommitment}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentSection > 1 && (
              <button className="nav-btn back" onClick={handleBack}>
                <ChevronLeft size={20} />
                Back
              </button>
            )}
            
            <div className="section-indicator">
              Section {currentSection} of 3
            </div>

            {currentSection < 3 ? (
              <button className="nav-btn next" onClick={handleNext}>
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                className="nav-btn submit" 
                onClick={handleSubmit}
                disabled={!Object.values(formData.commitments).every(v => v) || !formData.finalCommitment}
              >
                ✍️ Sign & Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .form-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 9998;
          overflow-y: auto;
          padding: 2rem 1rem;
        }

        .blob-container {
          position: fixed;
          width: 100%;
          height: 100%;
          filter: blur(100px);
          opacity: 0.4;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          animation: morph 8s ease-in-out infinite;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #20B2AA 0%, transparent 70%);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #1a9b94 0%, transparent 70%);
          bottom: 10%;
          right: 10%;
          animation-delay: -3s;
        }

        .blob-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #15847e 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -6s;
        }

        @keyframes morph {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            border-radius: 50% 50% 50% 50%;
          }
          25% {
            transform: scale(1.1) translate(20px, -20px);
            border-radius: 60% 40% 50% 50%;
          }
          50% {
            transform: scale(0.9) translate(-20px, 20px);
            border-radius: 50% 60% 40% 50%;
          }
          75% {
            transform: scale(1.05) translate(10px, 10px);
            border-radius: 50% 50% 60% 40%;
          }
        }

        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #20B2AA;
          border-radius: 50%;
          opacity: 0;
          animation: floatParticle 6s ease-in-out infinite;
        }

        @keyframes floatParticle {
          0%, 100% {
            opacity: 0;
            transform: translateY(100vh) scale(0);
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(1);
          }
        }

        .progress-bar-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 10001;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #20B2AA, #16a89e);
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.6);
        }

        .progress-indicators {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 1rem;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 1px solid rgba(32, 178, 170, 0.2);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-circle {
          border-color: #20B2AA;
          color: #20B2AA;
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.4);
        }

        .progress-step.completed .step-circle {
          background: #20B2AA;
          border-color: #20B2AA;
          color: #000;
        }

        .step-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .progress-step.active .step-label {
          color: #20B2AA;
        }

        .progress-line {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
        }

        .close-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10001;
          backdrop-filter: blur(10px);
        }

        .close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          transform: rotate(90deg);
        }

        .form-container {
          width: 100%;
          max-width: 900px;
          margin: 10rem auto 4rem;
          position: relative;
          z-index: 10;
        }

        .form-card {
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(32, 178, 170, 0.2);
          border-radius: 30px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .section {
          animation: sectionFadeIn 0.6s ease;
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          color: #20B2AA;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .section-subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-field {
          position: relative;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 1.2rem 1rem 0.8rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: #20B2AA;
          background: rgba(32, 178, 170, 0.05);
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.2);
        }

        .form-field input.error,
        .form-field textarea.error {
          border-color: #ef4444;
          animation: shake 0.3s ease;
        }

        .form-field input.success {
          border-color: #22c55e;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .form-field label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 1rem;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .form-field label.active {
          top: 0.3rem;
          font-size: 0.75rem;
          color: #20B2AA;
        }

        .error-message {
          display: block;
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #22c55e;
          animation: successPop 0.3s ease;
        }

        @keyframes successPop {
          0% { transform: translateY(-50%) scale(0); }
          50% { transform: translateY(-50%) scale(1.2); }
          100% { transform: translateY(-50%) scale(1); }
        }

        .optional-badge {
          position: absolute;
          right: 1rem;
          top: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-label {
          color: #e2e8f0;
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .branch-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .branch-card {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .branch-card:hover {
          background: rgba(32, 178, 170, 0.05);
          border-color: rgba(32, 178, 170, 0.3);
          transform: translateY(-2px);
        }

        .branch-card.selected {
          background: rgba(32, 178, 170, 0.1);
          border-color: #20B2AA;
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.3);
        }

        .branch-icon {
          font-size: 1.5rem;
        }

        .branch-label {
          color: white;
          font-size: 0.9rem;
        }

        .year-cards {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .year-card {
          flex: 1;
          min-width: 150px;
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 500;
        }

        .year-card:hover {
          background: rgba(32, 178, 170, 0.05);
          border-color: rgba(32, 178, 170, 0.3);
          transform: translateY(-5px);
        }

        .year-card.selected {
          background: rgba(211, 225, 10, 0.15);
          border-color: #d3e10a;
          color: #d3e10a;
          box-shadow: 0 0 20px rgba(211, 225, 10, 0.3);
        }

        .year-card .check-icon {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }

        .dsa-level-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .dsa-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .dsa-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(32, 178, 170, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .dsa-card:hover::before {
          opacity: 1;
        }

        .dsa-card:hover {
          border-color: rgba(32, 178, 170, 0.3);
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(32, 178, 170, 0.2);
        }

        .dsa-card.selected {
          background: rgba(32, 178, 170, 0.1);
          border-color: #20B2AA;
          box-shadow: 0 15px 40px rgba(32, 178, 170, 0.4);
        }

        .dsa-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
          transition: transform 0.4s ease;
        }

        .dsa-card:hover .dsa-icon {
          transform: scale(1.2) rotate(10deg);
        }

        .dsa-level {
          color: #20B2AA;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .dsa-desc {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .dsa-checkmark {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #20B2AA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          animation: checkmarkPop 0.3s ease;
        }

        @keyframes checkmarkPop {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .problem-range-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .range-card {
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 600;
          font-size: 1rem;
        }

        .range-card:hover {
          background: rgba(32, 178, 170, 0.05);
          border-color: rgba(32, 178, 170, 0.3);
          transform: translateY(-5px);
        }

        .range-card.selected {
          background: rgba(32, 178, 170, 0.15);
          border-color: #20B2AA;
          color: #20B2AA;
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.3);
        }

        .range-card .check-icon {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }

        .platform-selector {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .platform-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .platform-btn:hover {
          background: rgba(32, 178, 170, 0.05);
          border-color: rgba(32, 178, 170, 0.3);
        }

        .platform-btn.active {
          background: rgba(32, 178, 170, 0.15);
          border-color: #20B2AA;
          color: #20B2AA;
        }

        .helper-text {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .goal-card {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          text-align: center;
        }

        .goal-card:hover {
          background: rgba(32, 178, 170, 0.05);
          border-color: rgba(32, 178, 170, 0.3);
          transform: translateY(-5px);
        }

        .goal-card.selected {
          background: rgba(211, 225, 10, 0.15);
          border-color: #d3e10a;
          box-shadow: 0 0 20px rgba(211, 225, 10, 0.3);
        }

        .goal-icon {
          color: #20B2AA;
          transition: transform 0.3s ease;
        }

        .goal-card:hover .goal-icon {
          transform: scale(1.2);
        }

        .goal-card.selected .goal-icon {
          color: #d3e10a;
        }

        .goal-label {
          color: white;
          font-size: 0.95rem;
        }

        .goal-check {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          color: #d3e10a;
        }

        .goals-count {
          text-align: center;
          color: #20B2AA;
          font-size: 0.95rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .floating-prompt {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.95rem;
          margin-bottom: 1rem;
          animation: floatPrompt 3s ease-in-out infinite;
        }

        @keyframes floatPrompt {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-5px); }
        }

        .mentor-reason-textarea {
          width: 100%;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          min-height: 150px;
          transition: all 0.3s ease;
        }

        .mentor-reason-textarea:focus {
          outline: none;
          border-color: #20B2AA;
          background: rgba(32, 178, 170, 0.05);
          box-shadow: 0 0 20px rgba(32, 178, 170, 0.2);
        }

        .mentor-reason-textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .character-count {
          text-align: right;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .commitment-contract {
          background: rgba(255, 255, 255, 0.02);
          border: 2px solid rgba(32, 178, 170, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 2rem;
        }

        .contract-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .contract-title {
          font-size: 1.8rem;
          color: #20B2AA;
          margin-bottom: 0.5rem;
        }

        .contract-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contract-intro {
          color: #cbd5e1;
          font-size: 1.05rem;
        }

        .commitment-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .commitment-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .commitment-item:hover {
          background: rgba(32, 178, 170, 0.05);
        }

        .commitment-item input[type="checkbox"],
        .final-commitment input[type="checkbox"] {
          width: 24px;
          height: 24px;
          cursor: pointer;
          flex-shrink: 0;
          accent-color: #20B2AA;
        }

        .final-commitment input[type="checkbox"] {
          width: 28px;
          height: 28px;
        }

        .commitment-text {
          color: #cbd5e1;
          font-size: 0.95rem;
        }

        .commitment-text.large {
          font-size: 1.05rem;
          font-weight: 500;
        }

        .contract-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(32, 178, 170, 0.3), transparent);
          margin: 1rem 0;
        }

        .contract-duration {
          text-align: center;
          color: #94a3b8;
          font-size: 1rem;
        }

        .contract-duration strong {
          color: #d3e10a;
        }

        .final-commitment {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(32, 178, 170, 0.05);
          border: 2px solid rgba(32, 178, 170, 0.3);
          border-radius: 12px;
          cursor: pointer;
        }

        .final-commitment-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 3rem;
          gap: 1rem;
        }

        .nav-btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .nav-btn.back {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .nav-btn.back:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-5px);
        }

        .nav-btn.next {
          background: #20B2AA;
          color: #000;
        }

        .nav-btn.next:hover {
          background: #1a9b94;
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(32, 178, 170, 0.4);
        }

        .nav-btn.submit {
          background: linear-gradient(135deg, #d3e10a, #a8b308);
          color: #000;
          font-size: 1.1rem;
          padding: 1.2rem 3rem;
        }

        .nav-btn.submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(211, 225, 10, 0.4);
        }

        .nav-btn.submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .section-indicator {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .progress-indicators {
            padding: 0.75rem 1.5rem;
            gap: 0.5rem;
          }

          .step-circle {
            width: 32px;
            height: 32px;
          }

          .step-label {
            display: none;
          }

          .progress-line {
            width: 30px;
          }

          .form-card {
            padding: 2rem 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .year-cards {
            flex-direction: column;
          }

          .year-card {
            min-width: 100%;
          }

          .dsa-level-cards {
            grid-template-columns: 1fr;
          }

          .goals-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .goal-card {
            padding: 1rem;
          }

          .branch-grid {
            grid-template-columns: 1fr;
          }

          .form-navigation {
            flex-direction: column-reverse;
          }

          .nav-btn {
            width: 100%;
            justify-content: center;
          }

          .section-indicator {
            order: -1;
          }
        }

        @media (max-width: 480px) {
          .form-container {
            margin: 8rem auto 2rem;
          }

          .close-btn {
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .commitment-contract {
            padding: 1.5rem;
          }

          .contract-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FindMyMentorForm;