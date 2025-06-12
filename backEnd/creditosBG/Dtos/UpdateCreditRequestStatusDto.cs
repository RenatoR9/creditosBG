namespace creditosBG.Dtos
{
    public class UpdateCreditRequestStatusDto
    {
        public DateTime CreationDate { get; set; }
        public int UserId { get; set; }
        public string? Details { get; set; }        
        public string? Entity { get; set; } 
        public int EntityId { get; set; }
        public string? OldStatus { get; set; }
        public string? NewStatus { get; set; }
    }
}
