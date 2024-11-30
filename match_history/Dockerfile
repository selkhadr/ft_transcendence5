# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /match_history

# Install dependencies
COPY ./requirements.txt /match_history/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /match_history/

# Check if manage.py exists
RUN if [ ! -f /match_history/manage.py ]; then echo "manage.py not found"; exit 1; fi

# Expose the port
EXPOSE 8000

# Define command to start the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]