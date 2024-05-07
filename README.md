# Requirements Analysis

The task involves developing a Proof-of-Concept (POC) for a process management application. The primary requirements are as follows:

1. **Create a new process**: The application should allow creating a new process, which will be assigned a unique Process ID (PID) and a creation timestamp.

2. **Get all processes**: The application should provide a way to retrieve a list of all existing processes, including their PIDs, creation timestamps, and log entries.

3. **Get logs for a specific process**: The application should allow fetching the log entries for a specific process, identified by its PID.

4. **Delete a process**: The application should provide functionality to delete an existing process, identified by its PID.

5. **Simulate process logs**: The application should simulate log entries for each process at a specified interval (e.g., every minute).

6. **Create a demonstrative video**: A video showcasing the functionality of the POC should be created and submitted along with the source code.

# Proof-of-Concept Implementation

The provided code snippet appears to be a Node.js Express application that implements the required functionality. Let's go through the code and analyze its components:

1. **Importing dependencies**: The necessary dependencies, such as Express, Morgan (for logging), Helmet (for security headers), and CORS (for cross-origin resource sharing), are imported.

2. **Setting up the Express app**: The Express app is created, and middleware functions like Morgan, Helmet, CORS, and JSON parsing are configured.

3. **Data structure for processes**: An object `processes` is used to store the process data. Each process is identified by its PID (key), and the value is an object containing the creation time and an array of log entries.

4. **Create a new process**: The `/create-process` endpoint generates a random PID, creates a new process entry in the `processes` object with the current timestamp, and returns the PID and creation time.

5. **Get all processes**: The `/get-all` endpoint retrieves all processes from the `processes` object and sends them as the response.

6. **Get logs for a specific process**: The `/get-single/:pid` endpoint fetches the log entries for a specific process identified by the PID in the URL parameter. If the process is found, it returns the log entries; otherwise, it returns a 404 error.

7. **Delete a process**: The `/delete-process/:pid` endpoint deletes a process identified by the PID in the URL parameter. If the process is found, it is removed from the `processes` object; otherwise, it returns a 404 error.

8. **Simulating process logs**: The code includes a `setInterval` function that runs every minute and simulates a log entry for each existing process by appending a new log object to the `logs` array.

