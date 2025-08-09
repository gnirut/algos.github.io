/**
 * Unit tests for the core linear search logic.
 * This file is intended to be run in a browser environment using a simple test runner.
 */

// A simple assertion library for testing
const assert = {
    equals: (actual, expected, message) => {
        if (actual !== expected) {
            throw new Error(`Assertion Failed: ${message}. Expected ${expected}, but got ${actual}.`);
        }
    },
    isTrue: (value, message) => {
        if (!value) {
            throw new Error(`Assertion Failed: ${message}. Expected true, but got false.`);
        }
    }
};

// The core algorithm function to be tested (decoupled from the DOM)
const linearSearchAlgorithm = (arr, target) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return the index where the target is found
        }
    }
    return -1; // Return -1 if the target is not found
};


// Test Suite
const runTests = () => {
    const resultsElement = document.getElementById('test-results');
    let passed = 0;
    let failed = 0;

    const test = (name, fn) => {
        try {
            fn();
            const li = document.createElement('li');
            li.className = 'text-green-400';
            li.textContent = `✔ PASS: ${name}`;
            resultsElement.appendChild(li);
            passed++;
        } catch (e) {
            const li = document.createElement('li');
            li.className = 'text-red-400';
            li.textContent = `✖ FAIL: ${name} - ${e.message}`;
            resultsElement.appendChild(li);
            failed++;
        }
    };

    // --- Start of Tests ---

    test('should find an element that exists in the array', () => {
        const arr = [10, 20, 80, 30, 60, 50];
        const target = 80;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, 2, 'Should return the correct index');
    });

    test('should return -1 for an element that does not exist', () => {
        const arr = [10, 20, 80, 30, 60, 50];
        const target = 100;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, -1, 'Should return -1');
    });

    test('should find the first occurrence of a duplicate element', () => {
        const arr = [5, 15, 25, 15, 30];
        const target = 15;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, 1, 'Should return the index of the first match');
    });

    test('should work with an empty array', () => {
        const arr = [];
        const target = 5;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, -1, 'Should return -1 for an empty array');
    });

    test('should find an element at the beginning of the array', () => {
        const arr = [99, 1, 2, 3];
        const target = 99;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, 0, 'Should return index 0');
    });

    test('should find an element at the end of the array', () => {
        const arr = [1, 2, 3, 99];
        const target = 99;
        const result = linearSearchAlgorithm(arr, target);
        assert.equals(result, 3, 'Should return the last index');
    });

    // --- End of Tests ---

    const summary = document.createElement('p');
    summary.className = 'mt-4 font-bold';
    if(failed === 0) {
        summary.className += ' text-green-400';
        summary.textContent = `All ${passed} tests passed!`;
    } else {
        summary.className += ' text-red-400';
        summary.textContent = `${passed} passed, ${failed} failed.`;
    }
    resultsElement.appendChild(summary);
};

// Run tests when the page loads
window.onload = runTests;
