document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('#home > div');
  
  /**
   * Hides all sections, then shows the requested section.
   * @param {string} selector - CSS selector of the section to show.
   */
  function showSection(selector) {
    sections.forEach(section => section.classList.add('hidden'));
    document.querySelector(selector).classList.remove('hidden');
  }

  // MAIN MENU BUTTONS
  document.getElementById('calculetorBtn').addEventListener('click', () => {
    showSection('.calculatorMenu');
  });

  document.getElementById('formulaBtn').addEventListener('click', () => {
    showSection('.formulaMenu');
  });

  document.getElementById('guideBtn').addEventListener('click', () => {
    showSection('.guideMenu');
  });

  // CALCULATOR MENU
  document.getElementById('lensTranspositionCalcBtn').addEventListener('click', () => {
    showSection('.lensTranspositionUI');
  });

  document.getElementById('contactLensParameterCalcBtn').addEventListener('click', () => {
    showSection('.contactLensParameterMenu');
  });

  document.getElementById('calculatorMenuBackBtn').addEventListener('click', () => {
    showSection('.mainMenu');
  });

  // CONTACT LENS PARAMETER MENU
  document.getElementById('effectivePowerBtn').addEventListener('click', () => {
    showSection('.effectivePowerUI');
  });

  document.getElementById('sphericalEquivalentBtn').addEventListener('click', () => {
    showSection('.sphericalEquivalentUI');
  });

  document.getElementById('baseCurveBtn').addEventListener('click', () => {
    showSection('.baseCurveUI');
  });

  document.getElementById('contactLensParameterBackBtn').addEventListener('click', () => {
    showSection('.calculatorMenu');
  });

  // FORMULA MENU
  document.getElementById('lensTranspositionFormBtn').addEventListener('click', () => {
    showSection('.lensTranspositionFormula');
  });

  document.getElementById('contactLensParameterFormBtn').addEventListener('click', () => {
    showSection('.contactLensParameterFormula');
  });

  document.getElementById('formulaMenuBackBtn').addEventListener('click', () => {
    showSection('.mainMenu');
  });

  // GUIDE MENU
  document.getElementById('guideBackBtn').addEventListener('click', () => {
    showSection('.mainMenu');
  });

  // BACK BUTTONS in sub-views
  document.getElementById('lensTranspositionUIBackBtn').addEventListener('click', () => {
    showSection('.calculatorMenu');
  });

  document.getElementById('effectivePowerUIBackBtn').addEventListener('click', () => {
    showSection('.contactLensParameterMenu');
  });

  document.getElementById('sphericalEquivalentUIBackBtn').addEventListener('click', () => {
    showSection('.contactLensParameterMenu');
  });

  document.getElementById('baseCurveUIBackBtn').addEventListener('click', () => {
    showSection('.contactLensParameterMenu');
  });

  document.getElementById('lensTranspositionFormulaBackBtn').addEventListener('click', () => {
    showSection('.formulaMenu');
  });

  document.getElementById('contactLensParameterFormulaBackBtn').addEventListener('click', () => {
    showSection('.formulaMenu');
  });

});