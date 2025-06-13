ALTER PROCEDURE sprUpdateStatusCreditRequest
    @EntityId INT,
    @NewStatus VARCHAR(50),
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validación de estado permitido
   IF UPPER(@NewStatus) NOT IN (UPPER('Aprobado'), UPPER('Rechazado'))
BEGIN
    RAISERROR ('El estado ingresado no es válido. Solo se permite Aprobado o Rechazado.', 16, 1)
    RETURN
END

    DECLARE @OldStatus VARCHAR(50)

    -- Obtener el estado actual
    SELECT @OldStatus = Status
    FROM CreditRequests
    WHERE Id = @EntityId

    IF @OldStatus IS NULL
    BEGIN
        RAISERROR ('No se encontró la solicitud de crédito especificada.', 16, 1)
        RETURN
    END

    -- Actualizar el estado
    UPDATE CreditRequests
    SET Status = @NewStatus
    WHERE Id = @EntityId

    -- Registrar en auditoría
    INSERT INTO AuditLogs(CreationDate, UserId, Details, Entity, EntityId, OldStatus,NewStatus)
    VALUES (GETDATE(), @UserId,'', '', '',@OldStatus,@NewStatus)
END
