import { useState, useRef } from 'react';
import { QrCode, Upload } from 'lucide-react';

export default function AdmitCardGenerator() {
  // State for form inputs
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    class: "10",
    section: "A",
    roll: "42",
    studentId: "S10A42",
    examType: "Final Term Examination 2025",
    subjects: [
      { name: "Mathematics", code: "MATH101", date: "2025-05-10", time: "09:00 AM - 12:00 PM" },
      { name: "Science", code: "SCI102", date: "2025-05-12", time: "09:00 AM - 12:00 PM" },
      { name: "English", code: "ENG103", date: "2025-05-14", time: "09:00 AM - 12:00 PM" },
    ],
    schoolName: "ABC Public School",
    schoolLogo: "/api/placeholder/80/80",
    studentPhoto: "/api/placeholder/120/150"
  });

  // References for file inputs
  const schoolLogoInputRef = useRef(null);
  const studentPhotoInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value
    });
  };

  // Handle image uploads
  const handleImageUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStudentInfo({
          ...studentInfo,
          [imageType]: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle subject changes
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...studentInfo.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setStudentInfo({
      ...studentInfo,
      subjects: updatedSubjects
    });
  };

  // Add new subject
  const addSubject = () => {
    setStudentInfo({
      ...studentInfo,
      subjects: [
        ...studentInfo.subjects,
        { name: "", code: "", date: "", time: "" }
      ]
    });
  };

  // Remove subject
  const removeSubject = (index) => {
    const updatedSubjects = studentInfo.subjects.filter((_, i) => i !== index);
    setStudentInfo({
      ...studentInfo,
      subjects: updatedSubjects
    });
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">School Exam Admit Card Generator</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-2/5 bg-white rounded-lg shadow p-6 print:hidden">
            <h2 className="text-xl font-semibold mb-4">School Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={studentInfo.schoolName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Logo</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 border flex items-center justify-center bg-gray-50">
                    <img 
                      src={studentInfo.schoolLogo} 
                      alt="School Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={schoolLogoInputRef}
                      onChange={(e) => handleImageUpload(e, 'schoolLogo')}
                      className="hidden"
                    />
                    <button
                      onClick={() => schoolLogoInputRef.current.click()}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Upload size={16} />
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Student Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    name="class"
                    value={studentInfo.class}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    name="section"
                    value={studentInfo.section}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    name="roll"
                    value={studentInfo.roll}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={studentInfo.studentId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Photo</label>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-32 border flex items-center justify-center bg-gray-50">
                    <img 
                      src={studentInfo.studentPhoto} 
                      alt="Student" 
                      className="max-w-full max-h-full object-cover"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={studentPhotoInputRef}
                      onChange={(e) => handleImageUpload(e, 'studentPhoto')}
                      className="hidden"
                    />
                    <button
                      onClick={() => studentPhotoInputRef.current.click()}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Upload size={16} />
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
                <input
                  type="text"
                  name="examType"
                  value={studentInfo.examType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Exam Subjects</h2>
            
            {studentInfo.subjects.map((subject, index) => (
              <div key={index} className="p-3 border rounded-md mb-3 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Subject #{index + 1}</h3>
                  <button 
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
                    <input
                      type="text"
                      value={subject.code}
                      onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
                    <input
                      type="date"
                      value={subject.date}
                      onChange={(e) => handleSubjectChange(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Time</label>
                    <input
                      type="text"
                      value={subject.time}
                      onChange={(e) => handleSubjectChange(index, 'time', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="e.g. 09:00 AM - 12:00 PM"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={addSubject}
              className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Subject
            </button>

            <button 
              onClick={handlePrint}
              className="mt-8 w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
            >
              Print Admit Card
            </button>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div id="admit-card" className="border-2 border-gray-800 p-6 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-4 flex items-center justify-center">
                      <img src={studentInfo.schoolLogo} alt="School Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{studentInfo.schoolName}</h1>
                      <p className="text-lg font-semibold">{studentInfo.examType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">ADMIT CARD</p>
                  </div>
                </div>

                {/* Student Info */}
                <div className="flex mt-4">
                  <div className="w-3/4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Student Name</p>
                        <p className="font-semibold">{studentInfo.name}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Student ID</p>
                        <p className="font-semibold">{studentInfo.studentId}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Class</p>
                        <p className="font-semibold">{studentInfo.class}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Section</p>
                        <p className="font-semibold">{studentInfo.section}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Roll Number</p>
                        <p className="font-semibold">{studentInfo.roll}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4 flex flex-col items-center">
                    <div className="w-24 h-32 border border-gray-300 flex items-center justify-center overflow-hidden">
                      <img src={studentInfo.studentPhoto} alt="Student" className="max-w-full max-h-full object-cover" />
                    </div>
                    <div className="mt-2 flex justify-center">
                      <QrCode size={64} />
                    </div>
                  </div>
                </div>

                {/* Exam Schedule */}
                <div className="mt-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-800 pb-2">Examination Schedule</h2>
                  <table className="w-full mt-3">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentInfo.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{subject.code}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject.date ? new Date(subject.date).toLocaleDateString() : ''}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{subject.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Instructions and Signature */}
                <div className="mt-6">
                  <h3 className="font-bold">Instructions:</h3>
                  <ul className="list-disc ml-5 text-sm mt-1">
                    <li>Students must bring this admit card to every examination.</li>
                    <li>Reach the examination center at least 30 minutes before the scheduled time.</li>
                    <li>Mobile phones and other electronic devices are not permitted in the examination hall.</li>
                    <li>Students without proper uniform will not be allowed to enter the examination hall.</li>
                  </ul>
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="text-center">
                    <div className="border-t-2 border-black pt-1 w-48">
                      <p className="font-semibold">Principal's Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}