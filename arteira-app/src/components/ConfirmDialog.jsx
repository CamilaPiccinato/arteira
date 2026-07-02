function ConfirmDialog({ titulo, mensagem, onConfirmar, onCancelar }) {
  return (
    <div className="modalOverlay" onClick={onCancelar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{titulo}</h2>
        <p className="modalTextoConfirma">{mensagem}</p>
        <div className="modalAcoes">
          <button className="btnSecundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btnPrimario" onClick={onConfirmar}>
            Confirmar exclusão
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
