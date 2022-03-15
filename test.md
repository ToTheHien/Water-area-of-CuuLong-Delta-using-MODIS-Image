# AI Service for Predictive Maintenance Project
This repository contains the AI service for Predictive Maintenance Project which deal with the time series dataset of 2 sensors. The sensors are called smartchecks and each smartcheck contains 4 features including *Acceleration*, *Demodulation*, *Peak2peak*, and *Velocity*.

We use 3 types of models which are *Support Vector Regression*, *Gaussion Process Regressor* and *Stack model*. Each feature of each smartcheck will be applied a corresponding model based on the results expressed in testing phase.

# Installation
Before running the project, you can install the **required libraries** from pip using:
```python
pip install --upgrade pip
pip install -r requirements.txt
```

The **requirements.txt** contains all of the necessary libraries that use for our time series models.

# Set up Scheduler
Use cron jobs to set time for auto predict new data.

You can read detailed instructions on cron jobs at the following link [cronjobs](https://www.geeksforgeeks.org/how-to-setup-cron-jobs-in-ubuntu/)

You also find the instructions to modify setting of date-time to run file here [crontab guru](https://crontab.guru/)

