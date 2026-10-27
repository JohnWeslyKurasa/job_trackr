import React, { useState } from 'react';

/**
 * ApplicationForm is a controlled form component that creates new job applications.
 * Validates fields according to specifications and prevents duplicate entries.
 * Styled with wine red and light sand tones, no emojis.
 */
export default function ApplicationForm({ onAddApplication, existingApplications }) {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const initialFormState = {
    company: '',
    role: '',
    status: 'Applied',
    appliedOn: getTodayString(),
    priority: 'Medium',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as the user types
    if (errors[name] || errors.duplicate) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        delete nextErrors.duplicate;
        return nextErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const trimmedCompany = formData.company.trim();
    const trimmedRole = formData.role.trim();
    const today = getTodayString();

    // Company validation: 2-60 characters
    if (!trimmedCompany) {
      newErrors.company = 'Company is required.';
    } else if (trimmedCompany.length < 2 || trimmedCompany.length > 60) {
      newErrors.company = 'Company name must be between 2 and 60 characters.';
    }

    // Role validation: 2-60 characters
    if (!trimmedRole) {
      newErrors.role = 'Role is required.';
    } else if (trimmedRole.length < 2 || trimmedRole.length > 60) {
      newErrors.role = 'Role must be between 2 and 60 characters.';
    }

    // Status validation
    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(formData.status)) {
      newErrors.status = 'Status must be Applied, Interview, Offer, or Rejected.';
    }

    // Date validation: not in the future
    if (!formData.appliedOn) {
      newErrors.appliedOn = 'Applied date is required.';
    } else if (formData.appliedOn > today) {
      newErrors.appliedOn = 'Applied date cannot be in the future.';
    }

    // Priority validation
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(formData.priority)) {
      newErrors.priority = 'Priority must be Low, Medium, or High.';
    }

    // Duplicate check: reject same company and role, ignoring case
    if (!newErrors.company && !newErrors.role) {
      const isDuplicate = existingApplications.some(
        (app) =>
          app.company.trim().toLowerCase() === trimmedCompany.toLowerCase() &&
          app.role.trim().toLowerCase() === trimmedRole.toLowerCase()
      );

      if (isDuplicate) {
        newErrors.duplicate = `An application for "${trimmedRole}" at "${trimmedCompany}" already exists (duplicate entry).`;
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSuccess(false);
      return;
    }

    // Create unique ID
    const newId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `app_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newApplication = {
      id: newId,
      company: formData.company.trim(),
      role: formData.role.trim(),
      status: formData.status,
      appliedOn: formData.appliedOn,
      priority: formData.priority,
    };

    onAddApplication(newApplication);

    // Reset form to defaults
    setFormData(initialFormState);
    setErrors({});
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="form-container" aria-labelledby="form-heading">
      <div className="form-header-bar">
        <div className="form-title-group">
          <span className="form-icon-wrap" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
          <h2 id="form-heading" className="form-title">Track New Application</h2>
        </div>
        <p className="form-subtitle">Record your application details and manage them through each interview stage</p>
      </div>

      {isSuccess && (
        <div className="success-banner" role="status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Application successfully added to the board.</span>
        </div>
      )}

      {errors.duplicate && (
        <div className="duplicate-alert" role="alert" id="duplicate-error-message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{errors.duplicate}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="application-form" id="application-form">
        <div className="form-grid">
          {/* Company Name */}
          <div className="form-field">
            <label htmlFor="company-input" className="form-label">
              Company <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="company-input"
              name="company"
              className={`form-input ${errors.company ? 'has-error' : ''}`}
              placeholder="e.g. Stripe, Linear (2-60 chars)"
              value={formData.company}
              onChange={handleChange}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <span className="field-error" id="company-error" role="alert">
                {errors.company}
              </span>
            )}
          </div>

          {/* Job Role */}
          <div className="form-field">
            <label htmlFor="role-input" className="form-label">
              Job Role / Title <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="role-input"
              name="role"
              className={`form-input ${errors.role ? 'has-error' : ''}`}
              placeholder="e.g. Frontend Engineer (2-60 chars)"
              value={formData.role}
              onChange={handleChange}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? 'role-error' : undefined}
            />
            {errors.role && (
              <span className="field-error" id="role-error" role="alert">
                {errors.role}
              </span>
            )}
          </div>

          {/* Status Selection */}
          <div className="form-field">
            <label htmlFor="status-select" className="form-label">
              Initial Stage
            </label>
            <div className="select-wrapper">
              <select
                id="status-select"
                name="status"
                className={`form-select ${errors.status ? 'has-error' : ''}`}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <span className="select-chevron">▾</span>
            </div>
            {errors.status && (
              <span className="field-error" id="status-error" role="alert">
                {errors.status}
              </span>
            )}
          </div>

          {/* Applied Date */}
          <div className="form-field">
            <label htmlFor="appliedOn-input" className="form-label">
              Date Applied <span className="required-star">*</span>
            </label>
            <input
              type="date"
              id="appliedOn-input"
              name="appliedOn"
              max={getTodayString()}
              className={`form-input ${errors.appliedOn ? 'has-error' : ''}`}
              value={formData.appliedOn}
              onChange={handleChange}
              aria-invalid={!!errors.appliedOn}
              aria-describedby={errors.appliedOn ? 'appliedOn-error' : undefined}
            />
            {errors.appliedOn && (
              <span className="field-error" id="appliedOn-error" role="alert">
                {errors.appliedOn}
              </span>
            )}
          </div>

          {/* Priority */}
          <div className="form-field">
            <label htmlFor="priority-select" className="form-label">
              Priority Level
            </label>
            <div className="select-wrapper">
              <select
                id="priority-select"
                name="priority"
                className={`form-select ${errors.priority ? 'has-error' : ''}`}
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <span className="select-chevron">▾</span>
            </div>
            {errors.priority && (
              <span className="field-error" id="priority-error" role="alert">
                {errors.priority}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              id="submit-app-btn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
