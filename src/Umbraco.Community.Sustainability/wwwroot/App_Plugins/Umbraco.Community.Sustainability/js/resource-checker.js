import { co2, hosting } from 'https://cdn.skypack.dev/@tgwf/co2';

scrollPage();

export function scrollPage() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
  
  setTimeout(reportEmissions, 2000);
}

export async function reportEmissions() {
  const emissionsData = await getEmissionsData();

  const emissionsDiv = document.createElement("div");
  emissionsDiv.setAttribute("data-testid", "sustainabilityData");
  emissionsDiv.innerHTML = JSON.stringify(emissionsData);

  document.body.appendChild(emissionsDiv);
}

export async function getEmissionsData() {
  const resources = getResources();
  const bytesSent = getTransferSize(resources);
  const hostCheck = await hosting.check(window.location.hostname);

  const co2Emission = new co2({ model: "swd" });
  const emissions = co2Emission.perVisitTrace(bytesSent, hostCheck);

  return {
    pageWeight: bytesSent,
    carbonRating: calculateGrade(emissions.co2),
    emissions: emissions,
    resources: resources
  };
}

export function getResources() {
  return window.performance.getEntriesByType("resource");
}

export function filterResourceByType(resources, entryType) {
  return resources.filter(
    (entry) => entry.initiatorType === entryType,
  );
}

export function getTransferSize(resources) {
  let bytesSent = 0;
  resources.forEach((entry) => {
    bytesSent += entry.transferSize;
  });

  return bytesSent;
}

export function calculateGrade(score) {
  // grade using swd digital carbon ratings
  // https://sustainablewebdesign.org/digital-carbon-ratings/
  if (score < 0.095) {
    return 'A+';
  } else if (score < 0.186) {
    return 'A';
  } else if (score < 0.341) {
    return 'B';
  } else if (score < 0.493) {
    return 'C';
  } else if (score < 0.656) {
    return 'D';
  } else if (score < 0.846) {
    return 'E';
  } else {
    return 'F';
  }
}
