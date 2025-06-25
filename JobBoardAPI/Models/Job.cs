using System.Text.Json.Serialization;

namespace JobBoardAPI.Models;

public class Job
{
    public int Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("company_name")]
    public string CompanyName { get; set; }

    [JsonPropertyName("employment_type")]
    public string EmploymentType { get; set; }

    [JsonPropertyName("languages")]
    public string[] Languages { get; set; }

    [JsonPropertyName("posted")]
    public string Posted { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; }

    [JsonPropertyName("experience")]
    public string Experience { get; set; }

    [JsonPropertyName("rating")]
    public float Rating { get; set; }
}
