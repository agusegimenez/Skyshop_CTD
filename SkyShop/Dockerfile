FROM maven:3.9.9-amazoncorretto-21-al2023 AS build

RUN mkdir /home/app
COPY . /home/app
RUN cd /home/app && mvn package

FROM openjdk:21-slim
COPY --from=build /home/app/target/SkyShop-0.0.1-SNAPSHOT.jar /myproject.jar

EXPOSE 8080

CMD ["java", "-Delastic.apm.service_name=myproject -Delastic.apm.application_packages=com.example.myproject","-jar", "/myproject.jar"]
