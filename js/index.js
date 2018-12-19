_createCollectionList();
$('.modal').modal();
$(".formLista").submit(function(e){
	e.preventDefault();
	let newDo = $("#newDo").val();
	let list = JSON.parse(localStorage.getItem("listDo"));
	let idList = 1;
	if(list.length > 0){
		idList = list[list.length -1].id + 1;
	}
	let newItemList = {
		id :idList,
		name: newDo,
		val:false
	}
	list.push(newItemList);
	localStorage.setItem("listDo",JSON.stringify(list))
	_createCollectionList();
	$("#newDo").val("");

});

$(".btnEliminar").click(function(){
	let idList = $(this).attr("data-id")
	let list = JSON.parse(localStorage.getItem("listDo"));
	let posicion = 0;
	list.map((valor,indice)=>{
		if(valor.id==idList)
			posicion = indice;
	});


	list.splice(posicion,1);
			localStorage.setItem("listDo",JSON.stringify(list));
			$(".collection-item-"+idList).addClass("fadeOutRightBig animated");
			setTimeout(function(){$(".collection-item-"+idList).remove();},800);
			M.toast({html: `¡Listo! ¡Se eliminó esa tarea!`})
	
});

$(".collection").on('click','.secondary-content',function(){
	$(".btnEliminar").attr("data-id",$(this).attr("data-id"));
});



$(".collection").on('click',' input',function(){
	let idList = $(this).val()
	let list = JSON.parse(localStorage.getItem("listDo"));
	let posicion = 0;
	list.map((valor,indice)=>{
		
		if(valor.id==idList)
			posicion = indice;
	});
	
	if ($(this).is(':checked')) {
		list[posicion].val = true;
	}else{
		list[posicion].val = false;
	}
	localStorage.setItem("listDo",JSON.stringify(list));

});

function _createCollectionList(){
	const ListDo = [];
	if(localStorage.getItem("listDo")!=null){
		let list = JSON.parse(localStorage.getItem("listDo"));
		let collectionList = '';
		list.forEach(value => {
			if(value.val == true){
				
				collectionList += `<li class="collection-item collection-item-${value.id}">
										<div>
											<a href="#modal1" data-id="${value.id}" class="modal-trigger secondary-content">
												<i class="material-icons">delete</i>
											</a>
											<p>
													<label for="inputCheckbox${value.id}">
													<input type="checkbox" id="inputCheckbox${value.id}" checked="checked" value="${value.id}" />
													<span>${value.name}</span>
													</label>
											</p>
										</div>
									</li>`;
			}else{
				collectionList += `<li class="collection-item collection-item-${value.id}">
										<div>
											<a href="#modal1" data-id="${value.id}" class="modal-trigger secondary-content"><i class="material-icons">delete</i></a>
											<p>
													<label for="inputCheckbox${value.id}">
													<input type="checkbox" id="inputCheckbox${value.id}" value="${value.id}" />
													<span>${value.name}</span>
													</label>
											</p>
										</div>
									</li>`;
			}
		});
		$("ul.collection").html(collectionList);
	}else{
		localStorage.setItem("listDo",JSON.stringify(ListDo))
	}
}