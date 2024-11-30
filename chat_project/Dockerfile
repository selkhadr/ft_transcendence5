# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables

# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /chat_project

# Install dependencies
COPY ./requirements.txt /chat_project/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /chat_project/

# Check if manage.py exists
RUN if [ ! -f /chat_project/manage.py ]; then echo "manage.py not found"; exit 1; fi

# Expose the port
EXPOSE 8005

# Define command to start the app
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8005"]