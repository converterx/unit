const unitTypeSelect = document.getElementById('unitType');
const inputUnitSelect = document.getElementById('inputUnit');
const outputUnitSelect = document.getElementById('outputUnit');
const convertBtn = document.getElementById('convertBtn');
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');

const units = {
  length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
  weight: ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

const conversionFunctions = {
  length: {
    Meter: value => value,
    Kilometer: value => value / 1000,
    Centimeter: value => value * 100,
    Millimeter: value => value * 1000,
    Mile: value => value / 1609.34,
    Yard: value => value * 1.09361,
    Foot: value => value * 3.28084,
    Inch: value => value * 39.3701,
  },
  weight: {
    Kilogram: value => value,
    Gram: value => value * 1000,
    Milligram: value => value * 1e6,
    Pound: value => value * 2.20462,
    Ounce: value => value * 35.274,
  },
  temperature: {
    Celsius: value => value,
    Fahrenheit: value => (value * 9) / 5 + 32,
    Kelvin: value => value + 273.15,
  }
};

function populateUnits() {
  const unitType = unitTypeSelect.value;
  inputUnitSelect.innerHTML = '';
  outputUnitSelect.innerHTML = '';
  
  units[unitType].forEach(unit => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.textContent = option2.textContent = unit;
    inputUnitSelect.appendChild(option1);
    outputUnitSelect.appendChild(option2);
  });
}

function convert() {
  const unitType = unitTypeSelect.value;
  const inputUnit = inputUnitSelect.value;
  const outputUnit = outputUnitSelect.value;
  const value = parseFloat(inputValue.value);
  
  if (isNaN(value)) {
    outputValue.value = 'Invalid input';
    return;
  }

  let convertedValue = conversionFunctions[unitType][outputUnit](
    conversionFunctions[unitType][inputUnit](value)
  );
  outputValue.value = convertedValue.toFixed(2);
}

unitTypeSelect.addEventListener('change', populateUnits);
convertBtn.addEventListener('click', convert);

populateUnits(); // Initialize units on page load
