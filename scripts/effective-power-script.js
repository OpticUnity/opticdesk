// ---------------- Effective Power UI toggle logic ----------------

const formatSelectEp = document.getElementById('effectivePowerFormatSelect');
const formContainer = document.querySelector('.effectivePowerFormContainer');
const sphericalForm = document.querySelector('.sphericalPrescriptionEp');
const cylindricalForm = document.querySelector('.cylindricalPrescriptionEp');
const effectivePowerBody = document.querySelector('.effectivePowerBody');
const effectivePowerResultBox = document.querySelector('.effectivePowerResultBox');

const computeBtnEp = document.getElementById('effectivePowerComputeBtn');
const resetBtnEp = document.getElementById('effectivePowerResetBtn');

// Format selection toggle
formatSelectEp.addEventListener('change', () => {
  formContainer.classList.remove('hidden');
  effectivePowerBody.classList.remove('hidden'); // now shown immediately after selection
  effectivePowerResultBox.classList.add('hidden'); // always hidden initially

  if (formatSelectEp.value === 'sphereEp') {
    sphericalForm.classList.remove('hidden');
    cylindricalForm.classList.add('hidden');
  } else if (formatSelectEp.value === 'cylinderEp') {
    cylindricalForm.classList.remove('hidden');
    sphericalForm.classList.add('hidden');
  }
});

// Reset toggle state
resetBtnEp.addEventListener('click', () => {
  formContainer.classList.add('hidden');
  sphericalForm.classList.add('hidden');
  cylindricalForm.classList.add('hidden');
  effectivePowerBody.classList.add('hidden');
  effectivePowerResultBox.classList.add('hidden');
  formatSelectEp.selectedIndex = 0; // reset to "Select Format"

  // Clear input fields
  document.querySelectorAll('.prescriptionInput').forEach(input => input.value = '');
  document.getElementById('effectivePowerResult').textContent = 'Text Result';
});

// ---------------- Effective Power Live Filtering ----------------

// Live filter for sphere and cylinder: allow "-", digits, one ".", up to 2 decimals
function liveFilterDecimalInput(e) {
    const input = e.target;
    const value = input.value;
    const regex = /^-?\d*\.?\d{0,2}$/;

    if (!regex.test(value)) {
        input.value = value.slice(0, -1);
    }
}

// Live filter for vertex: optional "-", digits only, max 3 digits
function liveFilterVertexInput(e) {
    const input = e.target;
    const value = input.value;
    const regex = /^-?\d{0,3}$/;

    if (!regex.test(value)) {
        input.value = value.slice(0, -1);
    }
}

// Attach live filtering
document.getElementById('sphereInputSpEp').addEventListener('input', liveFilterDecimalInput);
document.getElementById('sphereInputCpEp').addEventListener('input', liveFilterDecimalInput);
document.getElementById('cylinderInputCpEp').addEventListener('input', liveFilterDecimalInput);
document.getElementById('vertexDistanceInputEp').addEventListener('input', liveFilterVertexInput);

// ---------------- Effective Power Axis Input Handling (Updated) ----------------

const axisInputEp = document.getElementById("axisInputCpEp");

// Allow only numbers while typing, max 3 digits
axisInputEp.addEventListener("input", () => {
  axisInputEp.value = axisInputEp.value.replace(/[^\d]/g, '');
  if (axisInputEp.value.length > 3) {
    axisInputEp.value = axisInputEp.value.slice(0, 3);
  }
});

// On blur, correct values to 1–180
axisInputEp.addEventListener("blur", () => {
  const val = parseInt(axisInputEp.value, 10);
  if (!isNaN(val)) {
    if (val < 1) {
      axisInputEp.value = "1";
    } else if (val > 180) {
      axisInputEp.value = "180";
    } else {
      axisInputEp.value = val.toString();
    }
  } else {
    axisInputEp.value = "";
  }
});

// ---------------- Effective Power Blur Validation ----------------

// Utility: validate + format sphere/cylinder to fixed 2 decimals within ±20.00
function validateAndFormatEPInput(input, allowZero = false) {
    let val = input.value.trim();
    if (val === "-" || val === "." || val === "-.") {
        input.value = '';
        return;
    }

    let num = parseFloat(val);
    if (isNaN(num) || Math.abs(num) > 20 || (!allowZero && num === 0)) {
        input.value = '';
        return;
    }

    input.value = num.toFixed(2);
}

// Utility: validate vertex to -999 to -1, 1 to 999 (no zero)
function validateVertexDistanceInput(input) {
    let val = input.value.trim();
    let num = parseInt(val, 10);
    if (isNaN(num) || num === 0 || Math.abs(num) > 999) {
        input.value = '';
        return;
    }
    input.value = num.toString();
}

// Attach blur handlers
document.getElementById('sphereInputSpEp').addEventListener('blur', function() {
    validateAndFormatEPInput(this, false);
});
document.getElementById('sphereInputCpEp').addEventListener('blur', function() {
    validateAndFormatEPInput(this, true);
});
document.getElementById('cylinderInputCpEp').addEventListener('blur', function() {
    validateAndFormatEPInput(this, false);
});
document.getElementById('vertexDistanceInputEp').addEventListener('blur', function() {
    validateVertexDistanceInput(this);
});

computeBtnEp.addEventListener('click', () => {
    const mode = formatSelectEp.value;

    if (mode === 'sphereEp') {
        const sphereVal = sphereInputSpEp.value.trim();
        const vertexVal = vertexDistanceInputEp.value.trim();

        if (sphereVal === '' || vertexVal === '') {
            alert("Please fill in Sphere and Vertex Distance before computing effective power.");
            effectivePowerResultBox.classList.add('hidden');
            return;
        }

        const sphere = parseFloat(sphereVal);
        const vertex = parseInt(vertexVal);

        let newSphere = sphere / (1 - (vertex / 1000) * sphere);
        newSphere = Math.round(newSphere * 4) / 4;

        effectivePowerResult.textContent = `${newSphere >= 0 ? "+" : ""}${newSphere.toFixed(2)} Dsph`;
        effectivePowerResultBox.classList.remove('hidden');

    } else if (mode === 'cylinderEp') {
        const sphereVal = sphereInputCpEp.value.trim();
        const cylVal = cylinderInputCpEp.value.trim();
        const axisVal = axisInputCpEp.value.trim();
        const vertexVal = vertexDistanceInputEp.value.trim();

        if (sphereVal === '' || cylVal === '' || axisVal === '' || vertexVal === '') {
            alert("Please fill in Sphere, Cylinder, Axis, and Vertex Distance before computing effective power.");
            effectivePowerResultBox.classList.add('hidden');
            return;
        }

        const sphere = parseFloat(sphereVal);
        const cyl = parseFloat(cylVal);
        const axis = parseInt(axisVal);
        const vertex = parseInt(vertexVal);

        let newSphere = sphere / (1 - (vertex / 1000) * sphere);
        const secondMeridian = sphere + cyl;
        let newSecondMeridian = secondMeridian / (1 - (vertex / 1000) * secondMeridian);
        let newCyl = newSecondMeridian - newSphere;

        newSphere = Math.round(newSphere * 4) / 4;
        newCyl = Math.round(newCyl * 4) / 4;

        let resultText = '';

        if (newSphere !== 0) {
            resultText += `${newSphere >= 0 ? "+" : ""}${newSphere.toFixed(2)} Dsph / `;
        }
        resultText += `${newCyl >= 0 ? "+" : ""}${newCyl.toFixed(2)} Dcyl x ${axis}`;

        effectivePowerResult.textContent = resultText;
        effectivePowerResultBox.classList.remove('hidden');
    }
});
