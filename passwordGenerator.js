document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the password generator page to avoid errors
    const passwordGenerator = document.getElementById('section-password-generator');
    if (!passwordGenerator) return;

    const passwordDisplay = document.getElementById('pg-password');
    const lengthInput = document.getElementById('pg-length');
    const countInput = document.getElementById('pg-count');
    const uppercaseCheckbox = document.getElementById('pg-uppercase');
    const lowercaseCheckbox = document.getElementById('pg-lowercase');
    const numbersCheckbox = document.getElementById('pg-numbers');
    const symbolsCheckbox = document.getElementById('pg-symbols');
    const ambiguousCheckbox = document.getElementById('pg-ambiguous');
    const generateBtn = document.getElementById('pg-generate');
    const copyBtn = document.getElementById('pg-copy');
    const passwordList = document.getElementById('pg-password-list');

    // Character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const ambiguousChars = 'il1Lo0O'; // Characters that might be confusing

    // Generate a single password
    function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous) {
        let charset = '';
        
        if (useUppercase) charset += uppercaseChars;
        if (useLowercase) charset += lowercaseChars;
        if (useNumbers) charset += numberChars;
        if (useSymbols) charset += symbolChars;
        
        // Remove ambiguous characters if requested
        if (excludeAmbiguous) {
            for (let i = 0; i < ambiguousChars.length; i++) {
                charset = charset.replace(new RegExp(ambiguousChars[i], 'g'), '');
            }
        }
        
        if (charset.length === 0) {
            return 'Please select at least one character type';
        }
        
        let password = '';
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        
        for (let i = 0; i < length; i++) {
            password += charset[values[i] % charset.length];
        }
        
        return password;
    }

    // Generate multiple passwords
    function generatePasswords() {
        const length = parseInt(lengthInput.value) || 12;
        const count = parseInt(countInput.value) || 1;
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSymbols = symbolsCheckbox.checked;
        const excludeAmbiguous = ambiguousCheckbox.checked;
        
        // Update main password display
        const mainPassword = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous);
        passwordDisplay.value = mainPassword;
        
        // Generate list of passwords
        passwordList.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous);
            const passwordItem = document.createElement('div');
            passwordItem.className = 'pg-password-item';
            passwordItem.innerHTML = `
                <span class="pg-password-text">${password}</span>
                <button class="pg-copy-single" data-password="${password}">Copy</button>
            `;
            passwordList.appendChild(passwordItem);
        }
        
        // Add event listeners to copy buttons
        document.querySelectorAll('.pg-copy-single').forEach(button => {
            button.addEventListener('click', (e) => {
                const password = e.target.getAttribute('data-password');
                navigator.clipboard.writeText(password).then(() => {
                    const originalText = e.target.textContent;
                    e.target.textContent = 'Copied!';
                    setTimeout(() => {
                        e.target.textContent = originalText;
                    }, 2000);
                });
            });
        });
    }

    // Copy main password to clipboard
    function copyPassword() {
        const password = passwordDisplay.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
        }
    }

    // Event listeners
    generateBtn.addEventListener('click', generatePasswords);
    copyBtn.addEventListener('click', copyPassword);
    
    // Generate initial password
    generatePasswords();
});