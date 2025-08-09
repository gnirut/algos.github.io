document.addEventListener('DOMContentLoaded', () => {
    const visualizationArea = document.getElementById('visualization-area');
    const resetBtn = document.getElementById('reset-btn');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const statusMessage = document.getElementById('status-message');
    let array = [];
    let isSearching = false;

    const generateArray = (size = 10) => Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);

    const renderArray = () => {
        visualizationArea.innerHTML = '';
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.id = `element-${index}`;
            element.className = 'array-element flex flex-col items-center justify-center w-16 h-16 m-1 bg-gray-700 rounded-lg border-2 border-gray-600 transition-all duration-300';
            element.innerHTML = `<span class="text-2xl font-bold">${value}</span><span class="text-xs text-gray-400 mt-1">[${index}]</span>`;
            visualizationArea.appendChild(element);
        });
    };

    const setStatus = (message, type = 'default') => {
        statusMessage.textContent = message;
        statusMessage.className = 'mt-4 text-center text-lg font-semibold h-8 transition-all'; // Reset classes
        const colors = { searching: 'text-cyan-400', found: 'text-green-400', 'not-found': 'text-red-400', error: 'text-red-400', default: 'text-gray-300' };
        statusMessage.classList.add(colors[type]);
    };

    const toggleControls = (enable) => {
        isSearching = !enable;
        [resetBtn, searchInput, searchBtn].forEach(el => {
            el.disabled = !enable;
            el.classList.toggle('opacity-50', !enable);
            el.classList.toggle('cursor-not-allowed', !enable);
        });
    };

    const resetVisualization = () => {
        array = generateArray();
        renderArray();
        setStatus('Generate a new array or enter a value to search.');
        searchInput.value = '';
        toggleControls(true);
    };

    const linearSearch = async (target) => {
        toggleControls(false);
        renderArray();
        for (let i = 0; i < array.length; i++) {
            if (isSearching === false) break;
            const element = document.getElementById(`element-${i}`);
            setStatus(`Checking index ${i}... Is ${array[i]} == ${target}?`, 'searching');
            element.classList.add('border-cyan-500', 'transform', 'scale-110');
            await new Promise(resolve => setTimeout(resolve, 700));
            if (array[i] === target) {
                setStatus(`Found ${target} at index ${i}!`, 'found');
                element.classList.replace('border-cyan-500', 'border-green-500');
                element.classList.add('bg-green-500/30');
                toggleControls(true);
                return;
            }
            element.classList.remove('border-cyan-500', 'transform', 'scale-110');
            element.classList.add('bg-red-500/20');
        }
        if (isSearching) {
            setStatus(`${target} was not found in the array.`, 'not-found');
            toggleControls(true);
        }
    };

    resetBtn.addEventListener('click', resetVisualization);
    searchBtn.addEventListener('click', () => {
        const value = parseInt(searchInput.value, 10);
        if (isNaN(value)) {
            setStatus('Please enter a valid number.', 'error');
            return;
        }
        linearSearch(value);
    });

    resetVisualization();
});