/**
 * ATPL GROUP - INTERACTIVE AUTOMATION & ROI CALCULATOR
 */

document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.getElementById('calc-volume');
  const workersSlider = document.getElementById('calc-workers');
  const errorRateSlider = document.getElementById('calc-error-rate');

  const volumeVal = document.getElementById('calc-volume-val');
  const workersVal = document.getElementById('calc-workers-val');
  const errorRateVal = document.getElementById('calc-error-val');

  const roiSavings = document.getElementById('res-annual-savings');
  const roiPayback = document.getElementById('res-payback-time');
  const roiAccuracy = document.getElementById('res-accuracy-gain');

  if (!volumeSlider || !workersSlider || !errorRateSlider) return;

  function calculateROI() {
    const dailyVolume = parseInt(volumeSlider.value, 10);
    const workersCount = parseInt(workersSlider.value, 10);
    const currentErrorRate = parseFloat(errorRateSlider.value);

    // Update Display Values
    if (volumeVal) volumeVal.textContent = dailyVolume.toLocaleString() + ' units/day';
    if (workersVal) workersVal.textContent = workersCount + ' operators';
    if (errorRateVal) errorRateVal.textContent = currentErrorRate + '%';

    // Economic assumptions (INR & USD benchmarked)
    const annualLaborCostPerWorker = 350000; // INR (~$4,200/yr)
    const costPerErrorIncident = 850; // Cost of repackaging, recall, delay

    // Projected improvements with ATPL Industry 4.0 stack
    const laborEfficiencyGain = 0.45; // 45% productivity boost
    const errorReductionFactor = 0.95; // 95% elimination of manual errors

    const laborSavings = workersCount * annualLaborCostPerWorker * laborEfficiencyGain;
    const annualErrors = (dailyVolume * 300) * (currentErrorRate / 100);
    const errorSavings = annualErrors * errorReductionFactor * costPerErrorIncident;

    const totalAnnualSavings = Math.round(laborSavings + errorSavings);
    
    // Estimated implementation capex
    const estimatedCapex = 1800000 + (workersCount * 45000) + (dailyVolume * 80);
    const paybackMonths = Math.max(2.5, Math.min(18.0, (estimatedCapex / totalAnnualSavings) * 12)).toFixed(1);

    // Display results formatted
    if (roiSavings) {
      if (totalAnnualSavings >= 10000000) {
        roiSavings.textContent = '₹' + (totalAnnualSavings / 10000000).toFixed(2) + ' Cr / yr';
      } else {
        roiSavings.textContent = '₹' + (totalAnnualSavings / 100000).toFixed(1) + ' Lakhs / yr';
      }
    }

    if (roiPayback) {
      roiPayback.textContent = paybackMonths + ' Months';
    }

    if (roiAccuracy) {
      roiAccuracy.textContent = '99.98%';
    }
  }

  volumeSlider.addEventListener('input', calculateROI);
  workersSlider.addEventListener('input', calculateROI);
  errorRateSlider.addEventListener('input', calculateROI);

  // Initial calculation
  calculateROI();
});
