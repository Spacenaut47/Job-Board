📘 Job Board API Documentation

🛠 Tech Stack
- Backend: ASP.NET Core 9 Web API
- Frontend: React + TypeScript
- Database: SQLite (via EF Core)
- Authentication: JWT + BCrypt
- Role Management: Admin vs Regular Users

✅ Prerequisites
- NET 9 SDK
- Node.js + npm (for frontend)
- SQLite (installed or use DB Browser)
- Visual Studio / VS Code

🧪 Running the Backend
```
# From the root project folder
dotnet restore
dotnet ef database update
dotnet run
```
📦 Packages Used
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package Microsoft.EntityFrameworkCore.Tools
```
🧬 Entity Models
User
```
public class User {
  int Id;
  string Name;
  string Email;
  string PasswordHash;
  bool IsAdmin;
}
```
Job
```
public class Job {
  int Id;
  string Title;
  string CompanyName;
  string EmploymentType;
  string[] Languages;
  string Posted;
  string Location;
  string Experience;
  float Rating;
}
```
🔐 Authentication
- Login returns a JWT token + isAdmin flag
- Save token in localStorage and use in Authorization header

👨‍💼 Admin Dashboard
Features:
- View all jobs
- Delete jobs
- Add new job
- Edit job (coming soon)
Access:
- Only available if isAdmin === true
- Route: /admin
- Protected via localStorage.getItem("isAdmin")

🖥 Frontend Highlights
Role-based UI:
- Admin sees "Admin Panel"
- Users only see public pages
- Token saved in localStorage
- Admin-only routes protected
