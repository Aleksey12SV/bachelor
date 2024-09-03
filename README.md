Here's an improved version of your README:

---

# Project Run-Guide

## Backend (BE)

1. **Build the Backend**:
   - Open a terminal and navigate to the `backend/app/app` directory.
   - Run the following command to clean and package the project, skipping tests:

     ```bash
     mvn clean package -DskipTests
     ```

2. **Start the Backend Services**:
   - Navigate back to the `bachelor` directory, where the `docker-compose.yaml` file is located.
   - Run the following command to start the backend services (Backend, MySQL Database, and Keycloak) in Docker containers:

     ```bash
     docker compose up -d --build
     ```

## Frontend (FE)

1. **Install Dependencies**:
   - Navigate to the `frontend` directory.
   - Run the following command to install the necessary dependencies:

     ```bash
     npm install
     ```

2. **Start the Frontend**:
   - After the dependencies are installed, run the following command to start the frontend development server:

     ```bash
     npm run dev
     ```

## Additional Notes

- Ensure Docker is installed and running on your system before executing the Docker commands.
- For the backend, the `-DskipTests` flag is used to skip tests during the build process. Remove this flag if you want to include tests.
- The backend services (including the database and Keycloak) are configured to run in Docker containers. If you need to stop the services, use:

  ```bash
  docker compose down
  ```

- The frontend development server will typically be accessible at `http://localhost:5173` by default.
