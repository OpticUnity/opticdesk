document.addEventListener('DOMContentLoaded', () => {
  const flatKInput = document.getElementById('flatKinputBc');
  const softBtn = document.getElementById('softClBcBtn');
  const rgpBtn = document.getElementById('rgpClBcBtn');
  const resultBox = document.querySelector('.baseCurveResultBox');
  const resultDisplay = document.getElementById('baseCurveResult');
  const resetBtn = document.getElementById('baseCurveResetBtn');

  // Allow only nn.nn format, live validation
  flatKInput.addEventListener('input', () => {
    let value = flatKInput.value;

    // Remove invalid characters
    value = value.replace(/[^0-9.]/g, '');

    // Allow only one dot
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    let beforeDot = parts[0];
    let afterDot = parts[1] || '';

    // Limit before and after to 2 digits each
    if (beforeDot.length > 2) {
      beforeDot = beforeDot.slice(0, 2);
    }
    if (afterDot.length > 2) {
      afterDot = afterDot.slice(0, 2);
    }

    if (value.includes('.')) {
      value = beforeDot + '.' + afterDot;
    } else {
      value = beforeDot;
    }

    // Auto-add leading zero if starting with dot
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    flatKInput.value = value;
  });

  // Clamp on blur, format to 0.00
  flatKInput.addEventListener('blur', () => {
    let num = parseFloat(flatKInput.value);
    if (isNaN(num)) {
      flatKInput.value = '';
      return;
    }
    if (num < 30) num = 30;
    if (num > 70) num = 70;
    flatKInput.value = num.toFixed(2);
  });

  function computeBaseCurve(isSoft) {
    const kValue = parseFloat(flatKInput.value);
    if (isNaN(kValue) || kValue < 30 || kValue > 70) {
      alert('Please enter a valid K-reading between 30.00 and 70.00.');
      return;
    }
    let baseCurve = 337.5 / kValue;
    if (isSoft) {
      baseCurve += 0.7;
    }
    resultDisplay.textContent = `${baseCurve.toFixed(2)} mm`;
    resultBox.classList.remove('hidden');
  }

  softBtn.addEventListener('click', () => {
    computeBaseCurve(true);
  });

  rgpBtn.addEventListener('click', () => {
    computeBaseCurve(false);
  });

  resetBtn.addEventListener('click', () => {
    flatKInput.value = '';
    resultBox.classList.add('hidden');
    resultDisplay.textContent = 'Text Result';
  });
});
