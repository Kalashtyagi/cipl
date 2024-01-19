import React from 'react'

const SubmitInterview = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Popup Heading</h2>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="border w-full p-2 mb-4"
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              {/* Add more options as needed */}
            </select>
            <button
              onClick={handlePopupSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="ml-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
    
   
  )
}

export default SubmitInterview