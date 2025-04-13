FROM r-base

# Install system dependencies for rendering + RGL
RUN apt-get update && apt-get install -y \
    libgl1-mesa-dev \
    libx11-dev \
    xauth \
    xfonts-base \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Install required R packages including htmlwidgets
RUN R -e "install.packages(c('ggplot2', 'plotly', 'rgl', 'dplyr', 'tidyr', 'data.table', 'htmlwidgets'), repos='http://cran.rstudio.com/')"

WORKDIR /app
CMD ["Rscript", "/app/script.r"]
