const LOCAL_STORAGE_KEY = "visucode_user_code";

const getPlaceholderCode = (language) => {
  if (language === "python") {
    return `# Python visualization code example
import matplotlib.pyplot as plt
import numpy as np

# Generate some data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a simple plot
plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()

# Display the plot
plt.tight_layout()
plt.show()`;
  } else {
    return `# R visualization code example
library(plotly)
p <- plot_ly(x = ~c(1, 2, 3), y = ~c(4, 5, 6), type = 'scatter', mode = 'lines')`;
  }
};

export const getSavedCode = (language) => {
  const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  return saved[language] || getPlaceholderCode(language);
};

export const saveCode = (language, code) => {
  const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  saved[language] = code;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
};
