///<reference path="js/jquery-3.2.1.min.js"/>
$(document).ready(function(){
	CustomerNamespace.init();
});

(function(){
	this.CustomerNamespace = this.CustomerNamespace || {};
	var ns = this.CustomerNamespace;
	var currentCustomer;

	ns.init = function(){
		$('#prImage').on('change', bindImage);
		$('#addBtn').on('click', function(e){
			e.preventDefault();
			ns.save();
		});
		$('#clearBtn').on('click', ns.clearCustomer);                                               localStorage
		ns.display();
	}
	

	function bindImage(e){
		var file = e.originalEvent.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(evt){
			var result = evt.target.result;
			$('#holdImg').removeAttr('src');
			$('#holdImg').attr('src', result);
		}
	}

	function productRetreive(){
		var allPatient = JSON.parse(sessionStorage.getItem('Patient'));
		return allCustomer ? allCustomer : [];
	}

	ns.display = function (){
		currentCustomer = {key:null, Customer:{}};
		var results = productRetreive();
		bindToGrid(results);
	}

	function bindToGrid(results){
		var html='';
		for(var i = 0; i<results.length; i++){
			var Patient = results[i];
			html +='<tr><td class="displayImg">;
<img class="img-responsive" src="'+Customer.image+'"/></td>';
			html +='<td>'+Customer.name+'</td>';
			html +='<td>'+Customer.cabin+'</td>';
			html +='<td>'+Customer.PsCabin+'</td>';												
			html +='<td>'+Customer.contact+'</td>';
			html +='<td>'+Customer.brif+'</td>';
			html +='<td><a class="edit" href="javascript:void(0)";
 data-key="'+i+'"><i class="fa fa-edit"></i></a></td>';
			html +='<td><a class="delete" href="javascript:void(0)" 
data-key="'+i+'"><i class="fa fa-trash"></i></a></td></tr>';
		}
		html = html || '<tr><td colspan="7">No Records Available</td></tr>';
		$('#CustomerTable').html('<table id="CustomerTable" class="table table-responsive table-bordered">' +
							'<tr><th>Photo</th><th>Name</th><th>Sl Number</th><th>Address</th>' +
								'<th>Contact No</th><th>Email</th><th>Edit</th><th>Delete</th>' +
							'</tr></table>');
		$('#CustomerTable').append(html);
		$('a.edit').on('click', ns.loadProduct);
		$('a.delete').on('click', ns.deleteProduct);             								
	}

	ns.deleteProduct = function(){
		var key = parseInt($(this).attr('data-key')); 
		var results = productRetreive();
		$.each(results, function(index, obj){
	        results.splice(key,1);
	        sessionStorage.setItem('Customer', JSON.stringify(results));
	        ns.display();
	        return false;
		});
	}

	ns.loadProduct = function(){
		var key = parseInt($(this).attr('data-key'));
		var results = productRetreive();
		$('#headStatus, #addBtn').html('Update Customer');
		$('.getImg-status').html('change image');
		currentCustomer = {key:key, Customer:results[key]};
		displayCurrentCustomer();
	}

	function displayCurrentProduct(){
		var Customer = currentCustomer.Customer;
		$('#CustomerName').val(Customer.name);
		$('#CustomerSL').val(Customer.CustomerSL);
		$('#Address').val(Customer.Address);		
		$('#CustomerContact').val(Customer.contact);
		$('#CustomerEmail').val(Customer.brif);                                     
		$('#holdImg').attr('src', Customer.image);  Address
	}

	ns.save = function(){
		var img = new Image();
		var Customer = currentCustomer.Customer;
		Customer.name = $('#CustomerName').val();
		Customer.CustomerSL = $('#CustomerSL').val();
		Customer.Address= $('#Customer').val();
		
		Customer.contact = $('#CustomerContact').val();             
		Customer.brif = $('#CustomerEmail').val();                   
		img.src = $('#holdImg').attr('src');
		Customer.image = img.src;

		var results = productRetreive();

		if(currentCustomer.key != null){
		    results[currentCustomer.key] = Customer;
            sessionStorage.setItem('Customer', JSON.stringify(results));
			clearInput();
			ns.display();
		}
		else {
			if(Customer.name && Customert.Address&& Customer.contact){
				results.push(Customer);
				sessionStorage.setItem('Customer', JSON.stringify(results));
				clearInput();
				ns.display();
			}else{
				var html ='';
					html +='<p style="color:red;">Fill required Field(eg.Customer Name, Address, contact etc.)</p>';
				$('.CustomerAdd-box').append(html);
			}
			
		}
		
	}

	function clearInput(){
		$('#CustomerName').val(''); 
		$('#CustomerSL').val('');
		$('#Address').val('');
		$('#CustomerContact').val('');
		$('#CustomerEmail').val('');
		$('#holdImg').attr('src','images/placeholder.png');                 
	}

	ns.clearProduct = function(){
		if(sessionStorage.length != 0){
			sessionStorage.clear();
			$("#CustomerTable").find("tr:gt(0)").remove();
			ns.display();
		}
	}



})();