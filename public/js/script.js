
function confirmDelete(event, form){
    event.preventDefault();
    Swal.fire({
        title: 'Deseja excluir?',
        text: "está ação não podera ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deletado!',
            'item deletado com sucesso',
            'success'
          );
          form.submit();
        }
      })
}

function btn_category_save(){
  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Seu trabalho foi salvo',
  showConfirmButton: false,
  timer: 1200
  })
}

function btn_menu_panel() {

}