using creditosBG.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace creditosBG.Services
{
    public class ViewCreditRequestService
    {
        private readonly CreditosBgContext _bd;

        public ViewCreditRequestService(CreditosBgContext bd)
        {
            _bd = bd;
        }
        public async Task UpdateCreditRequestStatus(int entityId, string? newStatus, int userId)
        {
            var requestIdParam = new SqlParameter("@EntityId", entityId);
            var newStatusParam = new SqlParameter("@NewStatus", newStatus);
            var actionUserIdParam = new SqlParameter("@UserId", userId);

            try
            {
                await _bd.Database.ExecuteSqlRawAsync("EXEC sprUpdateStatusCreditRequest @EntityId, @NewStatus, @UserId",
                                                        requestIdParam, newStatusParam, actionUserIdParam);
            }
            catch (SqlException ex)
            {                
                throw new Exception(ex.Message);
            }
        }
    }
}
