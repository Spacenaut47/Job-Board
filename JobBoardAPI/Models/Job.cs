namespace JobBoardAPI.Models;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string CompanyName { get; set; }
    public string EmploymentType { get; set; }
    public string[] Languages { get; set; } = [];
    public string Posted { get; set; }
    public string Location { get; set; }
    public string Experience { get; set; }
    public float Rating { get; set; }
}
