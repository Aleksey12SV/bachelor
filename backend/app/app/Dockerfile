# Use an official Maven image to build the application
FROM openjdk:19-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY /target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
