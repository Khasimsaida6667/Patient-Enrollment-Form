import React, { useState, useEffect } from 'react';
import PatientInformation from './PatientInformation';
import ContactInformation from './ContactInformation';
import './EnrollmentForm.css';

const EnrollmentForm = () => {
    const initialFormData = {
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        gender: '',
        hasPacemaker: 'N/A',
        hasICD: 'N/A',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        primaryPhone: '',
        primaryPhoneType: '',
        secondaryPhone: '',
        secondaryPhoneType: '',
        emergencyContact: [{ name: '', phone: '' }],
        clinic: '',
        device: '',
        enrollmentType: '',
        orderingProvider: '',
        readingProvider: '',
        referringProvider: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [allPatients, setAllPatients] = useState(() => {
        // Retrieve patient data from local storage if available
        const savedPatients = localStorage.getItem('patients');
        return savedPatients ? JSON.parse(savedPatients) : [];
    });
    const [filteredPatients, setFilteredPatients] = useState(allPatients);

    const stateOptions = ['New York', 'California', 'Texas'];
    const phoneTypeOptions = ['Home', 'Work', 'Mobile'];
    const clinicOptions = ['Clinic A', 'Clinic B', 'Clinic C'];
    const deviceOptions = ['Device A', 'Device B', 'Device C'];
    const enrollmentTypeOptions = ['Type A', 'Type B', 'Type C'];
    const orderingProviderOptions = ['Provider A', 'Provider B', 'Provider C', 'Provider D', 'Provider E'];
    const readingProviderOptions = ['Provider X', 'Provider Y', 'Provider Z', 'Provider W', 'Provider V'];

    const referringProviderOptions = ['Provider 1', 'Provider 2', 'Provider 3'];

    useEffect(() => {
        // Save patients to local storage whenever the allPatients state changes
        localStorage.setItem('patients', JSON.stringify(allPatients));
    }, [allPatients]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let newErrors = {};
        // Patient information validation
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";

        // Contact information validation
        if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zip) newErrors.zip = "Zip code is required";
        if (!formData.primaryPhone) newErrors.primaryPhone = "Primary phone number is required";
        if (!formData.primaryPhoneType) newErrors.primaryPhoneType = "Primary phone type is required";

        // Enrollment form specific validation
        if (!formData.clinic) newErrors.clinic = "Clinic is required";
        if (!formData.device) newErrors.device = "Device is required";
        if (!formData.enrollmentType) newErrors.enrollmentType = "Enrollment type is required";
        if (!formData.orderingProvider) newErrors.orderingProvider = "Ordering provider is required";
        if (!formData.readingProvider) newErrors.readingProvider = "Reading provider is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (name, value) => {
        let errorMessage = '';
        // Patient information validation
        if (name === 'lastName' && !value) errorMessage = "Last name is required";
        if (name === 'firstName' && !value) errorMessage = "First name is required";
        if (name === 'dateOfBirth' && !value) errorMessage = "Date of birth is required";
        if (name === 'gender' && !value) errorMessage = "Gender is required";

        // Contact information validation
        if (name === 'addressLine1' && !value) errorMessage = "Address Line 1 is required";
        if (name === 'city' && !value) errorMessage = "City is required";
        if (name === 'state' && !value) errorMessage = "State is required";
        if (name === 'zip' && !value) errorMessage = "Zip code is required";
        if (name === 'primaryPhone' && !value) errorMessage = "Primary phone number is required";
        if (name === 'primaryPhoneType' && !value) errorMessage = "Primary phone type is required";

        // Enrollment form specific validation
        if (name === 'clinic' && !value) errorMessage = "Clinic is required";
        if (name === 'device' && !value) errorMessage = "Device is required";
        if (name === 'enrollmentType' && !value) errorMessage = "Enrollment type is required";
        if (name === 'orderingProvider' && !value) errorMessage = "Ordering provider is required";
        if (name === 'readingProvider' && !value) errorMessage = "Reading provider is required";

        return errorMessage;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);
        setErrors({ ...errors, [name]: errorMessage });
    };

    const handleEmergencyContactChange = (index, field, value) => {
        const newEmergencyContact = formData.emergencyContact.map((contact, i) => {
            if (i === index) {
                return { ...contact, [field]: value };
            }
            return contact;
        });
        setFormData({ ...formData, emergencyContact: newEmergencyContact });
    };

    const addEmergencyContact = () => {
        setFormData({
            ...formData,
            emergencyContact: [...formData.emergencyContact, { name: '', phone: '' }],
        });
    };

    const saveEmergencyContactToDatabase = () => {
        // Simulate saving the emergency contact to a database
        console.log('Saving emergency contact to the database:', formData.emergencyContact);
        // Assuming successful save, you can display a success message or perform any other necessary actions
        alert('Emergency contact saved successfully!');
    };

    const deleteEmergencyContact = (index) => {
        const newEmergencyContact = formData.emergencyContact.filter((_, i) => i !== index);
        setFormData({ ...formData, emergencyContact: newEmergencyContact });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Add new patient data to the list
            const newPatient = {
                id: allPatients.length + 1,
                ...formData,
            };
            const updatedPatients = [...allPatients, newPatient];
            setAllPatients(updatedPatients);
            setFilteredPatients(updatedPatients);

            // Reset form data and errors
            setFormData(initialFormData);
            setErrors({});
            console.log("Form submitted successfully");
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Filter patients based on search query
        const filtered = allPatients.filter(patient => {
            const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
            return fullName.includes(query.toLowerCase());
        });
        setFilteredPatients(filtered);
    };

    const handleCancel = () => {
        // Reset form data and errors
        setFormData({ ...initialFormData });
        setErrors({});
    };

    return (
        <div>
            <header>
                <h1>New Enrollment</h1>
                <span className="required-note">*Required Fields</span>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="clinic">Select Clinic <span className='star'>*</span></label>
                    <select
                        id="clinic"
                        name="clinic"
                        value={formData.clinic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    >
                        <option value="">Select a clinic</option>
                        {clinicOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.clinic && <span className="error">{errors.clinic}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="device">Select Device <span className='star'>*</span></label>
                    <select
                        id="device"
                        name="device"
                        value={formData.device}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    >
                        <option value="">First select a clinic</option>
                        {formData.clinic && deviceOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.device && <span className="error">{errors.device}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="enrollmentType">Enrollment Type <span className='star'>*</span></label>
                    <select
                        id="enrollmentType"
                        name="enrollmentType"
                        value={formData.enrollmentType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    >
                        <option value="">First select a clinic</option>
                        {formData.clinic && enrollmentTypeOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.enrollmentType && <span className="error">{errors.enrollmentType}</span>}
                </div>

                <PatientInformation
                    formData={formData}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                />
                <ContactInformation
                    formData={formData}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    stateOptions={stateOptions}
                    phoneTypeOptions={phoneTypeOptions}
                    addEmergencyContact={addEmergencyContact}
                    handleEmergencyContactChange={handleEmergencyContactChange}
                    deleteEmergencyContact={deleteEmergencyContact}
                    saveEmergencyContactToDatabase={saveEmergencyContactToDatabase}
                />

                <div className="form-group">
                    <label htmlFor="orderingProvider">Ordering Provider <span className='star'>*</span></label>
                    <select
                        id="orderingProvider"
                        name="orderingProvider"
                        value={formData.orderingProvider}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    >
                        <option value="">First select a clinic</option>
                        {formData.clinic && orderingProviderOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.orderingProvider && <span className="error">{errors.orderingProvider}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="readingProvider">Reading Provider <span className='star'>*</span></label>
                    <select
                        id="readingProvider"
                        name="readingProvider"
                        value={formData.readingProvider}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    >
                        <option value="">First select a clinic</option>
                        {formData.clinic && readingProviderOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.readingProvider && <span className="error">{errors.readingProvider}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="referringProvider">Referring Provider</label>
                    <select
                        id="referringProvider"
                        name="referringProvider"
                        value={formData.referringProvider}
                        onChange={handleChange}
                    >
                        <option value="">Select a referring provider</option>
                        {referringProviderOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search patients by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Has Pacemaker</th>
                        <th>Has ICD</th>
                        {/* Add additional column headings here */}
                    </tr>
                </thead>
                <tbody>
                    {(searchQuery ? filteredPatients : allPatients).map((patient, index) => (
                        <tr key={index} className="patient-details">
                            <td>{`${patient.firstName} ${patient.lastName}`}</td>
                            <td>{`${patient.dateOfBirth}`}</td>
                            <td>{`${patient.gender}`}</td>
                            <td>{`${patient.hasPacemaker}`}</td>
                            <td>{`${patient.hasICD}`}</td>
                            {/* Display additional patient details here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrollmentForm;

