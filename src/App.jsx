import React, { useState } from "react";

const projectTypes = ["IT-projekt", "Organisatorisk förändring", "Teknisk utveckling"];
const attributes = [
  "Behöver något köpas in?",
  "Ska du förändra arbetssätt?",
  "Påverkar det operatörer?",
  "Kräver det utbildning?",
  "Behöver externa leverantörer?",
];

export default function App() {
  const [selectedType, setSelectedType] = useState("");
  const [checkedAttributes, setCheckedAttributes] = useState([]);
  const [generatedProcess, setGeneratedProcess] = useState("");

  const toggleAttribute = (attribute) => {
    setCheckedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
  };

  const generateProcess = () => {
    if (!selectedType) return alert("Välj en projekttyp.");

    let output = `Projektstyrningsprocess för: ${selectedType}\n`;
    checkedAttributes.forEach((attr) => {
      if (attr.includes("köpas")) output += "- Inköpsprocess involveras\n";
      if (attr.includes("arbetssätt")) output += "- Förändringsledning krävs\n";
      if (attr.includes("operatörer")) output += "- Kommunikationsplan krävs\n";
      if (attr.includes("utbildning")) output += "- Skapa utbildningsplan\n";
      if (attr.includes("leverantörer")) output += "- Gör leverantörsbedömning\n";
    });
    setGeneratedProcess(output);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Projektstyrningsapp</h1>

        <label className="block mb-2 font-semibold">Välj projekttyp:</label>
        <div className="flex gap-4 mb-4 flex-wrap">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={\`px-4 py-2 rounded-full border \${selectedType === type
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800 border-gray-300"}\`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="block mb-2 font-semibold">Projektattribut:</label>
        <div className="grid gap-2 mb-6">
          {attributes.map((attr) => (
            <label key={attr} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkedAttributes.includes(attr)}
                onChange={() => toggleAttribute(attr)}
              />
              {attr}
            </label>
          ))}
        </div>

        <button
          onClick={generateProcess}
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
        >
          Generera Projektprocess
        </button>

        {generatedProcess && (
          <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {generatedProcess}
          </pre>
        )}
      </div>
    </div>
  );
}