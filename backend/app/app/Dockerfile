# Multi-stage Dockerfile: build with Maven, run with Temurin JRE
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy pom and source, then build the application (skip tests for speed)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre-jammy AS runtime
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
