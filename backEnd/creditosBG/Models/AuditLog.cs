namespace creditosBG.Models;

public partial class AuditLog
{
    public int Id { get; set; }
    public DateTime CreationDate { get; set; }
	public int UserId { get; set; }
    public string? Details { get; set; }
    public string? Entity { get; set; }
    public int EntityId { get; set; }
    public string? OldStatus { get; set; }
    public string? NewStatus { get; set; }
    public virtual User User { get; set; } = null!;
}
