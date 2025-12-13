import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import logo from "../assets/photo/logo.png";

// ---------- Shared UI Components ----------
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-xl p-6 ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>;
const CardContent = ({ children, className = "" }) => <div className={`space-y-6 ${className}`}>{children}</div>;

const Button = ({ children, onClick, disabled, variant = "", className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium ${
      variant === "outline"
        ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
        : "bg-green-500 text-white hover:opacity-90"
    } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

const Input = ({ type = "text", value, onChange, className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`border border-gray-300 rounded-md p-2 w-full mt-1 ${className}`}
  />
);

const Label = ({ children }) => <label className="block text-sm font-medium mb-1">{children}</label>;

// ---------- Step Indicator ----------
const StepIndicator = ({ steps, currentStep, completedSteps }) => {
  const colors = ["bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between flex-wrap">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isCurrent = currentStep === idx;
          return (
            <div key={idx} className="flex items-center mb-2 sm:mb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
                    isCompleted
                      ? `${colors[idx]} text-white border-${colors[idx].split('-')[1]}-500`
                      : isCurrent
                      ? `${colors[idx]} text-white border-${colors[idx].split('-')[1]}-500`
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <span className="mt-2 text-xs text-center">{step}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${isCompleted ? colors[idx] : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Step 1: Personal Details ----------
const PersonalDetailsStep = ({ data, onUpdate, onNext }) => {
  const isValid =
    data.firstName &&
    data.lastName &&
    data.gender &&
    data.dob &&
    data.whatsappNo &&
    data.email &&
    data.village &&
    data.taluka &&
    data.state &&
    data.district &&
    data.nation;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InputGroup label="First Name *" value={data.firstName} onChange={(v) => onUpdate({ ...data, firstName: v })} />
          <InputGroup label="Middle Name" value={data.middleName} onChange={(v) => onUpdate({ ...data, middleName: v })} />
          <InputGroup label="Last Name *" value={data.lastName} onChange={(v) => onUpdate({ ...data, lastName: v })} />
          <Label>Gender *</Label>
          <select
            value={data.gender}
            onChange={(e) => onUpdate({ ...data, gender: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mt-1"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <InputGroup label="Date of Birth *" type="date" value={data.dob} onChange={(v) => onUpdate({ ...data, dob: v })} />
          <InputGroup label="WhatsApp Number *" type="tel" value={data.whatsappNo} onChange={(v) => onUpdate({ ...data, whatsappNo: v })} />
          <InputGroup label="Email Address *" type="email" value={data.email} onChange={(v) => onUpdate({ ...data, email: v })} />
          <InputGroup label="Village *" value={data.village} onChange={(v) => onUpdate({ ...data, village: v })} />
          <InputGroup label="Taluka *" value={data.taluka} onChange={(v) => onUpdate({ ...data, taluka: v })} />
          <InputGroup label="State *" value={data.state} onChange={(v) => onUpdate({ ...data, state: v })} />
          <InputGroup label="District *" value={data.district} onChange={(v) => onUpdate({ ...data, district: v })} />
          <InputGroup label="Nation / Country *" value={data.nation} onChange={(v) => onUpdate({ ...data, nation: v })} />
          <div className="flex justify-end pt-4">
            <Button onClick={onNext} disabled={!isValid}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const InputGroup = ({ label, value, onChange, type = "text" }) => (
  <div>
    <Label>{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

// ---------- Step 2: Role Selection ----------
const RoleSelectionStep = ({ role, onChangeRole, onNext, onPrevious }) => {
  const isValid = role !== "";
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Select Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Which role do you want to register as? *</Label>
          <select
            value={role}
            onChange={(e) => onChangeRole(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mt-1"
          >
            <option value="">Select Role</option>
            <option value="landowner">Landowner</option>
            <option value="farmer">Farmer</option>
            <option value="manager">Manager</option>
          </select>
          <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
            <Button variant="outline" onClick={onPrevious} className="w-full sm:w-auto">Previous</Button>
            <Button onClick={onNext} disabled={!isValid} className="w-full sm:w-auto">Next</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ---------- Step 3: Role-specific form ----------
const RoleDetailsStep = ({ role, landOwnerData, onUpdateLandOwner, farmerData, onUpdateFarmer, onNext, onPrevious }) => {
  const isLandOwner = role === "landowner";
  const isValid = isLandOwner
    ? landOwnerData.surveyNo && landOwnerData.plotNo
    : farmerData.experience && farmerData.specialization;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>{isLandOwner ? "Landowner Details" : role === "manager" ? "Manager Details" : "Farmer Details"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLandOwner ? (
            <>
              <InputGroup label="Survey Number *" value={landOwnerData.surveyNo} onChange={(v) => onUpdateLandOwner({ ...landOwnerData, surveyNo: v })} />
              <InputGroup label="Plot Number *" value={landOwnerData.plotNo} onChange={(v) => onUpdateLandOwner({ ...landOwnerData, plotNo: v })} />
            </>
          ) : (
            <>
              <InputGroup label="Years of Experience *" value={farmerData.experience} onChange={(v) => onUpdateFarmer({ ...farmerData, experience: v })} />
              <InputGroup label="Specialization / Crops *" value={farmerData.specialization} onChange={(v) => onUpdateFarmer({ ...farmerData, specialization: v })} />
            </>
          )}
          <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
            <Button variant="outline" onClick={onPrevious} className="w-full sm:w-auto">Previous</Button>
            <Button onClick={onNext} disabled={!isValid} className="w-full sm:w-auto">Next</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ---------- Step 4: Document Upload ----------
const DocumentsStep = ({ role, documents, onUpdateDoc, onNext, onPrevious }) => {
  const personalDocs = ["Aadhar", "PAN", "Voter ID"];
  const roleDocs = role === "landowner" ? ["Land Title Document"] : ["Certificate / License"];
  const extraDocs = ["Profile Picture", "Signature"];
  const allDocs = [...personalDocs, ...roleDocs, ...extraDocs];
  const isValid = allDocs.every((doc) => documents[doc]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {allDocs.map((doc) => (
            <div key={doc}>
              <Label>{doc} *</Label>
              <input
                type="file"
                accept={doc === "Profile Picture" || doc === "Signature" ? "image/*" : undefined}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpdateDoc(doc, file);
                }}
                className="mt-1"
              />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
            <Button variant="outline" onClick={onPrevious} className="w-full sm:w-auto">Previous</Button>
            <Button onClick={onNext} disabled={!isValid} className="w-full sm:w-auto">Next</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ---------- Step 5: Profile Preview & PDF ----------
const ProfilePreviewStep = ({ personalData, role, roleData, documents, onPrevious }) => {
  const [images, setImages] = useState({});
  const pdfRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const data = {};
      for (const key of ["Profile Picture", "Signature"]) {
        if (documents[key]) {
          data[key] = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(documents[key]);
          });
        }
      }
      setImages(data);
    };
    loadImages();
  }, [documents]);

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("registration_draft.pdf");
  };

  const sendRequest = () => {
    alert("Your request sent successfully!");
    navigate("/"); // redirect to home
  };

  const renderField = (label, value) => (
    <div key={label}><strong>{label}:</strong> {value}</div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div ref={pdfRef} className="p-4 bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <img src={logo} alt="Logo" className="h-16" />
          {images["Profile Picture"] && (
            <img src={images["Profile Picture"]} alt="Profile" className="h-16 rounded-full border" />
          )}
        </div>

        <h2 className="font-bold text-lg mb-2">Personal Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(personalData).map(([key, value]) => renderField(key.replace(/([A-Z])/g, " $1"), value))}
        </div>

        <h2 className="font-bold text-lg mt-4 mb-2">Role Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField("Role", role)}
          {role === "landowner" ? (
            <>
              {renderField("Survey No", roleData.surveyNo)}
              {renderField("Plot No", roleData.plotNo)}
            </>
          ) : (
            <>
              {renderField("Experience", roleData.experience)}
              {renderField("Specialization", roleData.specialization)}
            </>
          )}
        </div>

        <h2 className="font-bold text-lg mt-4 mb-2">Documents</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {images["Signature"] && (
            <div className="flex flex-col items-center">
              <strong>Signature</strong>
              <img src={images["Signature"]} alt="Signature" className="h-16 mt-1 border" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <Button variant="outline" onClick={onPrevious} className="w-full sm:w-auto">Previous</Button>
          <Button onClick={downloadPDF} className="w-full sm:w-auto">Download Profile</Button>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={sendRequest} className="w-full sm:w-auto">Send Request</Button>
        </div>
      </div>
    </motion.div>
  );
};

// ---------- Main Registration Component ----------
const Registration1 = () => {
  const steps = ["Personal", "Select Role", "Role Details", "Documents", "Review"];
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [personalData, setPersonalData] = useState({
    firstName: "", middleName: "", lastName: "", gender: "", dob: "", whatsappNo: "",
    email: "", village: "", taluka: "", state: "", district: "", nation: ""
  });
  const [role, setRole] = useState("");
  const [landOwnerData, setLandOwnerData] = useState({ surveyNo: "", plotNo: "" });
  const [farmerData, setFarmerData] = useState({ experience: "", specialization: "" });
  const [documents, setDocuments] = useState({});

  const handleNext = () => {
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep((s) => s + 1);
  };
  const handlePrevious = () => setCurrentStep((s) => s - 1);
  const updateDoc = (doc, file) => setDocuments((prev) => ({ ...prev, [doc]: file }));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Registration</h1>
        <StepIndicator steps={steps} currentStep={currentStep} completedSteps={completedSteps} />

        <AnimatePresence mode="wait">
          {currentStep === 0 && <PersonalDetailsStep data={personalData} onUpdate={setPersonalData} onNext={handleNext} />}
          {currentStep === 1 && <RoleSelectionStep role={role} onChangeRole={setRole} onNext={handleNext} onPrevious={handlePrevious} />}
          {currentStep === 2 && <RoleDetailsStep role={role} landOwnerData={landOwnerData} onUpdateLandOwner={setLandOwnerData} farmerData={farmerData} onUpdateFarmer={setFarmerData} onNext={handleNext} onPrevious={handlePrevious} />}
          {currentStep === 3 && <DocumentsStep role={role} documents={documents} onUpdateDoc={updateDoc} onNext={handleNext} onPrevious={handlePrevious} />}
          {currentStep === 4 && <ProfilePreviewStep personalData={personalData} role={role} roleData={role === "landowner" ? landOwnerData : farmerData} documents={documents} onPrevious={handlePrevious} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Registration1;
