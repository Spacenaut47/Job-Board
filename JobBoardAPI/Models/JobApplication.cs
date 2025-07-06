namespace JobBoardAPI.Models;

public class JobApplication
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }

    public int JobId { get; set; }
    public Job Job { get; set; }

    public string Message { get; set; }
    public DateTime AppliedOn { get; set; } = DateTime.UtcNow;
}
