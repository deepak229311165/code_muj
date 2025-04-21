import React, { useState } from 'react';
import { Play, Check, X } from 'lucide-react';

interface CodeEditorProps {
  problem: {
    _id: string;
    title: string;
    description: string;
    testCases: Array<{
      input: string;
      output: string;
    }>;
  };
  onSolve: (problemId: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problem, onSolve }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }>>([]);

  const runCode = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const results = [];
      for (const testCase of problem.testCases) {
        // Create a function from the user's code
        const userFunction = new Function('input', `
          ${code}
          return solution(input);
        `);

        // Run the function with the test case input
        const actualOutput = userFunction(testCase.input);
        const passed = actualOutput.toString() === testCase.output;

        results.push({
          input: testCase.input,
          expected: testCase.output,
          actual: actualOutput.toString(),
          passed
        });
      }

      setTestResults(results);
      
      // If all tests passed, mark the problem as solved
      if (results.every(result => result.passed)) {
        onSolve(problem._id);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
      <p className="text-gray-600 mb-6">{problem.description}</p>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Your Solution:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 border rounded-md font-mono text-sm"
          placeholder="Write your solution here..."
        />
      </div>

      <button
        onClick={runCode}
        disabled={isRunning}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        <Play className="w-4 h-4 mr-2" />
        {isRunning ? 'Running...' : 'Run Code'}
      </button>

      {testResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Test Results:</h3>
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  result.passed ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  {result.passed ? (
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <X className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <span className="font-semibold">
                    Test Case {index + 1}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Input:</p>
                    <p className="font-mono">{result.input}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expected Output:</p>
                    <p className="font-mono">{result.expected}</p>
                  </div>
                  {!result.passed && (
                    <div className="col-span-2">
                      <p className="text-gray-600">Your Output:</p>
                      <p className="font-mono">{result.actual}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor; 