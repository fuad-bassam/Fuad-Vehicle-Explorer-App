FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY global.json nuget.config ./
COPY Core/Core.csproj Core/
COPY Services/Services.csproj Services/
COPY Web/Web.csproj Web/
RUN dotnet restore Web/Web.csproj

COPY Core/ Core/
COPY Services/ Services/
COPY Web/ Web/
RUN dotnet publish Web/Web.csproj --configuration Release --no-restore --output /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .
USER $APP_UID
EXPOSE 8080

ENTRYPOINT ["dotnet", "Web.dll"]
