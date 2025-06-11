using System;
using System.Collections.Generic;

namespace creditosBG.Models;

public partial class CreditRequest
{
    public int Id { get; set; }

    public decimal AmountRequested { get; set; }

    public int TermInMonths { get; set; }

    public decimal MonthlyIncome { get; set; }

    public int WorkSeniorityYears { get; set; }

    public string Status { get; set; } = null!;

    public int UserId { get; set; }

    public virtual User? User { get; set; }
}
