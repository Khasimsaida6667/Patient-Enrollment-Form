import React from 'react';
import './ContactInformation.css';

const ContactInformation = ({
  formData,
  handleChange,
  handleBlur,
  errors,
  stateOptions,
  phoneTypeOptions,
  addEmergencyContact,
  handleEmergencyContactChange,
  deleteEmergencyContact,
  saveEmergencyContactToDatabase
}) => (
  <div className="contact-info-container">
    <h2>Contact Information</h2>
    <div className="form-group">
      <label htmlFor="addressLine1" className="lab">
        Address Line 1 <span className="star">*</span>
      </label>
      <input
        type="text"
        id="addressLine1"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.addressLine1 && <span className="error">{errors.addressLine1}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="addressLine2" className="lab">
        Address Line 2
      </label>
      <input
        type="text"
        id="addressLine2"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="city" className="lab">
        City <span className="star">*</span>
      </label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.city && <span className="error">{errors.city}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="state" className="lab">
        State <span className="star">*</span>
      </label>
      <select
        id="state"
        name="state"
        value={formData.state}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      >
        <option value="">Select a state</option>
        {stateOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.state && <span className="error">{errors.state}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="zip" className="lab">
        Zip <span className="star">*</span>
      </label>
      <input
        type="text"
        id="zip"
        name="zip"
        value={formData.zip}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {errors.zip && <span className="error">{errors.zip}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="primaryPhone" className="lab">
        Primary Phone <span className="star">*</span>
      </label>
      <input
        type="tel"
        id="primaryPhone"
        name="primaryPhone"
        value={formData.primaryPhone}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <select
        name="primaryPhoneType"
        value={formData.primaryPhoneType}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      >
        <option value="">Select type</option>
        {phoneTypeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.primaryPhone && <span className="error">{errors.primaryPhone}</span>}
      {errors.primaryPhoneType && <span className="error">{errors.primaryPhoneType}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="secondaryPhone" className="lab">
        Secondary Phone
      </label>
      <input
        type="tel"
        id="secondaryPhone"
        name="secondaryPhone"
        value={formData.secondaryPhone}
        onChange={handleChange}
      />
      <select
        name="secondaryPhoneType"
        value={formData.secondaryPhoneType}
        onChange={handleChange}
      >
        <option value="">Select type</option>
        {phoneTypeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Emergency Contact</label>
      {formData.emergencyContact.map((contact, index) => (
        <div key={index} className="emergency-contact-group">
          <input
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
          />
          <button type="button" className="delete" onClick={() => deleteEmergencyContact(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" className="add-emergency-contact-btn" onClick={addEmergencyContact}>
        Add Emergency Contact
      </button>
      <button
        type="button"
        className="save-emergency-contact-btn"
        onClick={() => saveEmergencyContactToDatabase(formData.emergencyContact)}
      >
        Save Emergency Contact
      </button>
    </div>
  </div>
);

export default ContactInformation;

