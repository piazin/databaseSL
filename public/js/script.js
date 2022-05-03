//confirm delete page admin/categories/index.ejs
function confirmDelete(event, form){
    event.preventDefault();
    Swal.fire({
        title: 'Deseja excluir?',
        text: "você está prestes a excluir um item",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, desejo deletar!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Item deletado',
                text: "tarefa concluida com sucesso",
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            form.submit();
        }
    })   
}



function btnMenu(){
  let menu = document.getElementById('menu-modal');
  menu.classList.toggle('active');
}
