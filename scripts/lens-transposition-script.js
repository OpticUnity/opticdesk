// ---------- Lens Transposition UI Toggle Logic ----------

// Utility functions
function show(selector) {
    document.querySelector(selector).classList.remove('hidden');
}

function hide(...selectors) {
    selectors.forEach(selector => {
        document.querySelector(selector).classList.add('hidden');
    });
}

function clearInputs() {
    document.querySelectorAll('.prescriptionInput').forEach(input => {
        input.value = '';
    });
}

// Elements
const formatSelectLt = document.getElementById('cylFormatSelect');
const lensTranspositionFormContainer = document.querySelector('.lensTranspositionFormContainer');
const resultBox = document.querySelector('.lensTranspositionResultBox');

const minusCylContainer = document.querySelector('.minusCylContainer');
const plusCylContainer = document.querySelector('.plusCylContainer');
const crossCylContainer = document.querySelector('.crossCylContainer');

const resetBtnLt = document.getElementById('lensTranspositionResetBtn');

// Format selection handling
formatSelectLt.addEventListener('change', () => {
    show('.lensTranspositionFormContainer');
    hide('.lensTranspositionResultBox'); 
    hide('.minusCylContainer', '.plusCylContainer', '.crossCylContainer');

    const selected = formatSelectLt.value;
    if (selected === 'minusCyl') {
        show('.minusCylContainer');
    } else if (selected === 'plusCyl') {
        show('.plusCylContainer');
    } else if (selected === 'crossCyl') {
        show('.crossCylContainer');
    }
});

// Convert buttons handling
document.getElementById('minusConvertPlusBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});
document.getElementById('minusConverCrossBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});
document.getElementById('plusConvertMinusBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});
document.getElementById('plusConvertCrossBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});
document.getElementById('crossConvertMinusBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});
document.getElementById('crossConvertPlusBtn').addEventListener('click', () => {
    show('.lensTranspositionResultBox');
});

// Reset button handling
resetBtnLt.addEventListener('click', () => {
    hide('.lensTranspositionResultBox', '.lensTranspositionFormContainer',
         '.minusCylContainer', '.plusCylContainer', '.crossCylContainer');

    formatSelectLt.selectedIndex = 0; // Reset dropdown to placeholder
    clearInputs();
});

// ------------------- INPUT PARAMETERS -------------------

document.addEventListener("DOMContentLoaded", () => {
  // ------------- SPHERE INPUTS -------------
  const sphereInputs = [
    document.getElementById("sphereInputMcp"),
    document.getElementById("sphereInputPcp")
  ];

  sphereInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^\d\.\-\+]/g, ''); // allow numbers, +, -, .
      const parts = input.value.match(/^([+-]?)(\d*)(\.?\d*)$/);
      if (!parts) input.value = "";
    });

    input.addEventListener("blur", () => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) {
        if (val < -20) input.value = "-20.00";
        else if (val > 20) input.value = "20.00";
        else input.value = val.toFixed(2);
      } else {
        input.value = "";
      }
    });
  });

// ------------- CYLINDER INPUTS -------------

const cylInputs = [
  document.getElementById("cylinderInputMcp"),
  document.getElementById("cylinderInputPcp"),
];

cylInputs.forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d\.]/g, '');
    const parts = input.value.match(/^(\d*)(\.?\d*)$/);
    if (!parts) input.value = "";
  });

  input.addEventListener("blur", () => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      if (val === 0) {
        input.value = ""; // Prevent zero
      } else if (val < 0) {
        input.value = "0.00";
      } else if (val > 20) {
        input.value = "20.00";
      } else {
        input.value = val.toFixed(2);
      }
    } else {
      input.value = "";
    }
  });
});

// For cylOneInputCcp and cylTwoInputCcp (sign allowed)

const crossCylInputs = [
  document.getElementById("cylOneInputCcp"),
  document.getElementById("cylTwoInputCcp"),
];

