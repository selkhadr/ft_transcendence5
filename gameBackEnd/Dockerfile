# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /gamebackend

# Install dependencies
COPY ./requirements.txt /gamebackend/
RUN pip install --no-cache-dir -r requirements.txt

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Copy project
COPY . /gamebackend/

# Check if manage.py exists
RUN if [ ! -f /gamebackend/manage.py ]; then echo "manage.py not found"; exit 1; fi

# Expose the ports
EXPOSE 8001 6379

# Define command to start both Redis and the app
# CMD service redis-server start && python manage.py runserver 0.0.0.0:8002
CMD python manage.py runserver 0.0.0.0:8002