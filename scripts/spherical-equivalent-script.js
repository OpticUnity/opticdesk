// Utility: format to two decimal with correct sign
function formatDsph(value) {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${Math.abs(value).toFixed(2)} Dsph`;
}

// Validate and correct sphere input live
document.getElementById('sphereInputSe').addEventListener('input', function(e) {
    let val = e.target.value;
    val = val.replace(/[^0-9.\-]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
    if ((val.match(/\-/g) || []).length > 1) val = val.replace(/\-(?!^)/g, '');
    const num = parseFloat(val);
    if (!isNaN(num)) {
        if (num > 20) val = "20.00";
        if (num < -20) val = "-20.00";
    }
    e.target.value = val;
});

// Validate and correct cylinder input live
document.getElementById('cylinderInputSe').addEventListener('input', function(e) {
    let val = e.target.value;
    val = val.replace(/[^0-9.\-]/g, '');
    const parts = val.split('.');
    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
    if ((val.match(/\-/g) || []).length > 1) val = val.replace(/\-(?!^)/g, '');
    const num = parseFloat(val);
    if (!isNaN(num)) {
        if (num > 20) val = "20.00";
        if (num < -20) val = "-20.00";
    }
    e.target.value = val;
});

// Format on blur for sphereInputSe
document.getElementById('sphereInputSe').addEventListener('blur', function(e) {
    let val = parseFloat(e.target.value);
    if (!isNaN(val)) {
        if (val > 20) val = 20;
        if (val < -20) val = -20;
        e.target.value = val.toFixed(2);
    } else {
        e.target.value = '';
    }
});

// Format on blur for cylinderInputSe
document.getElementById('cylinderInputSe').addEventListener('blur', function(e) {
    let val = parseFloat(e.target.value);
    if (!isNaN(val) && val !== 0) {
        if (val > 20) val = 20;
        if (val < -20) val = -20;
        e.target.value = val.toFixed(2);
    } else {
        e.target.value = '';
    }
});

// Compute button
document.getElementById('sphericalEquivalentComputeBtn').addEventListener('click', function() {
    const sphereVal = parseFloat(document.getElementById('sphereInputSe').value);
    const cylVal = parseFloat(document.getElementById('cylinderInputSe').value);

    if (isNaN(sphereVal) || isNaN(cylVal) || cylVal === 0) {
        alert("Please enter valid Sphere and Cylinder values within range.");
        return;
    }

    const sphericalEquivalent = sphereVal + (cylVal / 2);
    const roundedSE = Math.round(sphericalEquivalent * 4) / 4; // round to nearest 0.25

    document.getElementById('sphericalEquivalentResult').textContent = formatDsph(roundedSE);
    document.querySelector('.sphericalEquivalentResultBox').classList.remove('hidden');
});

// Reset button
document.getElementById('sphericalEquivalentResetBtn').addEventListener('click', function() {
    document.getElementById('sphereInputSe').value = '';
    document.getElementById('cylinderInputSe').value = '';
    document.querySelector('.sphericalEquivalentResultBox').classList.add('hidden');
});