crossCylInputs.forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d\.\-\+]/g, ''); // allow +, -, ., digits
    const parts = input.value.match(/^([+-]?)(\d*)(\.?\d*)$/);
    if (!parts) input.value = "";
  });

  input.addEventListener("blur", () => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      if (val < -20) input.value = "-20.00";
      else if (val > 20) input.value = "20.00";
      else input.value = val.toFixed(2);
    } else {
      input.value = "";
    }
  });
});


  // ------------- AXIS INPUTS -------------
  const axisInputs = [
    document.getElementById("axisInputMcp"),
    document.getElementById("axisInputPcp"),
    document.getElementById("axisInputCcp")
  ];

  axisInputs.forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^\d]/g, ''); // numbers only
      if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
      }
    });

    input.addEventListener("blur", () => {
      const val = parseInt(input.value, 10);
      if (!isNaN(val)) {
        if (val < 1) input.value = "1";
        else if (val > 180) input.value = "180";
        else input.value = val.toString();
      } else {
        input.value = "";
      }
    });
  });
});

function rotateAxis(axis) {
    return (axis + 90 > 180) ? axis - 90 : axis + 90;
}

function normalizeAxis(axis) {
    let a = parseInt(axis, 10);
    if (a > 180) a = 180;
    if (a < 1) a = 1;
    return a;
}

function formatD(val) {
    const n = parseFloat(val);
    return (n > 0 ? "+" : (n < 0 ? "-" : "")) + Math.abs(n).toFixed(2);
}


const correctKey = "meridian"; // your lowercase-only key

function checkAccess() {
  const input = document.getElementById('accessInput').value;
  const errorMsg = document.getElementById('errorMsg');

  const regex = /^[a-z]+$/; // only lowercase letters

  if (!regex.test(input)) {
    errorMsg.textContent = "Only lowercase letters are allowed (a-z).";
    errorMsg.style.display = 'block';
    return;
  }

  if (input === correctKey) {
    document.body.classList.remove('locked');
    document.getElementById('lockOverlay').style.display = 'none';
  } else {
    errorMsg.textContent = "Incorrect key. Try again.";
    errorMsg.style.display = 'block';
  }
}



// --------------- LENS TRANSPOSITION CALCULATION ---------------

// Utility
function formatValue(value) {
    return (value >= 0 ? '+' : '') + value.toFixed(2);
}

function formatResult(sph, cyl, axis) {
    if (sph === null && cyl !== null && axis !== null) {
        return `${formatValue(cyl)} Dcyl x ${axis}`;
    } else if (sph !== null && cyl !== null && axis !== null) {
        return `${formatValue(sph)} Dsph / ${formatValue(cyl)} Dcyl x ${axis}`;
    } else {
        return '';
    }
}

function rotateAxis(axis) {
    return (axis + 90) % 180 === 0 ? 180 : (axis + 90) % 180;
}

// ------- Minus Cyl to Plus Cyl -------
document.getElementById('minusConvertPlusBtn').addEventListener('click', () => {
    const sphere = parseFloat(document.getElementById('sphereInputMcp').value);
    const cyl = parseFloat(document.getElementById('cylinderInputMcp').value);
    const axis = parseInt(document.getElementById('axisInputMcp').value, 10);

    if (isNaN(sphere) || isNaN(cyl) || isNaN(axis) || axis === 0 || cyl === 0) {
        alert("Invalid input: Please ensure Sphere, Cylinder, and Axis are correctly filled. Cylinder and Axis cannot be zero.");
        hide('.lensTranspositionResultBox');
        return;
    }

    const negCyl = -cyl;
    const resultSphere = sphere + negCyl;
    const resultCyl = Math.abs(negCyl);
    const resultAxis = rotateAxis(axis);

    let resultText = (Math.abs(resultSphere) < 0.01) 
        ? formatResult(null, resultCyl, resultAxis)
        : formatResult(resultSphere, resultCyl, resultAxis);

    document.getElementById('lensTranspositionResult').innerText = resultText;
    show('.lensTranspositionResultBox');
});

// ------- Plus Cyl to Minus Cyl -------
document.getElementById('plusConvertMinusBtn').addEventListener('click', () => {
    const sphere = parseFloat(document.getElementById('sphereInputPcp').value);
    const cyl = parseFloat(document.getElementById('cylinderInputPcp').value);
    const axis = parseInt(document.getElementById('axisInputPcp').value, 10);

    if (isNaN(sphere) || isNaN(cyl) || isNaN(axis) || axis === 0 || cyl === 0) {
        alert("Invalid input: Please ensure Sphere, Cylinder, and Axis are correctly filled. Cylinder and Axis cannot be zero.");
        hide('.lensTranspositionResultBox');
        return;
    }

    const posCyl = cyl;
    const resultSphere = sphere + posCyl;
    const resultCyl = -posCyl;
    const resultAxis = rotateAxis(axis);

    let resultText = (Math.abs(resultSphere) < 0.01) 
        ? formatResult(null, resultCyl, resultAxis)
        : formatResult(resultSphere, resultCyl, resultAxis);

    document.getElementById('lensTranspositionResult').innerText = resultText;
    show('.lensTranspositionResultBox');
});

