using System;
using System.Collections.Generic;

namespace creditosBG.Models;

public partial class AuditLog
{
    public int Id { get; set; }

    public string Action { get; set; } = null!;

    public string Entity { get; set; } = null!;

    public int? EntityId { get; set; }

    public int UserId { get; set; }

    public DateTime Timestamp { get; set; }

    public string? Details { get; set; }

    public virtual User User { get; set; } = null!;
}
