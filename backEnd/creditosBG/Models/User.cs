using System;
using System.Collections.Generic;

namespace creditosBG.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordUser { get; set; } = null!;

    public int RoleId { get; set; }

    public virtual ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public virtual ICollection<CreditRequest> CreditRequests { get; set; } = new List<CreditRequest>();

    public virtual Role Role { get; set; } = null!;
}
