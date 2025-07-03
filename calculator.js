document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the calculator page to avoid errors
    const calculator = document.getElementById('section-calculator');
    if (!calculator) return;

    const expressionDiv = document.getElementById('calc-expression');
    const resultDiv = document.getElementById('calc-result');
    const buttonsContainer = document.querySelector('.calculator-buttons');
    const modeIndicator = document.getElementById('calc-mode-indicator');

    let state = {
        expression: '',
        latexExpression: '',
        isRad: false, 
        lastAnswer: '0' 
    };
    
    // Configure MathJAX
    window.MathJax = {
        tex: {
            inlineMath: [['<span class="math-inline">', '</span>'], ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };

    // Main function to handle button clicks
    buttonsContainer.addEventListener('click', (event) => { 
        if (event.target.tagName !== 'BUTTON') return; 
        const key = event.target.dataset.key; 
        handleKeyPress(key); 
    });

    const handleKeyPress = (key) => {
        switch (key) {
            case 'ac':
                clearAll(); 
                break;
            case 'del':
                deleteLast(); 
                break;
            case '=':
                calculate(); 
                break;
            case 'rad':
                setMode(true); 
                break;
            case 'deg':
                setMode(false); 
                break;
            case 'ans':
                appendValue(state.lastAnswer, 'Ans'); 
                break;
            default:
                appendToExpression(key); 
        }
        updateDisplay(); 
    };

    const appendToExpression = (key) => {
        const keyMap = {
            'sin': { js: 'Math.sin(', latex: 'sin(' },
            'cos': { js: 'Math.cos(', latex: 'cos(' },
            'tan': { js: 'Math.tan(', latex: 'tan(' },
            'asin': { js: 'Math.asin(', latex: 'arcsin(' },
            'acos': { js: 'Math.acos(', latex: 'arccos(' }, 
            'atan': { js: 'Math.atan(', latex: 'arctan(' }, 
            'log': { js: 'Math.log10(', latex: 'log(' },
            'ln': { js: 'Math.log(', latex: 'ln(' },
            // --- MODIFIED LINE ---
            'sqrt': { js: 'Math.sqrt(', latex: '\\sqrt(' },
            'pow': { js: '^', latex: '^' },
            'pi': { js: 'Math.PI', latex: 'pi' }, 
            'e': { js: 'Math.E', latex: 'e' }, 
            '*': { js: '*', latex: 'xx' },
            '/': { js: '/', latex: '÷' }
        };

        const map = keyMap[key] || { js: key, latex: key }; 
        appendValue(map.js, map.latex); 
    };
    
    const appendValue = (js, latex) => {
        state.expression += js; 
        state.latexExpression += latex; 
    };
    
    const clearAll = () => {
        state.expression = ''; 
        state.latexExpression = ''; 
        resultDiv.textContent = '0'; 
    };

    const deleteLast = () => {
        state.expression = state.expression.slice(0, -1); 
        state.latexExpression = state.latexExpression.slice(0, -1); 
    };

    const setMode = (isRad) => {
        state.isRad = isRad; 
        modeIndicator.textContent = isRad ? 'RAD' : 'DEG'; 
    };

    const calculate = () => {
        if (!state.expression) return; 

        let evalExpression = state.expression.replace(/\^/g, '**');

        // Automatically balance parentheses before evaluation
        const openParens = (evalExpression.match(/\(/g) || []).length;
        const closedParens = (evalExpression.match(/\)/g) || []).length;
        if (openParens > closedParens) {
            evalExpression += ')'.repeat(openParens - closedParens);
        }

        try {
            let evalExpression = state.expression.replace(/\^/g, '**'); 

            // Handle DEG to RAD conversion for trig functions
            if (!state.isRad) { 
                const degToRad = '(Math.PI/180)*'; 
                evalExpression = evalExpression.replace(/Math\.(sin|cos|tan)\(/g, `Math.$1(${degToRad}`); 
            }

            const result = eval(evalExpression);
            if (isNaN(result) || !isFinite(result)) {
                resultDiv.textContent = 'Error';
            } else {
                resultDiv.textContent = parseFloat(result.toFixed(10)); 
                state.lastAnswer = result.toString(); 
            }
        } catch (error) {
            console.error("Calculation Error:", error);
            resultDiv.textContent = 'Error';
        }
    };
    
    const updateDisplay = () => {
        // Use MathJax to render the LaTeX expression
        if (state.latexExpression) {
            expressionDiv.innerHTML = `\\(${state.latexExpression}\\)`; 
            MathJax.typesetPromise([expressionDiv]).catch(err => console.error('MathJax Error:', err)); 
        } else {
            expressionDiv.innerHTML = '';
        }
    };

    // Initialize
    setMode(false); // Default to Degree
    updateDisplay();
});