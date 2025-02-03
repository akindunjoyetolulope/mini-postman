import { useState } from "react";

const ResponseValidation = ({ response }: { response: any }) => {
  const [rules, setRules] = useState<{ field: string; expected: string }[]>([]);
  const [results, setResults] = useState<{ rule: string; passed: boolean }[]>(
    []
  );

  const validateResponse = () => {
    if (!response) return;

    const validationResults = rules.map(({ field, expected }) => {
      const actualValue = response.data?.[field];
      return {
        rule: `${field} should be "${expected}"`,
        passed: actualValue == expected,
      };
    });

    setResults(validationResults);
  };

  const addRule = () => {
    setRules([...rules, { field: "", expected: "" }]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">Response Validation</h3>
      {rules.map((rule, index) => (
        <div key={index} className="flex space-x-2 mt-2">
          <input
            type="text"
            value={rule.field}
            onChange={(e) => {
              const newRules = [...rules];
              newRules[index].field = e.target.value;
              setRules(newRules);
            }}
            placeholder="Field Name"
            className="p-2 border"
          />
          <input
            type="text"
            value={rule.expected}
            onChange={(e) => {
              const newRules = [...rules];
              newRules[index].expected = e.target.value;
              setRules(newRules);
            }}
            placeholder="Expected Value"
            className="p-2 border"
          />
        </div>
      ))}
      <button
        onClick={addRule}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Rule
      </button>
      <button
        onClick={validateResponse}
        className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Validate Response
      </button>
      {results.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold">Validation Results:</h4>
          {results.map((res, index) => (
            <p
              key={index}
              className={res.passed ? "text-green-500" : "text-red-500"}
            >
              {res.rule}: {res.passed ? "✅ Passed" : "❌ Failed"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponseValidation;