// ------- Minus/Plus Cyl to Cross Cyl -------
document.getElementById('minusConverCrossBtn').addEventListener('click', handleCylToCross);
document.getElementById('plusConvertCrossBtn').addEventListener('click', handleCylToCross);

function handleCylToCross() {
    const isMinus = document.querySelector('.minusCylContainer').classList.contains('hidden') === false;
    const sphere = parseFloat(isMinus 
        ? document.getElementById('sphereInputMcp').value 
        : document.getElementById('sphereInputPcp').value);
    const cyl = parseFloat(isMinus 
        ? document.getElementById('cylinderInputMcp').value 
        : document.getElementById('cylinderInputPcp').value);
    const axis = parseInt(isMinus 
        ? document.getElementById('axisInputMcp').value 
        : document.getElementById('axisInputPcp').value, 10);

    if (isNaN(sphere) || isNaN(cyl) || isNaN(axis) || axis === 0) {
        alert("Invalid input: Please ensure Sphere, Cylinder, and Axis are correctly filled. Axis cannot be zero.");
        hide('.lensTranspositionResultBox');
        return;
    }

    const effectiveCyl = isMinus ? -cyl : cyl;
    const axis1 = rotateAxis(axis);
    const cyl1 = Math.abs(sphere);
    const cyl2 = sphere + effectiveCyl;

    let resultParts = [];

    if (Math.abs(cyl1) > 0.01) {
        resultParts.push(`${formatValue(sphere)} Dcyl x ${axis1}`);
    }
    if (Math.abs(cyl2) > 0.01) {
        resultParts.push(`${formatValue(cyl2)} Dcyl x ${axis}`);
    }

    if (resultParts.length === 0) {
        alert("Calculation invalid: Both results computed to zero, cannot display.");
        hide('.lensTranspositionResultBox');
        return;
    }

    document.getElementById('lensTranspositionResult').innerText = resultParts.join(' / ');
    show('.lensTranspositionResultBox');
}

// ------- Cross Cyl to Plus / Minus Cyl -------
document.getElementById('crossConvertPlusBtn').addEventListener('click', () => handleCrossToCyl(true));
document.getElementById('crossConvertMinusBtn').addEventListener('click', () => handleCrossToCyl(false));

function handleCrossToCyl(isPlusConversion) {
    const cyl1 = parseFloat(document.getElementById('cylOneInputCcp').value);
    const cyl2 = parseFloat(document.getElementById('cylTwoInputCcp').value);
    const axis1 = parseInt(document.getElementById('axisInputCcp').value, 10);
    const axis2 = rotateAxis(axis1);

    if (isNaN(cyl1) || isNaN(cyl2) || isNaN(axis1) || axis1 === 0) {
        alert("Invalid input: Ensure both Cyl values and Axis are correctly filled. Axis cannot be zero.");
        hide('.lensTranspositionResultBox');
        return;
    }

    const [sph, unusedCyl, unusedAxis] = isPlusConversion
        ? (cyl1 <= cyl2 ? [cyl1, cyl2, axis2] : [cyl2, cyl1, axis1])
        : (cyl1 >= cyl2 ? [cyl1, cyl2, axis2] : [cyl2, cyl1, axis1]);

    let resultSphere = sph;
    let resultCyl = -(sph - unusedCyl);

    if (Math.abs(cyl1 - cyl2) < 0.01) {
        document.getElementById('lensTranspositionResult').innerText = formatValue(resultSphere) + " Dsph";
        show('.lensTranspositionResultBox');
        return;
    }

    if (Math.abs(resultSphere) < 0.01 && Math.abs(resultCyl) < 0.01) {
        alert("Calculation invalid: Results computed to zero.");
        hide('.lensTranspositionResultBox');
        return;
    }

    let resultText = (Math.abs(resultSphere) < 0.01)
        ? formatResult(null, resultCyl, unusedAxis)
        : formatResult(resultSphere, resultCyl, unusedAxis);

    document.getElementById('lensTranspositionResult').innerText = resultText;
    show('.lensTranspositionResultBox');
}







