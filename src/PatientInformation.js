import React from 'react';
import './PatientInformation.css';

const PatientInformation = ({ formData, handleChange, handleBlur, errors }) => (
    <div className="patient-info">
        <h2 className="patient-info__title">Patient Information</h2>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label htmlFor="lastName" className="patient-info__label">Last Name <span className='star'>*</span></label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="patient-info__input"
                />
                {errors.lastName && <span className="patient-info__error">{errors.lastName}</span>}
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label htmlFor="firstName" className="patient-info__label">First Name <span className='star'>*</span></label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="patient-info__input"
                />
                {errors.firstName && <span className="patient-info__error">{errors.firstName}</span>}
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label htmlFor="middleName" className="patient-info__label">Middle Name</label>
                <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="patient-info__input"
                />
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label htmlFor="dateOfBirth" className="patient-info__label">Date of Birth <span className='star'>*</span></label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="patient-info__input"
                />
                {errors.dateOfBirth && <span className="patient-info__error">{errors.dateOfBirth}</span>}
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label className="patient-info__label">Gender <span className='star'>*</span></label>
                <div className="patient-info__radio-group">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        Female
                    </label>
                </div>
                {errors.gender && <span className="patient-info__error">{errors.gender}</span>}
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label className="patient-info__label">Has Pacemaker</label>
                <div className="patient-info__radio-group">
                    <label>
                        <input
                            type="radio"
                            name="hasPacemaker"
                            value="N/A"
                            checked={formData.hasPacemaker === 'N/A'}
                            onChange={handleChange}
                        />
                        N/A
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hasPacemaker"
                            value="Yes"
                            checked={formData.hasPacemaker === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hasPacemaker"
                            value="No"
                            checked={formData.hasPacemaker === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
                {errors.hasPacemaker && <span className="patient-info__error">{errors.hasPacemaker}</span>}
            </div>
        </div>
        <div className="patient-info__group">
            <div className="patient-info__field-container">
                <label className="patient-info__label">Has ICD</label>
                <div className="patient-info__radio-group">
                    <label>
                        <input
                            type="radio"
                            name="hasICD"
                            value="N/A"
                            checked={formData.hasICD === 'N/A'}
                            onChange={handleChange}
                        />
                        N/A
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hasICD"
                            value="Yes"
                            checked={formData.hasICD === 'Yes'}
                            onChange={handleChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="hasICD"
                            value="No"
                            checked={formData.hasICD === 'No'}
                            onChange={handleChange}
                        />
                        No
                    </label>
                </div>
                {errors.hasICD && <span className="patient-info__error">{errors.hasICD}</span>}
            </div>
        </div>
    </div>
);

export default PatientInformation;

